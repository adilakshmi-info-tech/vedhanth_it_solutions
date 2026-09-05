'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions/products';

const emptyForm = { name: '', description: '', categoryId: '' };

export default function ProductManager({ initialCategories, initialProducts }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // existing image path or object URL
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setFile(null);
    setPreview(null);
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.categoryId) return;

    const fd = new FormData();
    fd.set('name', form.name);
    fd.set('description', form.description);
    fd.set('categoryId', form.categoryId);
    if (file) fd.set('image', file);

    setError('');
    startTransition(async () => {
      try {
        if (editingId) await updateProduct(editingId, fd);
        else await createProduct(fd);
        resetForm();
        router.refresh();
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      }
    });
  }

  function startEdit(p) {
    setError('');
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description || '', categoryId: p.categoryId || '' });
    setFile(null);
    setPreview(p.images?.[0] || null);
  }

  function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    setError('');
    startTransition(async () => {
      try {
        await deleteProduct(id);
        router.refresh();
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      }
    });
  }

  const categoryName = (id) =>
    initialCategories.find((c) => c.id === id)?.name || 'Uncategorized';

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
          {initialCategories.map((c) => (
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
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-3 text-sm" />
        {editingId && !file && (
          <p className="text-xs text-inksoft mb-3">Leave empty to keep the current image.</p>
        )}
        {preview && (
          <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg mb-3" />
        )}

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="flex gap-2">
          <button type="submit" disabled={isPending} className="btn btn-primary">
            {editingId ? 'Save Changes' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn btn-ghost">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {initialProducts.map((p) => (
          <div key={p.id} className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />}
              <div>
                <div className="font-semibold text-navy-900 text-sm">{p.name}</div>
                <div className="text-xs text-inksoft">{categoryName(p.categoryId)}</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => startEdit(p)} className="text-navy-700 font-semibold">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-red-600 font-semibold">Delete</button>
            </div>
          </div>
        ))}
        {initialProducts.length === 0 && <p className="text-inksoft text-sm">No products yet.</p>}
      </div>
    </div>
  );
}
