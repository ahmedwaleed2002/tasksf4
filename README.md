# CLI Logger Tool

A Node.js command-line interface (CLI) tool for managing logs with write, read, and clear operations. This project demonstrates the use of `process.argv` for command-line argument parsing, `readline` for interactive input, and various Node.js modules for file operations and system information.

## Features

- **Write Logs**: Add timestamped messages to a log file
- **Read Logs**: Display all logs from the file
- **Clear Logs**: Remove all logs from the file
- **System Information**: Display system details like memory, CPU, and platform
- **Interactive Mode**: Write logs interactively using readline
- **Operation Logging**: All operations are logged to a separate file for audit purposes

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/ahmedwaleed2002/tasksf4.git
   cd task-4
   ```

2. Make sure you have Node.js installed on your system

3. The tool is ready to use! No additional dependencies required.

## Usage

### Basic Commands

```bash
# Write a log message
node cli-logger.js write "This is my first log message"

# Read all logs
node cli-logger.js read

# Clear all logs
node cli-logger.js clear

# Show system information
node cli-logger.js info

# Show help
node cli-logger.js help
```

### Interactive Mode

If you run the write command without a message, it will start interactive mode:

```bash
node cli-logger.js write
# This will prompt you to enter a message
```

### Examples

```bash
# Example 1: Write a log
$ node cli-logger.js write "Application started successfully"
Log written successfully!

# Example 2: Write another log
$ node cli-logger.js write "User logged in with ID: 12345"
Log written successfully!

# Example 3: Read logs
$ node cli-logger.js read

--- LOG CONTENTS ---
[2024-01-15T10:30:45.123Z] Application started successfully
[2024-01-15T10:31:12.456Z] User logged in with ID: 12345
--- END OF LOGS ---

# Example 4: System information
$ node cli-logger.js info

--- SYSTEM INFORMATION ---
Platform: win32
Hostname: MyComputer
Total Memory: 16384.00 MB
Free Memory: 8192.00 MB
CPU Cores: 8
System Uptime: 2.5 hours
--- END SYSTEM INFO ---

# Example 5: Clear logs
$ node cli-logger.js clear
Logs cleared successfully!
```

## Technical Implementation

### Key Node.js Concepts Demonstrated

1. **process.argv**: Used for parsing command-line arguments
   ```javascript
   const args = process.argv.slice(2);
   const command = args[0].toLowerCase();
   ```

2. **readline**: Used for interactive input when no message is provided
   ```javascript
   const rl = readline.createInterface({
       input: process.stdin,
       output: process.stdout
   });
   ```

3. **fs module**: Used for file operations (read, write, append)
   ```javascript
   fs.appendFile(LOGS_FILE, logEntry, callback);
   fs.readFile(LOGS_FILE, 'utf8', callback);
   ```

4. **path module**: Used for proper file path handling
   ```javascript
   const LOGS_FILE = path.join(__dirname, 'logs.txt');
   ```

5. **os module**: Used for system information
   ```javascript
   const totalMemory = os.totalmem();
   const platform = os.platform();
   ```

### File Structure

```
task-4/
├── cli-logger.js          # Main CLI tool
├── logs.txt               # User logs (created automatically)
├── operationLogs.txt      # Operation audit log (created automatically)
├── package.json           # Node.js project configuration
└── README.md             # This file
```

### Commands Breakdown

| Command | Description | Example |
|---------|-------------|---------|
| `write <message>` | Writes a timestamped message to logs.txt | `node cli-logger.js write "Hello World"` |
| `write` | Interactive mode - prompts for message | `node cli-logger.js write` |
| `read` | Displays all logs from logs.txt | `node cli-logger.js read` |
| `clear` | Clears all logs from logs.txt | `node cli-logger.js clear` |
| `info` | Shows system information | `node cli-logger.js info` |
| `help` | Shows help information | `node cli-logger.js help` |

## Error Handling

The tool includes comprehensive error handling:

- **File not found**: Gracefully handles when log files don't exist
- **Empty logs**: Informs user when no logs are available
- **Invalid commands**: Provides helpful error messages for unknown commands
- **Write errors**: Handles file system errors during write operations
- **System errors**: Logs all errors to the operation log for debugging

## Operation Logging

All operations are automatically logged to `operationLogs.txt` with timestamps:

```
[2024-01-15T10:30:45.123Z] Operation: WRITE - Message: "Application started"
[2024-01-15T10:31:12.456Z] Operation: READ - Logs displayed successfully
[2024-01-15T10:32:30.789Z] Operation: CLEAR - All logs cleared
```

## Development Notes

This CLI tool was built as part of a Node.js learning curriculum focusing on:

- **Day 4 Learning Goals**: 
  - User input via `process.argv`
  - Interactive input with `readline`
  - Building command-based CLI tools
  - Integration with file system operations
  - System information retrieval

### Previous Days Integration

- **Day 1**: Node.js architecture and event loop understanding
- **Day 2**: Module system with require/exports
- **Day 3**: File operations with fs, path, and os modules
- **Day 4**: Command-line interfaces and user input handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Created as part of a Node.js learning curriculum - Day 4 Task.
