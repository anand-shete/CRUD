.PHONY: dev prod install

dev:
	@export $$(cat .env | xargs) && echo "FastAPI server running at http://localhost:$$PORT" && uv run --active  uvicorn main:app --host localhost --port $$PORT --reload

prod:
	@export $$(cat .env | xargs) && echo "Starting production server..." && uv run uvicorn main:app --host 127.0.0.1 --port $$PORT

install:
	uv sync