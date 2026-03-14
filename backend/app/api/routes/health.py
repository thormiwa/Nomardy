from datetime import datetime, timezone

from fastapi import APIRouter


router = APIRouter(tags=["health"])


@router.get("/health")
def healthcheck() -> dict:
    return {
        "status": "success",
        "data": {"service": "backend"},
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
