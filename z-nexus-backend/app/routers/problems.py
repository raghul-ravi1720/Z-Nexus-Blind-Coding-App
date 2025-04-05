from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.problem import Problem
from app.database import SessionLocal
from pydantic import BaseModel

# Pydantic model for request/response validation
class ProblemCreate(BaseModel):
    title: str
    description: str
    difficulty: str
    sample_input: str | None = None
    sample_output: str | None = None

router = APIRouter(prefix="/problems", tags=["problems"])

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_problem(problem: ProblemCreate, db: Session = Depends(get_db)):
    new_problem = Problem(**problem.dict())
    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)
    return new_problem

@router.get("/{problem_id}")
def get_problem(problem_id: int, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problem with ID {problem_id} not found"
        )
    return problem

@router.get("/")
def get_all_problems(db: Session = Depends(get_db)):
    return db.query(Problem).all()

@router.put("/{problem_id}")
def update_problem(problem_id: int, updated_problem: ProblemCreate, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problem with ID {problem_id} not found"
        )
    
    # Update fields
    problem.title = updated_problem.title
    problem.description = updated_problem.description
    problem.difficulty = updated_problem.difficulty
    problem.sample_input = updated_problem.sample_input
    problem.sample_output = updated_problem.sample_output
    
    db.commit()
    return problem

@router.delete("/{problem_id}")
def delete_problem(problem_id: int, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problem with ID {problem_id} not found"
        )
    
    db.delete(problem)
    db.commit()
    return {"message": "Problem deleted successfully"}
