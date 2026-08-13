import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { createOrder, fetchMenu, SOCKET_URL } from './api.js';
import { cartTotal } from './utils.js';
import MenuCard from './components/MenuCard.jsx';
import Cart from './components/Cart.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import OrderTracker from './components/OrderTracker.jsx';

export default function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenu()
      .then(setMenu)
      .catch(() => setError('Loading the menu for you.Please give us a moment.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!order?._id) return;

    const socket = io(SOCKET_URL);
    socket.emit('order:join', order._id);
    socket.on('order:updated', updatedOrder => setOrder(updatedOrder));

    return () => {
      socket.emit('order:leave', order._id);
      socket.disconnect();
    };
  }, [order?._id]);

  const total = useMemo(() => cartTotal(cart), [cart]);

  function addToCart(item) {
    setCart(current => {
      const existing = current.find(entry => entry._id === item._id);
      if (existing) {
        return current.map(entry =>
          entry._id === item._id
            ? { ...entry, quantity: Math.min(entry.quantity + 1, 20) }
            : entry
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      setCart(current => current.filter(item => item._id !== id));
      return;
    }
    setCart(current =>
      current.map(item => item._id === id ? { ...item, quantity: Math.min(quantity, 20) } : item)
    );
  }

  async function submitOrder(customer) {
    setError('');
    try {
      const created = await createOrder({
        customer,
        items: cart.map(item => ({ menuItemId: item._id, quantity: item.quantity })),
      });
      setOrder(created);
      setCart([]);
      setCheckoutOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place the order.');
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">QUICKBITE</p>
          <h1>Good food. <span>Right on time.</span></h1>
        </div>
        <div className="cart-pill">
          <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          <strong>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total)}</strong>
        </div>
      </header>

      {error && <div className="alert">{error}</div>}

      <main>
        {order ? (
          <OrderTracker order={order} onNewOrder={() => setOrder(null)} />
        ) : (
          <>
            <section className="hero">
              <div>
                <p className="eyebrow">TODAY'S MENU</p>
                <h2>Pick your favourites.</h2>
                <p>Freshly prepared meals, delivered without the fuss.</p>
              </div>
            </section>

            {loading ? (
              <div className="loading">Loading menu…</div>
            ) : (
              <section className="menu-grid">
                {menu.map(item => (
                  <MenuCard key={item._id} item={item} onAdd={addToCart} />
                ))}
              </section>
            )}
          </>
        )}
      </main>

      {!order && cart.length > 0 && (
        <Cart cart={cart} total={total} onUpdate={updateQuantity} onCheckout={() => setCheckoutOpen(true)} />
      )}

      {checkoutOpen && (
        <CheckoutModal
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onSubmit={submitOrder}
        />
      )}
    </div>
  );
}
