from fastapi import APIRouter

from app.api.api_v1.endpoints import events, groups, training, users, travel

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(groups.router, prefix="/groups", tags=["groups"])
api_router.include_router(training.router, prefix="/training", tags=["training"])
api_router.include_router(travel.router, prefix="/travel", tags=["travel"])