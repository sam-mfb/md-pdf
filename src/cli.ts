import { Command } from 'commander';
import { DEFAULT_CONVERSION_OPTIONS } from './pdf-md/types.js';

/**
 * CLI program
 */
export function createProgram(): Command {
  const program = new Command();
  
  program
    .name('md-pdf')
    .description('Convert PDF files to Markdown')
    .version('0.1.0')
    .requiredOption('-i, --input <path>', 'Input PDF file path')
    .option('-o, --output <path>', 'Output Markdown file path')
    .option('--page-numbers', 'Include page numbers', DEFAULT_CONVERSION_OPTIONS.includePageNumbers)
    .option('--no-font-styles', 'Do not preserve font styles', DEFAULT_CONVERSION_OPTIONS.preserveFontStyles)
    .option('--no-lists', 'Do not detect lists', DEFAULT_CONVERSION_OPTIONS.detectLists)
    .option('--no-tables', 'Do not detect tables', DEFAULT_CONVERSION_OPTIONS.detectTables)
    .option('--no-links', 'Do not detect links', DEFAULT_CONVERSION_OPTIONS.detectLinks)
    .option('--max-line-length <number>', 'Maximum line length', String(DEFAULT_CONVERSION_OPTIONS.maxLineLength))
  
  return program;
}

/**
 * Run the CLI application
 */
export async function run(): Promise<void> {
  const program = createProgram();
  program.parse();
  
  const options = program.opts();
  
  // In a real implementation, we would process the PDF here
  console.log('Options:', options);
}