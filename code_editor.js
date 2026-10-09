#!/usr/bin/env node

// code_editor.js - Visual code editor with syntax highlighting and real-time error checking
// Created by Daniel "Death" Newton

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
const chalk = require('chalk');

class CodeEditor {
    constructor() {
        this.currentFile = null;
        this.currentContent = '';
        this.cursorPosition = { line: 0, column: 0 };
        this.syntaxHighlighting = true;
        this.autoSave = true;
        this.autoSaveInterval = 30000; // 30 seconds
        this.language = 'javascript';
        this.errorChecking = true;
        this.lineNumbers = true;
        this.wordWrap = false;
        this.searchResults = [];
        this.clipboard = '';
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50;

        // Syntax highlighting themes
        this.themes = {
            default: {
                keyword: chalk.blue,
                string: chalk.green,
                comment: chalk.gray,
                number: chalk.yellow,
                function: chalk.cyan,
                variable: chalk.white,
                operator: chalk.magenta,
                error: chalk.red.bold,
                warning: chalk.yellow.bold
            },
            dark: {
                keyword: chalk.blue.bold,
                string: chalk.green.bold,
                comment: chalk.gray.dim,
                number: chalk.yellow.bold,
                function: chalk.cyan.bold,
                variable: chalk.white.bold,
                operator: chalk.magenta.bold,
                error: chalk.red.bold,
                warning: chalk.yellow.bold
            }
        };

        this.currentTheme = 'default';

        // Language-specific syntax rules
        this.syntaxRules = this.loadSyntaxRules();
    }

    async initialize(projectPath, fileName = null) {
        console.log(chalk.blue('📝 Initializing Code Editor...'));

        this.projectPath = projectPath;

        if (fileName) {
            await this.openFile(fileName);
        } else {
            // Create a new file
            this.currentFile = 'untitled.js';
            this.currentContent = this.getTemplateContent('javascript');
            this.language = 'javascript';
        }

        // Start auto-save timer
        if (this.autoSave) {
            this.startAutoSave();
        }

        console.log(chalk.green('✅ Code Editor ready'));
        console.log(chalk.gray(`📁 Project: ${projectPath}`));
        console.log(chalk.gray(`📄 File: ${this.currentFile}`));
        console.log(chalk.gray(`💻 Language: ${this.language}`));
    }

    async openFile(fileName) {
        try {
            const filePath = path.join(this.projectPath, fileName);
            this.currentContent = await fs.readFile(filePath, 'utf8');
            this.currentFile = fileName;
            this.language = this.detectLanguage(fileName);

            console.log(chalk.green(`✅ Opened: ${fileName}`));
            console.log(chalk.gray(`📏 Size: ${this.currentContent.length} characters`));
            console.log(chalk.gray(`📝 Lines: ${this.currentContent.split('\n').length}`));

        } catch (error) {
            console.log(chalk.red(`❌ Error opening file: ${error.message}`));
            throw error;
        }
    }

    async saveFile() {
        if (!this.currentFile) {
            console.log(chalk.red('❌ No file to save'));
            return false;
        }

        try {
            const filePath = path.join(this.projectPath, this.currentFile);
            await fs.writeFile(filePath, this.currentContent, 'utf8');

            console.log(chalk.green(`💾 Saved: ${this.currentFile}`));
            return true;

        } catch (error) {
            console.log(chalk.red(`❌ Error saving file: ${error.message}`));
            return false;
        }
    }

    async saveAs(newFileName) {
        const oldFile = this.currentFile;
        this.currentFile = newFileName;
        this.language = this.detectLanguage(newFileName);

        const success = await this.saveFile();
        if (!success) {
            this.currentFile = oldFile;
            return false;
        }

        console.log(chalk.green(`💾 Saved as: ${newFileName}`));
        return true;
    }

