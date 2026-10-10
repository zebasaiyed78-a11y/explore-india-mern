import { useEffect, useState } from 'react';
import { api, getErrorMessage } from '../api/apiClient';
import { slugify } from '../utils/helpers';

const empty = {
  name: '', state: '', category: 'Culture', rating: 4.5, blurb: '', description: '',
  bestTime: '', explore: '', budget: '', duration: '', image: '', gradient: '#16324f,#2d6a4f'
};

export default function ItemForm({ selected, onSaved, onCancel }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const editing = Boolean(selected?._id);

  useEffect(() => {
    if (selected) setForm({ ...empty, ...selected, explore: (selected.explore || []).join(', ') });
    else setForm(empty);
  }, [selected]);

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      slug: slugify(form.slug || form.name),
      rating: Number(form.rating),
      explore: form.explore.split(',').map((item) => item.trim()).filter(Boolean)
    };
    try {
      const response = editing ? await api.updateItem(selected._id, payload) : await api.createItem(payload);
      onSaved(response.data);
      setForm(empty);
    } catch (error) {
      alert(getErrorMessage(error, 'Could not save destination.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="manage-form" onSubmit={submit}>
      <div className="form-head"><div><span className="eyebrow">MongoDB CRUD</span><h2>{editing ? 'Edit destination' : 'Add destination'}</h2></div>{editing && <button type="button" className="link-btn" onClick={onCancel}>Cancel edit</button>}</div>
      <div className="form-grid">
        <label>Destination name<input required value={form.name} onChange={(e) => set('name', e.target.value)} /></label>
        <label>State / region<input required value={form.state} onChange={(e) => set('state', e.target.value)} /></label>
        <label>Category<select value={form.category} onChange={(e) => set('category', e.target.value)}>{['Beach','Heritage','Nature','Mountain','Adventure','Culture','Spiritual','Wildlife'].map((x) => <option key={x}>{x}</option>)}</select></label>
        <label>Rating<input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => set('rating', e.target.value)} /></label>
        <label>Best time<input value={form.bestTime} onChange={(e) => set('bestTime', e.target.value)} /></label>
        <label>Budget<input value={form.budget} onChange={(e) => set('budget', e.target.value)} placeholder="₹15,000 – ₹30,000" /></label>
        <label>Duration<input value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="3–5 days" /></label>
        <label>Image URL<input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://..." /></label>
        <label className="span-2">Short description<input required value={form.blurb} onChange={(e) => set('blurb', e.target.value)} /></label>
        <label className="span-2">Full description<textarea rows="3" value={form.description} onChange={(e) => set('description', e.target.value)} /></label>
        <label className="span-2">Places to explore <span className="muted-text">(comma separated)</span><input value={form.explore} onChange={(e) => set('explore', e.target.value)} /></label>
      </div>
      <button className="dark-btn" disabled={saving}>{saving ? 'Saving…' : editing ? 'Update destination' : 'Create destination'}</button>
    </form>
  );
}
