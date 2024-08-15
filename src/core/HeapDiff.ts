class HeapDiff {
  /**
   * Computes the difference between two heap snapshots.
   *
   * This function takes two heap snapshots as input, extracts the node information from each snapshot,
   * and returns an object containing the differences in node counts between the two snapshots.
   *
   * @param {any} snapshotA - the first heap snapshot
   * @param {any} snapshotB - the second heap snapshot
   * @return {any} an object containing the differences in node counts between the two snapshots
   */
  diffSnapshots(snapshotA: any, snapshotB: any): any {
    const diffResult: Record<string, any> = {};

    const nodesA = this.extractNodeInfo(snapshotA);
    const nodesB = this.extractNodeInfo(snapshotB);

    for (const [type, countA] of Object.entries(nodesA)) {
      const countB = nodesB[type] || 0;
      if (countA !== countB) {
        diffResult[type] = {
          from: countA,
          to: countB,
          growth: countB - countA,
        };
      }
    }

    for (const [type, countB] of Object.entries(nodesB)) {
      if (!(type in nodesA)) {
        diffResult[type] = { from: 0, to: countB, growth: countB };
      }
    }

    return diffResult;
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
    if (
      !snapshot ||
      !snapshot.nodes ||
      !snapshot.snapshot.meta.node_fields ||
      !snapshot.strings
    ) {
      throw new Error(
        "Invalid snapshot format. Make sure the snapshot is loaded correctly."
      );
    }

    const nodes = snapshot.nodes;
    const strings = snapshot.strings;
    const nodeFields = snapshot.snapshot.meta.node_fields;

    if (
      !Array.isArray(nodes) ||
      !Array.isArray(strings) ||
      !Array.isArray(nodeFields)
    ) {
      throw new Error(
        "Invalid snapshot format: nodes, strings, or node_fields are not arrays."
      );
    }

    const nodeInfo: { [key: string]: number } = {};

    for (let i = 0; i < nodes.length; i += nodeFields.length) {
      const typeIndex = nodes[i + nodeFields.indexOf("type")];
      const typeName = strings[typeIndex];
      nodeInfo[typeName] = (nodeInfo[typeName] || 0) + 1;
    }

    return nodeInfo;
  }
}

export default HeapDiff;