    detectLanguage(fileName) {
        const ext = path.extname(fileName).toLowerCase();

        const languageMap = {
            '.js': 'javascript',
            '.mjs': 'javascript',
            '.ts': 'typescript',
            '.py': 'python',
            '.java': 'java',
            '.cpp': 'cpp',
            '.cc': 'cpp',
            '.cxx': 'cpp',
            '.hpp': 'cpp',
            '.h': 'cpp',
            '.go': 'go',
            '.rs': 'rust',
            '.json': 'json',
            '.md': 'markdown',
            '.txt': 'text'
        };

        return languageMap[ext] || 'text';
    }

    getTemplateContent(language) {
        const templates = {
            javascript: `// ${this.currentFile}
// Created with Comprehensive Bot Builder
// Language: JavaScript

// Basic bot structure
const config = {
    name: 'MyBot',
    version: '1.0.0',
    prefix: '!'
};

// Bot functionality
function processMessage(message) {
    console.log('Processing:', message);

    if (message.startsWith(config.prefix)) {
        const command = message.slice(1);
        return handleCommand(command);
    }

    return generateResponse(message);
}

function handleCommand(command) {
    switch (command.toLowerCase()) {
        case 'ping':
            return 'Pong! 🏓';
        case 'hello':
            return \`Hello! I'm \${config.name}\`;
        case 'help':
            return 'Available commands: ping, hello, help';
        default:
            return 'Unknown command. Type !help for help.';
    }
}

function generateResponse(message) {
    // Add your bot logic here
    return \`You said: "\${message}"\`;
}

// Example usage
console.log(processMessage('!ping'));
console.log(processMessage('Hello bot!'));
`,
            python: `# ${this.currentFile}
# Created with Comprehensive Bot Builder
# Language: Python

# Basic bot structure
config = {
    'name': 'MyBot',
    'version': '1.0.0',
    'prefix': '!'
}

def process_message(message):
    """Process incoming messages and return responses"""
    print(f"Processing: {message}")

    if message.startswith(config['prefix']):
        command = message[1:]
        return handle_command(command)

    return generate_response(message)

def handle_command(command):
    """Handle bot commands"""
    command = command.lower()

    if command == 'ping':
        return 'Pong! 🏓'
    elif command == 'hello':
        return f"Hello! I'm {config['name']}"
    elif command == 'help':
        return 'Available commands: ping, hello, help'
    else:
        return 'Unknown command. Type !help for help.'

def generate_response(message):
    """Generate bot responses"""
    # Add your bot logic here
    return f'You said: "{message}"'

# Example usage
if __name__ == '__main__':
    print(process_message('!ping'))
    print(process_message('Hello bot!'))
`,
            java: `// ${this.currentFile}
// Created with Comprehensive Bot Builder
// Language: Java

public class MyBot {
    private static final String NAME = "MyBot";
    private static final String VERSION = "1.0.0";
    private static final String PREFIX = "!";

    public static void main(String[] args) {
        System.out.println("Bot initialized: " + NAME + " v" + VERSION);

        // Example usage
        System.out.println(processMessage("!ping"));
        System.out.println(processMessage("Hello bot!"));
    }

    public static String processMessage(String message) {
        System.out.println("Processing: " + message);

        if (message.startsWith(PREFIX)) {
            String command = message.substring(1);
            return handleCommand(command);
        }

        return generateResponse(message);
    }

    public static String handleCommand(String command) {
        switch (command.toLowerCase()) {
            case "ping":
                return "Pong! 🏓";
            case "hello":
                return "Hello! I'm " + NAME;
            case "help":
                return "Available commands: ping, hello, help";
            default:
                return "Unknown command. Type !help for help.";
        }
    }

    public static String generateResponse(String message) {
        // Add your bot logic here
        return "You said: \"" + message + "\"";
    }
}
`,
            cpp: `// ${this.currentFile}
// Created with Comprehensive Bot Builder
// Language: C++

#include <iostream>
#include <string>

class MyBot {
private:
    const std::string name = "MyBot";
    const std::string version = "1.0.0";
    const std::string prefix = "!";

public:
    std::string processMessage(const std::string& message) {
        std::cout << "Processing: " << message << std::endl;

        if (message.substr(0, prefix.length()) == prefix) {
            std::string command = message.substr(1);
            return handleCommand(command);
        }

        return generateResponse(message);
    }

    std::string handleCommand(const std::string& command) {
        if (command == "ping") {
            return "Pong! 🏓";
        } else if (command == "hello") {
            return "Hello! I'm " + name;
        } else if (command == "help") {
            return "Available commands: ping, hello, help";
        } else {
            return "Unknown command. Type !help for help.";
        }
    }

    std::string generateResponse(const std::string& message) {
        // Add your bot logic here
        return "You said: \"" + message + "\"";
    }
};

int main() {
    MyBot bot;

    std::cout << "Bot initialized: " << bot.handleCommand("ping") << std::endl;

    // Example usage
    std::cout << bot.processMessage("!ping") << std::endl;
    std::cout << bot.processMessage("Hello bot!") << std::endl;

    return 0;
}
`,
            go: `// ${this.currentFile}
// Created with Comprehensive Bot Builder
// Language: Go

package main

import (
    "fmt"
    "strings"
)

type MyBot struct {
    name    string
    version string
    prefix  string
}

func NewBot() *MyBot {
    return &MyBot{
        name:    "MyBot",
        version: "1.0.0",
        prefix:  "!",
    }
}

func (b *MyBot) ProcessMessage(message string) string {
    fmt.Printf("Processing: %s\\n", message)

    if strings.HasPrefix(message, b.prefix) {
        command := message[1:]
        return b.handleCommand(command)
    }

    return b.generateResponse(message)
}

func (b *MyBot) handleCommand(command string) string {
    switch strings.ToLower(command) {
    case "ping":
        return "Pong! 🏓"
    case "hello":
        return fmt.Sprintf("Hello! I'm %s", b.name)
    case "help":
        return "Available commands: ping, hello, help"
    default:
        return "Unknown command. Type !help for help."
    }
}

func (b *MyBot) generateResponse(message string) string {
    // Add your bot logic here
    return fmt.Sprintf("You said: \\"%s\\"", message)
}

func main() {
    bot := NewBot()

    // Example usage
    fmt.Println(bot.ProcessMessage("!ping"))
    fmt.Println(bot.ProcessMessage("Hello bot!"))
}
`,
            rust: `// ${this.currentFile}
// Created with Comprehensive Bot Builder
// Language: Rust

#[derive(Debug)]
struct MyBot {
    name: String,
    version: String,
    prefix: String,
}

impl MyBot {
    fn new() -> Self {
        MyBot {
            name: "MyBot".to_string(),
            version: "1.0.0".to_string(),
            prefix: "!".to_string(),
        }
    }

    fn process_message(&self, message: &str) -> String {
        println!("Processing: {}", message);

        if message.starts_with(&self.prefix) {
            let command = &message[1..];
            self.handle_command(command)
        } else {
            self.generate_response(message)
        }
    }

    fn handle_command(&self, command: &str) -> String {
        match command.to_lowercase().as_str() {
            "ping" => "Pong! 🏓".to_string(),
            "hello" => format!("Hello! I'm {}", self.name),
            "help" => "Available commands: ping, hello, help".to_string(),
            _ => "Unknown command. Type !help for help.".to_string(),
        }
    }

    fn generate_response(&self, message: &str) -> String {
        // Add your bot logic here
        format!("You said: \\"{}\\"", message)
    }
}

fn main() {
    let bot = MyBot::new();

    // Example usage
    println!("{}", bot.process_message("!ping"));
    println!("{}", bot.process_message("Hello bot!"));
}
`
        };

        return templates[language] || templates.javascript;
    }

