import shutil

files = {
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_pathway_1772140740077.png": r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_pathway.png",
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_doorway_1772140765694.png": r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_doorway.png"
}

for src, dst in files.items():
    try:
        shutil.copy2(src, dst)
        print(f"Exito copiando imagen a public/images!")
    except Exception as e:
        print(f"Error: {e}")
