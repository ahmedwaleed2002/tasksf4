# CLI Logger Tool

A Node.js command-line interface (CLI) tool for managing logs with write, read, and clear operations. This project demonstrates the use of `process.argv` for command-line argument parsing, `readline` for interactive input, and various Node.js modules for file operations and system information.

## Features

- **Interactive Menu System**: User-friendly numbered menu (1-6) for easy navigation
- **Write Logs**: Add timestamped messages to a log file
- **Read Logs**: Display all logs from the file
- **Clear Logs**: Remove all logs from the file with confirmation
- **System Information**: Display system details like memory, CPU, and platform
- **Direct Commands**: Support for both interactive and direct command execution
- **Operation Logging**: All operations are logged to a separate file for audit purposes
- **Error Handling**: Comprehensive error handling and user feedback

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/ahmedwaleed2002/tasksf4.git
   cd task-4
   ```

2. Make sure you have Node.js installed on your system

3. The tool is ready to use! No additional dependencies required.

## Interactive Menu System

The CLI Logger features an intuitive interactive menu system that launches by default when you run the tool without arguments. This provides a user-friendly interface where you can select operations by pressing numbers 1-6.

### Menu Options:

```
=== CLI LOGGER - INTERACTIVE MODE ===
Please select an option:
1. Write a new log message
2. Read all logs
3. Clear all logs
4. Show system information
5. Show help
6. Exit
=====================================
```

### How to Use Interactive Mode:

1. **Start Interactive Mode**: Simply run `node cli-logger.js` (no arguments)
2. **Select Operation**: Press a number (1-6) and hit Enter
3. **Follow Prompts**: The tool will guide you through each operation
4. **Continue or Exit**: After each operation, choose to continue or exit

### Interactive Features:

- **Smart Prompts**: Context-aware prompts for each operation
- **Confirmation Dialogs**: Safety confirmations for destructive operations (like clear)
- **Error Validation**: Input validation with helpful error messages
- **Smooth Flow**: Seamless transitions between operations
- **Clean Exit**: Proper cleanup and graceful exit

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

## Day 4 Learning Objectives

This project was built as part of Day 4 of a Node.js learning curriculum, focusing on:

### 1. User Input via process.argv

**What We Learned:**
- `process.argv` is an array containing command-line arguments
- `process.argv[0]` is the Node.js executable path
- `process.argv[1]` is the script file path
- `process.argv.slice(2)` gets the actual command-line arguments

**Implementation:**
```javascript
function main() {
    const args = process.argv.slice(2);  // Get command-line arguments
    
    if (args.length === 0) {
        showInteractiveMenu();  // No args = interactive mode
        return;
    }
    
    const command = args[0].toLowerCase();
    
    switch (command) {
        case 'write':
            if (args.length > 1) {
                const message = args.slice(1).join(' ');  // Join multiple words
                writeLog(message);
            }
            break;
        // ... other commands
    }
}
```

### 2. Interactive Input with readline

**What We Learned:**
- `readline` module provides interface for reading input line by line
- Must create interface with `input` and `output` streams
- Always close the interface to prevent memory leaks
- Handle asynchronous input with callbacks

**Implementation:**
```javascript
function showInteractiveMenu() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Enter your choice (1-6): ', (choice) => {
        handleMenuChoice(choice.trim(), rl);
    });
}

