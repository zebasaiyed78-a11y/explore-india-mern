import { useState } from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

export default function Manage() {
  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  return <div className="page-shell"><div className="container page-intro"><span className="eyebrow">CRUD DEMONSTRATION</span><h1>Manage <em>destinations.</em></h1><p>This screen demonstrates Create, Read, Update and Delete against MongoDB through the Express API.</p></div><main className="container manage-grid"><ItemForm selected={selected} onSaved={() => { setSelected(null); setRefreshKey((x) => x + 1); }} onCancel={() => setSelected(null)} /><ItemList refreshKey={refreshKey} onEdit={setSelected} onRefresh={() => setRefreshKey((x) => x + 1)} /></main></div>;
}
