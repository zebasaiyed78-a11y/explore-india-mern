import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { api, getErrorMessage } from './api/apiClient';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Experiences from './pages/Experiences';
import Itineraries from './pages/Itineraries';
import Plan from './pages/Plan';
import Auth from './pages/Auth';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Manage from './pages/Manage';

const tokenKey = 'explore_india_token';
const favoritesKey = 'explore_india_guest_favorites';

function AgentModal({ open, onClose, onToast }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (!open) setForm({ name: '', phone: '', email: '', message: '' }); }, [open]);
  if (!open) return null;
  const submit = async (event) => {
    event.preventDefault(); setBusy(true);
    try { await api.sendInquiry(form); onToast('Enquiry sent — our tourism agent will reach out soon.', 'success'); onClose(); }
    catch (error) { onToast(getErrorMessage(error, 'Could not send the enquiry.'), 'error'); }
    finally { setBusy(false); }
  };
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><form className="agent-modal" onSubmit={submit}><div className="modal-top"><div><span className="eyebrow">TOURISM AGENT</span><h2>Let’s shape the route.</h2></div><button type="button" className="close-btn" onClick={onClose}>×</button></div><p>Tell us what you are considering. This enquiry is stored in MongoDB through the Express API.</p><div className="modal-grid"><label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label></div><label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><label>Message<textarea required rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Where would you like to go? What should the trip feel like?" /></label><button className="gold-btn full" disabled={busy}>{busy ? 'Sending…' : 'Send enquiry →'}</button></form></div>;
}

export default function App() {
  const [items, setItems] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingItineraries, setLoadingItineraries] = useState(true);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set(JSON.parse(localStorage.getItem(favoritesKey) || '[]')));
  const [toast, setToast] = useState(null);
  const [agentOpen, setAgentOpen] = useState(false);

  const notify = (message, type = 'info') => { setToast({ message, type }); window.clearTimeout(window.__toastTimer); window.__toastTimer = window.setTimeout(() => setToast(null), 3200); };

  const loadData = async () => {
    setLoadingItems(true); setLoadingItineraries(true);
    try { const [itemsResponse, itResponse] = await Promise.all([api.getItems(), api.getItineraries()]); setItems(itemsResponse.data); setItineraries(itResponse.data); }
    catch (error) { notify(getErrorMessage(error, 'Could not load travel data. Start the backend and MongoDB.'), 'error'); }
    finally { setLoadingItems(false); setLoadingItineraries(false); }
  };

  useEffect(() => {
    loadData();
    const token = localStorage.getItem(tokenKey);
    if (token) api.me().then((response) => { setUser(response.data); setFavorites(new Set(response.data.favorites || [])); }).catch(() => localStorage.removeItem(tokenKey));
  }, []);

  const login = (nextUser) => { setUser(nextUser); setFavorites(new Set(nextUser.favorites || [])); notify('Welcome to Explore India.', 'success'); };
  const logout = () => { localStorage.removeItem(tokenKey); setUser(null); setFavorites(new Set(JSON.parse(localStorage.getItem(favoritesKey) || '[]'))); notify('You have been logged out.'); };

  const toggleFavorite = async (slug) => {
    if (!user) {
      setFavorites((current) => { const next = new Set(current); next.has(slug) ? next.delete(slug) : next.add(slug); localStorage.setItem(favoritesKey, JSON.stringify([...next])); return next; });
      notify('Saved on this device. Sign in to keep favourites across sessions.');
      return;
    }
    try {
      const response = await api.toggleFavorite(slug); setFavorites(new Set(response.data.favorites)); setUser({ ...user, favorites: response.data.favorites }); notify(response.data.favorites.includes(slug) ? 'Added to favourites.' : 'Removed from favourites.', 'success');
    } catch (error) { notify(getErrorMessage(error, 'Could not update favourites.'), 'error'); }
  };

  return <BrowserRouter><div className="app-root"><Navbar user={user} onLogout={logout} onAgent={() => setAgentOpen(true)} /><Routes><Route path="/" element={<Home items={items} itineraries={itineraries} onFavorite={toggleFavorite} favorites={favorites} onAgent={() => setAgentOpen(true)} />} /><Route path="/destinations" element={<Destinations items={items} loading={loadingItems} onFavorite={toggleFavorite} favorites={favorites} />} /><Route path="/destinations/:slug" element={<DestinationDetail items={items} favorites={favorites} onFavorite={toggleFavorite} onAgent={() => setAgentOpen(true)} />} /><Route path="/experiences" element={<Experiences />} /><Route path="/itineraries" element={<Itineraries itineraries={itineraries} loading={loadingItineraries} />} /><Route path="/plan" element={<Plan onAgent={() => setAgentOpen(true)} />} /><Route path="/login" element={<Auth onLogin={login} initialMode="login" />} /><Route path="/register" element={<Auth onLogin={login} initialMode="register" />} /><Route path="/favorites" element={user ? <Favorites items={items} favorites={favorites} onFavorite={toggleFavorite} /> : <Navigate to="/login" replace />} /><Route path="/profile" element={user ? <Profile user={user} onAgent={() => setAgentOpen(true)} /> : <Navigate to="/login" replace />} /><Route path="/manage" element={<Manage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes><Footer onAgent={() => setAgentOpen(true)} /><AgentModal open={agentOpen} onClose={() => setAgentOpen(false)} onToast={notify} /><Toast toast={toast} /></div></BrowserRouter>;
}
