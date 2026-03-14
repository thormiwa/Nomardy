from typing import Any, Dict

from app.services.visa_data import normalize_destination


def budget_tier(amount: int, currency: str, trip_length_days: int, note: str) -> Dict[str, Any]:
    return {
        "amount": amount,
        "currency": currency,
        "trip_length_days": trip_length_days,
        "note": note,
    }


MOCK_BUDGET_DATA: Dict[str, Dict[str, Any]] = {
    "uk": {
        "destination": "United Kingdom",
        "destination_code": "UK",
        "budget": budget_tier(1800, "USD", 7, "Lean trip with careful accommodation choices."),
        "mid_range": budget_tier(2900, "USD", 7, "Comfortable city stay with moderate dining."),
        "luxury": budget_tier(5200, "USD", 7, "Premium hotel, flexible transport, higher daily spend."),
    },
    "uae": {
        "destination": "United Arab Emirates",
        "destination_code": "UAE",
        "budget": budget_tier(1300, "USD", 5, "Value-conscious Dubai or Abu Dhabi trip."),
        "mid_range": budget_tier(2200, "USD", 5, "Comfortable stay with paid attractions."),
        "luxury": budget_tier(4200, "USD", 5, "High-end hotel and premium dining."),
    },
    "rwanda": {
        "destination": "Rwanda",
        "destination_code": "RW",
        "budget": budget_tier(700, "USD", 5, "Simple Kigali-first trip."),
        "mid_range": budget_tier(1200, "USD", 5, "Comfortable hotel and local transport."),
        "luxury": budget_tier(2600, "USD", 5, "Upscale stay and curated experiences."),
    },
    "ghana": {
        "destination": "Ghana",
        "destination_code": "GH",
        "budget": budget_tier(650, "USD", 5, "Low-friction regional city break."),
        "mid_range": budget_tier(1050, "USD", 5, "Comfortable Accra trip with moderate dining."),
        "luxury": budget_tier(2200, "USD", 5, "Premium stay and private transfers."),
    },
    "morocco": {
        "destination": "Morocco",
        "destination_code": "MA",
        "budget": budget_tier(1200, "USD", 6, "Budget-conscious city hopping."),
        "mid_range": budget_tier(1850, "USD", 6, "Comfortable riad and intercity transport."),
        "luxury": budget_tier(3400, "USD", 6, "Premium riad and guided experiences."),
    },
    "canada": {
        "destination": "Canada",
        "destination_code": "CA",
        "budget": budget_tier(2100, "USD", 7, "Lean large-city visit with early booking."),
        "mid_range": budget_tier(3400, "USD", 7, "Comfortable hotel and moderate activities."),
        "luxury": budget_tier(6200, "USD", 7, "Premium stay with higher in-country spend."),
    },
    "south africa": {
        "destination": "South Africa",
        "destination_code": "ZA",
        "budget": budget_tier(950, "USD", 6, "Efficient Cape Town or Johannesburg trip."),
        "mid_range": budget_tier(1550, "USD", 6, "Comfortable hotel and internal movement."),
        "luxury": budget_tier(3200, "USD", 6, "Premium hotel and curated excursions."),
    },
    "schengen": {
        "destination": "Schengen Area",
        "destination_code": "SCHENGEN",
        "budget": budget_tier(1750, "USD", 7, "Lean one-country Schengen trip."),
        "mid_range": budget_tier(2900, "USD", 7, "Comfortable hotel and local transport."),
        "luxury": budget_tier(5600, "USD", 7, "High-end city stay and premium transport."),
    },
    "kenya": {
        "destination": "Kenya",
        "destination_code": "KE",
        "budget": budget_tier(850, "USD", 5, "Simple Nairobi-centered trip."),
        "mid_range": budget_tier(1350, "USD", 5, "Comfortable hotel and daily transport."),
        "luxury": budget_tier(3000, "USD", 5, "Upscale stay and safari-style additions."),
    },
    "namibia": {
        "destination": "Namibia",
        "destination_code": "NA",
        "budget": budget_tier(1250, "USD", 6, "Tighter self-managed route."),
        "mid_range": budget_tier(2100, "USD", 6, "Comfortable lodge and transfers."),
        "luxury": budget_tier(4300, "USD", 6, "Premium lodges and private movement."),
    },
    "ivory coast": {
        "destination": "Ivory Coast",
        "destination_code": "CI",
        "budget": budget_tier(700, "USD", 5, "Simple regional trip with modest hotel."),
        "mid_range": budget_tier(1150, "USD", 5, "Comfortable urban stay."),
        "luxury": budget_tier(2400, "USD", 5, "Premium city hotel and transport."),
    },
    "egypt": {
        "destination": "Egypt",
        "destination_code": "EG",
        "budget": budget_tier(1100, "USD", 6, "Budget-conscious Cairo-first route."),
        "mid_range": budget_tier(1800, "USD", 6, "Comfortable hotel and local touring."),
        "luxury": budget_tier(3600, "USD", 6, "Premium hotel and guided itinerary."),
    },
    "senegal": {
        "destination": "Senegal",
        "destination_code": "SN",
        "budget": budget_tier(680, "USD", 5, "Simple Dakar trip."),
        "mid_range": budget_tier(1100, "USD", 5, "Comfortable stay and city movement."),
        "luxury": budget_tier(2300, "USD", 5, "Premium hotel and private transport."),
    },
    "mauritius": {
        "destination": "Mauritius",
        "destination_code": "MU",
        "budget": budget_tier(1250, "USD", 5, "Tighter island trip with early booking."),
        "mid_range": budget_tier(2200, "USD", 5, "Comfortable beach stay."),
        "luxury": budget_tier(4800, "USD", 5, "Resort-heavy premium trip."),
    },
    "uganda": {
        "destination": "Uganda",
        "destination_code": "UG",
        "budget": budget_tier(820, "USD", 5, "Basic city and local movement."),
        "mid_range": budget_tier(1320, "USD", 5, "Comfortable hotel and daily transport."),
        "luxury": budget_tier(2800, "USD", 5, "Premium stay and guided experiences."),
    },
    "thailand": {
        "destination": "Thailand",
        "destination_code": "TH",
        "budget": budget_tier(1400, "USD", 7, "Lean Bangkok-focused trip."),
        "mid_range": budget_tier(2200, "USD", 7, "Comfortable hotel and some activities."),
        "luxury": budget_tier(4300, "USD", 7, "Premium resort and flexible transport."),
    },
    "vietnam": {
        "destination": "Vietnam",
        "destination_code": "VN",
        "budget": budget_tier(1150, "USD", 7, "Budget-conscious city route."),
        "mid_range": budget_tier(1800, "USD", 7, "Comfortable multi-city trip."),
        "luxury": budget_tier(3500, "USD", 7, "Premium stays and curated experiences."),
    },
    "seychelles": {
        "destination": "Seychelles",
        "destination_code": "SC",
        "budget": budget_tier(1500, "USD", 5, "Careful island trip with modest stay."),
        "mid_range": budget_tier(2600, "USD", 5, "Comfortable beachfront hotel."),
        "luxury": budget_tier(5600, "USD", 5, "Resort-led premium trip."),
    },
    "philippines": {
        "destination": "Philippines",
        "destination_code": "PH",
        "budget": budget_tier(1350, "USD", 7, "Lean island-hopping with careful booking."),
        "mid_range": budget_tier(2100, "USD", 7, "Comfortable hotels and domestic transfers."),
        "luxury": budget_tier(4100, "USD", 7, "Premium beach stays and flexible movement."),
    },
    "qatar": {
        "destination": "Qatar",
        "destination_code": "QA",
        "budget": budget_tier(1200, "USD", 4, "Short Doha trip with controlled spend."),
        "mid_range": budget_tier(1900, "USD", 4, "Comfortable hotel and city activities."),
        "luxury": budget_tier(3600, "USD", 4, "Premium hotel and dining."),
    },
    "maldives": {
        "destination": "Maldives",
        "destination_code": "MV",
        "budget": budget_tier(1700, "USD", 5, "Budget island strategy with early booking."),
        "mid_range": budget_tier(2900, "USD", 5, "Comfortable island stay."),
        "luxury": budget_tier(6200, "USD", 5, "Resort-first premium trip."),
    },
    "japan": {
        "destination": "Japan",
        "destination_code": "JP",
        "budget": budget_tier(1900, "USD", 7, "Lean urban route with early planning."),
        "mid_range": budget_tier(3000, "USD", 7, "Comfortable city hotels and rail movement."),
        "luxury": budget_tier(5800, "USD", 7, "Premium hotels and high daily spend."),
    },
    "singapore": {
        "destination": "Singapore",
        "destination_code": "SG",
        "budget": budget_tier(1450, "USD", 5, "Short efficient city trip."),
        "mid_range": budget_tier(2300, "USD", 5, "Comfortable hotel and paid attractions."),
        "luxury": budget_tier(4500, "USD", 5, "Premium hotel and upscale dining."),
    },
    "united states": {
        "destination": "United States",
        "destination_code": "US",
        "budget": budget_tier(2200, "USD", 7, "Lean major-city trip with early booking."),
        "mid_range": budget_tier(3600, "USD", 7, "Comfortable hotel and moderate local spend."),
        "luxury": budget_tier(6800, "USD", 7, "Premium city stay and flexible itinerary."),
    },
}


def get_nigerian_budget_estimate(destination: str) -> Dict[str, Any]:
    key = normalize_destination(destination)
    if key not in MOCK_BUDGET_DATA:
        raise KeyError(destination)
    return MOCK_BUDGET_DATA[key]
