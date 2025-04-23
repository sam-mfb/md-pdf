import fs from 'fs-extra';
import path from 'path';
import { createFileOperationError } from '../pdf-md/types.js';

/**
 * Check if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read file as buffer
 */
export async function readFile(filePath: string): Promise<Buffer> {
  try {
    return await fs.readFile(filePath);
  } catch (error) {
    throw createFileOperationError(`Failed to read file: ${filePath}`, filePath, error);
  }
}

/**
 * Write content to file
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  try {
    const dir = path.dirname(filePath);
    await fs.ensureDir(dir);
    await fs.writeFile(filePath, content);
  } catch (error) {
    throw createFileOperationError(`Failed to write file: ${filePath}`, filePath, error);
  }
}

/**
 * Get file extension
 */
export function getFileExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase();
}

/**
 * Generate output file path based on input path if not specified
 */
export function generateOutputPath(inputPath: string, outputPath?: string): string {
  if (outputPath) {
    return outputPath;
  }
  
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const dir = path.dirname(inputPath);
  return path.join(dir, `${baseName}.md`);
}