import { convertPdfToMarkdown } from '../../pdf-md/index.js';
import { parsePdf } from '../../pdf-md/pdf-parser.js';
import { formatToMarkdown } from '../../pdf-md/markdown-formatter.js';
import { 
  readFile, 
  writeFile, 
  fileExists, 
  generateOutputPath 
} from '../../utils/file-io.js';

// Mock dependencies
jest.mock('../../pdf-md/pdf-parser.js');
jest.mock('../../pdf-md/markdown-formatter.js');
jest.mock('../../utils/file-io.js');

describe('PDF to Markdown Converter', () => {
  beforeEach(() => {
    // Reset mocks
    jest.resetAllMocks();
    
    // Setup common mock implementations
    (fileExists as jest.Mock).mockResolvedValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('mock pdf content'));
    (generateOutputPath as jest.Mock).mockImplementation((input) => `${input.replace('.pdf', '.md')}`);
    (parsePdf as jest.Mock).mockResolvedValue({ 
      title: 'Mock Document',
      pages: [
        {
          pageNumber: 1,
          elements: []
        }
      ],
      elements: []
    });
    (formatToMarkdown as jest.Mock).mockReturnValue('# Mock Markdown');
  });

  test('convertPdfToMarkdown reads, parses, and formats PDF correctly', async () => {
    const result = await convertPdfToMarkdown('/path/to/input.pdf', '/path/to/output.md');
    
    expect(fileExists).toHaveBeenCalledWith('/path/to/input.pdf');
    expect(readFile).toHaveBeenCalledWith('/path/to/input.pdf');
    expect(parsePdf).toHaveBeenCalledWith(expect.any(Buffer));
    expect(formatToMarkdown).toHaveBeenCalled();
    expect(writeFile).toHaveBeenCalledWith('/path/to/output.md', '# Mock Markdown');
    expect(result).toBe('# Mock Markdown');
  });

  test('convertPdfToMarkdown generates output path when not provided', async () => {
    await convertPdfToMarkdown('/path/to/input.pdf');
    
    expect(generateOutputPath).toHaveBeenCalledWith('/path/to/input.pdf');
    expect(writeFile).toHaveBeenCalledWith('/path/to/input.md', '# Mock Markdown');
  });

  test('convertPdfToMarkdown throws error when input file does not exist', async () => {
    (fileExists as jest.Mock).mockResolvedValue(false);
    
    await expect(convertPdfToMarkdown('/path/to/nonexistent.pdf')).rejects.toThrow(
      'Input file not found: /path/to/nonexistent.pdf'
    );
    
    expect(readFile).not.toHaveBeenCalled();
  });

  test('convertPdfToMarkdown passes options to formatToMarkdown', async () => {
    const options = { 
      includePageNumbers: true,
      preserveFontStyles: false
    };
    
    await convertPdfToMarkdown('/path/to/input.pdf', '/path/to/output.md', options);
    
    expect(formatToMarkdown).toHaveBeenCalledWith(expect.anything(), options);
  });
});