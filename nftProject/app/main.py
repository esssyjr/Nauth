from fastapi import FastAPI, File, UploadFile
from .opensea_service import OpenSeaService
from .image_comparison_service import ImageComparisonService
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

app = FastAPI()
opensea_service = OpenSeaService(os.getenv("OPENSEA_API_KEY"))
image_comparison_service = ImageComparisonService()

@app.on_event("startup")
async def startup_event():
    # Fetch and preprocess images on startup
    collection_slug = "doodles-official"  # Example collection
    images = opensea_service.get_nft_images_from_collection(collection_slug, limit=100)
    image_comparison_service.preprocess_images(images)

@app.post("/authenticate-nft/")
async def authenticate_nft(file: UploadFile = File(...)):
    contents = await file.read()
    is_similar, similarity_score = image_comparison_service.compare_image(contents)
    
    if is_similar:
        return {"authenticated": False, "message": "Potential forgery detected", "similarity_score": similarity_score}
    return {"authenticated": True, "message": "NFT appears to be unique", "similarity_score": similarity_score}