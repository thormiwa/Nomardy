from pydantic import BaseModel, Field


class BudgetTier(BaseModel):
    amount: int
    currency: str
    trip_length_days: int
    note: str


class BudgetEstimateResult(BaseModel):
    passport_country: str = Field(..., examples=["Nigeria"])
    destination: str
    destination_code: str
    budget: BudgetTier
    mid_range: BudgetTier
    luxury: BudgetTier
    last_updated: str
