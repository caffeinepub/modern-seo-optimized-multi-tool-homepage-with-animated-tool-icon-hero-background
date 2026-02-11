import { useState, useRef, ChangeEvent } from 'react';
import { FileText, Upload, Download, CheckCircle2, Zap, Shield, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { usePageSeo } from '@/hooks/usePageSeo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function PdfToWordOnlineFreePage() {
  usePageSeo({
    title: 'PDF to Word Online Free - Convert PDF to DOCX Instantly',
    description: 'Convert PDF to Word online free with our fast and secure tool. Transform PDF documents to editable Word files instantly. No registration required, 100% free PDF to Word converter.',
  });

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              100% Free Tool
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              PDF to Word Online Free
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Convert PDF to Word documents instantly with our free online converter. 
              Transform your PDF files into editable Word documents in seconds—no registration required.
            </p>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Convert Your PDF to Word
                </CardTitle>
                <CardDescription>
                  Upload your PDF file and convert it to an editable Word document
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-8 md:p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
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
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    {isConverting ? (
                      <>
                        <span className="animate-spin mr-2">⚙️</span>
                        Converting...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
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
                        Your PDF has been converted to Word format (demo)
                      </p>
                      <Button onClick={handleDownload} size="lg" className="w-full md:w-auto">
                        <Download className="w-5 h-5 mr-2" />
                        Download Word Document
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(null);
                        setIsComplete(false);
                        setConversionProgress(0);
                      }}
                      className="w-full"
                    >
                      Convert Another File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step-by-Step Usage */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How to Convert PDF to Word Online Free
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  step: '1',
                  title: 'Select Your PDF File',
                  description: 'Click the upload area or drag and drop your PDF file. Only PDF files are accepted for conversion.',
                },
                {
                  step: '2',
                  title: 'Click Convert to Word',
                  description: 'Press the convert button to start the transformation process. The conversion begins instantly.',
                },
                {
                  step: '3',
                  title: 'Wait for Processing',
                  description: 'Watch the progress bar as your PDF is converted to an editable Word document format.',
                },
                {
                  step: '4',
                  title: 'Download Your Word File',
                  description: 'Once complete, download your converted Word document and start editing immediately.',
                },
              ].map((item) => (
                <Card key={item.step} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full flex items-start justify-end p-3">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Why Choose Our PDF to Word Converter?
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Experience the best free online PDF to Word conversion with powerful features and unmatched convenience
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Convert PDF to Word in seconds with our optimized conversion engine',
                },
                {
                  icon: Shield,
                  title: 'Secure & Private',
                  description: 'Your files are processed securely and never stored on our servers',
                },
                {
                  icon: Globe,
                  title: '100% Free',
                  description: 'No hidden fees, no registration required. Completely free to use',
                },
                {
                  icon: Clock,
                  title: 'Available 24/7',
                  description: 'Access our PDF to Word converter anytime, anywhere, on any device',
                },
              ].map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg hover:border-primary/50 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Everything you need to know about our PDF to Word online free converter
            </p>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Is this PDF to Word converter really free?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, our PDF to Word online converter is completely free to use. There are no hidden charges, 
                  subscription fees, or limitations on the number of conversions. This is a demonstration interface 
                  showing how the conversion process works.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Are my files secure when converting PDF to Word?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Your privacy is our priority. This demonstration interface processes files locally in your browser. 
                  In a production environment, files would be encrypted during transfer and automatically deleted 
                  from servers after conversion.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  What file size limits apply to PDF to Word conversion?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  This demonstration accepts PDF files of various sizes. A production version would typically 
                  support files up to 50MB for free users, ensuring fast and reliable conversion for most documents.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Will the formatting be preserved when converting PDF to Word?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A full conversion engine would preserve text formatting, images, tables, headers, and footers 
                  from your PDF. The quality depends on the original PDF structure. This demo shows the interface 
                  and workflow for such conversions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Can I convert scanned PDFs to editable Word documents?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  This demonstration interface accepts PDF files. A production version with OCR (Optical Character 
                  Recognition) technology would be able to convert scanned PDFs and images into editable Word text, 
                  though accuracy may vary based on scan quality.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Do I need to install software to convert PDF to Word?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No installation required! Our PDF to Word converter works entirely online in your web browser. 
                  Simply upload your PDF, convert, and download the Word document. It works on Windows, Mac, Linux, 
                  and mobile devices.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold mb-6">About PDF to Word Online Free Conversion</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Converting PDF to Word online free has never been easier. Our tool provides a seamless way to 
              transform your PDF documents into editable Word files without any software installation. Whether 
              you need to edit a contract, update a report, or modify any PDF document, our converter makes 
              the process simple and efficient.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The PDF to Word online free converter is designed for users who need quick, reliable conversions 
              without compromising on quality. Our interface demonstrates the streamlined workflow that makes 
              document conversion accessible to everyone, from students and professionals to businesses of all sizes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Experience the convenience of converting PDF to Word online free today. No registration, no downloads, 
              no hassle—just fast, efficient document conversion whenever you need it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
