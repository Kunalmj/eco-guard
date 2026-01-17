from vegetation_index import vegetation_mask_rgb
import numpy as np

def detect_deforestation(img1_np, img2_np):
    mask1 = vegetation_mask_rgb(img1_np)
    mask2 = vegetation_mask_rgb(img2_np)

    vegetation_loss = mask1 & (~mask2)

    total_veg = mask1.sum()
    lost_veg = vegetation_loss.sum()

    percent = (lost_veg / total_veg) * 100 if total_veg > 0 else 0
    return round(percent, 2), vegetation_loss
