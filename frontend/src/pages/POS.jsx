import { useState, useEffect } from 'react';
import { api } from '../services/api';

const POS = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        api.get('/products').then(setProducts).catch(console.error);
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const submitOrder = async () => {
        if(cart.length === 0) return;
        try {
            // Dans une vraie app, on sélectionne la table et l'utilisateur
            const orderRes = await api.post('/orders', { table_id: 1, user_id: 1 });
            const items = cart.map(c => ({ product_id: c.id, quantity: c.quantity, unit_price: c.price }));
            await api.post(`/orders/${orderRes.id}/items`, { items });
            alert(`Commande créée #${orderRes.id}`);
            setCart([]);
        } catch (err) {
            console.error("Error creating order", err);
            alert("Erreur création commande");
        }
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', height: '80vh' }}>
            <div style={{ flex: 2 }}>
                <h1>Catalogue - Caisse</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {products.map(p => (
                        <div key={p.id} onClick={() => addToCart(p)} style={productStyle}>
                            <h4>{p.name}</h4>
                            <p>{p.price} €</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div style={{ flex: 1, background: 'white', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                <h2>Ticket</h2>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {cart.map(c => (
                        <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '0.5rem 0' }}>
                            <span>{c.quantity}x {c.name}</span>
                            <span>{(c.price * c.quantity).toFixed(2)} €</span>
                        </div>
                    ))}
                </div>
                <div style={{ padding: '1rem 0', fontWeight: 'bold', fontSize: '1.5rem', borderTop: '2px solid #2c3e50' }}>
                    Total: {total.toFixed(2)} €
                </div>
                <button onClick={submitOrder} style={posBtnStyle} disabled={cart.length === 0}>
                    Payer et Envoyer Cuisine
                </button>
            </div>
        </div>
    );
};

const productStyle = { background: '#3498db', color: 'white', padding: '1.5rem', borderRadius: '8px', cursor: 'pointer', textAlign: 'center' };
const posBtnStyle = { padding: '1rem', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' };

export default POS;
