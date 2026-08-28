from sqlmodel import Session, create_engine

from config.env import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=True,  # enable logs
    pool_size=5,  # number of connections to keep open
    max_overflow=10,  # the number of connections to allow in
)


def get_session():
    with Session(engine) as session:
        yield session