    loadSyntaxRules() {
        return {
            javascript: {
                keywords: [
                    'const', 'let', 'var', 'function', 'class', 'if', 'else', 'for', 'while',
                    'return', 'try', 'catch', 'throw', 'async', 'await', 'import', 'export',
                    'from', 'default', 'new', 'this', 'super', 'extends', 'static', 'get', 'set'
                ],
                operators: ['+', '-', '*', '/', '%', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '!', '++', '--'],
                comments: ['//', '/*', '*/']
            },
            python: {
                keywords: [
                    'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'try', 'except',
                    'finally', 'with', 'as', 'import', 'from', 'lambda', 'and', 'or', 'not', 'in',
                    'is', 'True', 'False', 'None', 'self', 'pass', 'break', 'continue'
                ],
                operators: ['+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=', 'and', 'or', 'not', 'in', 'is'],
                comments: ['#']
            },
            java: {
                keywords: [
                    'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',
                    'static', 'final', 'void', 'int', 'long', 'float', 'double', 'boolean', 'char',
                    'String', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default',
                    'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'return'
                ],
                operators: ['+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!', '++', '--'],
                comments: ['//', '/*', '*/']
            },
            cpp: {
                keywords: [
                    'class', 'struct', 'public', 'private', 'protected', 'virtual', 'override',
                    'const', 'static', 'void', 'int', 'long', 'float', 'double', 'bool', 'char',
                    'string', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default',
                    'try', 'catch', 'throw', 'new', 'delete', 'this', 'return', 'include'
                ],
                operators: ['+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!', '++', '--'],
                comments: ['//', '/*', '*/']
            },
            go: {
                keywords: [
                    'package', 'import', 'func', 'var', 'const', 'type', 'struct', 'interface',
                    'map', 'chan', 'go', 'defer', 'select', 'if', 'else', 'for', 'range', 'switch',
                    'case', 'default', 'return', 'break', 'continue', 'fallthrough', 'goto'
                ],
                operators: ['+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!'],
                comments: ['//', '/*', '*/']
            },
            rust: {
                keywords: [
                    'fn', 'let', 'mut', 'const', 'static', 'struct', 'enum', 'impl', 'trait',
                    'pub', 'use', 'mod', 'crate', 'super', 'self', 'if', 'else', 'match', 'loop',
                    'while', 'for', 'in', 'return', 'break', 'continue', 'as', 'move', 'ref'
                ],
                operators: ['+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!'],
                comments: ['//', '/*', '*/']
            }
        };
    }

