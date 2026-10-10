import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, getErrorMessage } from '../api/apiClient';

export default function Auth({ onLogin, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const response = mode === 'register' ? await api.register(form) : await api.login({ email: form.email, password: form.password });
      localStorage.setItem('explore_india_token', response.data.token); onLogin(response.data.user); navigate('/');
    } catch (error) { setError(getErrorMessage(error, 'Please check your details.')); }
    finally { setBusy(false); }
  };

  return <div className="auth-page"><div className="auth-art"><Link to="/" className="brand light-brand"><span className="brand-mark">EI</span><span>Explore <em>India</em></span></Link><div><span className="eyebrow light">TRAVEL WITH INTENTION</span><h1>Keep the good <em>routes.</em></h1><p>Save favourites and trip plans to your MongoDB-backed profile.</p></div><div className="art-stamp">REACT · EXPRESS · MONGODB</div></div><div className="auth-form-side"><div className="auth-form"><Link to="/" className="back-link">← Back home</Link><span className="eyebrow">YOUR TRAVEL DESK</span><h2>{mode === 'login' ? 'Welcome back.' : 'Create your travel desk.'}</h2><p>{mode === 'login' ? 'Sign in to keep your favourites and saved plans.' : 'A simple account to save your Explore India journey.'}</p><form onSubmit={submit}>{mode === 'register' && <label>Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>}<label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><label>Password<input type="password" minLength="6" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" /></label>{error && <p className="error-text">{error}</p>}<button className="dark-btn full" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in →' : 'Create account →'}</button></form><p className="auth-switch">{mode === 'login' ? 'New to Explore India?' : 'Already have an account?'} <button className="link-btn" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>{mode === 'login' ? 'Create an account' : 'Sign in'}</button></p></div></div></div>;
}
