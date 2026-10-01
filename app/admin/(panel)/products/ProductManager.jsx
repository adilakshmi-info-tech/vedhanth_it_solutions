'use client';

import { useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions/products';
import { uploadImage, deleteImage, pathFromImageUrl } from '@/lib/imageUpload';
import { parseProductContent } from '@/lib/product-content';
import AdminFormDrawer from '@/components/admin/AdminFormDrawer';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import styles from '../admin.module.css';

const emptyForm = { name: '', description: '', categoryId: '' };
const emptySpecification = () => ({ label: '', value: '' });
const maxImages = 5;
const maxImageBytes = 2 * 1024 * 1024;

export default function ProductManager({ initialCategories, initialProducts }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [specifications, setSpecifications] = useState([emptySpecification()]);
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);

  function releasePreviews(items = images) {
    items.forEach((item) => {
      if (item.kind === 'file' && item.preview) URL.revokeObjectURL(item.preview);
    });
  }

  function resetForm() {
    releasePreviews();
    setForm(emptyForm);
    setSpecifications([emptySpecification()]);
    setImages([]);
    setEditingId(null);
    setError('');
    setUploadProgress(null);
    setDrawerOpen(false);
  }

  function openNew() {
    resetForm();
    setDrawerOpen(true);
  }

  function startEdit(product) {
    releasePreviews();
    const content = parseProductContent(product.description || '');
    setError('');
    setEditingId(product.id);
    setForm({ name: product.name, description: content.description, categoryId: product.categoryId || '' });
    const savedSpecifications = product.specifications?.map(({ label, value }) => ({ label, value })) || [];
    const rows = savedSpecifications.length ? savedSpecifications : content.specifications;
    setSpecifications(rows.length ? rows : [emptySpecification()]);
    setImages((product.images || []).map((url, index) => ({ id: `existing-${index}-${url}`, kind: 'existing', url, preview: url })));
    setDrawerOpen(true);
  }

  function addFiles(fileList) {
    const selected = Array.from(fileList || []);
    if (!selected.length) return;
    const accepted = [];
    const messages = [];
    let remaining = maxImages - images.length;
    for (const file of selected) {
      if (!file.type.startsWith('image/')) {
        messages.push(`${file.name}: choose an image file.`);
      } else if (file.size > maxImageBytes) {
        messages.push(`${file.name}: images must be 2 MB or smaller.`);
      } else if (remaining <= 0) {
        messages.push('A product can have up to 5 images. Remove an image before adding more.');
        break;
      } else {
        accepted.push({ id: `${Date.now()}-${Math.random()}`, kind: 'file', file, preview: URL.createObjectURL(file) });
        remaining -= 1;
      }
    }
    if (accepted.length) setImages((current) => [...current, ...accepted]);
    setError(messages.join(' '));
  }

  function removeImage(index) {
    setImages((current) => {
      const item = current[index];
      if (item?.kind === 'file') URL.revokeObjectURL(item.preview);
      return current.filter((_, itemIndex) => itemIndex !== index);
    });
  }

  function moveImage(index, delta) {
    setImages((current) => {
      const destination = index + delta;
      if (destination < 0 || destination >= current.length) return current;
      const next = [...current];
      [next[index], next[destination]] = [next[destination], next[index]];
      return next;
    });
  }

  function updateSpecification(index, key, value) {
    setSpecifications((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.categoryId) {
      setError('Enter a product name and choose a category.');
      return;
    }
    if (images.length > maxImages) {
      setError('A product can have up to 5 images.');
      return;
    }
    setError('');
    const stagedImages = [...images];
    const cleanSpecifications = specifications
      .map(({ label, value }) => ({ label: label.trim(), value: value.trim() }))
      .filter(({ label, value }) => label || value);

    startTransition(async () => {
      const uploadedUrls = [];
      try {
        const finalImages = [];
        const newFiles = stagedImages.filter((item) => item.kind === 'file');
        let fileIndex = 0;
        if (newFiles.length) setUploadProgress({ current: 1, total: newFiles.length, percent: 0 });
        for (const item of stagedImages) {
          if (item.kind === 'existing') finalImages.push(item.url);
          else {
            const currentFile = fileIndex + 1;
            const uploaded = await uploadImage(item.file, 'products', (percent) => {
              setUploadProgress({ current: currentFile, total: newFiles.length, percent });
            });
            if (!uploaded?.url) throw new Error('The image upload did not return a usable image URL.');
            uploadedUrls.push(uploaded.url);
            finalImages.push(uploaded.url);
            fileIndex += 1;
            setUploadProgress({ current: fileIndex, total: newFiles.length, percent: 100 });
          }
        }

        const payload = { ...form, specifications: cleanSpecifications, images: finalImages };
        if (editingId) await updateProduct(editingId, payload);
        else await createProduct(payload);

        if (editingId) {
          const retained = new Set(finalImages);
          await Promise.allSettled((initialProducts.find((product) => product.id === editingId)?.images || [])
            .filter((url) => !retained.has(url))
            .map((url) => deleteImage(pathFromImageUrl(url))));
        }
        resetForm();
        router.refresh();
      } catch (actionError) {
        await Promise.allSettled(uploadedUrls.map((url) => deleteImage(pathFromImageUrl(url))));
        setUploadProgress(null);
        setError(actionError.message || 'Something went wrong. Your product was not saved.');
      }
    });
  }

  function handleDelete(product) {
    setError('');
    startTransition(async () => {
      try {
        const productImages = await deleteProduct(product.id);
        await Promise.allSettled((productImages || []).map((url) => deleteImage(pathFromImageUrl(url))));
        setDeleteTarget(null);
        router.refresh();
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      }
    });
  }

  const categoryName = (id) => initialCategories.find((category) => category.id === id)?.name || 'Uncategorized';
  const visibleProducts = initialProducts.filter((product) => {
    const matchesSearch = !search.trim() || `${product.name} ${parseProductContent(product.description || '').description}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesSearch && (categoryFilter === 'all' || product.categoryId === categoryFilter);
  });

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={openNew} className="btn btn-primary">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
          Add Product
        </button>
        <span className="text-sm text-inksoft">Total Products: <span className="font-bold text-navy-900">{initialProducts.length}</span></span>
      </div>

      {error && !drawerOpen && <p className={styles.errorNotice} role="alert">{error}</p>}

      <AdminFormDrawer
        open={drawerOpen}
        title={editingId ? 'Edit Product' : 'Add New Product'}
        description="Product details, specifications, and images."
        formId="product-editor-form"
        submitLabel={editingId ? 'Update Product' : 'Add Product'}
        busy={isPending}
        onClose={resetForm}
      >
        <form id="product-editor-form" className={styles.drawerForm} onSubmit={handleSubmit}>
          <label className={styles.formField}>Name
            <input className={styles.formInput} value={form.name} maxLength={180} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </label>
          <label className={styles.formField}>Category
            <select className={styles.formInput} value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} required>
              <option value="">Select a category…</option>
              {initialCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </label>
          <label className={styles.formField}>Description
            <textarea className={styles.formTextarea} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} />
          </label>

          <section className={styles.specSection} aria-labelledby="product-specifications-label">
            <div className={styles.specSectionHeading}>
              <span id="product-specifications-label">Specifications</span>
              <button type="button" className={styles.smallAction} onClick={() => setSpecifications((current) => [...current, emptySpecification()])}>Add specification row</button>
            </div>
            <div className={styles.specRows}>
              {specifications.map((row, index) => <div className={styles.specRow} key={index}>
                <input className={styles.formInput} aria-label={`Specification ${index + 1} label`} placeholder="Label" value={row.label} onChange={(event) => updateSpecification(index, 'label', event.target.value)} />
                <input className={styles.formInput} aria-label={`Specification ${index + 1} value`} placeholder="Value" value={row.value} onChange={(event) => updateSpecification(index, 'value', event.target.value)} />
                <button type="button" className={styles.smallAction} aria-label={`Remove specification row ${index + 1}`} onClick={() => setSpecifications((current) => current.filter((_, rowIndex) => rowIndex !== index))}>×</button>
              </div>)}
            </div>
            <p className={styles.formHint}>Saved rows appear in the product details table in the same order. Completely empty rows are ignored.</p>
          </section>

          <section className={styles.specSection} aria-labelledby="product-images-label">
            <div className={styles.specSectionHeading}><span id="product-images-label">Images ({images.length}/{maxImages})</span></div>
            <div
              className={styles.dropzone}
              data-dragging={dragging ? 'true' : 'false'}
              onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}
            >
              <div><p>Drag and drop images here</p><span>or </span>
                <button type="button" className={styles.smallAction} onClick={() => fileInputRef.current?.click()}>Choose Images</button>
                <small>Up to 5 images · 2 MB maximum each</small>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(event) => { addFiles(event.target.files); event.target.value = ''; }} />
            </div>
            {images.length > 0 && <div className={styles.imagePreviews}>
              {images.map((item, index) => <div className={styles.imagePreview} key={item.id}>
                <Image src={item.preview} alt={`Product image ${index + 1}`} width={180} height={180} unoptimized />
                <div className={styles.imagePreviewActions}>
                  <button type="button" aria-label={`Move image ${index + 1} left`} title="Move earlier" disabled={index === 0} onClick={() => moveImage(index, -1)}>←</button>
                  <button type="button" aria-label={`Move image ${index + 1} right`} title="Move later" disabled={index === images.length - 1} onClick={() => moveImage(index, 1)}>→</button>
                  <button type="button" aria-label={`Remove image ${index + 1}`} title="Remove image" onClick={() => removeImage(index)}>×</button>
                </div>
              </div>)}
            </div>}
            {uploadProgress && <p className={styles.formHint} role="status" aria-live="polite">Uploading image {uploadProgress.current} of {uploadProgress.total} · {uploadProgress.percent}%</p>}
            <p className={styles.formHint}>Existing images stay in place unless removed. New files upload only when you save.</p>
          </section>

          {error && <p className={styles.formError} role="alert">{error}</p>}
        </form>
      </AdminFormDrawer>

      <div className={styles.reviewFilters}>
        <input className={styles.searchInput} type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products" />
        <select className={styles.selectInput} value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter products by category"><option value="all">All categories</option>{initialCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
          const description = parseProductContent(product.description || '').description;
          return <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
            <div className="relative aspect-square bg-navy-100">{product.images?.[0] && <Image src={product.images[0]} alt={product.name} width={600} height={600} unoptimized className="w-full h-full object-cover" />}</div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-navy-900 text-sm truncate">{product.name}</h3>
              <p className="text-xs text-inksoft mt-1 line-clamp-2 flex-1">{description || 'No description.'}</p>
              <span className="inline-block mt-3 self-start text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600">{categoryName(product.categoryId)}</span>
              <div className="flex gap-4 mt-4 pt-3 border-t border-slate-100 text-xs">
                <button onClick={() => startEdit(product)} className="font-bold text-navy-700 hover:text-blue-600">Edit</button>
                <button onClick={() => { setError(''); setDeleteTarget(product); }} className="font-bold text-red-600 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>;
        })}
        {visibleProducts.length === 0 && <p className="text-inksoft text-sm col-span-full">{initialProducts.length ? 'No products match these filters.' : 'No products yet.'}</p>}
      </div>
      <AdminConfirmDialog open={Boolean(deleteTarget)} itemName={deleteTarget?.name || ''} itemType="product" busy={isPending} error={error} onCancel={() => { setDeleteTarget(null); setError(''); }} onConfirm={() => handleDelete(deleteTarget)} />
    </div>
  );
}