    syntaxHighlight(text) {
        if (!this.syntaxHighlighting) {
            return text;
        }

        const theme = this.themes[this.currentTheme];
        const rules = this.syntaxRules[this.language];

        if (!rules) {
            return text;
        }

        let highlighted = text;

        // Highlight strings
        highlighted = highlighted.replace(/(["'`])(.*?)\1/g, theme.string('$1$2$1'));

        // Highlight comments
        for (const commentStart of rules.comments) {
            if (commentStart === '/*') {
                highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, theme.comment('$&'));
            } else if (commentStart === '//') {
                highlighted = highlighted.replace(/\/\/.*$/gm, theme.comment('$&'));
            } else if (commentStart === '#') {
                highlighted = highlighted.replace(/#.*$/gm, theme.comment('$&'));
            }
        }

        // Highlight keywords
        const keywordRegex = new RegExp(`\\b(${rules.keywords.join('|')})\\b`, 'g');
        highlighted = highlighted.replace(keywordRegex, theme.keyword('$1'));

        // Highlight numbers
        highlighted = highlighted.replace(/\b\d+(\.\d+)?\b/g, theme.number('$&'));

        return highlighted;
    }

    async checkErrors() {
        if (!this.errorChecking) {
            return [];
        }

        const errors = [];
        const lines = this.currentContent.split('\n');

        lines.forEach((line, index) => {
            const lineNumber = index + 1;

            // Basic syntax checking based on language
            switch (this.language) {
                case 'javascript':
                    if (line.includes('console.log(') && !line.includes(')')) {
                        errors.push({
                            line: lineNumber,
                            message: 'Missing closing parenthesis',
                            type: 'error'
                        });
                    }
                    if (line.includes('{') && !line.includes('}')) {
                        errors.push({
                            line: lineNumber,
                            message: 'Missing closing brace',
                            type: 'warning'
                        });
                    }
                    break;

                case 'python':
                    if (line.includes('def ') && !line.includes(':')) {
                        errors.push({
                            line: lineNumber,
                            message: 'Missing colon after function definition',
                            type: 'error'
                        });
                    }
                    if (line.includes('if ') && !line.includes(':') && !line.includes('else:')) {
                        errors.push({
                            line: lineNumber,
                            message: 'Missing colon after if statement',
                            type: 'error'
                        });
                    }
                    break;

                case 'java':
                    if (line.includes('System.out.println(') && !line.trim().endsWith(';')) {
                        errors.push({
                            line: lineNumber,
                            message: 'Missing semicolon',
                            type: 'error'
                        });
                    }
                    break;
            }

            // Check for common issues
            if (line.includes('undefined') && !line.includes('//') && !line.includes('/*')) {
                errors.push({
                    line: lineNumber,
                    message: 'Potential undefined variable usage',
                    type: 'warning'
                });
            }

            if (line.length > 120) {
                errors.push({
                    line: lineNumber,
                    message: 'Line too long (recommended: < 120 characters)',
                    type: 'info'
                });
            }
        });

        return errors;
    }

    async displayContent() {
        console.clear();
        console.log(chalk.cyan('📝 CODE EDITOR'));
        console.log(chalk.gray('='.repeat(50)));
        console.log(chalk.gray(`📄 File: ${this.currentFile} | 💻 Language: ${this.language}`));
        console.log(chalk.gray(`📏 Size: ${this.currentContent.length} chars | 📝 Lines: ${this.currentContent.split('\n').length}`));
        console.log('');

        const lines = this.currentContent.split('\n');
        const startLine = Math.max(0, this.cursorPosition.line - 10);
        const endLine = Math.min(lines.length, startLine + 20);

        for (let i = startLine; i < endLine; i++) {
            let lineContent = lines[i] || '';

            // Add line numbers
            let linePrefix = '';
            if (this.lineNumbers) {
                const lineNum = (i + 1).toString().padStart(4, ' ');
                linePrefix = chalk.gray(`${lineNum} │ `);
            }

            // Syntax highlighting
            lineContent = this.syntaxHighlight(lineContent);

            // Highlight current line
            if (i === this.cursorPosition.line) {
                lineContent = chalk.bgBlue.white(lineContent);
            }

            console.log(linePrefix + lineContent);
        }

        // Display errors
        const errors = await this.checkErrors();
        if (errors.length > 0) {
            console.log('');
            console.log(chalk.red('🚨 ERRORS & WARNINGS:'));
            errors.slice(0, 5).forEach(error => {
                const icon = error.type === 'error' ? '❌' : error.type === 'warning' ? '⚠️' : 'ℹ️';
                console.log(chalk.red(`${icon} Line ${error.line}: ${error.message}`));
            });
            if (errors.length > 5) {
                console.log(chalk.gray(`... and ${errors.length - 5} more issues`));
            }
        }
    }

    async runEditor() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: chalk.green('editor> ')
        });

        await this.displayContent();

        rl.prompt();

        rl.on('line', async (input) => {
            const command = input.trim();

            if (command === 'help' || command === '?') {
                this.showHelp();
            } else if (command === 'quit' || command === 'exit' || command === 'q') {
                await this.saveFile();
                console.log(chalk.green('👋 Goodbye!'));
                rl.close();
                return;
            } else if (command.startsWith('open ')) {
                const fileName = command.slice(5);
                try {
                    await this.openFile(fileName);
                } catch (error) {
                    console.log(chalk.red(`❌ Error opening file: ${error.message}`));
                }
            } else if (command.startsWith('save ')) {
                const fileName = command.slice(5);
                await this.saveAs(fileName);
            } else if (command === 'save') {
                await this.saveFile();
            } else if (command === 'run' || command === 'execute') {
                await this.runCode();
            } else if (command === 'test') {
                await this.testCode();
            } else if (command.startsWith('set ')) {
                await this.setOption(command.slice(4));
            } else if (command === 'status') {
                this.showStatus();
            } else if (command === 'clear') {
                console.clear();
            } else {
                console.log(chalk.red(`❌ Unknown command: ${command}`));
                console.log(chalk.gray('Type "help" for available commands'));
            }

            await this.displayContent();
            rl.prompt();
        });

        rl.on('close', () => {
            process.exit(0);
        });
    }

