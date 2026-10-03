const SPEC_MARKER = '<!--VEDHANTH_PRODUCT_SPECS_V1:';
const SPEC_END = '-->';

export function parseProductContent(storedDescription) {
  const stored = typeof storedDescription === 'string' ? storedDescription : '';
  const markerStart = stored.lastIndexOf(SPEC_MARKER);
  if (markerStart < 0) return { description: stored, specifications: [] };

  const payloadStart = markerStart + SPEC_MARKER.length;
  const markerEnd = stored.indexOf(SPEC_END, payloadStart);
  if (markerEnd < 0) return { description: stored, specifications: [] };

  try {
    const decoded = JSON.parse(decodeURIComponent(stored.slice(payloadStart, markerEnd)));
    const specifications = Array.isArray(decoded)
      ? decoded.filter((row) => row && typeof row.label === 'string' && typeof row.value === 'string')
      : [];
    return { description: stored.slice(0, markerStart).trimEnd(), specifications };
  } catch {
    return { description: stored, specifications: [] };
  }
}

export function serializeProductContent(description, specifications) {
  const cleanDescription = typeof description === 'string' ? description.trim() : '';
  const cleanRows = (Array.isArray(specifications) ? specifications : [])
    .map(({ label = '', value = '' }) => ({ label: String(label).trim(), value: String(value).trim() }))
    .filter(({ label, value }) => label || value);
  if (!cleanRows.length) return cleanDescription || null;
  return `${cleanDescription ? `${cleanDescription}\n\n` : ''}${SPEC_MARKER}${encodeURIComponent(JSON.stringify(cleanRows))}${SPEC_END}`;
}