function handleMenuChoice(choice, rl) {
    switch (choice) {
        case '1':
            rl.question('Enter your log message: ', (message) => {
                rl.close();  // Always close the interface
                writeLog(message);
            });
            break;
        // ... other cases
    }
}
```

### 3. Command-based CLI Tools

**What We Learned:**
- CLI tools can support both direct commands and interactive modes
- User experience is crucial for CLI applications
- Error handling and validation improve usability
- Proper flow control prevents interface conflicts

**Implementation Features:**
- **Dual Mode Operation**: Direct commands (`node cli-logger.js write "message"`) and interactive menu
- **Menu-driven Interface**: Numbered options (1-6) for easy selection
- **Flow Control**: Proper handling of sequential readline operations
- **Error Handling**: Validation and user-friendly error messages
- **Confirmation Dialogs**: Safety prompts for destructive operations

## Technical Implementation

### Core Node.js Modules Used

1. **process.argv**: Command-line argument parsing
   ```javascript
   const args = process.argv.slice(2);
   const command = args[0].toLowerCase();
   ```

2. **readline**: Interactive user input
   ```javascript
   const rl = readline.createInterface({
       input: process.stdin,
       output: process.stdout
   });
   ```

3. **fs module**: File operations (read, write, append)
   ```javascript
   fs.appendFile(LOGS_FILE, logEntry, callback);
   fs.readFile(LOGS_FILE, 'utf8', callback);
   ```

4. **path module**: Cross-platform file path handling
   ```javascript
   const LOGS_FILE = path.join(__dirname, 'logs.txt');
   ```

5. **os module**: System information retrieval
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

## Screenshots and Demonstration

The following screenshots demonstrate the CLI Logger tool in action:

### 1. Interactive Menu System
**Screenshot**: `interactive-menu.png`

This screenshot shows the main interactive menu interface that appears when running the CLI logger without any arguments. The interface displays a welcome message, numbered menu options (1-6), and prompts the user to make a selection.

![Interactive Menu System](interactive-menu.png)

### 2. Command Help Documentation
**Screenshot**: `command-help.png`

This shows the comprehensive help system accessed via `node cli-logger.js help`. It displays all available commands with their usage syntax, examples, and detailed descriptions of both interactive and direct command modes.

![Command Help](command-help.png)

### 3. Direct Write Command
**Screenshot**: `write-command.png`

Demonstrates the direct command usage for writing log messages. Shows the execution of `node cli-logger.js write "message"` with the success confirmation output.

![Write Command](write-command.png)

### 4. Reading Log Contents
**Screenshot**: `read-logs.png`

Displays the output of `node cli-logger.js read` command, showing how logged messages are presented with timestamps in a formatted layout between "LOG CONTENTS" and "END OF LOGS" markers.

![Read Logs](read-logs.png)

### 5. System Information Display
**Screenshot**: `system-info.png`

Shows the system information feature accessed via `node cli-logger.js info`. Displays detailed system metrics including platform, hostname, memory usage (total and free), CPU cores, and system uptime.

![System Information](system-info.png)

### 6. Multiple Log Entries
**Screenshot**: `multiple-logs.png`

Demonstrates multiple timestamped log entries created over time. This shows how the logger maintains chronological order and proper timestamp formatting for each log entry.

![Multiple Logs](multiple-logs.png)

### 7. Clear Logs Operation
**Screenshot**: `clear-logs.png`

Shows the execution of `node cli-logger.js clear` command with the success confirmation message indicating that all logs have been cleared from the log file.

![Clear Logs](clear-logs.png)

### 8. Interactive Write Mode
**Screenshot**: `interactive-write.png`

Demonstrates the interactive menu in action, showing option selection, message input prompt, and the flow of writing a log message through the numbered menu interface.

![Interactive Write](interactive-write.png)

### 9. Error Handling
**Screenshot**: `error-handling.png`

Displays the error handling mechanism when invalid input is provided (such as empty messages), showing user-friendly error messages and usage guidance.

![Error Handling](error-handling.png)

### 10. Unknown Command Handling
**Screenshot**: `unknown-command.png`

Shows how the CLI tool handles invalid or unknown commands, providing helpful error messages and directing users to the help system or interactive mode.

![Unknown Command](unknown-command.png)

### 11. Operation Logs Audit Trail
**Screenshot**: `operation-logs.png`

Displays the contents of `operationLogs.txt`, showing the automatic audit trail of all operations performed with timestamps and operation details for tracking and debugging purposes.

![Operation Logs](operation-logs.png)

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

### Technical Challenges and Solutions

#### Challenge 1: Readline Interface Conflicts
**Problem**: Multiple sequential readline operations caused input conflicts and interface mixing.
**Solution**: 
- Properly close each readline interface before starting the next
- Use setTimeout for proper timing between operations
- Implement clean state management

```javascript
function handleMenuChoice(choice, rl) {
    switch (choice) {
        case '1':
            rl.question('Enter your log message: ', (message) => {
                rl.close();  // Close immediately after input
                writeLog(message);
                setTimeout(() => {
                    askToContinue();  // Start new interface after delay
                }, 1000);
            });
            break;
    }
}
```

#### Challenge 2: Command-line Argument Parsing
**Problem**: Handling both single commands and multi-word messages.
**Solution**: 
- Use `process.argv.slice(2)` to get arguments
- Join remaining arguments for multi-word messages
- Implement flexible parsing logic

```javascript
if (args.length > 1) {
    const message = args.slice(1).join(' ');  // Join all words after command
    writeLog(message);
}
```

#### Challenge 3: User Experience Flow
**Problem**: Creating smooth transitions between operations.
**Solution**: 
- Implement "continue or exit" prompts
- Add confirmation dialogs for destructive operations
- Provide clear feedback for each action

```javascript
function askToContinue() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('\nWould you like to perform another operation? (y/N): ', (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'y') {
            setTimeout(() => showInteractiveMenu(), 500);
        } else {
            process.exit(0);
        }
    });
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Created by Ahmed Waleed Bin Yunus (C) - Day 4 Task.
