import os
from PIL import Image

def resize_images_recursively(folder_path, scale=0.5, output_folder=None):
    """
    Recursively resizes all images in a folder and its subfolders by the given scale.

    Args:
        folder_path (str): The path to the root folder.
        scale (float): The resize scale (e.g., 0.5 for half size).
        output_folder (str, optional): If provided, saves resized images here 
                                       (preserving folder structure). Otherwise, overwrites originals.
    """
    supported_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.gif', '.tiff')

    # Create output folder if needed
    if output_folder:
        os.makedirs(output_folder, exist_ok=True)

    for root, _, files in os.walk(folder_path):  # Recursive walk
        for filename in files:
            if not filename.lower().endswith(supported_extensions):
                continue  # skip non-image files

            input_path = os.path.join(root, filename)

            try:
                with Image.open(input_path) as img:
                    new_size = (int(img.width * scale), int(img.height * scale))
                    resized_img = img.resize(new_size, Image.LANCZOS)

                    if output_folder:
                        # Preserve relative directory structure
                        rel_path = os.path.relpath(root, folder_path)
                        save_dir = os.path.join(output_folder, rel_path)
                        os.makedirs(save_dir, exist_ok=True)
                        save_path = os.path.join(save_dir, filename)
                    else:
                        save_path = input_path  # overwrite original

                    resized_img.save(save_path)
                    print(f"✅ {input_path} → {save_path} ({new_size[0]}x{new_size[1]})")

            except Exception as e:
                print(f"❌ Failed to process {input_path}: {e}")

resize_images_recursively("../game", scale=0.5)