    showHelp() {
        console.log(chalk.cyan('📚 CODE EDITOR HELP'));
        console.log(chalk.gray('='.repeat(40)));
        console.log('');
        console.log(chalk.yellow('FILE OPERATIONS:'));
        console.log('  open <filename>    Open a file');
        console.log('  save              Save current file');
        console.log('  save <filename>   Save as new file');
        console.log('');
        console.log(chalk.yellow('CODE EXECUTION:'));
        console.log('  run               Run/execute code');
        console.log('  test              Test code for errors');
        console.log('');
        console.log(chalk.yellow('EDITOR SETTINGS:'));
        console.log('  set theme <name>  Change syntax theme (default/dark)');
        console.log('  set highlight     Toggle syntax highlighting');
        console.log('  set numbers       Toggle line numbers');
        console.log('  set autosave      Toggle auto-save');
        console.log('');
        console.log(chalk.yellow('OTHER COMMANDS:'));
        console.log('  status            Show editor status');
        console.log('  clear             Clear screen');
        console.log('  help              Show this help');
        console.log('  quit              Exit editor');
        console.log('');
    }

    async runCode() {
        if (!this.currentFile) {
            console.log(chalk.red('❌ No file to run'));
            return;
        }

        try {
            console.log(chalk.blue(`🚀 Running ${this.currentFile}...`));

            switch (this.language) {
                case 'javascript':
                    execSync(`node "${path.join(this.projectPath, this.currentFile)}"`, {
                        stdio: 'inherit',
                        cwd: this.projectPath
                    });
                    break;

                case 'python':
                    execSync(`python "${path.join(this.projectPath, this.currentFile)}"`, {
                        stdio: 'inherit',
                        cwd: this.projectPath
                    });
                    break;

                case 'java':
                    const className = path.basename(this.currentFile, '.java');
                    execSync(`javac "${path.join(this.projectPath, this.currentFile)}" && java -cp "${this.projectPath}" ${className}`, {
                        stdio: 'inherit',
                        cwd: this.projectPath
                    });
                    break;

                case 'cpp':
                    const exeName = path.basename(this.currentFile, path.extname(this.currentFile));
                    execSync(`g++ "${path.join(this.projectPath, this.currentFile)}" -o "${exeName}" && "./${exeName}"`, {
                        stdio: 'inherit',
                        cwd: this.projectPath
                    });
                    break;

                case 'go':
                    execSync(`go run "${path.join(this.projectPath, this.currentFile)}"`, {
                        stdio: 'inherit',
                        cwd: this.projectPath
                    });
                    break;

                case 'rust':
                    execSync(`cargo run`, {
                        stdio: 'inherit',
                        cwd: this.projectPath
                    });
                    break;

                default:
                    console.log(chalk.red(`❌ Cannot run ${this.language} files`));
                    return;
            }

            console.log(chalk.green('✅ Execution completed'));

        } catch (error) {
            console.log(chalk.red(`❌ Execution failed: ${error.message}`));
        }
    }

