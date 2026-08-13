export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
