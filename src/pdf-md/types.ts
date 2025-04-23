/**
 * Text style information from PDF
 */
export type TextStyle = {
  isBold: boolean;
  isItalic: boolean;
  isUnderlined: boolean;
  fontSize?: number;
  fontFamily?: string;
};

/**
 * Types of document elements
 */
export enum ElementType {
  Paragraph = 'paragraph',
  Heading = 'heading',
  List = 'list',
  ListItem = 'listItem',
  Table = 'table',
  TableRow = 'tableRow',
  TableCell = 'tableCell',
  Link = 'link',
  LineBreak = 'lineBreak'
}

/**
 * Basic document element interface
 */
export interface Element {
  type: ElementType;
  style?: TextStyle;
}

/**
 * Text content interface
 */
export interface TextElement extends Element {
  text: string;
}

/**
 * Paragraph element
 */
export interface ParagraphElement extends TextElement {
  type: ElementType.Paragraph;
}

/**
 * Heading level (1-6)
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Heading element
 */
export interface HeadingElement extends TextElement {
  type: ElementType.Heading;
  level: HeadingLevel;
}

/**
 * List element that contains list items
 */
export interface ListElement extends Element {
  type: ElementType.List;
  items: ListItemElement[];
  ordered: boolean;
}

/**
 * Individual list item element
 */
export interface ListItemElement extends Element {
  type: ElementType.ListItem;
  content: TextElement[];
}

/**
 * Table element
 */
export interface TableElement extends Element {
  type: ElementType.Table;
  rows: TableRowElement[];
  hasHeader: boolean;
}

/**
 * Table row element
 */
export interface TableRowElement extends Element {
  type: ElementType.TableRow;
  cells: TableCellElement[];
}

/**
 * Table cell element
 */
export interface TableCellElement extends Element {
  type: ElementType.TableCell;
  content: TextElement[];
}

/**
 * Link element
 */
export interface LinkElement extends TextElement {
  type: ElementType.Link;
  url: string;
}

/**
 * Document page
 */
export interface Page {
  pageNumber: number;
  elements: Element[];
}

/**
 * Complete parsed document
 */
export interface Document {
  title?: string;
  author?: string;
  pages: Page[];
  elements: Element[];
}

/**
 * Conversion options
 */
export interface ConversionOptions {
  includePageNumbers: boolean;
  preserveFontStyles: boolean;
  detectLists: boolean;
  detectTables: boolean;
  detectLinks: boolean; 
  maxLineLength?: number;
}

/**
 * Default conversion options
 */
export const DEFAULT_CONVERSION_OPTIONS: ConversionOptions = {
  includePageNumbers: false,
  preserveFontStyles: true,
  detectLists: true,
  detectTables: true,
  detectLinks: true,
  maxLineLength: 80
};

/**
 * PDF parsing error type
 */
export type PDFParsingError = {
  name: 'PDFParsingError';
  message: string;
  cause?: unknown;
};

/**
 * Create a PDF parsing error
 */
export const createPDFParsingError = (message: string, cause?: unknown): PDFParsingError & Error => {
  const error = new Error(message) as PDFParsingError & Error;
  error.name = 'PDFParsingError';
  error.cause = cause;
  return error;
};

/**
 * Markdown formatting error type
 */
export type MarkdownFormattingError = {
  name: 'MarkdownFormattingError';
  message: string;
  cause?: unknown;
};

/**
 * Create a markdown formatting error
 */
export const createMarkdownFormattingError = (message: string, cause?: unknown): MarkdownFormattingError & Error => {
  const error = new Error(message) as MarkdownFormattingError & Error;
  error.name = 'MarkdownFormattingError';
  error.cause = cause;
  return error;
};

/**
 * File operation error type
 */
export type FileOperationError = {
  name: 'FileOperationError';
  message: string;
  path: string;
  cause?: unknown;
};

/**
 * Create a file operation error
 */
export const createFileOperationError = (message: string, path: string, cause?: unknown): FileOperationError & Error => {
  const error = new Error(message) as FileOperationError & Error;
  error.name = 'FileOperationError';
  error.path = path;
  error.cause = cause;
  return error;
};