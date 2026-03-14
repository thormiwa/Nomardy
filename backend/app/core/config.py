from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Nomardy API"
    environment: str = "development"
    frontend_origin: str = "http://localhost:3000,http://localhost:3001"
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    supabase_jwt_secret: str = ""
    supabase_db_password: str = ""
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    amadeus_client_id: str = ""
    amadeus_client_secret: str = ""
    sherpa_api_key: str = ""
    exchangerate_api_key: str = ""
    sentry_dsn: str = ""

    model_config = SettingsConfigDict(
        env_file=("../.env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
