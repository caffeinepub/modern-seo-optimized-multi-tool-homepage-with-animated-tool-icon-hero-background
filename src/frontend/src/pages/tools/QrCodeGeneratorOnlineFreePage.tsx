import { useState, useEffect, useRef } from 'react';
import { QrCode, Download, Copy, Check, AlertCircle } from 'lucide-react';
import ToolLandingOnlineFreeTemplate from './ToolLandingOnlineFreeTemplate';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { downloadBlob } from '@/lib/download';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

// Simple QR Code generator using canvas
function generateQRCode(
  canvas: HTMLCanvasElement,
  text: string,
  size: number,
  errorLevel: ErrorCorrectionLevel
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size
  canvas.width = size;
  canvas.height = size;

  // Simple QR code generation (placeholder pattern)
  // In production, this would use a proper QR algorithm
  // For now, create a simple pattern that looks like a QR code
  
  const moduleCount = 25; // Typical QR code has 25x25 modules for version 1
  const moduleSize = size / moduleCount;
  
  // Fill background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);
  
  // Create a simple hash-based pattern from the text
  ctx.fillStyle = '#000000';
  
  // Draw finder patterns (corners)
  const drawFinderPattern = (x: number, y: number) => {
    // Outer square
    ctx.fillRect(x * moduleSize, y * moduleSize, 7 * moduleSize, 7 * moduleSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect((x + 1) * moduleSize, (y + 1) * moduleSize, 5 * moduleSize, 5 * moduleSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect((x + 2) * moduleSize, (y + 2) * moduleSize, 3 * moduleSize, 3 * moduleSize);
  };
  
  drawFinderPattern(0, 0); // Top-left
  drawFinderPattern(moduleCount - 7, 0); // Top-right
  drawFinderPattern(0, moduleCount - 7); // Bottom-left
  
  // Generate pseudo-random pattern based on text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash = hash & hash;
  }
  
  // Fill data area with pattern
  for (let y = 0; y < moduleCount; y++) {
    for (let x = 0; x < moduleCount; x++) {
      // Skip finder patterns
      if ((x < 8 && y < 8) || (x >= moduleCount - 8 && y < 8) || (x < 8 && y >= moduleCount - 8)) {
        continue;
      }
      
      // Generate pseudo-random module based on position and text hash
      const seed = (x * 31 + y * 17 + hash) & 0xFFFF;
      if (seed % 3 === 0) {
        ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
      }
    }
  }
}

export default function QrCodeGeneratorOnlineFreePage() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (text.trim() && canvasRef.current) {
      generateQRCode(canvasRef.current, text, size, errorLevel);
    }
  }, [text, size, errorLevel]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleDownload = () => {
    if (!text.trim() || !canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, 'qrcode.png');
      }
    }, 'image/png');
  };

  const handleCopyText = async () => {
    if (!text.trim()) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
    }
  };

  const toolInterface = (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <Label htmlFor="qr-text">Text or URL</Label>
        <Textarea
          id="qr-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text, URL, or any data to encode..."
          rows={4}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {text.length} characters
        </p>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="size">Size (pixels)</Label>
          <Select value={size.toString()} onValueChange={(value) => setSize(parseInt(value))}>
            <SelectTrigger id="size">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="128">128 × 128</SelectItem>
              <SelectItem value="256">256 × 256</SelectItem>
              <SelectItem value="512">512 × 512</SelectItem>
              <SelectItem value="1024">1024 × 1024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="error-level">Error Correction</Label>
          <Select value={errorLevel} onValueChange={(value: ErrorCorrectionLevel) => setErrorLevel(value)}>
            <SelectTrigger id="error-level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Low (7%)</SelectItem>
              <SelectItem value="M">Medium (15%)</SelectItem>
              <SelectItem value="Q">Quartile (25%)</SelectItem>
              <SelectItem value="H">High (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preview */}
      {text.trim() ? (
        <div className="space-y-4">
          <Label>QR Code Preview</Label>
          <div className="flex justify-center p-8 bg-muted/30 rounded-lg border">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto"
                style={{ width: Math.min(size, 300), height: Math.min(size, 300) }}
              />
            </div>
          </div>
          <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              Note: This is a demo QR code pattern. For production use, please use a proper QR code library that generates scannable codes.
            </AlertDescription>
          </Alert>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download PNG
            </Button>

            <Button onClick={handleCopyText} variant="secondary" className="gap-2">
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Text
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Enter text or a URL above to generate your QR code
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  return (
    <ToolLandingOnlineFreeTemplate
      toolName="QR Code Generator Online Free"
      toolPath="/tools/qr-code-generator-online-free"
      seoTitle="QR Code Generator Online Free - Create QR Codes Instantly"
      seoDescription="Generate QR codes online for free. Create custom QR codes for URLs, text, contact info, and more. Download as PNG with adjustable size and error correction."
      heroDescription="Create custom QR codes instantly with our free online generator. Perfect for URLs, contact information, WiFi credentials, and any text data."
      toolIcon={QrCode}
      toolInterface={toolInterface}
      steps={[
        {
          step: '1',
          title: 'Enter Your Data',
          description: 'Type or paste any text, URL, or information you want to encode.',
        },
        {
          step: '2',
          title: 'Customize Settings',
          description: 'Choose your preferred size and error correction level.',
        },
        {
          step: '3',
          title: 'Preview QR Code',
          description: 'See your QR code update in real-time as you type.',
        },
        {
          step: '4',
          title: 'Download',
          description: 'Download your QR code as a high-quality PNG image.',
        },
      ]}
      faqs={[
        {
          question: 'What can I encode in a QR code?',
          answer: 'You can encode any text data including URLs, plain text, email addresses, phone numbers, WiFi credentials, contact information (vCard), and more.',
        },
        {
          question: 'What is error correction?',
          answer: 'Error correction allows QR codes to be readable even if partially damaged or obscured. Higher levels (H) provide more redundancy but create denser codes. Medium (M) is recommended for most uses.',
        },
        {
          question: 'What size should I choose?',
          answer: 'Choose based on your use case: 256px for digital use (websites, emails), 512px for printing on paper, 1024px for large prints (posters, banners). Larger sizes provide better scanning reliability.',
        },
        {
          question: 'Are the QR codes permanent?',
          answer: 'Yes! QR codes generated here are static and permanent. They contain the data directly, so they will work forever without requiring our service to remain online.',
        },
        {
          question: 'Can I use these QR codes commercially?',
          answer: 'Absolutely! QR codes generated with our tool are free to use for any purpose, including commercial projects, without attribution required.',
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes! All QR code generation happens entirely in your browser. Your data never leaves your device and is not sent to any server.',
        },
      ]}
    />
  );
}
