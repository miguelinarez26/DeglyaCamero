import shutil

files = {
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_pathway_wide_1772141180880.png": r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_pathway_wide.png",
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_zen_wide_1772141193475.png": r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_zen_wide.png",
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_doorway_wide_1772141206458.png": r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_doorway_wide.png"
}

for src, dst in files.items():
    try:
        shutil.copy2(src, dst)
        print(f"Exito copiando imagen wide a public/images!")
    except Exception as e:
        print(f"Error: {e}")
