import { Link } from "react-router-dom";

function Orders({ orders }) {
  return (
    <main className="page-container orders-page"><span className="eyebrow">ORDER HISTORY</span><h1 className="page-title">My Orders</h1><p className="page-subtitle">Keep track of your delicious moments.</p>
      {orders.length === 0 ? <div className="empty-state"><span>📦</span><h2>No orders yet</h2><p>Your placed orders will appear here.</p><Link to="/" className="primary-button">Order Food</Link></div> : <div className="orders-list">{[...orders].reverse().map((order) => <article className="order-card" key={order.id}><div className="order-header"><div><span className="order-number">ORDER #{order.id}</span><h3>FoodieHub Order</h3></div><span className="order-status">✓ Confirmed</span></div><p className="order-date">{order.date}</p><div className="order-foods">{order.items.map((item) => <span key={item.id}>{item.emoji} {item.name} × {item.quantity}</span>)}</div><div className="order-footer"><span>Total (demo)</span><strong>₹{order.total}</strong></div></article>)}</div>}
    </main>
  );
}
export default Orders;
