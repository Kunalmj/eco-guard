import numpy as np

def vegetation_mask_rgb(image_np, threshold=0.1):
    r = image_np[:, :, 0].astype(float)
    g = image_np[:, :, 1].astype(float)
    b = image_np[:, :, 2].astype(float)

    vegetation_index = (g - r) / (g + r + 1e-5)
    return vegetation_index > threshold
