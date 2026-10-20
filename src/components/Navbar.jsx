
import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">🍴</span>
        <span className="brand-name">
          Foodie<span>Hub</span>
        </span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/orders">
          My Orders
        </NavLink>

        <NavLink to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
          <span>Cart</span>
          <span className="cart-badge">{cartCount}</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
