# Step 1: Use Python base image for FastAPI backend
FROM python:3.9-slim
WORKDIR /app

# Step 2: Install dependencies from requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Step 3: Copy application code into container
COPY . .

# Step 4: Expose port for FastAPI server and run Uvicorn server
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
