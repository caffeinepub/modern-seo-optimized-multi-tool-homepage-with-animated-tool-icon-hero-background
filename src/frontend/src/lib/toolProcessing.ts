/**
 * Shared types and helpers for tool processing operations
 */

export type ToolOperation = 
  | 'pdf-to-word'
  | 'image-compressor'
  | 'image-resize-compress';

export interface ImageProcessingParams {
  targetWidth?: number;
  targetHeight?: number;
  maintainAspectRatio?: boolean;
  format?: 'jpeg' | 'png' | 'webp';
  quality?: number;
}

export interface ProcessingResult {
  processedBytes: Uint8Array;
  filename: string;
  contentType: string;
  originalSize?: number;
  processedSize?: number;
}

/**
 * Validates file type for a given operation
 */
export function validateFileForOperation(file: File, operation: ToolOperation): { valid: boolean; error?: string } {
  switch (operation) {
    case 'pdf-to-word':
      if (file.type !== 'application/pdf') {
        return { valid: false, error: 'Only PDF files are supported for PDF to Word conversion.' };
      }
      break;
    case 'image-compressor':
    case 'image-resize-compress':
      if (!file.type.startsWith('image/')) {
        return { valid: false, error: 'Only image files are supported.' };
      }
      break;
  }
  return { valid: true };
}

/**
 * Generates output filename based on operation
 */
export function generateFilename(originalName: string, operation: ToolOperation, format?: string): string {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  
  switch (operation) {
    case 'pdf-to-word':
      return `${nameWithoutExt}.docx`;
    case 'image-compressor':
      // Keep original extension
      const ext = originalName.match(/\.[^/.]+$/)?.[0] || '.jpg';
      return `${nameWithoutExt}-compressed${ext}`;
    case 'image-resize-compress':
      const outputExt = format ? `.${format}` : '.jpg';
      return `${nameWithoutExt}-resized${outputExt}`;
    default:
      return originalName;
  }
}

/**
 * Gets content type based on operation and format
 */
export function getContentType(operation: ToolOperation, format?: string, originalType?: string): string {
  switch (operation) {
    case 'pdf-to-word':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'image-compressor':
      return originalType || 'image/jpeg';
    case 'image-resize-compress':
      if (format === 'png') return 'image/png';
      if (format === 'webp') return 'image/webp';
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}
