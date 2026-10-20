import { Link } from "react-router-dom";

function Cart({ cart, updateQuantity, removeItem, onCheckout }) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 30;
  const total = subtotal + delivery;
  if (cart.length === 0) return <main className="page-container"><div className="empty-state cart-empty"><span>🛒</span><h2>Your cart is empty</h2><p>Add some delicious food to get started!</p><Link to="/" className="primary-button">Explore Menu</Link></div></main>;
  return (
    <main className="page-container cart-page"><span className="eyebrow">YOUR ORDER</span><h1 className="page-title">Shopping Cart</h1>
      <div className="cart-layout"><section className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}>
        <div className="cart-item-emoji" style={{ backgroundColor: item.color }}>{item.emoji}</div><div className="cart-item-details"><h3>{item.name}</h3><p>₹{item.price} per item</p><div className="quantity-controls"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button></div></div>
        <div className="cart-item-end"><strong>₹{item.price * item.quantity}</strong><button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button></div>
      </article>)}</section>
      <aside className="summary-card"><h2>Order Summary</h2><div className="summary-line"><span>Subtotal</span><span>₹{subtotal}</span></div><div className="summary-line"><span>Delivery Fee</span><span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>{subtotal > 0 && subtotal < 499 && <p className="delivery-note">Add ₹{499 - subtotal} more for free delivery.</p>}<div className="summary-total"><span>Total Amount</span><strong>₹{total}</strong></div><button className="primary-button full-button" onClick={() => onCheckout(total)}>Place Order →</button><Link to="/" className="continue-shopping">← Continue Shopping</Link></aside></div>
    </main>
  );
}
export default Cart;
