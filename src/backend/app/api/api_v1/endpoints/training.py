from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_training():
    return {"message": "Training endpoint"}