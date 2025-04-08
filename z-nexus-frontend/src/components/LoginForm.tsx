import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function enterFullscreen(element: HTMLElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullscreen) {
    (element as any).mozRequestFullscreen();
  } else if ((element as any).webkitRequestFullscreen) {
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).msRequestFullscreen) {
    (element as any).msRequestFullscreen();
  }
}

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/auth/login', {
        grant_type: 'password',
        username,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.access_token);
        navigate('/editor');
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'rgba(128, 43, 177, 0.15)', 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#802BB1',
        maxWidth: '400px',
        width: '90%',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        color: '#fff',
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '24px',
          color: 'white',
          fontSize: '24px',
          fontFamily: 'Orbitron, sans-serif',
        }}>
          Nexus Blind Coding
        </h1>
        <a style={{
          textAlign: 'center',
          marginBottom: '24px',
          color: 'white',
          fontSize: '14px',
          fontFamily: 'Orbitron, sans-serif',
          cursor: 'pointer',
          textDecoration: 'none'

        }}>
          #Business_meets_Intelligence
        </a>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#aaa' }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#aaa' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
          <button
            onClick={handleLogin}
            disabled={!username || !password || loading}
            style={{
              flex: '1',
              padding: '12px',
              backgroundColor: '#ffffff',
              color: '#802BB1',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: !username || !password || loading ? 'not-allowed' : 'pointer',
              opacity: !username || !password || loading ? 0.6 : 1,
              transition: 'background-color 0.3s'
            }}
          
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button
            onClick={() => navigate('/signup')}
            style={{
              flex: '1',
              padding: '12px',
              backgroundColor: '#ffffff',
              color: '#802BB1',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Signup
          </button>
        </div>

        <button
          onClick={() => enterFullscreen(document.documentElement)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#FF5722',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
}