    async testCode() {
        console.log(chalk.blue('🧪 Testing code...'));

        const errors = await this.checkErrors();

        if (errors.length === 0) {
            console.log(chalk.green('✅ No syntax errors found'));
            return;
        }

        console.log(chalk.red(`❌ Found ${errors.length} issues:`));
        errors.forEach(error => {
            const icon = error.type === 'error' ? '❌' : error.type === 'warning' ? '⚠️' : 'ℹ️';
            console.log(`${icon} Line ${error.line}: ${error.message}`);
        });
    }

    async setOption(option) {
        const parts = option.split(' ');
        const setting = parts[0];
        const value = parts[1];

        switch (setting) {
            case 'theme':
                if (this.themes[value]) {
                    this.currentTheme = value;
                    console.log(chalk.green(`✅ Theme changed to: ${value}`));
                } else {
                    console.log(chalk.red(`❌ Unknown theme: ${value}`));
                }
                break;

            case 'highlight':
                this.syntaxHighlighting = !this.syntaxHighlighting;
                console.log(chalk.green(`✅ Syntax highlighting: ${this.syntaxHighlighting ? 'ON' : 'OFF'}`));
                break;

            case 'numbers':
                this.lineNumbers = !this.lineNumbers;
                console.log(chalk.green(`✅ Line numbers: ${this.lineNumbers ? 'ON' : 'OFF'}`));
                break;

            case 'autosave':
                this.autoSave = !this.autoSave;
                console.log(chalk.green(`✅ Auto-save: ${this.autoSave ? 'ON' : 'OFF'}`));
                if (this.autoSave) {
                    this.startAutoSave();
                } else {
                    this.stopAutoSave();
                }
                break;

            default:
                console.log(chalk.red(`❌ Unknown setting: ${setting}`));
        }
    }

