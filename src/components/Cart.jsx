import { formatCurrency } from '../utils.js';

export default function Cart({ cart, total, onUpdate, onCheckout }) {
  return (
    <aside className="cart-panel">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR CART</p>
          <h2>{cart.length} {cart.length === 1 ? 'item' : 'items'}</h2>
        </div>
        <strong>{formatCurrency(total)}</strong>
      </div>

      <div className="cart-items">
        {cart.map(item => (
          <div className="cart-row" key={item._id}>
            <div>
              <strong>{item.name}</strong>
              <small>{formatCurrency(item.price)} each</small>
            </div>
            <div className="qty">
              <button onClick={() => onUpdate(item._id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onUpdate(item._id, item.quantity + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <button className="primary full" onClick={onCheckout}>Proceed to checkout</button>
    </aside>
  );
}
