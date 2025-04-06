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
    // Basic validation
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // For demo purposes, just navigate to the login page
    navigate('/');
    
    // In a real app, you would send data to your backend API here
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
      }}>Create an Account</h1>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
          Username
        </label>
        <input 
          type="text" 
          placeholder="Choose a username" 
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
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
          Email
        </label>
        <input 
          type="email" 
          placeholder="Enter your email" 
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
          Password
        </label>
        <input 
          type="password" 
          placeholder="Create a password" 
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
      
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
          Confirm Password
        </label>
        <input 
          type="password" 
          placeholder="Confirm your password" 
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={() => navigate('/')}
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
          onClick={handleSignup}
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
      </div>
    </div>
  );
}