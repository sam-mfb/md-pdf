import { ConversionOptions, DEFAULT_CONVERSION_OPTIONS } from './types.js';
import { parsePdf } from './pdf-parser.js';
import { formatToMarkdown } from './markdown-formatter.js';
import { readFile, writeFile, fileExists, generateOutputPath } from '../utils/file-io.js';
import { logger } from '../utils/logger.js';

/**
 * Convert PDF to Markdown
 */
export async function convertPdfToMarkdown(
  inputPath: string,
  outputPath?: string,
  options: Partial<ConversionOptions> = {}
): Promise<string> {
  // Validate input file
  logger.info(`Checking input file: ${inputPath}`);
  if (!(await fileExists(inputPath))) {
    throw new Error(`Input file not found: ${inputPath}`);
  }
  
  // Generate output path if not provided
  const finalOutputPath = outputPath ? outputPath : generateOutputPath(inputPath);
  
  // Merge options with defaults
  const mergedOptions = { ...DEFAULT_CONVERSION_OPTIONS, ...options };
  
  // Read PDF file
  logger.info(`Reading PDF file: ${inputPath}`);
  const pdfBuffer = await readFile(inputPath);
  
  // Parse PDF content
  logger.info('Parsing PDF content...');
  const document = await parsePdf(pdfBuffer);
  
  // Format to Markdown
  logger.info('Formatting to Markdown...');
  const markdown = formatToMarkdown(document, mergedOptions);
  
  // Write output file if path is provided
  if (finalOutputPath) {
    logger.info(`Writing Markdown to: ${finalOutputPath}`);
    await writeFile(finalOutputPath, markdown);
  }
  
  return markdown;
}