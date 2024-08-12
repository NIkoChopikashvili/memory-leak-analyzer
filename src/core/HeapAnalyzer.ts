import { readFileSync } from "fs";

class HeapAnalyzer {
  private snapshots: any[] = [];

  /**
   * Loads a heap snapshot from a file.
   *
   * @param {string} filePath - The path to the file containing the heap snapshot.
   * @return {any} The loaded heap snapshot.
   */
  loadSnapshot(filePath: string): any {
    const snapshotContent = readFileSync(filePath, "utf-8");
    const parsedSnapshot = JSON.parse(snapshotContent);
    this.snapshots.push(parsedSnapshot);
    return parsedSnapshot;
  }

  /**
   * Analyzes a heap snapshot and extracts object counts by type.
   *
   * @param {any} snapshot - the heap snapshot to analyze
   * @return {void} - does not return a value, logs the result to the console
   */
  analyzeSnapshot(snapshot: any) {
    const nodes = snapshot.nodes;
    const strings = snapshot.strings;

    // Example: Analyzing object counts by type
    const nodeTypes: { [key: string]: number } = {};
    for (let i = 0; i < nodes.length; i += snapshot.node_fields.length) {
      const typeIndex = nodes[i + snapshot.node_fields.indexOf("type")];
      const typeName = strings[typeIndex];
      nodeTypes[typeName] = (nodeTypes[typeName] || 0) + 1;
    }

    console.log("Node types count:", nodeTypes);
  }
}

export default HeapAnalyzer;
