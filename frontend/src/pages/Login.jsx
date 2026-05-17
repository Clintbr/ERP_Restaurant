import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import './Login.css';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion ERP</h2>
        {error && <div className="error-msg">{error}</div>}
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input 
            type="text" 
            value={username} onChange={e => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input 
            type="password" 
            value={password} onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="login-btn">Se connecter</button>
        <div style={{marginTop: '1rem', textAlign: 'center'}}>
            <Link to="/forgot-password" style={{color: '#3498db', textDecoration: 'none'}}>Mot de passe oublié ?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
