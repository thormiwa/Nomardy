from typing import List, Optional

from pydantic import BaseModel, Field


class VisaFee(BaseModel):
    amount: Optional[float]
    currency: str
    note: str


class VisaCheckResult(BaseModel):
    passport_country: str = Field(..., examples=["Nigeria"])
    destination: str
    destination_code: str
    requirement_type: str
    allowed_stay: str
    processing_time: str
    visa_fee: VisaFee
    processing_note: str
    documents_required: List[str]
    step_by_step_guide: List[str]
    official_links: List[str]
    last_updated: str
