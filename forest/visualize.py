import numpy as np
from PIL import Image

def overlay_heatmap(image, mask, alpha=0.5):
    """
    image: H x W x 3 (RGB)
    mask: H x W (boolean)
    """
    heatmap = image.copy()

    # Red overlay for deforestation
    heatmap[mask] = [255, 0, 0]

    blended = (alpha * heatmap + (1 - alpha) * image).astype(np.uint8)
    return blended
