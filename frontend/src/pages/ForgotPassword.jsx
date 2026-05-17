import { useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import './Login.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await api.post('/auth/forgot-password', { username });
      setMessage(`Success! Copy this token to reset your password (for demo purposes): ${res.token}`);
    } catch (err) {
      setError(err.message || 'Error processing request');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Mot de passe oublié</h2>
        {error && <div className="error-msg">{error}</div>}
        {message && <div style={{backgroundColor:'#d4edda', color:'#155724', padding:'10px', marginBottom:'15px', borderRadius:'4px'}}>{message}</div>}
        
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input 
            type="text" 
            value={username} onChange={e => setUsername(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="login-btn">Réinitialiser le mot de passe</button>
        <div style={{marginTop: '1rem', textAlign: 'center'}}>
            <Link to="/login" style={{color: '#3498db'}}>Retour à la connexion</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
