class MemoryGrowthDetector {
  private previousSnapshotInfo: { [key: string]: number } | null = null;

  /**
   * Detects potential growth in memory usage by comparing the current snapshot with the previous one.
   *
   * @param {any} snapshot - The current heap snapshot to analyze for growth.
   * @return {void} - Does not return a value, logs potential growth to the console.
   */
  detectGrowth(snapshot: any) {
    const currentSnapshotInfo = this.extractNodeInfo(snapshot);

    if (this.previousSnapshotInfo) {
      const growth: Record<string, any> = {};

      for (const [type, currentCount] of Object.entries(currentSnapshotInfo)) {
        const previousCount = this.previousSnapshotInfo[type] || 0;
        if (currentCount > previousCount) {
          growth[type] = {
            from: previousCount,
            to: currentCount,
            increase: currentCount - previousCount,
          };
        }
      }
      console.log("Potential growth detected:", growth);
    }

    this.previousSnapshotInfo = currentSnapshotInfo;
  }

  /**
   * Extracts node information from a given heap snapshot.
   *
   * This function iterates over the nodes in the snapshot, extracts the type of each node,
   * and returns an object containing the count of each node type.
   *
   * @param {any} snapshot - the heap snapshot to extract node information from
   * @return {{ [key: string]: number }} an object containing the count of each node type
   */
  private extractNodeInfo(snapshot: any): { [key: string]: number } {
    const nodes = snapshot.nodes;
    const strings = snapshot.strings;
    const nodeInfo: { [key: string]: number } = {};
    const node_fields = snapshot.snapshot.meta.node_fields;

    for (let i = 0; i < nodes.length; i += node_fields.length) {
      const typeIndex = nodes[i + node_fields.indexOf("type")];
      const typeName = strings[typeIndex];
      nodeInfo[typeName] = (nodeInfo[typeName] || 0) + 1;
    }

    return nodeInfo;
  }
}

export default MemoryGrowthDetector;
