import fs from 'fs-extra';
import path from 'path';
import { 
  fileExists,
  readFile,
  writeFile,
  getFileExtension,
  generateOutputPath
} from '../../utils/file-io.js';
import { FileOperationError, createFileOperationError } from '../../pdf-md/types.js';

// Mock fs-extra
jest.mock('fs-extra');

describe('File I/O Utils', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fileExists', () => {
    test('returns true when file exists', async () => {
      (fs.access as jest.Mock).mockResolvedValue(undefined);
      
      const result = await fileExists('/path/to/file.pdf');
      
      expect(result).toBe(true);
    });

    test('returns false when file does not exist', async () => {
      (fs.access as jest.Mock).mockRejectedValue(new Error('File not found'));
      
      const result = await fileExists('/path/to/nonexistent.pdf');
      
      expect(result).toBe(false);
    });
  });

  describe('readFile', () => {
    test('reads file successfully', async () => {
      const mockBuffer = Buffer.from('test content');
      (fs.readFile as jest.Mock).mockResolvedValue(mockBuffer);
      
      const result = await readFile('/path/to/file.pdf');
      
      expect(result).toBe(mockBuffer);
    });

    test('throws FileOperationError when file read fails', async () => {
      const mockError = new Error('Read error');
      (fs.readFile as jest.Mock).mockRejectedValue(mockError);
      
      await expect(readFile('/path/to/file.pdf')).rejects.toThrow();
      await expect(readFile('/path/to/file.pdf')).rejects.toMatchObject({
        message: expect.stringContaining('Failed to read file'),
        path: '/path/to/file.pdf',
        cause: mockError
      });
    });
  });

  describe('writeFile', () => {
    test('writes file successfully', async () => {
      (fs.ensureDir as jest.Mock).mockResolvedValue(undefined);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      
      const result = await writeFile('/path/to/file.md', 'content');
      
      expect(result).toBeUndefined();
    });

    test('throws FileOperationError when directory creation fails', async () => {
      const mockError = new Error('Directory creation error');
      (fs.ensureDir as jest.Mock).mockRejectedValue(mockError);
      
      await expect(writeFile('/path/to/file.md', 'content')).rejects.toThrow();
      await expect(writeFile('/path/to/file.md', 'content')).rejects.toMatchObject({
        message: expect.stringContaining('Failed to write file'),
        path: '/path/to/file.md',
        cause: mockError
      });
    });

    test('throws FileOperationError when file write fails', async () => {
      const mockError = new Error('Write error');
      (fs.ensureDir as jest.Mock).mockResolvedValue(undefined);
      (fs.writeFile as jest.Mock).mockRejectedValue(mockError);
      
      await expect(writeFile('/path/to/file.md', 'content')).rejects.toThrow();
    });
  });

  describe('getFileExtension', () => {
    test('returns the lowercase file extension with dot', () => {
      expect(getFileExtension('/path/to/file.PDF')).toBe('.pdf');
      expect(getFileExtension('/path/to/file.md')).toBe('.md');
      expect(getFileExtension('/path/to/file')).toBe('');
    });
  });

  describe('generateOutputPath', () => {
    test('returns the output path when specified', () => {
      expect(generateOutputPath('/path/to/file.pdf', '/path/to/output.md')).toBe('/path/to/output.md');
    });

    test('generates output path from input path when not specified', () => {
      expect(generateOutputPath('/path/to/file.pdf')).toBe('/path/to/file.md');
      expect(generateOutputPath('/path/to/document.PDF')).toBe('/path/to/document.md');
    });
  });
});