import re
import os, shutil
import subprocess
from PIL import Image

def merge_images_to_sprite(folder_path, output_path):
    
    image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
    if len(image_files) == 0:
        raise ValueError("No PNG images found in the folder")

    
    image_files.sort(key=lambda f: int(re.search(r'\d+', f).group()))
    
    first_image = Image.open(os.path.join(folder_path, image_files[0]))
    width, height = first_image.size
    columns = len(image_files)

    print([img for img in image_files])
    
    sprite_width = width * columns

    
    sprite_sheet = Image.new("RGBA", (sprite_width, height))

    
    for index, image_file in enumerate(image_files):
        img = Image.open(os.path.join(folder_path, image_file))
        row = index // columns
        col = index % columns

        
        x = col * width
        y = row * height
        sprite_sheet.paste(img, (x, y))

    
    sprite_sheet.save(output_path)
    print(f"Sprite sheet saved to {output_path}")

# directory_path = os.path.join(".", "Animations", "Programs")
# raw_path = os.path.join(directory_path, "Raws")
# sprite_sheet_path = os.path.join(directory_path, "SpriteSheets")
# icon_path = os.path.join(directory_path, "Icons")
# for folder_name in os.listdir(raw_path):
#     folder_path = os.path.join(raw_path, folder_name)
#     sprite_sheet_output_path = os.path.join(sprite_sheet_path, f"{folder_name}.png")
#     icon_input_path = os.path.join(folder_path, f"{folder_name}_00.png")
#     icon_output_path = os.path.join(icon_path, f"{folder_name}.png")
#     merge_images_to_sprite(folder_path, sprite_sheet_output_path, 1, 24)
#     shutil.copy(icon_input_path, icon_output_path)

def merge_all_in_folder(folder_path):
    importStr = ""
    switchStr = ""
    for folder_name in os.listdir(folder_path):
        image_name = f"{folder_name}.png"
        if not os.path.exists(image_name):
            merge_images_to_sprite(os.path.join(folder_path, folder_name), image_name)
        importStr += f"import {folder_name}Spritesheet from \"../image/spritesheet/{image_name}\";\n"
    
    # Copy to clipboard (macOS)
    try:
        process = subprocess.Popen(['pbcopy'], stdin=subprocess.PIPE)
        process.communicate(importStr.encode('utf-8'))
        print("\n✅ TypeScript code copied to clipboard!")
    except Exception as e:
        print(f"\n❌ Failed to copy to clipboard: {e}")
        print("You can manually copy the code above.")

merge_all_in_folder("raw")

