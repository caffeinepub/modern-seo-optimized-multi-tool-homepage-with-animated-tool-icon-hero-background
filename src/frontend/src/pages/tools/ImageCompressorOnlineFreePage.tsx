import { useState, useRef, ChangeEvent } from 'react';
import { Image, Upload, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ToolLandingOnlineFreeTemplate from './ToolLandingOnlineFreeTemplate';

export default function ImageCompressorOnlineFreePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, GIF, WebP)');
        setSelectedFile(null);
        setPreviewUrl('');
        return;
      }
      setError('');
      setSelectedFile(file);
      setIsComplete(false);
      setCompressionProgress(0);
      
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
        setError('Please drop a valid image file (JPG, PNG, GIF, WebP)');
        setSelectedFile(null);
        setPreviewUrl('');
        return;
      }
      setError('');
      setSelectedFile(file);
      setIsComplete(false);
      setCompressionProgress(0);
      
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

    setIsCompressing(true);
    setCompressionProgress(0);

    // Simulate compression progress
    const interval = setInterval(() => {
      setCompressionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompressing(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownload = () => {
    if (!selectedFile) return;
    
    // In a real implementation, this would download the compressed image
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `compressed-${selectedFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsComplete(false);
    setCompressionProgress(0);
    setError('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
  };

  const toolInterface = (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-lg p-6 md:p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 tap-target"
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
        />
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
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
          disabled={isCompressing}
          className="w-full tap-target-mobile text-base md:text-lg"
          size="lg"
        >
          {isCompressing ? (
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
      {isCompressing && (
        <div className="space-y-2">
          <Progress value={compressionProgress} className="h-2" />
          <p className="text-sm text-center text-muted-foreground">
            Compressing... {compressionProgress}%
          </p>
        </div>
      )}

      {/* Success & Download */}
      {isComplete && (
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Compression Complete!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your image has been compressed successfully (demo)
            </p>
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
      seoDescription="Compress images online free with our fast image compressor. Reduce image file size while maintaining quality. Free image compression tool for JPG, PNG, GIF, and WebP formats."
      heroDescription="Reduce image file sizes instantly with our free online image compressor. Compress JPG, PNG, GIF, and WebP images while maintaining quality—no registration required."
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
          description: 'Press the compress button to start reducing your image file size instantly.',
        },
        {
          step: '3',
          title: 'Wait for Processing',
          description: 'Watch the progress bar as your image is compressed while maintaining quality.',
        },
        {
          step: '4',
          title: 'Download Compressed Image',
          description: 'Once complete, download your compressed image with reduced file size.',
        },
      ]}
      faqs={[
        {
          question: 'Is this image compressor really free?',
          answer: 'Yes, our image compressor online free tool is completely free to use. There are no hidden charges, subscription fees, or limitations on the number of compressions. This is a demonstration interface showing how the compression process works.',
        },
        {
          question: 'Will image compression reduce quality?',
          answer: 'Our image compressor is designed to reduce file size while maintaining visual quality. This demonstration shows the compression workflow. In production, advanced algorithms would optimize images to achieve the best balance between file size and quality.',
        },
        {
          question: 'What image formats are supported?',
          answer: 'This tool supports the most common image formats including JPG/JPEG, PNG, GIF, and WebP. These formats cover the vast majority of images used on websites and in digital media.',
        },
        {
          question: 'Are my images secure when compressing?',
          answer: 'Your privacy is our priority. This demonstration interface processes files locally in your browser. In a production environment, images would be encrypted during transfer and automatically deleted from servers after compression.',
        },
        {
          question: 'What is the maximum file size for image compression?',
          answer: 'This demonstration accepts various image sizes. A production version would typically support images up to 25MB for free users, which covers most use cases including high-resolution photos.',
        },
        {
          question: 'How much can I reduce my image file size?',
          answer: 'Compression results vary depending on the original image format and content. Typically, you can expect 40-70% file size reduction for JPG images and 50-80% for PNG images while maintaining good visual quality.',
        },
      ]}
    />
  );
}
