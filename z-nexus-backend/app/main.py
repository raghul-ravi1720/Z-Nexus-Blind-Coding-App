from fastapi import FastAPI
from app.routers import auth, problems

app = FastAPI()

app.include_router(auth.auth_router)
app.include_router(problems.router)

@app.get("/")
async def root():
    return {"status": "API Server Running"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
