import { existsSync, mkdirSync, writeFileSync } from "fs";

class FileSystem {
  /**
   * Ensures that a directory exists by creating it if it does not already exist.
   *
   * @param {string} dir - The path to the directory to ensure exists.
   * @return {void} Does not return a value.
   */
  static ensureDirectoryExists(dir: string) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Writes data to a file at the specified path.
   *
   * @param {string} path - the path to the file to write to
   * @param {string} data - the data to write to the file
   * @return {void} does not return a value
   */
  static writeFile(path: string, data: string) {
    writeFileSync(path, data);
  }
}

export default FileSystem;
