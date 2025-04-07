import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/leaderboard");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLeaderboardData(data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Real-Time Leaderboard</h1>
      <ul>
        {leaderboardData.map(([user_id, score], index) => (
          <li key={index}>
            {user_id}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
}
