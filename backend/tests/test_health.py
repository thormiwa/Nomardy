from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_healthcheck() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "success"


def test_visa_check_returns_mock_data() -> None:
    response = client.get("/visa-check", params={"nationality": "Nigeria", "destination": "Japan"})

    assert response.status_code == 200
    payload = response.json()

    assert payload["status"] == "success"
    assert payload["data"]["passport_country"] == "Nigeria"
    assert payload["data"]["destination"] == "Japan"
    assert payload["data"]["requirement_type"] == "embassy-visa"
    assert payload["data"]["visa_fee"]["currency"] == "USD"
    assert payload["data"]["processing_time"] == "Around 5 to 10 business days"


def test_visa_check_rejects_unsupported_nationality() -> None:
    response = client.get("/visa-check", params={"nationality": "Kenya", "destination": "Japan"})

    assert response.status_code == 400
    payload = response.json()

    assert payload["status"] == "error"
    assert "Nigerian passport holders only" in payload["message"]


def test_visa_check_rejects_unknown_destination() -> None:
    response = client.get("/visa-check", params={"nationality": "Nigeria", "destination": "Brazil"})

    assert response.status_code == 404
    payload = response.json()

    assert payload["status"] == "error"
    assert "No mock visa data found" in payload["message"]


def test_budget_estimate_returns_mock_data() -> None:
    response = client.get(
        "/budget-estimate", params={"nationality": "Nigeria", "destination": "Japan"}
    )

    assert response.status_code == 200
    payload = response.json()

    assert payload["status"] == "success"
    assert payload["data"]["destination"] == "Japan"
    assert payload["data"]["budget"]["amount"] == 1900
    assert payload["data"]["mid_range"]["currency"] == "USD"


def test_budget_estimate_rejects_unknown_destination() -> None:
    response = client.get(
        "/budget-estimate", params={"nationality": "Nigeria", "destination": "Brazil"}
    )

    assert response.status_code == 404
    payload = response.json()

    assert payload["status"] == "error"
    assert "No mock budget data found" in payload["message"]


def test_cors_preflight_allows_frontend_origin() -> None:
    response = client.options(
        "/visa-check",
        headers={
            "origin": "http://localhost:3000",
            "access-control-request-method": "GET",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"
