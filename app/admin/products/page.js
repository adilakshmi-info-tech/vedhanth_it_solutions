'use client';
import { useEffect, useState } from 'react';
import {
  collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const emptyForm = { name: '', description: '', categoryId: '', images: [] };

export default function AdminProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    const [catSnap, prodSnap] = await Promise.all([
      getDocs(query(collection(db, 'categories'), orderBy('name'))),
      getDocs(query(collection(db, 'products'), orderBy('name'))),
    ]);
    setCategories(catSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setProducts(prodSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm((f) => ({ ...f, images: [url] })); // single image for simplicity; extend to array as needed
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.categoryId) return;
    const data = {
      name: form.name,
      slug: slugify(form.name),
      description: form.description,
      categoryId: form.categoryId,
      images: form.images,
    };
    if (editingId) {
      await updateDoc(doc(db, 'products', editingId), data);
    } else {
      await addDoc(collection(db, 'products'), { ...data, createdAt: serverTimestamp() });
    }
    setForm(emptyForm);
    setEditingId(null);
    load();
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description || '', categoryId: p.categoryId || '', images: p.images || [] });
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    await deleteDoc(doc(db, 'products', id));
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-navy-900 mb-6">Products</h1>

      <form onSubmit={handleSubmit} className="card text-left mb-8 max-w-md">
        <h3 className="font-semibold text-navy-900 mb-4">{editingId ? 'Edit product' : 'Add new product'}</h3>

        <label className="block text-xs font-semibold text-inksoft mb-1">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-3 text-sm"
        />

        <label className="block text-xs font-semibold text-inksoft mb-1">Category</label>
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-3 text-sm"
        >
          <option value="">Select a category…</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <label className="block text-xs font-semibold text-inksoft mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-3 text-sm"
        />

        <label className="block text-xs font-semibold text-inksoft mb-1">Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3 text-sm" />
        {uploading && <p className="text-xs text-inksoft mb-3">Uploading…</p>}
        {form.images[0] && (
          <img src={form.images[0]} alt="Preview" className="w-24 h-24 object-cover rounded-lg mb-3" />
        )}

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Product'}</button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="btn btn-ghost">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-inksoft text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-3">
                {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />}
                <div>
                  <div className="font-semibold text-navy-900 text-sm">{p.name}</div>
                  <div className="text-xs text-inksoft">
                    {categories.find((c) => c.id === p.categoryId)?.name || 'Uncategorized'}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <button onClick={() => startEdit(p)} className="text-navy-700 font-semibold">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-600 font-semibold">Delete</button>
              </div>
            </div>
          ))}
          {products.length === 0 && <p className="text-inksoft text-sm">No products yet.</p>}
        </div>
      )}
    </div>
  );
}
