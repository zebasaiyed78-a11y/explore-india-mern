import { Link } from 'react-router-dom';
import { money } from '../utils/helpers';

export default function Itineraries({ itineraries, loading }) {
  return <div className="page-shell"><div className="container page-intro"><span className="eyebrow">READY-MADE ROUTES</span><h1>Short trips, <em>well framed.</em></h1><p>Use a prepared route as-is, or take it as a starting point for the planner.</p></div><main className="container section-pad">{loading ? <div className="loading-panel">Loading itineraries…</div> : <div className="itinerary-grid large">{itineraries.map((it) => <article className="itinerary-card" key={it._id}><span className="days">{it.days} DAYS</span><h3>{it.title}</h3><p>{it.description}</p><div className="tag-row">{it.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="include-list">{it.includes.map((place) => <span key={place}>✓ {place}</span>)}</div><div className="price-line"><strong>{money(it.price)}</strong><Link to="/plan" state={{ itinerary: it.title }}>Use this route →</Link></div></article>)}</div>}</main></div>;
}
