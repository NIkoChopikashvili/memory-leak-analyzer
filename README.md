# Memory Leak Analyzer

Memory Leak Analyzer is a Node.js library for diagnosing and fixing memory leaks in Node.js applications. It provides tools to take heap snapshots, analyze them, and detect potential memory leaks, helping developers ensure their applications run efficiently.

## Features

- **Heap Snapshot Capture**: Take snapshots of your application's memory.
- **Heap Analysis**: Analyze heap snapshots to detect potential memory leaks.
- **Heap Diffing**: Compare snapshots over time to find memory growth.
- **Memory Growth Detection**: Automatically detect abnormal memory growth in your application.

## Installation

Install the library via npm:

```bash
npm install memory-leak-analyzer
```

## Usage

### Importing the Library

```typescript
import MemoryLeakAnalyzer from "memory-leak-analyzer";

const analyzer = new MemoryLeakAnalyzer();
```

### Taking a Heap Snapshot

```typescript
const snapshotPath = analyzer.takeSnapshot("initial");
```

### Analyzing a Heap Snapshot

```typescript
analyzer.analyzeSnapshot(snapshotPath);
```

### Comparing Heap Snapshots

```typescript
analyzer.compareSnapshots(
  "path/to/initial.heapsnapshot",
  "path/to/second.heapsnapshot"
);
```

### Detecting Memory Growth

```typescript
analyzer.detectGrowth(snapshotPath);
```

## CLI (Command-Line Interface)

The library also provides a command-line interface for quick and easy use.

```bash
npx memory-leak-analyzer takeSnapshot --name="initial"
npx memory-leak-analyzer analyzeSnapshot --path="path/to/snapshot"
```

(Coming Soon)

## Project Structure

- **`src/cli/`**: CLI implementation files.
- **`src/core/`**: Core library components like heap analysis and memory growth detection.
- **`src/types/`**: TypeScript type definitions.
- **`src/utils/`**: Utility functions such as file system and logging utilities.
- **`tests/`**: Test files for unit and integration testing.

## Running Tests

To run tests for this library, use:

```bash
npm test
```

This will run the Jest testing framework on all test files in the project.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
