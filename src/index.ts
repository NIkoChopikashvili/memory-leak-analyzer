import MemoryLeakDetector from "./core/MemoryLeakDetector";
import HeapAnalyzer from "./core/HeapAnalyzer";
import HeapDiff from "./core/HeapDiff";
import MemoryGrowthDetector from "./core/MemoryGrowthDetector";

class MemoryLeakAnalyzer {
  private detector: MemoryLeakDetector;
  private analyzer: HeapAnalyzer;
  private diff: HeapDiff;
  private growthDetector: MemoryGrowthDetector;

  /**
   * Initializes a new instance of the MemoryLeakAnalyzer class.
   *
   * @param {string} snapshotDir - The directory where heap snapshots will be saved. Defaults to "./snapshots".
   * @return {void} Does not return a value.
   */
  constructor(snapshotDir: string = "./snapshots") {
    this.detector = new MemoryLeakDetector(snapshotDir);
    this.analyzer = new HeapAnalyzer();
    this.diff = new HeapDiff();
    this.growthDetector = new MemoryGrowthDetector();
  }

  /**
   * Captures a heap snapshot and saves it to a file.
   *
   * @param {string} label - Optional label to include in the snapshot file name.
   * @return {string} The file name of the saved snapshot.
   */
  takeSnapshot(label: string = ""): string {
    return this.detector.takeSnapshot(label);
  }

  /**
   * Analyzes a heap snapshot loaded from a file.
   *
   * @param {string} filePath - The path to the file containing the heap snapshot.
   * @return {void} Does not return a value.
   */
  analyzeSnapshot(filePath: string) {
    const snapshot = this.analyzer.loadSnapshot(filePath);
    this.analyzer.analyzeSnapshot(snapshot);
  }

  /**
   * Compares two heap snapshots and logs the differences to the console.
   *
   * @param {string} snapshotAPath - The path to the first heap snapshot file.
   * @param {string} snapshotBPath - The path to the second heap snapshot file.
   * @return {void} Does not return a value.
   */
  compareSnapshots(snapshotAPath: string, snapshotBPath: string) {
    const snapshotA = this.analyzer.loadSnapshot(snapshotAPath);
    const snapshotB = this.analyzer.loadSnapshot(snapshotBPath);
    const diff = this.diff.diffSnapshots(snapshotA, snapshotB);
    console.log("Snapshot diff:", diff);
  }

  /**
   * Detects potential growth in memory usage by analyzing a heap snapshot.
   *
   * @param {string} snapshotPath - The path to the heap snapshot file to analyze.
   * @return {void} Does not return a value, logs potential growth to the console.
   */
  detectGrowth(snapshotPath: string) {
    const snapshot = this.analyzer.loadSnapshot(snapshotPath);
    this.growthDetector.detectGrowth(snapshot);
  }
}

export default MemoryLeakAnalyzer;
