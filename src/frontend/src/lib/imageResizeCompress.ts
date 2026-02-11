export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ResizeOptions {
  targetWidth: number;
  targetHeight: number;
  maintainAspectRatio: boolean;
  format: 'jpeg' | 'png' | 'webp';
  quality: number; // 0-1 for lossy formats
}

export interface ProcessedImage {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  size: number;
}

/**
 * Load an image file and return its dimensions
 */
export async function loadImage(file: File): Promise<{ img: HTMLImageElement; dimensions: ImageDimensions }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        img,
        dimensions: {
          width: img.naturalWidth,
          height: img.naturalHeight,
        },
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

/**
 * Calculate dimensions maintaining aspect ratio
 */
export function calculateDimensions(
  original: ImageDimensions,
  target: Partial<ImageDimensions>,
  maintainAspectRatio: boolean
): ImageDimensions {
  if (!maintainAspectRatio) {
    return {
      width: target.width ?? original.width,
      height: target.height ?? original.height,
    };
  }

  const aspectRatio = original.width / original.height;

  if (target.width && !target.height) {
    return {
      width: target.width,
      height: Math.round(target.width / aspectRatio),
    };
  }

  if (target.height && !target.width) {
    return {
      width: Math.round(target.height * aspectRatio),
      height: target.height,
    };
  }

  if (target.width && target.height) {
    return {
      width: target.width,
      height: target.height,
    };
  }

  return original;
}

/**
 * Resize and compress an image
 */
export async function resizeAndCompressImage(
  file: File,
  options: ResizeOptions
): Promise<ProcessedImage> {
  const { img } = await loadImage(file);
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = options.targetWidth;
  canvas.height = options.targetHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  // Draw resized image
  ctx.drawImage(img, 0, 0, options.targetWidth, options.targetHeight);
  
  // Convert to blob
  const mimeType = `image/${options.format}`;
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      mimeType,
      options.quality
    );
  });
  
  // Create data URL for preview
  const dataUrl = canvas.toDataURL(mimeType, options.quality);
  
  return {
    blob,
    dataUrl,
    width: options.targetWidth,
    height: options.targetHeight,
    size: blob.size,
  };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Check if WebP is supported
 */
export function isWebPSupported(): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}
