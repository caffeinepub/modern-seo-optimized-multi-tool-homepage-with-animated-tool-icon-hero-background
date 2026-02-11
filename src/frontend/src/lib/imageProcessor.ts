/**
 * Client-side image processing utilities for compression and resizing
 */

import { ProcessingResult, ImageProcessingParams } from './toolProcessing';

/**
 * Compresses an image file
 */
export async function compressImage(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<ProcessingResult> {
  try {
    onProgress?.(10);
    
    // Load image
    const img = await loadImage(file);
    onProgress?.(30);
    
    // Create canvas with original dimensions
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
    
    // Draw image
    ctx.drawImage(img, 0, 0);
    onProgress?.(60);
    
    // Compress with quality 0.7 for JPEG, or convert to JPEG if PNG
    const mimeType = file.type === 'image/png' ? 'image/jpeg' : file.type;
    const quality = 0.7;
    
    const blob = await canvasToBlob(canvas, mimeType, quality);
    onProgress?.(90);
    
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const filename = file.name.replace(/\.[^/.]+$/, '') + '-compressed' + getExtensionForMimeType(mimeType);
    
    onProgress?.(100);
    
    return {
      processedBytes: bytes,
      filename,
      contentType: mimeType,
      originalSize: file.size,
      processedSize: bytes.length,
    };
  } catch (error) {
    throw new Error('Failed to compress image. Please try a different image.');
  }
}

/**
 * Resizes and compresses an image with custom parameters
 */
export async function resizeAndCompressImage(
  file: File,
  params: ImageProcessingParams,
  onProgress?: (percentage: number) => void
): Promise<ProcessingResult> {
  try {
    onProgress?.(10);
    
    // Load image
    const img = await loadImage(file);
    onProgress?.(30);
    
    // Calculate dimensions
    let targetWidth = params.targetWidth || img.width;
    let targetHeight = params.targetHeight || img.height;
    
    if (params.maintainAspectRatio && params.targetWidth && !params.targetHeight) {
      const aspectRatio = img.height / img.width;
      targetHeight = Math.round(params.targetWidth * aspectRatio);
    } else if (params.maintainAspectRatio && params.targetHeight && !params.targetWidth) {
      const aspectRatio = img.width / img.height;
      targetWidth = Math.round(params.targetHeight * aspectRatio);
    } else if (params.maintainAspectRatio && params.targetWidth && params.targetHeight) {
      // Fit within bounds while maintaining aspect ratio
      const widthRatio = params.targetWidth / img.width;
      const heightRatio = params.targetHeight / img.height;
      const ratio = Math.min(widthRatio, heightRatio);
      targetWidth = Math.round(img.width * ratio);
      targetHeight = Math.round(img.height * ratio);
    }
    
    // Create canvas with target dimensions
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
    
    // Use better image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Draw resized image
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    onProgress?.(60);
    
    // Determine output format
    const format = params.format || 'jpeg';
    const mimeType = `image/${format}`;
    const quality = params.quality !== undefined ? params.quality / 100 : 0.85;
    
    const blob = await canvasToBlob(canvas, mimeType, quality);
    onProgress?.(90);
    
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const filename = file.name.replace(/\.[^/.]+$/, '') + '-resized' + getExtensionForMimeType(mimeType);
    
    onProgress?.(100);
    
    return {
      processedBytes: bytes,
      filename,
      contentType: mimeType,
      originalSize: file.size,
      processedSize: bytes.length,
    };
  } catch (error) {
    throw new Error('Failed to resize and compress image. Please try a different image.');
  }
}

/**
 * Loads an image file into an HTMLImageElement
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

/**
 * Converts canvas to blob with proper error handling
 */
function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      },
      mimeType,
      quality
    );
  });
}

/**
 * Gets file extension for a MIME type
 */
function getExtensionForMimeType(mimeType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
  };
  return map[mimeType] || '.jpg';
}
