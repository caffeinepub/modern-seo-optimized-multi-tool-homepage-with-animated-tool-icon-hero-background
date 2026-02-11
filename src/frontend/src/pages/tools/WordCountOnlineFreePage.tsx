import { useState, useEffect } from 'react';
import { FileText, Copy, RotateCcw, Check } from 'lucide-react';
import ToolLandingOnlineFreeTemplate from './ToolLandingOnlineFreeTemplate';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { analyzeText, type TextCounts } from '@/lib/textCounts';

export default function WordCountOnlineFreePage() {
  const [text, setText] = useState('');
  const [counts, setCounts] = useState<TextCounts>({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    lines: 0,
    paragraphs: 0,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newCounts = analyzeText(text);
    setCounts(newCounts);
  }, [text]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
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

  const handleReset = () => {
    setText('');
  };

  const toolInterface = (
    <div className="space-y-6">
      {/* Text Input */}
      <div>
        <Label htmlFor="text-input">Enter or paste your text</Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          rows={12}
          className="resize-none font-mono text-sm"
        />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {counts.words.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">Words</div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {counts.characters.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">Characters</div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {counts.charactersNoSpaces.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">No Spaces</div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {counts.lines.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">Lines</div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {counts.paragraphs.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">Paragraphs</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Avg. Word Length:</span>
              <span className="ml-2 font-medium">
                {counts.words > 0
                  ? (counts.charactersNoSpaces / counts.words).toFixed(1)
                  : '0'}{' '}
                chars
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Avg. Words/Line:</span>
              <span className="ml-2 font-medium">
                {counts.lines > 0 ? (counts.words / counts.lines).toFixed(1) : '0'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Reading Time:</span>
              <span className="ml-2 font-medium">
                {Math.ceil(counts.words / 200)} min
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Speaking Time:</span>
              <span className="ml-2 font-medium">
                {Math.ceil(counts.words / 130)} min
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCopy} disabled={!text.trim()} className="gap-2">
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

        <Button onClick={handleReset} variant="outline" disabled={!text.trim()} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Clear
        </Button>
      </div>
    </div>
  );

  return (
    <ToolLandingOnlineFreeTemplate
      toolName="Word Count Online Free"
      toolPath="/tools/word-count-online-free"
      seoTitle="Word Count Online Free - Character Counter & Text Analyzer"
      seoDescription="Count words, characters, lines, and paragraphs online for free. Real-time text analysis with reading time estimates. Perfect for writers, students, and content creators."
      heroDescription="Analyze your text instantly with our free word counter. Get accurate counts for words, characters, lines, paragraphs, plus reading time estimates."
      toolIcon={FileText}
      toolInterface={toolInterface}
      steps={[
        {
          step: '1',
          title: 'Enter Text',
          description: 'Type or paste your text into the editor area.',
        },
        {
          step: '2',
          title: 'View Live Counts',
          description: 'Watch as word, character, line, and paragraph counts update in real-time.',
        },
        {
          step: '3',
          title: 'Check Statistics',
          description: 'Review detailed statistics including reading time and average word length.',
        },
        {
          step: '4',
          title: 'Copy or Clear',
          description: 'Copy your text to clipboard or clear to start fresh.',
        },
      ]}
      faqs={[
        {
          question: 'How are words counted?',
          answer: 'Words are counted by splitting text on whitespace. Any sequence of characters separated by spaces, tabs, or line breaks counts as one word.',
        },
        {
          question: 'What is the difference between characters and characters without spaces?',
          answer: 'Characters includes all characters including spaces, tabs, and line breaks. Characters without spaces only counts letters, numbers, and punctuation marks.',
        },
        {
          question: 'How is reading time calculated?',
          answer: 'Reading time is estimated at 200 words per minute, which is the average reading speed for adults. Speaking time is estimated at 130 words per minute.',
        },
        {
          question: 'How are paragraphs counted?',
          answer: 'Paragraphs are counted by identifying blocks of text separated by blank lines (double line breaks). Single line breaks within a paragraph do not create a new paragraph.',
        },
        {
          question: 'Is there a character limit?',
          answer: 'No! You can analyze text of any length. The tool processes everything entirely in your browser, so there are no server-side limitations.',
        },
        {
          question: 'Is my text saved or stored?',
          answer: 'No. All text analysis happens entirely in your browser. Your text is never sent to any server and is not saved or stored anywhere.',
        },
      ]}
    />
  );
}
