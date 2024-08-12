import * as heapdump from "heapdump";
import { performance } from "perf_hooks";
import { mkdirSync } from "fs";

class MemoryLeakDetector {
  private snapshotDir: string;

  /**
   * Initializes a new instance of the MemoryLeakDetector class.
   *
   * @param {string} snapshotDir - The directory where heap snapshots will be saved. Defaults to "./snapshots".
   * @return {void} Does not return a value.
   */
  constructor(snapshotDir: string = "./snapshots") {
    this.snapshotDir = snapshotDir;
    mkdirSync(this.snapshotDir, { recursive: true });
  }

  /**
   * Captures a heap snapshot and saves it to a file.
   *
   * @param {string} label - Optional label to include in the snapshot file name.
   * @return {string} The file name of the saved snapshot.
   */
  takeSnapshot(label: string = ""): string {
    const fileName = `${
      this.snapshotDir
    }/heap-${label}-${performance.now()}.heapsnapshot`;
    heapdump.writeSnapshot(fileName);
    console.log(`Heap snapshot saved to: ${fileName}`);
    return fileName;
  }
}

export default MemoryLeakDetector;
