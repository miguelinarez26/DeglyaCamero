-- Enable pgsodium if not already enabled (handled in previous migration, but safe to repeat)
CREATE EXTENSION IF NOT EXISTS pgsodium;

-- Create a secure function to insert encrypted notes
-- This uses the default key ID (which pgsodium manages nicely for transparent encryption or via API)
-- For simplicity and robustness, we will use pgsodium.crypto_secretbox_open/seal if we manage keys,
-- but a better approach for "first note" is to use pgsodium's Transparent Column Encryption features or
-- just a simple RPC wrapper around `pgsodium.crypto_secretbox`.

-- Let's use a Key ID. If we don't have one, we can generate one. 
-- However, managing Key IDs requires storing them.
-- A simpler approach for this demo: Use the Server Key (default).

CREATE OR REPLACE FUNCTION create_encrypted_note(
    p_booking_id BIGINT,
    p_note TEXT,
    p_created_by UUID
) RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_note_id BIGINT;
    v_key_id UUID;
    v_nonce bytea;
    v_encrypted bytea;
BEGIN
    -- We need a key. Let's look for a valid key or create one.
    -- For this specific implementation, we will use a dedicated key for booking_notes if possible,
    -- or just generate a nonce and encrypt using a derived key.
    
    -- SIMPLIFIED APPROACH for "Real Encryption":
    -- We will rely on pgsodium to encrypt the text.
    -- We'll assume there is a key_id 1 or we use the default system key mechanism if configured.
    -- But since we can't easily guarantee key setup in this script without more privileges/context,
    -- We will use `pgsodium.crypto_secretbox` with a fixed or managed key if available.
    
    -- BETTER: Let's use `pgsodium.crypto_aead_det_encrypt` (Deterministic) or `crypto_secretbox` (Random nonce).
    -- Random nonce is better.
    
    -- IMPORTANT: pgsodium functions usually return bytea. Our column `encrypted_note` is TEXT.
    -- We should store it as base64 encoded string.
    
    -- We need a key. Let's see if we can get a key.
    -- SELECT id FROM pgsodium.valid_key WHERE status = 'valid' LIMIT 1;
    SELECT id INTO v_key_id FROM pgsodium.valid_key WHERE status = 'valid' ORDER BY created DESC LIMIT 1;
    
    IF v_key_id IS NULL THEN
        -- Attempt to create a key? Or fail? 
        -- Creating a key usually requires pgsodium_keyiduser role.
        -- Let's try to assume a key exists or use a hardcoded fallback if this is a dev env (NOT REC FOR PROD).
        -- Triggering key generation:
        v_key_id := pgsodium.create_key();
    END IF;
    
    -- Encrypt
    -- pgsodium.crypto_secretbox(message bytea, nonce bytea, key_id uuid) returns bytea
    v_nonce := pgsodium.randombytes_buf(24);
    v_encrypted := pgsodium.crypto_secretbox(
        p_note::bytea, 
        v_nonce, 
        v_key_id
    );
    
    -- Store as "nonce || ciphertext" encoded in base64 to look clean in text column
    -- OR store formatted string.
    -- Let's store: key_id::text || ':' || encode(v_nonce, 'base64') || ':' || encode(v_encrypted, 'base64')
    
    INSERT INTO booking_notes (booking_id, encrypted_note, created_by)
    VALUES (
        p_booking_id,
        v_key_id::text || ':' || encode(v_nonce, 'base64') || ':' || encode(v_encrypted, 'base64'),
        p_created_by
    )
    RETURNING id INTO v_note_id;

    RETURN v_note_id;
END;
$$;

-- Create a secure function to decrypt notes
CREATE OR REPLACE FUNCTION get_decrypted_note(
    p_note_id BIGINT
) RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_raw TEXT;
    v_parts TEXT[];
    v_key_id UUID;
    v_nonce bytea;
    v_ciphertext bytea;
    v_decrypted TEXT;
BEGIN
    SELECT encrypted_note INTO v_raw FROM booking_notes WHERE id = p_note_id;
    
    IF v_raw IS NULL OR v_raw = '' THEN
        RETURN NULL;
    END IF;
    
    -- Check if it looks like our format
    v_parts := string_to_array(v_raw, ':');
    
    -- Format: key_id:nonce_b64:ciphertext_b64 (Length 3)
    IF array_length(v_parts, 1) != 3 THEN
        RETURN 'Error: Invalid format';
    END IF;
    
    v_key_id := v_parts[1]::uuid;
    v_nonce := decode(v_parts[2], 'base64');
    v_ciphertext := decode(v_parts[3], 'base64');
    
    -- Decrypt
    v_decrypted := convert_from(
        pgsodium.crypto_secretbox_open(
            v_ciphertext,
            v_nonce,
            v_key_id
        ),
        'UTF8'
    );
    
    RETURN v_decrypted;
EXCEPTION WHEN OTHERS THEN
    RETURN 'Error: Decryption failed';
END;
$$;
