import MemoryLeakDetector from "../core/MemoryLeakDetector";
import { existsSync } from "fs";

describe("MemoryLeakDetector", () => {
  it("should create a heap snapshot file", () => {
    const detector = new MemoryLeakDetector("./snapshots");
    const snapshotPath = detector.takeSnapshot("test");
    expect(existsSync(snapshotPath)).toBe(true);
  });
});
