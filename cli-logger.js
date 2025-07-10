#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

// File paths
const LOGS_FILE = path.join(__dirname, 'logs.txt');
const OPERATION_LOGS_FILE = path.join(__dirname, 'operationLogs.txt');

// Helper function to log operations
function logOperation(operation, details = '') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Operation: ${operation} ${details}\n`;
    
    fs.appendFile(OPERATION_LOGS_FILE, logEntry, (err) => {
        if (err) {
            console.error('Error logging operation:', err.message);
        }
    });
}

// Helper function to get system information
function getSystemInfo() {
    const totalMemory = (os.totalmem() / (1024 * 1024)).toFixed(2);
    const freeMemory = (os.freemem() / (1024 * 1024)).toFixed(2);
    const cpuCount = os.cpus().length;
    const platform = os.platform();
    const hostname = os.hostname();
    
    return {
        platform,
        hostname,
        totalMemory: `${totalMemory} MB`,
        freeMemory: `${freeMemory} MB`,
        cpuCores: cpuCount,
        uptime: `${(os.uptime() / 3600).toFixed(2)} hours`
    };
}

// Write command
function writeLog(message) {
    if (!message || message.trim() === '') {
        console.error('Error: Please provide a message to write.');
        console.log('Usage: node cli-logger.js write "Your message here"');
        return;
    }
    
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    
    fs.appendFile(LOGS_FILE, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err.message);
            logOperation('WRITE_ERROR', `- Failed to write: ${message}`);
        } else {
            console.log('Log written successfully!');
            logOperation('WRITE', `- Message: "${message}"`);
        }
    });
}

// Read command
function readLogs() {
    fs.readFile(LOGS_FILE, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('No logs found. The log file doesn\'t exist yet.');
                console.log('Use "node cli-logger.js write <message>" to create your first log.');
            } else {
                console.error('Error reading log file:', err.message);
            }
            logOperation('READ_ERROR', '- Failed to read logs');
        } else {
            if (data.trim() === '') {
                console.log('No logs found. The log file is empty.');
            } else {
                console.log('\n--- LOG CONTENTS ---');
                console.log(data);
                console.log('--- END OF LOGS ---\n');
            }
            logOperation('READ', '- Logs displayed successfully');
        }
    });
}

// Clear command
function clearLogs() {
    fs.writeFile(LOGS_FILE, '', (err) => {
        if (err) {
            console.error('Error clearing log file:', err.message);
            logOperation('CLEAR_ERROR', '- Failed to clear logs');
        } else {
            console.log('Logs cleared successfully!');
            logOperation('CLEAR', '- All logs cleared');
        }
    });
}

// System info command
function showSystemInfo() {
    const sysInfo = getSystemInfo();
    console.log('\n--- SYSTEM INFORMATION ---');
    console.log(`Platform: ${sysInfo.platform}`);
    console.log(`Hostname: ${sysInfo.hostname}`);
    console.log(`Total Memory: ${sysInfo.totalMemory}`);
    console.log(`Free Memory: ${sysInfo.freeMemory}`);
    console.log(`CPU Cores: ${sysInfo.cpuCores}`);
    console.log(`System Uptime: ${sysInfo.uptime}`);
    console.log('--- END SYSTEM INFO ---\n');
    
    logOperation('INFO', '- System information displayed');
}

// Interactive write mode using readline
function interactiveWrite() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Enter your log message: ', (message) => {
        writeLog(message);
        rl.close();
    });
}

// Help command
function showHelp() {
    console.log('\n--- CLI LOGGER HELP ---');
    console.log('Usage: node cli-logger.js [command] [options]');
    console.log('');
    console.log('Interactive Mode:');
    console.log('  node cli-logger.js             Start interactive menu (default)');
    console.log('  node cli-logger.js interactive  Start interactive menu');
    console.log('  node cli-logger.js menu         Start interactive menu');
    console.log('  node cli-logger.js i            Start interactive menu');
    console.log('');
    console.log('Direct Commands:');
    console.log('  write <message>    Write a message to the log file');
    console.log('  write              Start interactive mode to write a message');
    console.log('  read               Read and display all logs');
    console.log('  clear              Clear all logs from the file');
    console.log('  info               Display system information');
    console.log('  help               Show this help message');
    console.log('');
    console.log('Examples:');
    console.log('  node cli-logger.js                              # Interactive mode');
    console.log('  node cli-logger.js write "This is my first log" # Direct command');
    console.log('  node cli-logger.js read                         # Direct command');
    console.log('  node cli-logger.js clear                        # Direct command');
    console.log('  node cli-logger.js info                         # Direct command');
    console.log('--- END HELP ---\n');
    
    logOperation('HELP', '- Help displayed');
}

// Interactive menu system
function showInteractiveMenu() {
    console.log('\n=== CLI LOGGER - INTERACTIVE MODE ===');
    console.log('Please select an option:');
    console.log('1. Write a new log message');
    console.log('2. Read all logs');
    console.log('3. Clear all logs');
    console.log('4. Show system information');
    console.log('5. Show help');
    console.log('6. Exit');
    console.log('=====================================');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Enter your choice (1-6): ', (choice) => {
        handleMenuChoice(choice.trim(), rl);
    });
}

// Handle menu choice
function handleMenuChoice(choice, rl) {
    switch (choice) {
        case '1':
            rl.question('Enter your log message: ', (message) => {
                rl.close();
                if (message.trim()) {
                    writeLog(message);
                    setTimeout(() => {
                        askToContinue();
                    }, 1000);
                } else {
                    console.log('Error: Message cannot be empty!');
                    setTimeout(() => {
                        askToContinue();
                    }, 1000);
                }
            });
            break;
            
        case '2':
            rl.close();
            readLogs();
            setTimeout(() => {
                askToContinue();
            }, 1000);
            break;
            
        case '3':
            rl.question('Are you sure you want to clear all logs? (y/N): ', (confirm) => {
                rl.close();
                if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
                    clearLogs();
                } else {
                    console.log('Clear operation cancelled.');
                }
                setTimeout(() => {
                    askToContinue();
                }, 1000);
            });
            break;
            
        case '4':
            rl.close();
            showSystemInfo();
            setTimeout(() => {
                askToContinue();
            }, 1000);
            break;
            
        case '5':
            rl.close();
            showHelp();
            setTimeout(() => {
                askToContinue();
            }, 1000);
            break;
            
        case '6':
            console.log('Thank you for using CLI Logger! Goodbye!');
            rl.close();
            logOperation('EXIT', '- User exited the application');
            process.exit(0);
            break;
            
        default:
            console.log('Invalid choice! Please enter a number between 1-6.');
            rl.close();
            setTimeout(() => {
                askToContinue();
            }, 1000);
    }
}

// Ask user if they want to continue
function askToContinue() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('\nWould you like to perform another operation? (y/N): ', (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            setTimeout(() => {
                showInteractiveMenu();
            }, 500);
        } else {
            console.log('Thank you for using CLI Logger! Goodbye!');
            logOperation('EXIT', '- User exited the application');
            process.exit(0);
        }
    });
}

// Main function to parse arguments and execute commands
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Welcome to CLI Logger!');
        console.log('Starting interactive mode...');
        setTimeout(() => {
            showInteractiveMenu();
        }, 1000);
        return;
    }
    
    const command = args[0].toLowerCase();
    
    switch (command) {
        case 'interactive':
        case 'menu':
        case 'i':
            showInteractiveMenu();
            break;
            
        case 'write':
            if (args.length > 1) {
                // Join all arguments after 'write' as the message
                const message = args.slice(1).join(' ');
                writeLog(message);
            } else {
                // Interactive mode if no message provided
                interactiveWrite();
            }
            break;
            
        case 'read':
            readLogs();
            break;
            
        case 'clear':
            clearLogs();
            break;
            
        case 'info':
            showSystemInfo();
            break;
            
        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;
            
        default:
            console.error(`Unknown command: ${command}`);
            console.log('Use "node cli-logger.js help" for available commands.');
            console.log('Or run "node cli-logger.js" for interactive mode.');
            logOperation('ERROR', `- Unknown command: ${command}`);
    }
}

// Run the main function
main();
