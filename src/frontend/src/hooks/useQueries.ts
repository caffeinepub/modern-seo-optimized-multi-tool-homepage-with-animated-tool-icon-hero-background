import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import { normalizeBackendError } from '@/lib/backendErrors';
import { 
  ToolOperation, 
  ImageProcessingParams, 
  validateFileForOperation,
  generateFilename,
  getContentType,
  ProcessingResult
} from '@/lib/toolProcessing';
import { convertPdfToWord } from '@/lib/pdfProcessor';
import { compressImage, resizeAndCompressImage } from '@/lib/imageProcessor';

interface ProcessFileParams {
  file: File;
  operation: ToolOperation;
  params?: ImageProcessingParams;
  onProgress?: (percentage: number) => void;
}

export function useProcessFile() {
  const { actor, isFetching } = useActor();

  return useMutation<ProcessingResult, Error, ProcessFileParams>({
    mutationFn: async ({ file, operation, params, onProgress }) => {
      // Validate file type for operation
      const validation = validateFileForOperation(file, operation);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      try {
        let result: ProcessingResult;

        // Route to appropriate processor based on operation
        switch (operation) {
          case 'pdf-to-word':
            result = await convertPdfToWord(file, onProgress);
            break;

          case 'image-compressor':
            result = await compressImage(file, onProgress);
            break;

          case 'image-resize-compress':
            if (!params) {
              throw new Error('Image processing parameters are required');
            }
            result = await resizeAndCompressImage(file, params, onProgress);
            break;

          default:
            throw new Error(`Unsupported operation: ${operation}`);
        }

        return result;
      } catch (error) {
        throw normalizeBackendError(error);
      }
    },
    retry: false,
  });
}
