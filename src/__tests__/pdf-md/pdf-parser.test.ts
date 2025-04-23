import { parsePdf } from '../../pdf-md/pdf-parser.js';
import { ElementType, HeadingElement, ParagraphElement, PDFParsingError, createPDFParsingError } from '../../pdf-md/types.js';
import * as pdfjs from 'pdfjs-dist';

// Mock pdfjs-dist
jest.mock('pdfjs-dist');

describe('PDF Parser', () => {
  test('parsePdf returns document with expected structure', async () => {
    const mockBuffer = Buffer.from('mock pdf content');
    
    const document = await parsePdf(mockBuffer);
    
    expect(document).toBeDefined();
    expect(document.pages).toHaveLength(1);
    expect(document.pages?.[0]?.pageNumber).toBe(1);
    expect(document.pages?.[0]?.elements).toHaveLength(2);
    
    // Check heading element
    const headingElement = document.pages?.[0]?.elements?.[0] as HeadingElement;
    expect(headingElement.type).toBe(ElementType.Heading);
    expect(headingElement.text).toBe('Sample Heading');
    expect(headingElement.level).toBe(1);
    
    // Check paragraph element
    const paragraphElement = document.pages?.[0]?.elements?.[1] as ParagraphElement;
    expect(paragraphElement.type).toBe(ElementType.Paragraph);
    expect(paragraphElement.text).toBe('This is a sample paragraph.');
  });

  test('parsePdf throws PDFParsingError when PDF parsing fails', async () => {
    const mockBuffer = Buffer.from('invalid pdf content');
    const mockError = new Error('PDF parsing error');
    
    // Mock pdfjs to throw an error
    jest.spyOn(pdfjs, 'getDocument').mockImplementation(() => {
      throw mockError;
    });
    
    await expect(parsePdf(mockBuffer)).rejects.toThrow();
  });
});