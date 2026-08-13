import { useState } from 'react';
import { formatCurrency } from '../utils.js';

export default function CheckoutModal({ total, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  function change(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <form className="modal" onSubmit={submit}>
        <button type="button" className="close" onClick={onClose} aria-label="Close">×</button>
        <p className="eyebrow">CHECKOUT</p>
        <h2 id="checkout-title">Where should we deliver?</h2>

        <label>
          Name
          <input name="name" value={form.name} onChange={change} minLength="2" required />
        </label>

        <label>
          Address
          <textarea name="address" value={form.address} onChange={change} minLength="5" required />
        </label>

        <label>
          Phone
          <input name="phone" value={form.phone} onChange={change} pattern="[0-9+()\-\s]{8,20}" required />
        </label>

        <div className="checkout-total">
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>

        <button className="primary full" disabled={submitting}>
          {submitting ? 'Placing order…' : 'Place order'}
        </button>
      </form>
    </div>
  );
}
