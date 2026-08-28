import uuid
from datetime import datetime, timezone
from uuid import UUID

from sqlmodel import Field, Relationship, SQLModel, func

from .project import Project


class User(SQLModel, table=True):
    __tablename__: str = "user"

    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)

    username: str = Field(nullable=False, unique=True)

    email: str = Field(nullable=False)

    password: str = Field(nullable=False)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={"server_default": func.now(), "nullable": False},
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={
            "server_default": func.now(),
            "onupdate": func.now(),
            "nullable": False,
        },
    )

    projects: list["Project"] = Relationship(back_populates="user")
