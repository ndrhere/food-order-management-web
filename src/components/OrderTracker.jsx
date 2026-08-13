const steps = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];

export default function OrderTracker({ order, onNewOrder }) {
  const activeIndex = steps.indexOf(order.status);

  return (
    <section className="tracker-card">
      <div className="tracker-head">
        <div>
          <p className="eyebrow">ORDER #{order._id.slice(-6).toUpperCase()}</p>
          <h2>{order.status}</h2>
          <p>We'll update this screen automatically as your order moves.</p>
        </div>
        <div className="live-badge"><span /> LIVE</div>
      </div>

      <div className="progress">
        {steps.map((step, index) => (
          <div className={`step ${index <= activeIndex ? 'active' : ''}`} key={step}>
            <div className="step-dot">{index < activeIndex ? '✓' : index + 1}</div>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <div>
          <strong>Delivery to</strong>
          <p>{order.customer.name}<br />{order.customer.address}<br />{order.customer.phone}</p>
        </div>
        <div>
          <strong>Order total</strong>
          <p className="summary-total">₹{order.total}</p>
        </div>
      </div>

      <button className="secondary" onClick={onNewOrder}>Back to menu</button>
    </section>
  );
}
