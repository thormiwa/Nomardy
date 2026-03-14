from fastapi import APIRouter, HTTPException, Query

from app.api.responses import error_response, success_response
from app.schemas.budget_estimate import BudgetEstimateResult
from app.services.budget_data import get_nigerian_budget_estimate


router = APIRouter(tags=["budget"])


@router.get("/budget-estimate")
def budget_estimate(
    nationality: str = Query(..., description="Traveler passport nationality"),
    destination: str = Query(..., description="Destination country or region"),
) -> dict:
    if nationality.strip().lower() not in {"nigeria", "nigerian", "ng", "nga"}:
        raise HTTPException(
            status_code=400,
            detail=error_response(
                "Mock budget estimator currently supports Nigerian passport holders only."
            ),
        )

    try:
        budget_data = get_nigerian_budget_estimate(destination)
    except KeyError as exc:
        raise HTTPException(
            status_code=404,
            detail=error_response(f"No mock budget data found for destination: {destination}."),
        ) from exc

    result = BudgetEstimateResult(
        passport_country="Nigeria",
        last_updated="2026-03-14",
        **budget_data,
    )
    return success_response(result.model_dump())
