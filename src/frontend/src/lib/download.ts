/**
 * Triggers a download of processed file bytes with the given filename and content type
 */
export function downloadProcessedFile(
  bytes: Uint8Array,
  filename: string,
  contentType: string
): void {
  // Create a Blob from the bytes - ensure proper type by creating a new Uint8Array
  const blob = new Blob([new Uint8Array(bytes)], { type: contentType });
  
  // Create an object URL
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download a Blob directly
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates an output filename based on the input filename and new extension
 */
export function generateOutputFilename(
  inputFilename: string,
  newExtension: string,
  prefix?: string
): string {
  // Remove the original extension
  const nameWithoutExt = inputFilename.replace(/\.[^/.]+$/, '');
  
  // Add optional prefix
  const finalName = prefix ? `${prefix}-${nameWithoutExt}` : nameWithoutExt;
  
  // Add new extension (ensure it starts with a dot)
  const ext = newExtension.startsWith('.') ? newExtension : `.${newExtension}`;
  
  return `${finalName}${ext}`;
}
