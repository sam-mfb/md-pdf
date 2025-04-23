import { createLogger, LogLevel } from '../../utils/logger.js';
import chalk from 'chalk';

describe('Logger', () => {
  // Store original console methods
  const originalConsoleDebug = console.debug;
  const originalConsoleInfo = console.info;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;
  const originalStdoutWrite = process.stdout.write;
  
  beforeEach(() => {
    // Mock console methods
    console.debug = jest.fn();
    console.info = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
    process.stdout.write = jest.fn();
  });
  
  afterEach(() => {
    // Restore original console methods
    console.debug = originalConsoleDebug;
    console.info = originalConsoleInfo;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
    process.stdout.write = originalStdoutWrite;
  });

  test('debug logs when level is DEBUG', () => {
    const logger = createLogger({ level: LogLevel.DEBUG, useColors: false });
    logger.debug('Debug message');
    expect(console.debug).toHaveBeenCalledWith('Debug message');
  });

  test('debug does not log when level is INFO', () => {
    const logger = createLogger({ level: LogLevel.INFO, useColors: false });
    logger.debug('Debug message');
    expect(console.debug).not.toHaveBeenCalled();
  });

  test('info logs when level is INFO', () => {
    const logger = createLogger({ level: LogLevel.INFO, useColors: false });
    logger.info('Info message');
    expect(console.info).toHaveBeenCalledWith('Info message');
  });

  test('info does not log when level is WARN', () => {
    const logger = createLogger({ level: LogLevel.WARN, useColors: false });
    logger.info('Info message');
    expect(console.info).not.toHaveBeenCalled();
  });

  test('warn logs when level is WARN', () => {
    const logger = createLogger({ level: LogLevel.WARN, useColors: false });
    logger.warn('Warning message');
    expect(console.warn).toHaveBeenCalledWith('Warning message');
  });

  test('warn does not log when level is ERROR', () => {
    const logger = createLogger({ level: LogLevel.ERROR, useColors: false });
    logger.warn('Warning message');
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('error logs when level is ERROR', () => {
    const logger = createLogger({ level: LogLevel.ERROR, useColors: false });
    logger.error('Error message');
    expect(console.error).toHaveBeenCalledWith('Error message');
  });

  test('error does not log when level is NONE', () => {
    const logger = createLogger({ level: LogLevel.NONE, useColors: false });
    logger.error('Error message');
    expect(console.error).not.toHaveBeenCalled();
  });

  test('error logs error object when level is DEBUG', () => {
    const logger = createLogger({ level: LogLevel.DEBUG, useColors: false });
    const error = new Error('Test error');
    logger.error('Error message', error);
    expect(console.error).toHaveBeenCalledWith('Error message');
    expect(console.error).toHaveBeenCalledWith(error);
  });

  test('progress updates correctly', () => {
    const logger = createLogger({ level: LogLevel.INFO, useColors: false });
    const progress = logger.progress(10);
    
    progress(2, 'Processing');
    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringContaining('20%')
    );
    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringContaining('Processing')
    );
    
    progress(10, 'Complete');
    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringContaining('100%')
    );
    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringContaining('\n')
    );
  });

  test('progress does not output when level is WARN', () => {
    const logger = createLogger({ level: LogLevel.WARN, useColors: false });
    const progress = logger.progress(10);
    
    progress(5);
    expect(process.stdout.write).not.toHaveBeenCalled();
  });
  
  test('uses chalk for colored output when useColors is true', () => {
    const spyChalkGray = jest.spyOn(chalk, 'gray');
    const spyChalkWhite = jest.spyOn(chalk, 'white');
    const spyChalkYellow = jest.spyOn(chalk, 'yellow');
    const spyChalkRed = jest.spyOn(chalk, 'red');
    
    const logger = createLogger({ level: LogLevel.DEBUG, useColors: true });
    
    logger.debug('Debug message');
    logger.info('Info message');
    logger.warn('Warning message');
    logger.error('Error message');
    
    expect(spyChalkGray).toHaveBeenCalledWith('Debug message');
    expect(spyChalkWhite).toHaveBeenCalledWith('Info message');
    expect(spyChalkYellow).toHaveBeenCalledWith('Warning message');
    expect(spyChalkRed).toHaveBeenCalledWith('Error message');
    
    spyChalkGray.mockRestore();
    spyChalkWhite.mockRestore();
    spyChalkYellow.mockRestore();
    spyChalkRed.mockRestore();
  });
});