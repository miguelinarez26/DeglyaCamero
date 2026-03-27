import shutil
import os

src = r"C:\Users\Personal\.gemini\antigravity\brain\d241ba75-8536-4a3d-9f64-3c37e5cb61b8\emdr_therapy_ots_final_1774578742539.png"
dst = r"c:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\emdr-therapy.png"

try:
    if os.path.exists(src):
        shutil.copy(src, dst)
        print(f"Copied to {dst}")
    else:
        print(f"Source not found: {src}")
except Exception as e:
    print(f"Error: {e}")
