'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createTenant, updateTenant, deleteTenant } from '@/lib/actions/tenants';
import AdminFormDrawer from '@/components/admin/AdminFormDrawer';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import styles from '../admin/(panel)/admin.module.css';

const emptyForm = { name: '', slug: '', logoUrl: '', colorNavy: '', colorGreen: '', featureReviews: true, featureEnquiries: true, allowedEmails: '' };

function tenantToForm(tenant) {
  return {
    name: tenant.name,
    slug: tenant.slug,
    logoUrl: tenant.logoUrl || '',
    colorNavy: tenant.colors?.navy || '',
    colorGreen: tenant.colors?.green || '',
    featureReviews: tenant.features?.reviews ?? true,
    featureEnquiries: tenant.features?.enquiries ?? true,
    allowedEmails: (tenant.allowedEmails || []).join(', '),
  };
}

function formToPayload(form) {
  return {
    name: form.name,
    slug: form.slug,
    logoUrl: form.logoUrl,
    colors: { navy: form.colorNavy, green: form.colorGreen },
    features: { reviews: form.featureReviews, enquiries: form.featureEnquiries },
    allowedEmails: form.allowedEmails,
  };
}

export default function TenantManager({ initialTenants }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState(null);

  function resetForm() {
    setForm(emptyForm);
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
    if (!form.name.trim() || !form.slug.trim()) return;
    const payload = formToPayload(form);
    run(() => (editingId ? updateTenant(editingId, payload) : createTenant(payload)));
  }

  function startEdit(tenant) {
    setError('');
    setEditingId(tenant.id);
    setForm(tenantToForm(tenant));
    setShowForm(true);
  }

  function handleDelete(tenant) {
    setError('');
    startTransition(async () => {
      try { await deleteTenant(tenant.id); setDeleteTarget(null); router.refresh(); }
      catch (cause) { setError(cause.message || 'Unable to delete this tenant.'); }
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
          {showForm && !editingId ? 'Close Form' : 'Add Tenant'}
        </button>
        <span className="text-sm text-inksoft">Total Tenants: <span className="font-bold text-navy-900">{initialTenants.length}</span></span>
      </div>

      <AdminFormDrawer
        open={showForm}
        title={editingId ? 'Edit Tenant' : 'Add New Tenant'}
        description="Client site branding and feature flags. Not yet consulted by any page — this only manages the setting itself."
        formId="tenant-editor-form"
        submitLabel={editingId ? 'Update Tenant' : 'Add Tenant'}
        busy={isPending}
        onClose={resetForm}
      >
        <form id="tenant-editor-form" onSubmit={handleSubmit} className={styles.drawerForm}>
          <label className={styles.formField}>Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={styles.formInput} />
          </label>
          <label className={styles.formField}>Slug
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required pattern="[a-z0-9-]+" className={styles.formInput} />
          </label>
          <label className={styles.formField}>Logo URL
            <input value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} className={styles.formInput} />
          </label>
          <label className={styles.formField}>Navy color
            <input value={form.colorNavy} onChange={(e) => setForm({ ...form, colorNavy: e.target.value })} placeholder="#001736" className={styles.formInput} />
          </label>
          <label className={styles.formField}>Green color
            <input value={form.colorGreen} onChange={(e) => setForm({ ...form, colorGreen: e.target.value })} placeholder="#0D3D0E" className={styles.formInput} />
          </label>
          <label className={styles.formField}>
            <input type="checkbox" checked={form.featureReviews} onChange={(e) => setForm({ ...form, featureReviews: e.target.checked })} /> Reviews enabled
          </label>
          <label className={styles.formField}>
            <input type="checkbox" checked={form.featureEnquiries} onChange={(e) => setForm({ ...form, featureEnquiries: e.target.checked })} /> Enquiries enabled
          </label>
          <label className={styles.formField}>Admin emails (comma-separated)
            <textarea value={form.allowedEmails} onChange={(e) => setForm({ ...form, allowedEmails: e.target.value })} rows={2} className={styles.formTextarea} />
          </label>
          {error && <p className={styles.formError} role="alert">{error}</p>}
        </form>
      </AdminFormDrawer>

      <div className="space-y-3">
        {initialTenants.map((tenant) => (
          <div key={tenant.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3">
            <div>
              <div className="font-bold text-navy-900 text-sm">{tenant.name} <span className="text-inksoft font-normal">({tenant.slug})</span></div>
              <div className="text-xs text-inksoft">{(tenant.allowedEmails || []).join(', ') || 'No admin emails set'}</div>
            </div>
            <div className="flex gap-4 text-sm">
              <button onClick={() => startEdit(tenant)} className="text-navy-700 font-bold hover:text-green-600">Edit</button>
              <button onClick={() => { setError(''); setDeleteTarget(tenant); }} className="text-red-600 font-bold hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
        {initialTenants.length === 0 && <p className="text-inksoft text-sm">No tenants yet.</p>}
      </div>
      <AdminConfirmDialog open={Boolean(deleteTarget)} itemName={deleteTarget?.name || ''} itemType="tenant" busy={isPending} error={error} onCancel={() => { setDeleteTarget(null); setError(''); }} onConfirm={() => handleDelete(deleteTarget)} />
    </div>
  );
}
