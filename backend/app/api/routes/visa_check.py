from fastapi import APIRouter, HTTPException, Query

from app.api.responses import error_response, success_response
from app.schemas.visa_check import VisaCheckResult
from app.services.visa_data import get_nigerian_visa_requirement


router = APIRouter(tags=["visa"])


@router.get("/visa-check")
def visa_check(
    nationality: str = Query(..., description="Traveler passport nationality"),
    destination: str = Query(..., description="Destination country or region"),
) -> dict:
    if nationality.strip().lower() not in {"nigeria", "nigerian", "ng", "nga"}:
        raise HTTPException(
            status_code=400,
            detail=error_response(
                "Mock visa checker currently supports Nigerian passport holders only."
            ),
        )

    try:
        visa_data = get_nigerian_visa_requirement(destination)
    except KeyError as exc:
        raise HTTPException(
            status_code=404,
            detail=error_response(f"No mock visa data found for destination: {destination}."),
        ) from exc

    result = VisaCheckResult(
        passport_country="Nigeria",
        last_updated="2026-03-14",
        **visa_data,
    )
    return success_response(result.model_dump())
