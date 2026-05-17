import { useEffect, useState } from 'react';
import { api } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, products: 0, openOrders: 0 });

    useEffect(() => {
        // Fetch mock stats or actual calls
        const loadStats = async () => {
            try {
                const [users, products, orders] = await Promise.all([
                    api.get('/users').catch(() => []),
                    api.get('/products').catch(() => []),
                    api.get('/orders?status=Nouvelle').catch(() => [])
                ]);
                setStats({
                    users: users.length || 0,
                    products: products.length || 0,
                    openOrders: orders.length || 0
                });
            } catch (err) {
                console.error("Dashboard error", err);
            }
        };
        loadStats();
    }, []);

    return (
        <div>
            <h1>Tableau de bord Manager</h1>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                <div style={cardStyle}>
                    <h3>Utilisateurs Actifs</h3>
                    <p style={bigNumberStyle}>{stats.users}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Produits en Base</h3>
                    <p style={bigNumberStyle}>{stats.products}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Commandes en cours</h3>
                    <p style={bigNumberStyle}>{stats.openOrders}</p>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    flex: 1,
    textAlign: 'center'
};

const bigNumberStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '1rem 0 0 0'
};

export default Dashboard;
