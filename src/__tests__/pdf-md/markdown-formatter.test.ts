import { formatToMarkdown } from '../../pdf-md/markdown-formatter.js';
import { 
  Document, 
  ElementType, 
  HeadingElement, 
  ParagraphElement, 
  MarkdownFormattingError 
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
    
    expect(markdown).toContain('<!-- Page 1 -->');
    expect(markdown).toContain('<!-- Page 2 -->');
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
    
    expect(() => formatToMarkdown(invalidDocument)).toThrow(MarkdownFormattingError);
  });
});