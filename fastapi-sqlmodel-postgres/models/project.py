from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from uuid import UUID

from sqlmodel import Field, Relationship, SQLModel, func

if TYPE_CHECKING:
    from .task import Task
    from .user import User


class Project(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    title: str
    description: str | None

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

    user_id: UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    user: User = Relationship(back_populates="projects")

    tasks: list[Task] = Relationship(back_populates="project")
