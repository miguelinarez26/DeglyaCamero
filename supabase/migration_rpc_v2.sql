
-- Secure Guest Creation Function (Bypasses RLS)
-- We use 'security definer' to run as the function creator (admin)
create or replace function public.create_guest_secure(
    p_full_name text,
    p_email text,
    p_phone text,
    p_national_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    v_guest_id uuid;
    v_result jsonb;
begin
    -- 1. Try case-insensitive email match or national_id match
    select id into v_guest_id
    from public.guests
    where national_id = p_national_id 
       or lower(email) = lower(p_email)
    limit 1;

    -- 2. If no guest found, insert new one
    if v_guest_id is null then
        insert into public.guests (full_name, email, phone, national_id)
        values (p_full_name, p_email, p_phone, p_national_id)
        returning id into v_guest_id;
    else
        -- Optional: Update details usually? Let's keep it safe and just return existing.
        -- We could update phone if provided.
        if p_phone is not null and p_phone <> '' then
            update public.guests set phone = p_phone where id = v_guest_id;
        end if;
    end if;

    -- 3. Return the full guest object
    select to_jsonb(g) into v_result from public.guests g where id = v_guest_id;
    return v_result;
end;
$$;
