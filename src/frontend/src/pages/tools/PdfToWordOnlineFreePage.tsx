import { useState, useRef, ChangeEvent } from 'react';
import { FileText, Upload, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ToolLandingOnlineFreeTemplate from './ToolLandingOnlineFreeTemplate';
import { useProcessFile } from '@/hooks/useQueries';
import { downloadProcessedFile } from '@/lib/download';

export default function PdfToWordOnlineFreePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
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
      if (file.type !== 'application/pdf') {
        processFileMutation.reset();
        setSelectedFile(null);
        setProcessedData(null);
        setUploadProgress(0);
        return;
      }
      processFileMutation.reset();
      setSelectedFile(file);
      setProcessedData(null);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        processFileMutation.reset();
        setSelectedFile(null);
        setProcessedData(null);
        setUploadProgress(0);
        return;
      }
      processFileMutation.reset();
      setSelectedFile(file);
      setProcessedData(null);
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setUploadProgress(0);
    setProcessedData(null);

    processFileMutation.mutate(
      {
        file: selectedFile,
        operation: 'pdf-to-word',
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
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`border-2 border-dashed border-border rounded-lg p-6 md:p-12 text-center transition-all duration-300 tap-target ${
          isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-primary/5'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-base md:text-lg font-medium mb-2">
          {selectedFile ? selectedFile.name : 'Drop your PDF here or click to browse'}
        </p>
        <p className="text-sm text-muted-foreground">
          Supports PDF files only
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Select PDF file"
          disabled={isProcessing}
        />
      </div>

      {/* Error Alert */}
      {hasError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {processFileMutation.error?.message || 'An error occurred during conversion. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {/* File Details */}
      {selectedFile && !isComplete && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Convert Button */}
      {selectedFile && !isComplete && (
        <Button
          onClick={handleConvert}
          disabled={isProcessing}
          className="w-full tap-target-mobile text-base md:text-lg"
          size="lg"
        >
          {isProcessing ? (
            <>
              <span className="animate-spin mr-2">⚙️</span>
              Converting...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 mr-2" />
              Convert to Word
            </>
          )}
        </Button>
      )}

      {/* Progress Bar */}
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-center text-muted-foreground">
            {uploadProgress < 100 ? `Processing... ${uploadProgress}%` : 'Finalizing conversion...'}
          </p>
        </div>
      )}

      {/* Success & Download */}
      {isComplete && (
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Conversion Complete!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your PDF has been converted to Word format successfully
            </p>
            <Button onClick={handleDownload} size="lg" className="w-full md:w-auto tap-target-mobile">
              <Download className="w-5 h-5 mr-2" />
              Download Word Document
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full tap-target"
          >
            Convert Another PDF
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <ToolLandingOnlineFreeTemplate
      toolName="PDF to Word Online Free"
      toolPath="/tools/pdf-to-word-online-free"
      seoTitle="PDF to Word Online Free - Convert PDF to DOCX Instantly"
      seoDescription="Convert PDF to Word online free with our fast and secure tool. Transform PDF documents to editable Word files instantly. No registration required, 100% free PDF to Word converter."
      heroDescription="Convert PDF to Word documents instantly with our free online converter. Transform your PDF files into editable Word documents in seconds—no registration required."
      toolIcon={FileText}
      toolInterface={toolInterface}
      steps={[
        {
          step: '1',
          title: 'Select Your PDF File',
          description: 'Click the upload area or drag and drop your PDF file. Only PDF format is supported.',
        },
        {
          step: '2',
          title: 'Click Convert to Word',
          description: 'Press the convert button to start transforming your PDF into an editable Word document.',
        },
        {
          step: '3',
          title: 'Wait for Processing',
          description: 'Watch the progress bar as your PDF is processed and converted while extracting text content.',
        },
        {
          step: '4',
          title: 'Download Word Document',
          description: 'Once complete, download your converted Word document ready for editing.',
        },
      ]}
      faqs={[
        {
          question: 'Is this PDF to Word converter really free?',
          answer: 'Yes, our PDF to Word online free tool is completely free to use. There are no hidden charges, subscription fees, or limitations on the number of conversions.',
        },
        {
          question: 'Will the formatting be preserved?',
          answer: 'Our converter extracts text content from PDFs and creates editable Word documents. Basic text formatting is preserved, though complex layouts may require manual adjustment.',
        },
        {
          question: 'What file format will I get?',
          answer: 'The output is a Microsoft Word document in DOCX format, which is compatible with Microsoft Word 2007 and later versions, as well as other word processors like Google Docs and LibreOffice.',
        },
        {
          question: 'Are my PDF files secure?',
          answer: 'Your privacy is our priority. All processing happens directly in your browser—your files never leave your device and are not uploaded to any server.',
        },
        {
          question: 'What is the maximum file size?',
          answer: 'Since processing happens in your browser, file size limits depend on your device\'s memory. Most PDFs up to 50MB should work without issues.',
        },
        {
          question: 'Can I convert scanned PDFs?',
          answer: 'This tool works best with text-based PDFs. Scanned PDFs (images of documents) may not produce optimal results as they require OCR (Optical Character Recognition) capabilities.',
        },
      ]}
    />
  );
}
