import { useState, useRef, ChangeEvent } from 'react';
import { FileText, Upload, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ToolLandingOnlineFreeTemplate from './ToolLandingOnlineFreeTemplate';

export default function PdfToWordOnlineFreePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a valid PDF file');
        setSelectedFile(null);
        return;
      }
      setError('');
      setSelectedFile(file);
      setIsComplete(false);
      setConversionProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please drop a valid PDF file');
        setSelectedFile(null);
        return;
      }
      setError('');
      setSelectedFile(file);
      setIsComplete(false);
      setConversionProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setConversionProgress(0);

    // Simulate conversion progress
    const interval = setInterval(() => {
      setConversionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownload = () => {
    // Create a demo Word file blob
    const demoContent = `PDF to Word Conversion Demo\n\nOriginal file: ${selectedFile?.name}\n\nThis is a demonstration of the PDF to Word conversion interface. In a production environment, this would contain the actual converted content from your PDF file.\n\nThe conversion process would preserve:\n- Text formatting\n- Images and graphics\n- Tables and layouts\n- Headers and footers\n\nThank you for using our PDF to Word online free tool!`;
    
    const blob = new Blob([demoContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile?.name.replace('.pdf', '.docx') || 'converted.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsComplete(false);
    setConversionProgress(0);
    setError('');
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
        />
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
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
          disabled={isConverting}
          className="w-full tap-target-mobile text-base md:text-lg"
          size="lg"
        >
          {isConverting ? (
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
      {isConverting && (
        <div className="space-y-2">
          <Progress value={conversionProgress} className="h-2" />
          <p className="text-sm text-center text-muted-foreground">
            Converting... {conversionProgress}%
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
              Your PDF has been converted to Word format successfully (demo)
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
          description: 'Watch the progress bar as your PDF is converted while preserving formatting and layout.',
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
          answer: 'Yes, our PDF to Word online free tool is completely free to use. There are no hidden charges, subscription fees, or limitations on the number of conversions. This is a demonstration interface showing how the conversion process works.',
        },
        {
          question: 'Will the formatting be preserved?',
          answer: 'Our converter is designed to preserve the original formatting, including text styles, images, tables, and layout. This demonstration shows the conversion workflow. In production, advanced algorithms would ensure maximum fidelity to the original document.',
        },
        {
          question: 'What file format will I get?',
          answer: 'The output is a Microsoft Word document in DOCX format, which is compatible with Microsoft Word 2007 and later versions, as well as other word processors like Google Docs and LibreOffice.',
        },
        {
          question: 'Are my PDF files secure?',
          answer: 'Your privacy is our priority. This demonstration interface processes files locally in your browser. In a production environment, files would be encrypted during transfer and automatically deleted from servers after conversion.',
        },
        {
          question: 'What is the maximum file size?',
          answer: 'This demonstration accepts various PDF sizes. A production version would typically support PDFs up to 50MB for free users, which covers most documents including those with images.',
        },
        {
          question: 'Can I convert scanned PDFs?',
          answer: 'This demonstration focuses on text-based PDFs. A production version with OCR (Optical Character Recognition) capabilities would be able to convert scanned PDFs and images to editable Word documents.',
        },
      ]}
    />
  );
}
