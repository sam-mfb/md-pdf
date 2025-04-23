# Development Plan for PDF to Markdown CLI Utility

## Overview

Create a Node.js CLI utility that converts simple PDF files (text-based without complex graphics, custom fonts, embedded objects, or JavaScript) into clean Markdown format.

## Files to Create

### Core Infrastructure

- `/package.json` - Project configuration, dependencies, scripts
- `/tsconfig.json` - TypeScript compiler options
- `/.gitignore` - Files to exclude from git
- `/bin/md-pdf.js` - Executable script for the CLI

### Source Files

- `/src/index.ts` - Main entry point that ties modules together
- `/src/cli.ts` - CLI argument parsing and command handling
- `/src/pdf-md/index.ts` - Main conversion orchestration
- `/src/pdf-md/types.ts` - TypeScript interfaces and types
- `/src/pdf-md/pdf-parser.ts` - PDF text extraction logic
- `/src/pdf-md/markdown-formatter.ts` - Convert parsed content to Markdown
- `/src/utils/file-io.ts` - File system operations
- `/src/utils/logger.ts` - Logging utility

### Tests

- `/src/__tests__/pdf-parser.test.ts` - Tests for pdf parsing
- `/src/__tests__/markdown-formatter.test.ts` - Tests for Markdown formatting
- `/src/__tests__/cli.test.ts` - Tests for CLI functionality

## Detailed Implementation Plan

### 1. Project Setup

- Initialize npm project with `package.json`
- Configure TypeScript with strict type checking
- Set up key dependencies:
  - `pdfjs-dist` for PDF parsing
  - `commander` for CLI argument parsing
  - `chalk` for colorful terminal output
  - `fs-extra` for enhanced file operations
  - `ts-jest` for testing

### 2. Core Types Design (`/src/pdf-md/types.ts`)

- Define interfaces for parsed PDF content structure
- Create types for converter options and configuration
- Design error types for different failure scenarios

### 3. PDF Parsing Module (`/src/pdf-md/pdf-parser.ts`)

- Create `parsePdf` function to extract text from PDF documents
- Implement text content extraction using pdfjs-dist
- Design paragraph and heading detection heuristics
- Handle basic text formatting (bold, italic)
- Structure output into a logical document hierarchy

### 4. Markdown Formatting (`/src/pdf-md/markdown-formatter.ts`)

- Implement `formatToMarkdown` function to generate Markdown
- Convert document hierarchy to Markdown syntax
- Handle text styles and formatting
- Manage list detection and formatting
- Generate proper heading levels
- Implement table structure detection and formatting
- Create link formatting for URLs in text

### 5. File I/O Utilities (`/src/utils/file-io.ts`)

- Create functions for reading PDF files
- Implement Markdown file writing
- Handle file existence checks and error scenarios
- Support different encoding options

### 6. Logging Utility (`/src/utils/logger.ts`)

- Implement configurable logging levels
- Add colorized output for different message types
- Create progress indicators for long-running operations

### 7. CLI Interface (`/src/cli.ts`)

- Design command-line arguments structure
- Implement --input and --output options
- Add configuration options (formatting preferences)
- Create --help and --version commands
- Implement progress reporting during conversion

### 8. Main Converter Module (`/src/pdf-md/index.ts`)

- Create main `convertPdfToMarkdown` function
- Connect parser, formatter, and file utilities
- Implement pipeline for PDF → parsed content → Markdown
- Add error handling with useful error messages
- Include optional configuration parameters

### 9. Entry Point (`/src/index.ts`)

- Connect CLI module to converter
- Handle top-level exceptions
- Set up proper exit codes for different scenarios
- Export API for programmatic usage

### 10. Executable Script (`/bin/md-pdf.js`)

- Create Node.js executable script
- Set up proper shebang
- Import and run CLI application

### 11. Testing

- Write unit tests for core functions
- Create integration tests for end-to-end conversion
- Set up test fixtures with sample PDFs
- Implement CLI testing with mocked inputs/outputs

### 12. Documentation

- Create usage examples
- Document CLI options
- Add installation instructions
- Include contribution guidelines

## Constraints and Limitations

- Focus on text-based PDFs with simple formatting
- No support for complex layouts, columns, or text flow
- No handling of embedded images
- No JavaScript or interactive element support
- Simple font handling without custom font preservation

