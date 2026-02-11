export interface TextCounts {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
  paragraphs: number;
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  if (!text.trim()) return 0;
  
  // Split by whitespace and filter out empty strings
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Count characters (with and without spaces)
 */
function countCharacters(text: string): { total: number; noSpaces: number } {
  return {
    total: text.length,
    noSpaces: text.replace(/\s/g, '').length,
  };
}

/**
 * Count lines in text
 */
function countLines(text: string): number {
  if (!text) return 0;
  
  // Split by newlines and count non-empty lines
  const lines = text.split('\n');
  return lines.length;
}

/**
 * Count paragraphs in text
 */
function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  
  // Split by double newlines or more, filter out empty paragraphs
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter(para => para.trim().length > 0);
  
  return paragraphs.length;
}

/**
 * Analyze text and return all counts
 */
export function analyzeText(text: string): TextCounts {
  const chars = countCharacters(text);
  
  return {
    words: countWords(text),
    characters: chars.total,
    charactersNoSpaces: chars.noSpaces,
    lines: countLines(text),
    paragraphs: countParagraphs(text),
  };
}
