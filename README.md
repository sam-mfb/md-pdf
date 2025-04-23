# md-pdf

A command-line utility to convert simple PDF files to Markdown format.

## Features

- Extract text content from PDF files
- Convert to clean, formatted Markdown
- Detect paragraphs, headings, and basic text formatting
- Support for lists and tables
- URL detection and link conversion
- Configurable output options

## Installation

```bash
npm install -g md-pdf
```

Or use it directly with npx:

```bash
npx md-pdf --input document.pdf --output document.md
```

## Usage

```bash
md-pdf --input <pdf-file> --output <markdown-file> [options]
```

### Options

- `-i, --input <path>`: Input PDF file path (required)
- `-o, --output <path>`: Output Markdown file path (defaults to stdout)
- `--page-numbers`: Include page numbers in output
- `--no-font-styles`: Do not preserve font styles
- `--no-lists`: Do not detect lists
- `--no-tables`: Do not detect tables
- `--no-links`: Do not detect links
- `--max-line-length <number>`: Maximum line length (default: 80)
- `-h, --help`: Display help information
- `-v, --version`: Display version information

## Requirements

- Node.js 18.0.0 or higher

## Development

```bash
# Clone the repository
git clone https://github.com/yourusername/md-pdf.git
cd md-pdf

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run the CLI in development
npm run dev -- --input document.pdf --output document.md
```

## Limitations

- Designed for text-based PDFs with simple formatting
- No support for complex layouts, columns, or text flow
- No handling of embedded images
- No JavaScript or interactive element support
- Simple font handling without custom font preservation

## License

MIT