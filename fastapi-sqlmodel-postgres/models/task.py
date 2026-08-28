from __future__ import annotations
from uuid import UUID
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel, func, text
from utils import TaskPriority, TaskStatus

if TYPE_CHECKING:
    from .project import Project


class Task(SQLModel, table=True):
    id: UUID = Field(
        primary_key=True,
        nullable=False,
        sa_column_kwargs={"server_default": text("gen_random_uuid()")},
    )
    title: str = Field(nullable=False)
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
    status: TaskStatus = Field(
        default=TaskStatus.DRAFT, sa_column_kwargs={"nullable": False}
    )
    priority: TaskPriority = Field(
        default=TaskPriority.LOW, sa_column_kwargs={"nullable": False}
    )
    project_id: UUID = Field(
        foreign_key="project.id", nullable=False, ondelete="CASCADE"
    )
    project: Project = Relationship(back_populates="tasks")
