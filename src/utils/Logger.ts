class Logger {
  /**
   * Logs a message to the console with a '[LOG]' prefix.
   *
   * @param {string} message - The message to be logged.
   * @return {void} Does not return a value.
   */
  static log(message: string) {
    console.log(`[LOG] ${message}`);
  }

  /**
   * Logs a warning message to the console.
   *
   * @param {string} message - the warning message to be logged
   * @return {void} does not return a value
   */
  static warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }

  /**
   * Logs an error message to the console.
   *
   * @param {string} message - the error message to be logged
   * @return {void} does not return a value
   */
  static error(message: string) {
    console.error(`[ERROR] ${message}`);
  }
}

export default Logger;
