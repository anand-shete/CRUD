from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from config import get_session
from models import User
from schema import CreateUser
from utils.AppError import NotFoundError

router = APIRouter()


@router.get("/{user_id}", status_code=status.HTTP_200_OK)
def get_user_by_id(session: Session = Depends(get_session), user_id:int):
    user = session.get(User, user_id)
    if user is None:
        raise NotFoundError("User not found")

    return {"user": user_id}


@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_user(data: CreateUser, session: Session = Depends(get_session)):
    user = User(username=data.username, email=data.email, password=data.password)
    session.add(user)

    session.commit()

    session.refresh(user)

    return {"message": "user created successfully", "user_id": user.id}
