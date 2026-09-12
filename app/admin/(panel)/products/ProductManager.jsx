'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions/products';
import { uploadImage, deleteImage, pathFromImageUrl } from '@/lib/imageUpload';

const emptyForm = { name: '', description: '', categoryId: '' };

export default function ProductManager({ initialCategories, initialProducts }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null); // shown in the form
  const [uploadedUrl, setUploadedUrl] = useState(null); // newly uploaded image, if any
  const [existingImageUrl, setExistingImageUrl] = useState(null); // image being replaced, if editing
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setPreview(null);
    setUploadedUrl(null);
    setExistingImageUrl(null);
    setShowForm(false);
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // instant feedback while it uploads
    setUploading(true);
    setError('');
    try {
      const uploaded = await uploadImage(file, 'products');
      setUploadedUrl(uploaded.url);
      setPreview(uploaded.url);
    } catch (err) {
      setError(err.message || 'Image upload failed.');
      setPreview(existingImageUrl);
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.categoryId || uploading) return;

    const payload = { ...form, imageUrl: uploadedUrl || undefined };
    const replacedImage = editingId && uploadedUrl && existingImageUrl && uploadedUrl !== existingImageUrl
      ? existingImageUrl
      : null;

    setError('');
    startTransition(async () => {
      try {
        if (editingId) await updateProduct(editingId, payload);
        else await createProduct(payload);
        if (replacedImage) deleteImage(pathFromImageUrl(replacedImage)); // best-effort, don't block on it
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
    setUploadedUrl(null);
    setExistingImageUrl(p.images?.[0] || null);
    setPreview(p.images?.[0] || null);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    setError('');
    startTransition(async () => {
      try {
        const images = await deleteProduct(id);
        (images || []).forEach((url) => deleteImage(pathFromImageUrl(url)));
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
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => (showForm && !editingId ? resetForm() : setShowForm(true))}
          className="btn btn-primary"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          {showForm && !editingId ? 'Close Form' : 'Add Product'}
        </button>
        <span className="text-sm text-inksoft">Total Products: <span className="font-bold text-navy-900">{initialProducts.length}</span></span>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card text-left mb-10 max-w-md">
          <h3 className="font-display font-extrabold text-navy-900 mb-4">{editingId ? 'Edit product' : 'Add new product'}</h3>

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
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="mb-3 text-sm" />
          {uploading && <p className="text-xs text-inksoft mb-3">Uploading…</p>}
          {editingId && !uploadedUrl && !uploading && (
            <p className="text-xs text-inksoft mb-3">Leave empty to keep the current image.</p>
          )}
          {preview && (
            <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg mb-3" />
          )}

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <div className="flex gap-2">
            <button type="submit" disabled={isPending || uploading} className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Add Product'}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {initialProducts.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
            <div className="relative aspect-square bg-navy-100">
              {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-navy-900 text-sm truncate">{p.name}</h3>
              <p className="text-xs text-inksoft mt-1 line-clamp-2 flex-1">{p.description || 'No description.'}</p>
              <span className="inline-block mt-3 self-start text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600">
                {categoryName(p.categoryId)}
              </span>
              <div className="flex gap-4 mt-4 pt-3 border-t border-slate-100 text-xs">
                <button onClick={() => startEdit(p)} className="font-bold text-navy-700 hover:text-green-600">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="font-bold text-red-600 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {initialProducts.length === 0 && (
          <p className="text-inksoft text-sm col-span-full">No products yet.</p>
        )}
      </div>
    </div>
  );
}
