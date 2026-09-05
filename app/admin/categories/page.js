'use client';
import { useEffect, useState } from 'react';
import {
  collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  async function load() {
    setLoading(true);
    const snap = await getDocs(query(collection(db, 'categories'), orderBy('name')));
    setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const data = { name: form.name, slug: slugify(form.name), description: form.description };
    if (editingId) {
      await updateDoc(doc(db, 'categories', editingId), data);
    } else {
      await addDoc(collection(db, 'categories'), { ...data, createdAt: serverTimestamp() });
    }
    setForm({ name: '', description: '' });
    setEditingId(null);
    load();
  }

  function startEdit(cat) {
    setEditingId(cat.id);
    setForm({ name: cat.name, description: cat.description || '' });
  }

  async function handleDelete(id) {
    if (!confirm('Delete this category? Products in it will not be deleted automatically.')) return;
    await deleteDoc(doc(db, 'categories', id));
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-navy-900 mb-6">Categories</h1>

      <form onSubmit={handleSubmit} className="card text-left mb-8 max-w-md">
        <h3 className="font-semibold text-navy-900 mb-4">{editingId ? 'Edit category' : 'Add new category'}</h3>
        <label className="block text-xs font-semibold text-inksoft mb-1">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-3 text-sm"
        />
        <label className="block text-xs font-semibold text-inksoft mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-sm"
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Category'}</button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '' }); }} className="btn btn-ghost">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-inksoft text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-3">
              <div>
                <div className="font-semibold text-navy-900 text-sm">{cat.name}</div>
                <div className="text-xs text-inksoft">{cat.description}</div>
              </div>
              <div className="flex gap-2 text-sm">
                <button onClick={() => startEdit(cat)} className="text-navy-700 font-semibold">Edit</button>
                <button onClick={() => handleDelete(cat.id)} className="text-red-600 font-semibold">Delete</button>
              </div>
            </div>
          ))}
          {categories.length === 0 && <p className="text-inksoft text-sm">No categories yet.</p>}
        </div>
      )}
    </div>
  );
}
