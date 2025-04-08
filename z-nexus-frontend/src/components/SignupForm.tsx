import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    navigate('/');
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #fff',
    fontSize: '16px',
    backgroundColor: 'transparent',
    color: '#fff',
    outline: 'none',
  };

  return (
    <div style={{
      backgroundColor: '#802BB1',
      fontFamily: 'Poppins, sans-serif',
      maxWidth: '400px',
      margin: '100px auto',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      color: '#fff',
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '24px',
        color: 'white',
        fontSize: '24px',
        fontFamily: 'Orbitron, sans-serif',
      }}>
        Create an Account
      </h1>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#eee' }}>
          Username
        </label>
        <input
          type="text"
          placeholder="Choose a username"
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#eee' }}>
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#eee' }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#eee' }}>
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />
      </div>

      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <button
          onClick={() => navigate('/')}
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
          Login
        </button>

        <button
          onClick={handleSignup}
          style={{
            flex: '1',
            padding: '12px',
            backgroundColor: '#D1B3FF',
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
    </div>
  );
}
