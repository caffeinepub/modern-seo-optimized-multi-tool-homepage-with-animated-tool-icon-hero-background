import { useState, useRef, ChangeEvent } from 'react';
import { Image, Upload, Download, CheckCircle2, AlertCircle, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ToolLandingOnlineFreeTemplate from './ToolLandingOnlineFreeTemplate';
import { useProcessFile } from '@/hooks/useQueries';
import { downloadProcessedFile } from '@/lib/download';

export default function ImageResizeCompressOnlineFreePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [quality, setQuality] = useState(85);
  const [processedData, setProcessedData] = useState<{ 
    bytes: Uint8Array; 
    filename: string;
    contentType: string;
    originalSize?: number;
    processedSize?: number;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFileMutation = useProcessFile();

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setProcessedData(null);
      processFileMutation.reset();
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Load image to get dimensions
      const img = new window.Image();
      img.onload = () => {
        setTargetWidth(img.width);
        setTargetHeight(img.height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setProcessedData(null);
      processFileMutation.reset();
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Load image to get dimensions
      const img = new window.Image();
      img.onload = () => {
        setTargetWidth(img.width);
        setTargetHeight(img.height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setUploadProgress(0);
    setProcessedData(null);

    processFileMutation.mutate(
      {
        file: selectedFile,
        operation: 'image-resize-compress',
        params: {
          targetWidth,
          targetHeight,
          maintainAspectRatio,
          format,
          quality,
        },
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

  const toolInterface = (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isProcessing && !isComplete && fileInputRef.current?.click()}
        className={`border-2 border-dashed border-border rounded-lg p-6 md:p-12 text-center transition-all duration-300 tap-target ${
          isProcessing || isComplete ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-primary/5'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-base md:text-lg font-medium mb-2">
          {selectedFile ? selectedFile.name : 'Drop your image here or click to browse'}
        </p>
        <p className="text-sm text-muted-foreground">
          Supports JPG, PNG, WebP formats
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Select image file"
          disabled={isProcessing || isComplete}
        />
      </div>

      {/* Error Alert */}
      {hasError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {processFileMutation.error?.message || 'An error occurred during processing. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Image Preview & Settings */}
      {selectedFile && previewUrl && !isComplete && (
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-muted/50 rounded-lg p-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-64 mx-auto rounded-lg border"
              loading="lazy"
            />
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dimensions */}
            <div className="space-y-2">
              <Label htmlFor="width">Width (px)</Label>
              <Input
                id="width"
                type="number"
                value={targetWidth}
                onChange={(e) => setTargetWidth(Number(e.target.value))}
                min={1}
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (px)</Label>
              <Input
                id="height"
                type="number"
                value={targetHeight}
                onChange={(e) => setTargetHeight(Number(e.target.value))}
                min={1}
                disabled={isProcessing}
              />
            </div>

            {/* Format */}
            <div className="space-y-2">
              <Label htmlFor="format">Output Format</Label>
              <Select value={format} onValueChange={(v) => setFormat(v as 'jpeg' | 'png' | 'webp')} disabled={isProcessing}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Aspect Ratio Lock */}
            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <Button
                variant="outline"
                onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                disabled={isProcessing}
                className="w-full justify-start"
              >
                {maintainAspectRatio ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
                {maintainAspectRatio ? 'Locked' : 'Unlocked'}
              </Button>
            </div>
          </div>

          {/* Quality Slider */}
          <div className="space-y-2">
            <Label htmlFor="quality">Quality: {quality}%</Label>
            <Slider
              id="quality"
              value={[quality]}
              onValueChange={(v) => setQuality(v[0])}
              min={1}
              max={100}
              step={1}
              disabled={isProcessing}
            />
          </div>

          {/* Process Button */}
          <Button
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full tap-target-mobile text-base md:text-lg"
            size="lg"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin mr-2">⚙️</span>
                Processing...
              </>
            ) : (
              <>
                <Image className="w-5 h-5 mr-2" />
                Resize & Compress
              </>
            )}
          </Button>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Processing... {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      )}

      {/* Success & Download */}
      {isComplete && (
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Processing Complete!</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Your image has been resized and compressed successfully
            </p>
            {processedData.originalSize && processedData.processedSize && (
              <p className="text-sm font-medium text-primary mb-4">
                {(processedData.originalSize / 1024 / 1024).toFixed(2)} MB → {(processedData.processedSize / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
            <Button onClick={handleDownload} size="lg" className="w-full md:w-auto tap-target-mobile">
              <Download className="w-5 h-5 mr-2" />
              Download Processed Image
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full tap-target"
          >
            Process Another Image
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <ToolLandingOnlineFreeTemplate
      toolName="Image Resize & Compress Online Free"
      toolPath="/tools/image-resize-compress-online-free"
      seoTitle="Image Resize & Compress Online Free - Optimize Images Instantly"
      seoDescription="Resize and compress images online free with our powerful tool. Adjust dimensions, change format, and reduce file size. Supports JPG, PNG, WebP. Fast, secure, and 100% free."
      heroDescription="Resize and compress your images with precision using our free online tool. Adjust dimensions, change formats, and optimize file sizes—all in one place."
      toolIcon={Image}
      toolInterface={toolInterface}
      steps={[
        {
          step: '1',
          title: 'Upload Your Image',
          description: 'Click the upload area or drag and drop your image file. Supports JPG, PNG, and WebP formats.',
        },
        {
          step: '2',
          title: 'Adjust Settings',
          description: 'Set your desired width, height, output format, and quality level. Lock aspect ratio to maintain proportions.',
        },
        {
          step: '3',
          title: 'Process Image',
          description: 'Click the process button to resize and compress your image with the selected settings.',
        },
        {
          step: '4',
          title: 'Download Result',
          description: 'Once complete, download your optimized image with the new dimensions and reduced file size.',
        },
      ]}
      faqs={[
        {
          question: 'Is this image resize and compress tool really free?',
          answer: 'Yes, our tool is completely free to use. There are no hidden charges, subscription fees, or watermarks on your processed images.',
        },
        {
          question: 'What does "maintain aspect ratio" mean?',
          answer: 'When aspect ratio is locked, the image proportions are preserved. If you change the width, the height adjusts automatically to prevent distortion.',
        },
        {
          question: 'Which format should I choose?',
          answer: 'JPEG is best for photos with good compression. PNG is ideal for graphics with transparency. WebP offers the best compression but may have limited compatibility with older software.',
        },
        {
          question: 'Are my images secure?',
          answer: 'Your privacy is our priority. All image processing happens directly in your browser—your images never leave your device and are not uploaded to any server.',
        },
        {
          question: 'What quality setting should I use?',
          answer: 'For most images, 80-90% quality provides an excellent balance between file size and visual quality. Lower values reduce file size more but may introduce visible artifacts.',
        },
        {
          question: 'Can I process multiple images at once?',
          answer: 'Currently, our tool processes one image at a time to ensure optimal quality and performance. You can process as many images as you need sequentially.',
        },
      ]}
    />
  );
}
