from datetime import datetime, timezone
from typing import Any, Dict


def iso_timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()


def success_response(data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "status": "success",
        "data": data,
        "timestamp": iso_timestamp(),
    }


def error_response(message: str) -> Dict[str, Any]:
    return {
        "status": "error",
        "message": message,
        "timestamp": iso_timestamp(),
    }
