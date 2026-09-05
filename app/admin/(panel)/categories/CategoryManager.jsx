'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory, deleteCategory } from '@/lib/actions/categories';

export default function CategoryManager({ initialCategories }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function resetForm() {
    setForm({ name: '', description: '' });
    setEditingId(null);
  }

  function run(action) {
    setError('');
    startTransition(async () => {
      try {
        await action();
        resetForm();
        router.refresh();
      } catch (e) {
        setError(e.message || 'Something went wrong.');
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    run(() =>
      editingId
        ? updateCategory(editingId, form)
        : createCategory(form)
    );
  }

  function startEdit(cat) {
    setError('');
    setEditingId(cat.id);
    setForm({ name: cat.name, description: cat.description || '' });
  }

  function handleDelete(id) {
    if (!confirm('Delete this category?')) return;
    run(() => deleteCategory(id));
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
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" disabled={isPending} className="btn btn-primary">
            {editingId ? 'Save Changes' : 'Add Category'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn btn-ghost">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {initialCategories.map((cat) => (
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
        {initialCategories.length === 0 && <p className="text-inksoft text-sm">No categories yet.</p>}
      </div>
    </div>
  );
}
