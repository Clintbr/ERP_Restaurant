import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Mini-ERP</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">Tableau de bord</Link></li>
            <li><Link to="/pos">Caisse / POS</Link></li>
            <li><Link to="/kitchen">Cuisine</Link></li>
            {user.role === 'Administrateur' && (
              <li><Link to="/admin/users">Utilisateurs</Link></li>
            )}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <p>Utilisateur: <strong>{user.username}</strong> ({user.role})</p>
          <button onClick={logout} className="logout-btn">Déconnexion</button>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
