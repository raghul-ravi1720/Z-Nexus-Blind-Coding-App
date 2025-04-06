import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function enterFullscreen(element: HTMLElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullscreen) { // Firefox
    (element as any).mozRequestFullscreen();
  } else if ((element as any).webkitRequestFullscreen) { // Chrome, Safari, Edge
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).msRequestFullscreen) { // IE
    (element as any).msRequestFullscreen();
  }
}

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // For now, skip DB authentication and redirect directly to editor
      console.log('Logging in with username:', username); // Temporary log for debugging
      console.log('Logging in with password:', password); // Temporary log for debugging
      navigate('/editor');
      
      // Uncomment below for actual authentication when backend is ready
      
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
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '100px auto',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '24px',
        color: '#333',
        fontSize: '24px'
      }}>Login to Blind Coding</h1>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
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
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
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
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <button 
          onClick={handleLogin}
          style={{
            flex: '1',
            padding: '12px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Login
        </button>
        
        <button 
          onClick={() => navigate('/signup')}
          style={{
            flex: '1',
            padding: '12px',
            backgroundColor: '#34A853',
            color: 'white',
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
        <button
          onClick={() => enterFullscreen(document.documentElement)}
          style={{
            flex: '1',
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