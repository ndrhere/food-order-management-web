import { formatCurrency } from '../utils.js';

export default function MenuCard({ item, onAdd }) {
  return (
    <article className="menu-card">
      <img src={item.image} alt={item.name} loading="lazy" />
      <div className="menu-card-body">
        <div className="category">{item.category}</div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="menu-card-footer">
          <strong>{formatCurrency(item.price)}</strong>
          <button onClick={() => onAdd(item)} aria-label={`Add ${item.name} to cart`}>Add</button>
        </div>
      </div>
    </article>
  );
}
