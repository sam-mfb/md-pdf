# Development Plan for PDF to Markdown CLI Utility

## Overview

Create a Node.js CLI utility that converts simple PDF files (text-based without complex graphics, custom fonts, embedded objects, or JavaScript) into clean Markdown format using Test-Driven Development (TDD).

## Files to Create

### Core Infrastructure

- `/package.json` - Project configuration, dependencies, scripts
- `/tsconfig.json` - TypeScript compiler options
- `/.gitignore` - Files to exclude from git
- `/bin/md-pdf.js` - Executable script for the CLI
- `/jest.config.js` - Jest configuration for tests

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

- `/src/__tests__/pdf-md/pdf-parser.test.ts` - Tests for pdf parsing
- `/src/__tests__/pdf-md/markdown-formatter.test.ts` - Tests for Markdown formatting
- `/src/__tests__/pdf-md/index.test.ts` - Tests for main conversion pipeline
- `/src/__tests__/cli.test.ts` - Tests for CLI functionality
- `/src/__tests__/utils/file-io.test.ts` - Tests for file operations
- `/src/__tests__/utils/logger.test.ts` - Tests for logging utilities
- `/src/__tests__/fixtures/` - Test PDF files and expected markdown output

## Detailed Implementation Plan with TDD Approach

### 1. Project Setup

- Initialize npm project with `package.json`
- Configure TypeScript with strict type checking
- Set up Jest with ts-jest for TypeScript testing
- Configure test environment and fixtures
- Set up key dependencies:
  - `pdfjs-dist` for PDF parsing
  - `commander` for CLI argument parsing
  - `chalk` for colorful terminal output
  - `fs-extra` for enhanced file operations
  - `ts-jest` for testing

### 2. Core Types Design (`/src/pdf-md/types.ts`)

- Write type definitions first
- Define interfaces for parsed PDF content structure
- Create types for converter options and configuration
- Design error types for different failure scenarios

### 3. PDF Parsing Module (TDD)

- **Tests First**: Create `/src/__tests__/pdf-md/pdf-parser.test.ts`
  - Write tests for PDF text extraction
  - Create tests for paragraph detection
  - Test heading identification
  - Test formatting detection
  - Create mock PDF data for testing
- **Implementation**: Create `/src/pdf-md/pdf-parser.ts`
  - Implement `parsePdf` function to make tests pass
  - Add text content extraction using pdfjs-dist
  - Implement paragraph and heading detection
  - Add text formatting detection
  - Structure document hierarchy to satisfy tests

### 4. Markdown Formatting Module (TDD)

- **Tests First**: Create `/src/__tests__/pdf-md/markdown-formatter.test.ts`
  - Test conversion of document structure to Markdown
  - Write tests for text styling conversion
  - Create tests for list formatting
  - Test heading level generation
  - Test table formatting
  - Write tests for link formatting
- **Implementation**: Create `/src/pdf-md/markdown-formatter.ts` 
  - Implement `formatToMarkdown` function to pass tests
  - Add document hierarchy to Markdown conversion
  - Implement text styling formatting
  - Add list detection and formatting
  - Create heading level formatting
  - Implement table formatting
  - Add link formatting

### 5. File I/O Utilities (TDD)

- **Tests First**: Create `/src/__tests__/utils/file-io.test.ts`
  - Test PDF file reading
  - Test Markdown file writing
  - Write tests for file existence checking
  - Test error handling scenarios
- **Implementation**: Create `/src/utils/file-io.ts`
  - Implement functions to pass tests
  - Add PDF file reading functionality
  - Create Markdown file writing
  - Add file existence checks
  - Implement error handling

### 6. Logging Utility (TDD)

- **Tests First**: Create `/src/__tests__/utils/logger.test.ts`
  - Test log level configuration
  - Write tests for different message types
  - Test progress indicator functionality
- **Implementation**: Create `/src/utils/logger.ts`
  - Implement logger to satisfy tests
  - Add log level configuration
  - Implement colored output
  - Create progress indicators

### 7. Main Converter Module (TDD)

- **Tests First**: Create `/src/__tests__/pdf-md/index.test.ts`
  - Test end-to-end conversion pipeline
  - Write tests for configuration options
  - Test error handling scenarios
- **Implementation**: Create `/src/pdf-md/index.ts`
  - Implement `convertPdfToMarkdown` to pass tests
  - Connect parser, formatter, and file utilities
  - Add configuration handling
  - Implement error handling

### 8. CLI Interface (TDD)

- **Tests First**: Create `/src/__tests__/cli.test.ts`
  - Test command-line argument parsing
  - Write tests for help and version commands
  - Test input validation
  - Test error handling
- **Implementation**: Create `/src/cli.ts`
  - Implement CLI interface to pass tests
  - Add argument parsing
  - Create help and version commands
  - Implement progress reporting

### 9. Entry Point and Executable

- Create `/src/index.ts` to connect modules
- Implement `/bin/md-pdf.js` executable

### 10. Integration Testing

- Create end-to-end tests with real PDF samples
- Test the complete conversion process
- Verify output against expected markdown

### 11. Documentation

- Create usage examples
- Document CLI options
- Add installation instructions
- Include contribution guidelines

## TDD Workflow for Each Component

1. **Write failing tests** for a specific function or feature
2. **Run tests** to confirm they fail as expected
3. **Implement minimal code** to make tests pass
4. **Refactor** while maintaining passing tests
5. **Repeat** for next feature or function

## Constraints and Limitations

- Focus on text-based PDFs with simple formatting
- No support for complex layouts, columns, or text flow
- No handling of embedded images
- No JavaScript or interactive element support
- Simple font handling without custom font preservation