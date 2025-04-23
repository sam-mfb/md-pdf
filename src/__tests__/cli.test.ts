import { createProgram } from '../cli.js';
import { DEFAULT_CONVERSION_OPTIONS } from '../pdf-md/types.js';

describe('CLI', () => {
  test('createProgram returns a Command instance with expected options', () => {
    const program = createProgram();
    
    // Basic program properties
    expect(program.name()).toBe('md-pdf');
    expect(program.version()).toBe('0.1.0');
    
    // Check required options
    const inputOption = program.options.find(opt => opt.long === '--input');
    expect(inputOption).toBeDefined();
    expect(inputOption?.required).toBe(true);
    
    // Check optional options
    const outputOption = program.options.find(opt => opt.long === '--output');
    expect(outputOption).toBeDefined();
    expect(outputOption?.required).toBe(false);
    
    // Check boolean flags
    const pageNumbersOption = program.options.find(opt => opt.long === '--page-numbers');
    expect(pageNumbersOption).toBeDefined();
    expect(pageNumbersOption?.defaultValue).toBe(DEFAULT_CONVERSION_OPTIONS.includePageNumbers);
    
    // Check negated boolean flags
    const fontStylesOption = program.options.find(opt => opt.long === '--no-font-styles');
    expect(fontStylesOption).toBeDefined();
    
    // Check value options
    const maxLineLengthOption = program.options.find(opt => opt.long === '--max-line-length');
    expect(maxLineLengthOption).toBeDefined();
    expect(maxLineLengthOption?.defaultValue).toBe(String(DEFAULT_CONVERSION_OPTIONS.maxLineLength));
  });
});