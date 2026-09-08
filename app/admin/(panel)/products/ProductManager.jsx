'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions/products';
import { uploadImage, deleteImage, pathFromImageUrl } from '@/lib/imageUpload';

const emptyForm = { name: '', description: '', categoryId: '' };

export default function ProductManager({ initialCategories, initialProducts }) {
  const router = useRouter();
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
