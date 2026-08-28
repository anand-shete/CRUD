from enum import Enum


class TaskStatus(str, Enum):
    DRAFT = "draft"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class TaskPriority(str, Enum):
    LOW = "low"
    HIGH = "high"
    CRITICAL = "critical"
