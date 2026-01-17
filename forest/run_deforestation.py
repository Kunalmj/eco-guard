from image_loader import load_image_np
from deforestation import detect_deforestation

# Load first image
img_t1 = load_image_np("forest_2000.png")

# Resize second image to match first
target_size = (img_t1.shape[1], img_t1.shape[0])  # (width, height)
img_t2 = load_image_np("forest_2024.png", target_size=target_size)

loss_percent, loss_mask = detect_deforestation(img_t1, img_t2)

print(f"Deforestation detected: {loss_percent}%")
import matplotlib.pyplot as plt

plt.figure(figsize=(12,4))

plt.subplot(1,3,1)
plt.title("Before (Vegetation)")
plt.imshow(img_t1)
plt.axis("off")

plt.subplot(1,3,2)
plt.title("After")
plt.imshow(img_t2)
plt.axis("off")

plt.subplot(1,3,3)
plt.title("Deforestation Mask")
plt.imshow(loss_mask, cmap="Reds")
plt.axis("off")

plt.show()
