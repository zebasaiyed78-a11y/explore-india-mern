import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout, onAgent }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = [
    ['Destinations', '/destinations'],
    ['Experiences', '/experiences'],
    ['Itineraries', '/itineraries'],
    ['Plan a Trip', '/plan']
  ];

  const goAgent = () => { setOpen(false); onAgent(); };

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="Explore India home">
          <span className="brand-mark">EI</span>
          <span>Explore <em>India</em></span>
        </Link>
        <button className={`mobile-menu ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Open menu"><span /><span /></button>
        <nav className={`desktop-nav ${open ? 'mobile-open' : ''}`} aria-label="Primary navigation">
          {links.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
          <button className="outline-btn mobile-agent" onClick={goAgent}>Talk to an agent</button>
          {user && <Link className="nav-link mobile-only" to="/favorites" onClick={() => setOpen(false)}>Favourites</Link>}
          {user && <Link className="nav-link mobile-only" to="/profile" onClick={() => setOpen(false)}>Profile</Link>}
        </nav>
        <div className="nav-actions">
          <button className="outline-btn small desktop-agent" onClick={onAgent}>Talk to an agent</button>
          {user ? <><Link className="avatar-link" to="/profile">{user.name?.slice(0, 1).toUpperCase() || 'U'}</Link><Link className="favorites-link" to="/favorites">♡</Link><button className="link-btn" onClick={() => { onLogout(); navigate('/'); }}>Log out</button></> : <Link className="dark-btn small" to="/login">Sign in</Link>}
        </div>
      </div>
    </header>
  );
}
