class AppError(Exception):
    def __init__(self, message: str, status_code: int = 400, code: str = "app_error"):
        self.message = message
        self.status_code = status_code
        self.code = code


# row does not exists in database
class NotFoundError(AppError):
    def __init__(self, message="Not found"):
        super().__init__(message, 404, "not_found")


# duplicates, unique violation
class ConflictError(AppError):
    def __init__(self, message="Conflict"):
        super().__init__(message, 409, "conflict")
