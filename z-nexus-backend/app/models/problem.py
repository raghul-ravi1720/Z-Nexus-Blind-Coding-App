from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String(20), nullable=False)  # Easy/Medium/Hard
    sample_input = Column(Text)
    sample_output = Column(Text)
