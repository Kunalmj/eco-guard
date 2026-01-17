import torch
import torchvision
import torch.nn.functional as F

def load_model(device="cpu"):
    model = torchvision.models.segmentation.deeplabv3_resnet50(
        pretrained=True
    )
    model.to(device)
    model.eval()
    return model


def segment_vegetation(model, image_tensor):
    """
    image_tensor: (1, 3, H, W)
    returns: vegetation mask (H, W)
    """
    with torch.no_grad():
        output = model(image_tensor)["out"]  # (1, C, H, W)

    # Take the class with max probability
    probs = torch.softmax(output, dim=1)

    # Class index for vegetation (approximation)
    # In pretrained land-cover models, vegetation usually dominates green regions
    vegetation_mask = probs.argmax(dim=1).squeeze(0)

    return vegetation_mask.cpu().numpy()
