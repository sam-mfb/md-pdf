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
 * PDF parsing error
 */
export class PDFParsingError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'PDFParsingError';
  }
}

/**
 * Markdown formatting error
 */
export class MarkdownFormattingError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'MarkdownFormattingError';
  }
}

/**
 * File operation error
 */
export class FileOperationError extends Error {
  constructor(message: string, public readonly path: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'FileOperationError';
  }
}