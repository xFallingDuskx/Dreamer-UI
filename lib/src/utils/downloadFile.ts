/**
 * Triggers a file download with the specified content and filename.
 *
 * @param content - The content to be downloaded.
 * @param filename - The name of the file to be downloaded.
 * @param type - The MIME type of the file. Defaults to 'text/plain'.
 */
export function downloadFile(content: string, filename: string, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return blob;
}
