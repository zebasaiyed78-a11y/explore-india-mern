import { useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { api, getErrorMessage } from '../api/apiClient';

const steps = [
  { key: 'days', label: 'How long?', prompt: 'How many days do you have?', options: ['3 days', '4 days', '5 days', '7+ days'] },
  { key: 'style', label: 'Your vibe', prompt: 'What should the trip feel like?', options: ['Slow & scenic', 'Adventure', 'Heritage & culture', 'Food & local life'] },
  { key: 'budget', label: 'Budget', prompt: 'What is your comfortable budget?', options: ['Under ₹15k', '₹15k – ₹30k', '₹30k – ₹50k', '₹50k+'] },
  { key: 'region', label: 'Direction', prompt: 'Which part of India are you curious about?', options: ['North', 'South', 'West', 'East / North-East'] }
];

export default function Plan({ onAgent }) {
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (location.state?.itinerary) setAnswers((current) => ({ ...current, route: location.state.itinerary }));
  }, [location.state]);

  const current = steps[step];
  const progress = `${((step + 1) / steps.length) * 100}%`;
  const complete = useMemo(() => steps.every((item) => answers[item.key]), [answers]);

  const choose = (value) => setAnswers((currentAnswers) => ({ ...currentAnswers, [current.key]: value }));
  const savePlan = async () => {
    setSaving(true); setNotice('');
    try { await api.savePlan(answers); setSaved(true); setNotice('Your preferences were saved to MongoDB.'); }
    catch (error) { setNotice(getErrorMessage(error, 'Could not save the plan.')); }
    finally { setSaving(false); }
  };

  if (saved) return <div className="planner-page"><div className="container success-card"><span className="success-icon">✓</span><span className="eyebrow">PLAN SAVED</span><h1>Your India trip has a <em>starting point.</em></h1><p>{notice}</p><div className="summary-card">{steps.map((item) => <div key={item.key}><span>{item.label}</span><strong>{answers[item.key]}</strong></div>)}{answers.route && <div><span>Route</span><strong>{answers.route}</strong></div>}</div><div className="success-actions"><Link className="gold-btn" to="/destinations">Browse destinations →</Link><button className="outline-btn" onClick={() => { setSaved(false); setStep(0); }}>Make another plan</button><button className="dark-btn" onClick={onAgent}>Talk to an agent</button></div></div></div>;

  return <div className="planner-page"><div className="container planner-wrap"><Link to="/" className="back-link">← Explore India</Link><div className="planner-card"><div className="planner-top"><span className="eyebrow">TRIP PLANNER · STEP {step + 1} OF {steps.length}</span><div className="progress"><span style={{ width: progress }} /></div></div><h1>{current.prompt}</h1><p className="planner-sub">There is no wrong answer. Pick what feels closest.</p><div className="planner-options">{current.options.map((option) => <button key={option} className={answers[current.key] === option ? 'selected' : ''} onClick={() => choose(option)}><span>{option}</span>{answers[current.key] === option && <b>✓</b>}</button>)}</div>{answers.route && <div className="route-callout"><span>ROUTE FROM ITINERARY</span><strong>{answers.route}</strong></div>}<div className="planner-nav"><button className="link-btn" disabled={step === 0} onClick={() => setStep((x) => x - 1)}>← Previous</button>{step < steps.length - 1 ? <button className="dark-btn" disabled={!answers[current.key]} onClick={() => setStep((x) => x + 1)}>Continue →</button> : <button className="gold-btn" disabled={!complete || saving} onClick={savePlan}>{saving ? 'Saving…' : 'Save my trip plan →'}</button>}</div>{notice && <p className="form-notice">{notice}</p>}</div></div></div>;
}
