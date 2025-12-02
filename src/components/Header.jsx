import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiHeart, FiUser, FiLogOut, FiSearch } from 'react-icons/fi';
import '../styles/Header.css';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>MiniShop</h1>
        </Link>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/flash-sales">Flash Sales</Link>
          <Link to="/new-arrivals">New Arrivals</Link>
        </nav>

        <div className="header-actions">
          <div className="search-icon">
            <FiSearch />
          </div>

          {user ? (
            <>
              <Link to="/wishlist" className="icon-btn">
                <FiHeart />
              </Link>
              <Link to="/cart" className="icon-btn cart-btn">
                <FiShoppingCart />
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </Link>
              <div className="user-menu">
                <button className="icon-btn">
                  <FiUser />
                </button>
                <div className="dropdown">
                  <Link to="/profile">Profile</Link>
                  {isAdmin() && <Link to="/admin">Admin Dashboard</Link>}
                  <button onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
