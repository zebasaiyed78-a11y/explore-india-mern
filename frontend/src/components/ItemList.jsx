import { useEffect, useState } from 'react';
import { api, getErrorMessage } from '../api/apiClient';

export default function ItemList({ refreshKey, onEdit, onRefresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const response = await api.getItems({ sort: 'name' });
      setItems(response.data);
    } catch (error) {
      alert(getErrorMessage(error, 'Could not load destinations.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [refreshKey]);

  const remove = async (item) => {
    if (!confirm(`Delete ${item.name}?`)) return;
    try {
      await api.deleteItem(item._id);
      await load();
      onRefresh?.();
    } catch (error) {
      alert(getErrorMessage(error, 'Could not delete destination.'));
    }
  };

  if (loading) return <div className="loading-panel">Loading MongoDB records…</div>;

  return (
    <section className="manage-list">
      <div className="section-title-row"><div><span className="eyebrow">Read / Update / Delete</span><h2>Destination records</h2></div><span className="count-chip">{items.length} records</span></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Destination</th><th>State</th><th>Category</th><th>Rating</th><th>Actions</th></tr></thead>
          <tbody>{items.map((item) => <tr key={item._id}><td><strong>{item.name}</strong></td><td>{item.state}</td><td><span className="badge">{item.category}</span></td><td>★ {item.rating.toFixed(1)}</td><td><button className="table-btn" onClick={() => onEdit(item)}>Edit</button><button className="table-btn danger" onClick={() => remove(item)}>Delete</button></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
