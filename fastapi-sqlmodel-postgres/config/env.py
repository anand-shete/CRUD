from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PORT: int = 3000
    DATABASE_URL: str = ""

    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, env_prefix="", extra="ignore"
    )


settings = Settings()


@lru_cache
def get_settings() -> Settings:
    return settings
