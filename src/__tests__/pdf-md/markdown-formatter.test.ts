import { formatToMarkdown } from '../../pdf-md/markdown-formatter.js';
import { 
  Document, 
  ElementType, 
  HeadingElement, 
  ParagraphElement, 
  MarkdownFormattingError,
  createMarkdownFormattingError 
} from '../../pdf-md/types.js';

describe('Markdown Formatter', () => {
  // Sample document for testing
  const sampleDocument: Document = {
    title: 'Sample Document',
    pages: [
      {
        pageNumber: 1,
        elements: [
          {
            type: ElementType.Heading,
            text: 'Sample Heading',
            level: 1,
          } as HeadingElement,
          {
            type: ElementType.Paragraph,
            text: 'This is a sample paragraph.',
          } as ParagraphElement,
        ],
      },
      {
        pageNumber: 2,
        elements: [
          {
            type: ElementType.Heading,
            text: 'Second Page Heading',
            level: 2,
          } as HeadingElement,
          {
            type: ElementType.Paragraph,
            text: 'Another paragraph on the second page.',
          } as ParagraphElement,
        ],
      },
    ],
    elements: [],
  };

  test('formatToMarkdown formats document correctly with default options', () => {
    const markdown = formatToMarkdown(sampleDocument);
    
    expect(markdown).toBe(
      '# Sample Heading\n\n' +
      'This is a sample paragraph.\n\n' +
      '## Second Page Heading\n\n' +
      'Another paragraph on the second page.'
    );
  });

  test('formatToMarkdown includes page numbers when option is enabled', () => {
    const markdown = formatToMarkdown(sampleDocument, { includePageNumbers: true });
    
    expect(markdown).toBe(
      '<!-- Page 1 -->\n' +
      '# Sample Heading\n\n' +
      'This is a sample paragraph.\n\n' +
      '<!-- Page 2 -->\n' +
      '## Second Page Heading\n\n' +
      'Another paragraph on the second page.'
    );
  });
  
  test('formatToMarkdown combines elements across pages when page numbers are disabled', () => {
    // Create a document with a paragraph split across two pages
    const documentWithSplitParagraph: Document = {
      title: 'Split Paragraph Document',
      pages: [
        {
          pageNumber: 1,
          elements: [
            {
              type: ElementType.Paragraph,
              text: 'This is the first part of a paragraph that ',
            } as ParagraphElement,
          ],
        },
        {
          pageNumber: 2,
          elements: [
            {
              type: ElementType.Paragraph,
              text: 'continues on the second page.',
            } as ParagraphElement,
          ],
        },
      ],
      elements: [],
    };
    
    const markdown = formatToMarkdown(documentWithSplitParagraph);
    
    expect(markdown).toBe(
      'This is the first part of a paragraph that continues on the second page.'
    );
  });

  test('formatToMarkdown throws MarkdownFormattingError when formatting fails', () => {
    // Create a document with an invalid element to cause an error
    const invalidDocument = {
      ...sampleDocument,
      pages: [
        {
          pageNumber: 1,
          elements: [
            // @ts-expect-error - Intentionally creating an invalid element
            { type: 'invalidType' }
          ],
        },
      ],
    };
    
    expect(() => formatToMarkdown(invalidDocument as any)).toThrow();
  });
});