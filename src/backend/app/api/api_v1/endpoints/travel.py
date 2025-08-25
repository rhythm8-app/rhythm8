from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_travel():
    return {"message": "Travel endpoint"}