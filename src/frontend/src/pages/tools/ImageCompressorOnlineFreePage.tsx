import { useState, useRef, ChangeEvent } from 'react';
import { Image, Upload, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ToolLandingOnlineFreeTemplate from './ToolLandingOnlineFreeTemplate';
import { useProcessFile } from '@/hooks/useQueries';
import { downloadProcessedFile } from '@/lib/download';

export default function ImageCompressorOnlineFreePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [processedData, setProcessedData] = useState<{ 
    bytes: Uint8Array; 
    filename: string;
    contentType: string;
    originalSize?: number;
    processedSize?: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFileMutation = useProcessFile();

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        processFileMutation.reset();
        setSelectedFile(null);
        setPreviewUrl('');
        setProcessedData(null);
        setUploadProgress(0);
        return;
      }
      processFileMutation.reset();
      setSelectedFile(file);
      setProcessedData(null);
      setUploadProgress(0);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        processFileMutation.reset();
        setSelectedFile(null);
        setPreviewUrl('');
        setProcessedData(null);
        setUploadProgress(0);
        return;
      }
      processFileMutation.reset();
      setSelectedFile(file);
      setProcessedData(null);
      setUploadProgress(0);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCompress = async () => {
    if (!selectedFile) return;

    setUploadProgress(0);
    setProcessedData(null);

    processFileMutation.mutate(
      {
        file: selectedFile,
        operation: 'image-compressor',
        onProgress: (percentage) => {
          setUploadProgress(percentage);
        },
      },
      {
        onSuccess: (result) => {
          setProcessedData({
            bytes: result.processedBytes,
            filename: result.filename,
            contentType: result.contentType,
            originalSize: result.originalSize,
            processedSize: result.processedSize,
          });
          setUploadProgress(100);
        },
        onError: () => {
          setUploadProgress(0);
        },
      }
    );
  };

  const handleDownload = () => {
    if (!processedData) return;

    downloadProcessedFile(
      processedData.bytes,
      processedData.filename,
      processedData.contentType
    );
  };

  const handleReset = () => {
    setSelectedFile(null);
    setProcessedData(null);
    setUploadProgress(0);
    processFileMutation.reset();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
  };

  const isProcessing = processFileMutation.isPending;
  const isComplete = !!processedData && !processFileMutation.isPending;
  const hasError = processFileMutation.isError;

  const compressionRatio = processedData && processedData.originalSize && processedData.processedSize
    ? ((1 - processedData.processedSize / processedData.originalSize) * 100).toFixed(1)
    : null;

  const toolInterface = (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`border-2 border-dashed border-border rounded-lg p-6 md:p-12 text-center transition-all duration-300 tap-target ${
          isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-primary/5'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-base md:text-lg font-medium mb-2">
          {selectedFile ? selectedFile.name : 'Drop your image here or click to browse'}
        </p>
        <p className="text-sm text-muted-foreground">
          Supports JPG, PNG, GIF, WebP formats
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Select image file"
          disabled={isProcessing}
        />
      </div>

      {/* Error Alert */}
      {hasError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {processFileMutation.error?.message || 'An error occurred during compression. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Image Preview */}
      {selectedFile && previewUrl && !isComplete && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border"
              loading="lazy"
            />
            <div className="flex-1 text-center md:text-left">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Compress Button */}
      {selectedFile && !isComplete && (
        <Button
          onClick={handleCompress}
          disabled={isProcessing}
          className="w-full tap-target-mobile text-base md:text-lg"
          size="lg"
        >
          {isProcessing ? (
            <>
              <span className="animate-spin mr-2">⚙️</span>
              Compressing...
            </>
          ) : (
            <>
              <Image className="w-5 h-5 mr-2" />
              Compress Image
            </>
          )}
        </Button>
      )}

      {/* Progress Bar */}
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-center text-muted-foreground">
            {uploadProgress < 100 ? `Processing... ${uploadProgress}%` : 'Finalizing compression...'}
          </p>
        </div>
      )}

      {/* Success & Download */}
      {isComplete && (
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Compression Complete!</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Your image has been compressed successfully
            </p>
            {compressionRatio && (
              <p className="text-sm font-medium text-primary mb-4">
                Reduced by {compressionRatio}% • {(processedData.processedSize! / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
            <Button onClick={handleDownload} size="lg" className="w-full md:w-auto tap-target-mobile">
              <Download className="w-5 h-5 mr-2" />
              Download Compressed Image
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full tap-target"
          >
            Compress Another Image
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <ToolLandingOnlineFreeTemplate
      toolName="Image Compressor Online Free"
      toolPath="/tools/image-compressor-online-free"
      seoTitle="Image Compressor Online Free - Reduce Image Size Instantly"
      seoDescription="Compress images online free with our powerful tool. Reduce image file size while maintaining quality. Supports JPG, PNG, WebP formats. Fast, secure, and 100% free image compression."
      heroDescription="Compress your images instantly with our free online tool. Reduce file sizes while maintaining visual quality—perfect for web optimization and faster loading times."
      toolIcon={Image}
      toolInterface={toolInterface}
      steps={[
        {
          step: '1',
          title: 'Select Your Image',
          description: 'Click the upload area or drag and drop your image file. Supports JPG, PNG, GIF, and WebP formats.',
        },
        {
          step: '2',
          title: 'Click Compress Image',
          description: 'Press the compress button to start reducing your image file size while preserving quality.',
        },
        {
          step: '3',
          title: 'Wait for Processing',
          description: 'Watch the progress bar as your image is optimized using advanced compression algorithms.',
        },
        {
          step: '4',
          title: 'Download Compressed Image',
          description: 'Once complete, download your compressed image with significantly reduced file size.',
        },
      ]}
      faqs={[
        {
          question: 'Is this image compressor really free?',
          answer: 'Yes, our image compressor online free tool is completely free to use. There are no hidden charges, subscription fees, or watermarks on your compressed images.',
        },
        {
          question: 'Will compression reduce image quality?',
          answer: 'Our compression algorithm is designed to reduce file size while maintaining visual quality. Most images can be reduced by 50-70% with minimal perceptible quality loss.',
        },
        {
          question: 'What image formats are supported?',
          answer: 'We support all common image formats including JPG/JPEG, PNG, GIF, and WebP. The output format matches your input format for compatibility.',
        },
        {
          question: 'Are my images secure?',
          answer: 'Your privacy is our priority. All image processing happens directly in your browser—your images never leave your device and are not uploaded to any server.',
        },
        {
          question: 'What is the maximum file size?',
          answer: 'Since processing happens in your browser, file size limits depend on your device\'s memory. Most images up to 50MB should work without issues.',
        },
        {
          question: 'Can I compress multiple images at once?',
          answer: 'Currently, our tool processes one image at a time to ensure optimal compression quality. You can compress as many images as you need sequentially.',
        },
      ]}
    />
  );
}
