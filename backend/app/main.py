from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes.health import router as health_router
from app.api.routes.budget_estimate import router as budget_estimate_router
from app.api.routes.visa_check import router as visa_check_router
from app.api.responses import error_response
from app.core.config import settings


def create_application() -> FastAPI:
    app = FastAPI(
        title="Nomardy API",
        description="REST API scaffold for the Nomardy platform.",
        version="0.1.0",
    )
    allowed_origins = [origin.strip() for origin in settings.frontend_origin.split(",") if origin.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.state.settings = settings
    app.include_router(health_router)
    app.include_router(visa_check_router)
    app.include_router(budget_estimate_router)

    @app.exception_handler(404)
    async def not_found_handler(_, exc):  # type: ignore[no-untyped-def]
        detail = exc.detail if isinstance(exc.detail, dict) else error_response("Resource not found.")
        return JSONResponse(status_code=404, content=detail)

    @app.exception_handler(400)
    async def bad_request_handler(_, exc):  # type: ignore[no-untyped-def]
        detail = exc.detail if isinstance(exc.detail, dict) else error_response("Bad request.")
        return JSONResponse(status_code=400, content=detail)

    return app


app = create_application()
