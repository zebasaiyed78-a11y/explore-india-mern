import { Link } from 'react-router-dom';

export default function Footer({ onAgent }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">EI</span><span>Explore <em>India</em></span></div>
          <p className="footer-copy">Curated journeys across a country of infinite stories. Find your route, then make it your own.</p>
        </div>
        <div>
          <h4>Discover</h4>
          <Link to="/destinations">Destinations</Link>
          <Link to="/experiences">Experiences</Link>
          <Link to="/itineraries">Itineraries</Link>
        </div>
        <div>
          <h4>Plan</h4>
          <Link to="/plan">Plan a trip</Link>
          <Link to="/favorites">Favourites</Link>
          <Link to="/manage">CRUD demo</Link>
          <button onClick={onAgent}>Talk to an agent</button>
        </div>
        <div className="footer-note">
          <span className="eyebrow">Full Stack Development</span>
          <p>React JSX + Vite · Node.js + Express · MongoDB + Mongoose</p>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Explore India</span><span>Built as a MERN Stack academic project</span></div>
    </footer>
  );
}
