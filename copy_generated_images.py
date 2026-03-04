import shutil

src_files = [
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_room_slider_1772139950886.png",
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_zen_slider_1772139964403.png",
    r"C:\Users\Personal\.gemini\antigravity\brain\d2143e61-60dd-4ed6-8282-a65704373334\wellness_abstract_slider_1772139976918.png",
]

dst_dir = r"c:\Users\Personal\Documents\MundoCarMi\Deglyacamero\public\images"

dst_names = [
    "wellness_room_slider.png",
    "wellness_zen_slider.png",
    "wellness_abstract_slider.png"
]

for src, dst_name in zip(src_files, dst_names):
    shutil.copy2(src, f"{dst_dir}\\{dst_name}")
    print(f"Copied {dst_name}")
