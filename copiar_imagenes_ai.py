import shutil

files = {
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_room_slider_1772139950886.png": r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_room_slider.png",
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_zen_slider_1772139964403.png": r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_zen_slider.png",
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_abstract_slider_1772139976918.png": r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_abstract_slider.png"
}

for src, dst in files.items():
    try:
        shutil.copy2(src, dst)
        print(f"Exito copiando imagen AI a {dst}!")
    except Exception as e:
        print(f"Falla: {e}")
