import shutil

try:
    src = r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_landscape_slider_1772140468579.png"
    dst = r"C:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images\wellness_landscape_slider.png"
    shutil.copy2(src, dst)
    print("Exito copiando paisaje AI!")
except Exception as e:
    print(f"Error: {e}")
