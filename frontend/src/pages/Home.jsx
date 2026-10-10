import { Link } from 'react-router-dom';

export default function Home({ items, itineraries, onFavorite, favorites, onAgent }) {
  const featured = items.slice(0, 6);
  return (
    <div>
      <section className="hero">
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="eyebrow hero-eyebrow">THE INDIA EDIT · 2026</span>
          <h1>Go beyond the <em>postcard.</em></h1>
          <p>Discover India through places, flavours and experiences chosen for curious travellers—not crowded checklists.</p>
          <div className="hero-actions"><Link className="gold-btn" to="/destinations">Explore destinations <span>→</span></Link><Link className="ghost-btn" to="/plan">Build my trip</Link></div>
          <div className="hero-stats"><span><strong>12</strong> curated regions</span><span><strong>04</strong> ready itineraries</span><span><strong>01</strong> simple trip planner</span></div>
        </div>
      </section>

      <section className="container section-pad intro-grid">
        <div><span className="eyebrow">WHY EXPLORE INDIA?</span><h2>India is not one trip. It is a <em>collection of moods.</em></h2></div>
        <div className="intro-copy"><p>Choose a direction, a feeling, or simply a place you have always wanted to see. Explore India turns that curiosity into a practical starting point.</p><Link className="text-link" to="/experiences">See experiences →</Link></div>
      </section>

      <section className="section-tint section-pad">
        <div className="container"><div className="section-title-row"><div><span className="eyebrow">START HERE</span><h2>Places worth taking the <em>long way.</em></h2></div><Link className="text-link" to="/destinations">View all destinations →</Link></div>
          <div className="destination-grid">{featured.map((item) => <article className="destination-card" key={item._id}><Link to={`/destinations/${item.slug}`} className="card-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,.72)), url(${item.image})` }}><span className="image-tag">{item.category}</span><span className="rating">★ {item.rating}</span></Link><div className="card-body"><div><span className="state-label">{item.state}</span><h3>{item.name}</h3></div><button className={`heart-btn ${favorites.has(item.slug) ? 'saved' : ''}`} aria-label="Toggle favourite" onClick={() => onFavorite(item.slug)}>{favorites.has(item.slug) ? '♥' : '♡'}</button><p>{item.blurb}</p><Link className="card-link" to={`/destinations/${item.slug}`}>Explore place <span>↗</span></Link></div></article>)}</div>
        </div>
      </section>

      <section className="container section-pad">
        <div className="dark-feature"><div><span className="eyebrow light">PLAN WITHOUT THE SPREADSHEET</span><h2>A little intention makes a better <em>journey.</em></h2><p>Tell us how many days you have, what you enjoy and roughly what you want to spend. We’ll save your preferences in MongoDB so your trip starts with a real record.</p><Link className="gold-btn" to="/plan">Open trip planner <span>→</span></Link></div><div className="feature-card"><span className="mini-label">TRIP PLANNER</span><strong>3–7 days</strong><span>Choose a pace</span><strong>Any budget</strong><span>Flexible planning</span><strong>Your interests</strong><span>Personalised choices</span></div></div>
      </section>

      <section className="section-tint section-pad">
        <div className="container"><div className="section-title-row"><div><span className="eyebrow">READY-TO-GO</span><h2>Short trips, <em>well framed.</em></h2></div><Link className="text-link" to="/itineraries">See itineraries →</Link></div><div className="itinerary-grid">{itineraries.map((it) => <article className="itinerary-card" key={it._id}><span className="days">{it.days} DAYS</span><h3>{it.title}</h3><p>{it.description}</p><div className="tag-row">{it.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="price-line"><strong>from ₹{Number(it.price).toLocaleString('en-IN')}</strong><Link to="/plan" state={{ itinerary: it.title }}>Use this route →</Link></div></article>)}</div></div>
      </section>

      <section className="container section-pad"><div className="agent-banner"><div><span className="eyebrow">HUMAN HELP, TOO</span><h2>Not sure where to start?</h2><p>Send a quick enquiry and a tourism agent can help you shape the route.</p></div><button className="dark-btn" onClick={onAgent}>Talk to a tourism agent →</button></div></section>
    </div>
  );
}
