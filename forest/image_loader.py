from PIL import Image
import numpy as np

def load_image_np(path, target_size=None):
    img = Image.open(path).convert("RGB")

    if target_size is not None:
        img = img.resize(target_size, Image.BILINEAR)

    return np.array(img)
