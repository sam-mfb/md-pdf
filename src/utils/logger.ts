import chalk from 'chalk';

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

/**
 * Logger configuration
 */
export interface LoggerConfig {
  level: LogLevel;
  useColors: boolean;
}

/**
 * Default logger configuration
 */
const DEFAULT_CONFIG: LoggerConfig = {
  level: LogLevel.INFO,
  useColors: true
};

/**
 * Logger utility
 */
export function createLogger(config: Partial<LoggerConfig> = {}) {
  const mergedConfig: LoggerConfig = { ...DEFAULT_CONFIG, ...config };
  
  return {
    /**
     * Log a debug message
     */
    debug(message: string): void {
      if (mergedConfig.level <= LogLevel.DEBUG) {
        const formattedMessage = mergedConfig.useColors ? chalk.gray(message) : message;
        console.debug(formattedMessage);
      }
    },
    
    /**
     * Log an info message
     */
    info(message: string): void {
      if (mergedConfig.level <= LogLevel.INFO) {
        const formattedMessage = mergedConfig.useColors ? chalk.white(message) : message;
        console.info(formattedMessage);
      }
    },
    
    /**
     * Log a warning message
     */
    warn(message: string): void {
      if (mergedConfig.level <= LogLevel.WARN) {
        const formattedMessage = mergedConfig.useColors ? chalk.yellow(message) : message;
        console.warn(formattedMessage);
      }
    },
    
    /**
     * Log an error message
     */
    error(message: string, error?: Error): void {
      if (mergedConfig.level <= LogLevel.ERROR) {
        const formattedMessage = mergedConfig.useColors ? chalk.red(message) : message;
        console.error(formattedMessage);
        if (error && mergedConfig.level === LogLevel.DEBUG) {
          console.error(error);
        }
      }
    },
    
    /**
     * Create a progress report function
     */
    progress(total: number): (current: number, message?: string) => void {
      if (mergedConfig.level > LogLevel.INFO) {
        return () => {}; // No-op if logging is disabled
      }
      
      return (current: number, message = ''): void => {
        const percent = Math.floor((current / total) * 100);
        const progressBar = mergedConfig.useColors 
          ? chalk.green('[') + 
            chalk.green('='.repeat(Math.floor(percent / 5))) + 
            chalk.green(' '.repeat(20 - Math.floor(percent / 5))) + 
            chalk.green(']')
          : `[${'='.repeat(Math.floor(percent / 5))}${' '.repeat(20 - Math.floor(percent / 5))}]`;
        
        process.stdout.write(`\r${progressBar} ${percent}% ${message}`);
        
        if (current >= total) {
          process.stdout.write('\n');
        }
      };
    }
  };
}

/**
 * Default logger instance
 */
export const logger = createLogger();