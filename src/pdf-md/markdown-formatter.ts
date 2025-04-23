import { 
  Document, 
  Element, 
  ElementType, 
  TextElement, 
  HeadingElement, 
  ParagraphElement,
  ListElement,
  ListItemElement,
  TableElement,
  LinkElement,
  ConversionOptions,
  DEFAULT_CONVERSION_OPTIONS,
  MarkdownFormattingError 
} from './types.js';
import { logger } from '../utils/logger.js';

/**
 * Format document as Markdown
 */
export function formatToMarkdown(
  document: Document, 
  options: Partial<ConversionOptions> = {}
): string {
  try {
    const mergedOptions = { ...DEFAULT_CONVERSION_OPTIONS, ...options };
    logger.info('Formatting document to Markdown...');
    
    // In a real implementation, this would format all elements to Markdown
    let markdown = '';
    
    for (const page of document.pages) {
      if (mergedOptions.includePageNumbers) {
        markdown += `\n<!-- Page ${page.pageNumber} -->\n\n`;
      }
      
      for (const element of page.elements) {
        markdown += formatElement(element, mergedOptions);
      }
    }
    
    return markdown.trim();
  } catch (error) {
    throw new MarkdownFormattingError('Failed to format document to Markdown', error);
  }
}

/**
 * Format a single element as Markdown
 */
function formatElement(element: Element, options: ConversionOptions): string {
  switch (element.type) {
    case ElementType.Heading:
      return formatHeading(element as HeadingElement);
    case ElementType.Paragraph:
      return formatParagraph(element as ParagraphElement);
    default:
      return '';
  }
}

/**
 * Format heading as Markdown
 */
function formatHeading(heading: HeadingElement): string {
  const hashes = '#'.repeat(heading.level);
  return `${hashes} ${heading.text}\n\n`;
}

/**
 * Format paragraph as Markdown
 */
function formatParagraph(paragraph: ParagraphElement): string {
  return `${paragraph.text}\n\n`;
}