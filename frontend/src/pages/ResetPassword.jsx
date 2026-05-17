import { useState } from 'react';
import { api } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import './Login.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Error processing request');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Nouveau mot de passe</h2>
        {error && <div className="error-msg">{error}</div>}
        {message && <div style={{backgroundColor:'#d4edda', color:'#155724', padding:'10px', marginBottom:'15px', borderRadius:'4px'}}>{message}</div>}
        
        <div className="form-group">
          <label>Nouveau mot de passe</label>
          <input 
            type="password" 
            value={newPassword} onChange={e => setNewPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="login-btn">Enregistrer</button>
      </form>
    </div>
  );
};

export default ResetPassword;
