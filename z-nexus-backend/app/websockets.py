from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List
from app.leaderboard import addd_score, get_top_users

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

app = FastAPI()

@app.websocket("/ws/leaderboard")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            user_id, score = data.split(",")  # Example format: "user123,50"
            add_score(user_id, int(score))
            top_users = get_top_users()
            await manager.broadcast(f"Leaderboard Update: {top_users}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
