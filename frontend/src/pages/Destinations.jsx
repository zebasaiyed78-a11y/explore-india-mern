import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

export default function Destinations({ items, loading, onFavorite, favorites }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('featured');
  const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const filtered = useMemo(() => {
    const source = items.filter((item) => category === 'All' || item.category === category).filter((item) => !query || `${item.name} ${item.state} ${item.blurb}`.toLowerCase().includes(query.toLowerCase()));
    return [...source].sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : sort === 'rating' ? b.rating - a.rating : 0);
  }, [items, category, query, sort]);

  useEffect(() => { if (query) setSearchParams({ q: query }, { replace: true }); }, [query]);

  return <div className="page-shell"><div className="container page-intro"><span className="eyebrow">THE ATLAS</span><h1>Choose your <em>direction.</em></h1><p>Search 12 curated Indian destinations by place, region or travel mood.</p></div><div className="section-tint filter-area"><div className="container"><div className="filters"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Goa, Rajasthan, mountains…" /><select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="name">A–Z</option></select><button className="outline-btn" onClick={() => { setQuery(''); setCategory('All'); setSort('featured'); }}>Reset</button></div><div className="result-line"><span>{filtered.length} destinations found</span><span>Live data from MongoDB via Express API</span></div></div></div><main className="container section-pad">{loading ? <div className="loading-panel">Loading destinations from MongoDB…</div> : filtered.length ? <div className="destination-grid">{filtered.map((item) => <article className="destination-card" key={item._id}><Link to={`/destinations/${item.slug}`} className="card-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,.72)), url(${item.image})` }}><span className="image-tag">{item.category}</span><span className="rating">★ {item.rating}</span></Link><div className="card-body"><div><span className="state-label">{item.state}</span><h3>{item.name}</h3></div><button className={`heart-btn ${favorites.has(item.slug) ? 'saved' : ''}`} onClick={() => onFavorite(item.slug)}>{favorites.has(item.slug) ? '♥' : '♡'}</button><p>{item.blurb}</p><div className="meta-row"><span>{item.duration}</span><span>{item.budget}</span></div><Link className="card-link" to={`/destinations/${item.slug}`}>View destination <span>↗</span></Link></div></article>)}</div> : <div className="empty-state"><span className="empty-icon">⌕</span><h2>No places found.</h2><p>Try a wider search or reset the filters.</p></div>}</main></div>;
}
