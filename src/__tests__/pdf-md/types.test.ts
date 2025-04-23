import { ElementType, DEFAULT_CONVERSION_OPTIONS, PDFParsingError, MarkdownFormattingError, FileOperationError } from '../../pdf-md/types.js';

describe('Types', () => {
  test('ElementType enum has expected values', () => {
    expect(ElementType.Paragraph).toBe('paragraph');
    expect(ElementType.Heading).toBe('heading');
    expect(ElementType.List).toBe('list');
    expect(ElementType.ListItem).toBe('listItem');
    expect(ElementType.Table).toBe('table');
    expect(ElementType.TableRow).toBe('tableRow');
    expect(ElementType.TableCell).toBe('tableCell');
    expect(ElementType.Link).toBe('link');
    expect(ElementType.LineBreak).toBe('lineBreak');
  });

  test('DEFAULT_CONVERSION_OPTIONS has expected values', () => {
    expect(DEFAULT_CONVERSION_OPTIONS.includePageNumbers).toBe(false);
    expect(DEFAULT_CONVERSION_OPTIONS.preserveFontStyles).toBe(true);
    expect(DEFAULT_CONVERSION_OPTIONS.detectLists).toBe(true);
    expect(DEFAULT_CONVERSION_OPTIONS.detectTables).toBe(true);
    expect(DEFAULT_CONVERSION_OPTIONS.detectLinks).toBe(true);
    expect(DEFAULT_CONVERSION_OPTIONS.maxLineLength).toBe(80);
  });

  test('PDFParsingError has expected properties', () => {
    const error = new PDFParsingError('Test error', new Error('Cause'));
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('PDFParsingError');
    expect(error.cause).toBeInstanceOf(Error);
  });

  test('MarkdownFormattingError has expected properties', () => {
    const error = new MarkdownFormattingError('Test error', new Error('Cause'));
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('MarkdownFormattingError');
    expect(error.cause).toBeInstanceOf(Error);
  });

  test('FileOperationError has expected properties', () => {
    const error = new FileOperationError('Test error', '/path/to/file', new Error('Cause'));
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('FileOperationError');
    expect(error.path).toBe('/path/to/file');
    expect(error.cause).toBeInstanceOf(Error);
  });
});