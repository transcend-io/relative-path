/**
 *
 * ## RelativePath
 * A simple class that has utilities for accessing/manipulating files from some relative path, and expected extensions.
 *
 * @module RelativePath
 */

// external modules
import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import mkdirp from 'mkdirp';
import { dirname, join } from 'path';

// Remove the / at the start of a string
const removeStartSlash = (fil: string): string =>
  fil.startsWith('/') ? fil.slice(1, fil.length) : fil;

// Check to see if a file is a directory
const isDirectory = (base: string): ((source: string) => boolean) => (
  source: string,
): boolean => lstatSync(join(base, source)).isDirectory();

/**
 * Input for creating a relative path helper
 */
export type RelativePathInput = {
  /** The path from which all relative paths should be made */
  rootPath: string;
  /** The extensions to check for. The first extension will be the default */
  extensions?: string[];
};

/**
 * Class for RealtivePath
 */
export default class RelativePath {
  /** The path from which all relative paths should be made */
  public rootPath: string;

  /** The extensions to check for. The first extension will be the default */
  public extensions: string[];

  /**
   * Initialize with base path and extensions
   */
  public constructor({
    rootPath,
    extensions = ['ts', 'tsx'],
  }: RelativePathInput) {
    if (extensions.length < 1) {
      throw new Error(`At least one extension must be provided`);
    }

    this.rootPath = rootPath;
    this.extensions = extensions;
  }

  /**
   * Add an extension to a file path if there is no extension on the file path already
   *
   * @param filePath - The file to optionally add the extension to
   * @param extension - The extension to add, if not the first of the defaults will be added
   * @returns The file with the extension on it
   */
  public addFileExtension(filePath: string, extension?: string): string {
    // Add extension if it is not present
    const addExtension = extension || this.extensions[0];
    return filePath.includes('.') ? filePath : `${filePath}.${addExtension}`;
  }

  /**
   * Get the absolute path from a relative path (and adds on the extension)
   *
   * @param filePath - The relative file path
   * @param extension - The expected extension, else inferred
   * @returns The absolute path
   */
  public getFile(filePath: string, extension?: string): string {
    // The file without an extension
    const base = join(this.rootPath, filePath);

    // If provided we add on the extension and call it a day
    if (extension) {
      return this.addFileExtension(base, extension);
    }

    // We try each extension to see if a file already exists with one of the pre-determined extensions
    // If no file is found, we return the default extension (which is the first in the list)
    let fil = '';
    for (let i = this.extensions.length - 1; i >= 0; i -= 1) {
      // Return immediately if exists
      fil = this.addFileExtension(base, this.extensions[i]);
      if (existsSync(fil)) {
        return fil;
      }
    }

    // Return with the first file extension
    return fil;
  }

  /**
   * Get a folder relative to the path
   *
   * @param filePath - The relative path to the folder
   * @returns The absolute path
   */
  public getFolder(filePath: string): string {
    return join(this.rootPath, filePath);
  }

  /**
   * Check if the path to a file exists
   *
   * @param filePath - The relative path
   * @param extension - The expected extension, else inferred
   * @returns True if the path exists
   */
  public hasFile(filePath: string, extension?: string): boolean {
    return existsSync(this.getFile(filePath, extension));
  }

  /**
   * Check if a folder exists
   *
   * @pararm filePath - The relative path
   * @returns True if the folder exists
   */
  public hasFolder(filePath: string): boolean {
    return existsSync(this.getFolder(filePath));
  }

  /**
   * Give an absolute path, remove the rootPath
   *
   * @param absolutePath - The absolute path
   * @returns The relative path
   */
  public removeRoot(absolutePath: string): string {
    return absolutePath.startsWith(this.rootPath)
      ? removeStartSlash(absolutePath.replace(this.rootPath, ''))
      : absolutePath;
  }

  /**
   * Read contents of a file into a string
   *
   * @param filePath - The relative path to the file
   * @param extension - The expected extension, else inferred
   * @returns The file contents
   */
  public readFile(filePath: string, extension?: string): string {
    return readFileSync(this.getFile(filePath, extension), 'utf-8');
  }

  /**
   * Read contents of a file into a string or return null if no file exists
   *
   * @param filePath - The relative path to the file
   * @param extension - The expected extension, else inferred
   * @returns The file contents or null
   */
  public readFileSafe(filePath: string, extension?: string): string | null {
    return !this.hasFile(filePath) ? null : this.readFile(filePath, extension);
  }

  /**
   * Write a file to disk
   *
   * @param filePath - The relative path to the file
   * @param contents - The file contents
   * @param extension - The expected extension, else inferred
   */
  public writeFile(
    filePath: string,
    contents: string,
    extension?: string,
  ): void {
    const absolutePath = this.getFile(filePath, extension);

    // Ensure the path exists
    mkdirp.sync(dirname(absolutePath));

    // Write the file
    writeFileSync(absolutePath, contents);
  }

  /**
   * List folders in a directory
   *
   * @param folderPath - The relative path to the folder to list from
   * @returns The folders in the folder
   */
  public listFolders(folderPath = '.'): string[] {
    const absolutePath = this.getFolder(folderPath);
    if (!existsSync(absolutePath)) {
      return [];
    }

    return readdirSync(absolutePath).filter(isDirectory(absolutePath));
  }

  /**
   * List files in a directory
   *
   * @param folderPath - The relative path to the folder to list from
   * @returns The files in the folder
   */
  public listFiles(folderPath = '.'): string[] {
    const absolutePath = this.getFolder(folderPath);

    if (!existsSync(absolutePath)) {
      return [];
    }

    return readdirSync(absolutePath).filter((fil) => fil.indexOf('.') > 0);
  }

  /**
   * Remove a file
   *
   * @param filePath - The relative path to the file
   * @param extension - The expected extension, else inferred
   */
  public removeFile(filePath: string, extension?: string): boolean {
    // The location of the file
    const fileLoc = this.getFile(filePath, extension);

    // If it exists, remove it
    if (existsSync(fileLoc)) {
      unlinkSync(fileLoc);
      return true;
    }

    // File did not exist
    return false;
  }
}
