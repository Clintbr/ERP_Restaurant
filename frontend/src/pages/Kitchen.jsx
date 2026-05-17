import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Kitchen = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const data = await api.get('/orders?status=Nouvelle');
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders", err);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000); // Polling simple
        return () => clearInterval(interval);
    }, []);

    const markAsReady = async (id) => {
        try {
            await api.put(`/orders/${id}/status`, { status: 'Prête' });
            fetchOrders();
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Écran Cuisine (KDS)</h1>
            <div style={gridStyle}>
                {orders.map(o => (
                    <div key={o.id} style={ticketStyle}>
                        <h3>Commande #{o.id}</h3>
                        <p>Table: {o.table_id}</p>
                        <p>Statut: {o.status}</p>
                        <hr />
                        <button onClick={() => markAsReady(o.id)} style={btnStyle}>Marquer Prête</button>
                    </div>
                ))}
                {orders.length === 0 && <p>Aucune commande en attente.</p>}
            </div>
        </div>
    );
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem'
};

const ticketStyle = {
    background: '#fff9c4',
    padding: '1.5rem',
    borderLeft: '5px solid #f39c12',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const btnStyle = {
    background: '#2ecc71',
    color: 'white',
    padding: '0.6rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
    marginTop: '1rem'
};

export default Kitchen;