    showStatus() {
        console.log(chalk.cyan('📊 EDITOR STATUS'));
        console.log(chalk.gray('='.repeat(30)));
        console.log(`📄 Current File: ${this.currentFile || 'None'}`);
        console.log(`💻 Language: ${this.language}`);
        console.log(`🎨 Theme: ${this.currentTheme}`);
        console.log(`✨ Syntax Highlighting: ${this.syntaxHighlighting ? 'ON' : 'OFF'}`);
        console.log(`🔢 Line Numbers: ${this.lineNumbers ? 'ON' : 'OFF'}`);
        console.log(`💾 Auto-save: ${this.autoSave ? 'ON' : 'OFF'}`);
        console.log(`🚨 Error Checking: ${this.errorChecking ? 'ON' : 'OFF'}`);
        console.log(`📏 File Size: ${this.currentContent.length} characters`);
        console.log(`📝 Total Lines: ${this.currentContent.split('\n').length}`);
    }

    startAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
        }

        this.autoSaveTimer = setInterval(async () => {
            if (this.currentFile && this.currentContent) {
                await this.saveFile();
            }
        }, this.autoSaveInterval);
    }

    stopAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
        }
    }

    // Utility methods for undo/redo
    saveState() {
        this.undoStack.push(this.currentContent);
        if (this.undoStack.length > this.maxUndoSteps) {
            this.undoStack.shift();
        }
        this.redoStack = [];
    }

    undo() {
        if (this.undoStack.length > 0) {
            this.redoStack.push(this.currentContent);
            this.currentContent = this.undoStack.pop();
            return true;
        }
        return false;
    }

    redo() {
        if (this.redoStack.length > 0) {
            this.undoStack.push(this.currentContent);
            this.currentContent = this.redoStack.pop();
            return true;
        }
        return false;
    }
}

module.exports = CodeEditor;

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const projectPath = args[0] || process.cwd();
    const fileName = args[1];

    const editor = new CodeEditor();
    editor.initialize(projectPath, fileName)
        .then(() => editor.runEditor())
        .catch(error => {
            console.error('Failed to start editor:', error.message);
            process.exit(1);
        });
}
