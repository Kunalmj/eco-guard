from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io

from deforestation import detect_deforestation
from visualize import overlay_heatmap

app = FastAPI(title="Deforestation Detection API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Deforestation-Percentage"],
)

def read_image(file: UploadFile):
    image_bytes = file.file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return np.array(image)

@app.post("/detect-deforestation")
async def detect_deforestation_api(
    image_before: UploadFile = File(...),
    image_after: UploadFile = File(...)
):
    img1 = read_image(image_before)
    img2 = read_image(image_after)

    # Resize image_after to image_before
    if img1.shape != img2.shape:
        img2 = np.array(
            Image.fromarray(img2).resize(
                (img1.shape[1], img1.shape[0]),
                Image.BILINEAR
            )
        )

    percent, loss_mask = detect_deforestation(img1, img2)

    heatmap_img = overlay_heatmap(img2, loss_mask)

    pil_img = Image.fromarray(heatmap_img)
    buf = io.BytesIO()
    pil_img.save(buf, format="PNG")
    buf.seek(0)

    return Response(
        content=buf.read(),
        media_type="image/png",
        headers={
            "X-Deforestation-Percentage": str(percent)
        }
    )
