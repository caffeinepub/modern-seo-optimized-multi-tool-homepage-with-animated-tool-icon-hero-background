/**
 * Normalizes backend and transport errors into user-friendly English messages
 */
export function normalizeBackendError(error: unknown): Error {
  // Handle Error objects
  if (error instanceof Error) {
    // Check for common backend error patterns
    if (error.message.includes('Not yet implemented')) {
      return new Error('This feature is currently being configured. Please try again later.');
    }
    
    if (error.message.includes('API xyz')) {
      return new Error('File processing service is temporarily unavailable. Please try again later.');
    }
    
    // Network/connection errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new Error('Network connection failed. Please check your internet connection and try again.');
    }
    
    // Timeout errors
    if (error.message.includes('timeout')) {
      return new Error('Request timed out. Please try again with a smaller file.');
    }
    
    // Return the original error if it's already user-friendly
    return error;
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return new Error(error);
  }
  
  // Handle unknown errors
  return new Error('An unexpected error occurred. Please try again.');
}

/**
 * Extracts a debug code from an error for support purposes
 */
export function getErrorDebugCode(error: unknown): string {
  if (error instanceof Error) {
    // Create a simple hash of the error message for debugging
    const hash = error.message.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    return `ERR-${Math.abs(hash).toString(16).toUpperCase().slice(0, 6)}`;
  }
  return 'ERR-UNKNOWN';
}
