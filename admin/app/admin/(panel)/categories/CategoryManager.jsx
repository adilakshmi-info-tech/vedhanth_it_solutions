'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory, deleteCategory } from '@/lib/actions/categories';
import AdminFormDrawer from '@/components/admin/AdminFormDrawer';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import styles from '../admin.module.css';

export default function CategoryManager({ initialCategories }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState(null);

  function resetForm() {
    setForm({ name: '', description: '' });
    setEditingId(null);
    setShowForm(false);
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
    setShowForm(true);
  }

  function handleDelete(cat) {
    setError('');
    startTransition(async () => {
      try { await deleteCategory(cat.id); setDeleteTarget(null); router.refresh(); }
      catch (cause) { setError(cause.message || 'Unable to delete this category.'); }
    });
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => (showForm && !editingId ? resetForm() : setShowForm(true))}
          className="btn btn-primary"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          {showForm && !editingId ? 'Close Form' : 'Add Category'}
        </button>
        <span className="text-sm text-inksoft">Total Categories: <span className="font-bold text-navy-900">{initialCategories.length}</span></span>
      </div>

      <AdminFormDrawer
        open={showForm}
        title={editingId ? 'Edit Category' : 'Add New Category'}
        description="Category details."
        formId="category-editor-form"
        submitLabel={editingId ? 'Update Category' : 'Add Category'}
        busy={isPending}
        onClose={resetForm}
      >
        <form id="category-editor-form" onSubmit={handleSubmit} className={styles.drawerForm}>
          <label className={styles.formField}>Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={styles.formInput} />
          </label>
          <label className={styles.formField}>Description
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={styles.formTextarea} />
          </label>
          {error && <p className={styles.formError} role="alert">{error}</p>}
        </form>
      </AdminFormDrawer>

      <div className="space-y-3">
        {initialCategories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3">
            <div>
              <div className="font-bold text-navy-900 text-sm">{cat.name}</div>
              <div className="text-xs text-inksoft">{cat.description}</div>
            </div>
            <div className="flex gap-4 text-sm">
              <button onClick={() => startEdit(cat)} className="text-navy-700 font-bold hover:text-green-600">Edit</button>
              <button onClick={() => { setError(''); setDeleteTarget(cat); }} className="text-red-600 font-bold hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
        {initialCategories.length === 0 && <p className="text-inksoft text-sm">No categories yet.</p>}
      </div>
      <AdminConfirmDialog open={Boolean(deleteTarget)} itemName={deleteTarget?.name || ''} itemType="category" busy={isPending} error={error} onCancel={() => { setDeleteTarget(null); setError(''); }} onConfirm={() => handleDelete(deleteTarget)} />
    </div>
  );
}
