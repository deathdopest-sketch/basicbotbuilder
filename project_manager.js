#!/usr/bin/env node

// project_manager.js - Comprehensive project management system
// Created by Daniel "Death" Newton

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

class ProjectManager {
    constructor() {
        this.backupDir = 'backups';
        this.templatesDir = 'templates';
        this.projectsDir = 'projects';
        this.sharedDir = 'shared';
    }

    async initialize() {
        // Ensure required directories exist
        await this.ensureDirectories();
        console.log(chalk.green('✅ Project management system initialized'));
    }

    async ensureDirectories() {
        const dirs = [
            this.backupDir,
            this.templatesDir,
            this.projectsDir,
            this.sharedDir,
            path.join(this.templatesDir, 'javascript'),
            path.join(this.templatesDir, 'python'),
            path.join(this.templatesDir, 'java'),
            path.join(this.templatesDir, 'cpp'),
            path.join(this.templatesDir, 'go'),
            path.join(this.templatesDir, 'rust')
        ];

        for (const dir of dirs) {
            try {
                await fs.mkdir(dir, { recursive: true });
            } catch (error) {
                // Directory might already exist
            }
        }
    }

    async backupProject(projectName) {
        const projectPath = path.join(this.projectsDir, projectName);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(this.backupDir, `${projectName}_${timestamp}`);

        console.log(chalk.blue(`📦 Creating backup of ${projectName}...`));

        try {
            // Check if project exists
            await fs.access(projectPath);

            // Create backup directory
            await fs.mkdir(backupPath, { recursive: true });

            // Copy all files
            await this.copyDirectory(projectPath, backupPath);

            // Create backup metadata
            const metadata = {
                projectName,
                originalPath: projectPath,
                backupPath,
                timestamp: new Date().toISOString(),
                size: await this.getDirectorySize(projectPath)
            };

            await fs.writeFile(
                path.join(backupPath, 'backup-info.json'),
                JSON.stringify(metadata, null, 2)
            );

            console.log(chalk.green(`✅ Backup created: ${backupPath}`));
            return backupPath;

        } catch (error) {
            console.log(chalk.red(`❌ Backup failed: ${error.message}`));
            throw error;
        }
    }

    async restoreProject(backupPath, targetName = null) {
        console.log(chalk.blue(`🔄 Restoring project from ${backupPath}...`));

        try {
            // Read backup metadata
            const metadataPath = path.join(backupPath, 'backup-info.json');
            const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf8'));

            const projectName = targetName || metadata.projectName;
            const restorePath = path.join(this.projectsDir, projectName);

            // Check if target directory already exists
            try {
                await fs.access(restorePath);
                const overwrite = await this.promptOverwrite(projectName);
                if (!overwrite) {
                    console.log(chalk.yellow('❌ Restore cancelled'));
                    return;
                }
                await fs.rm(restorePath, { recursive: true, force: true });
            } catch {
                // Directory doesn't exist, that's fine
            }

            // Copy files from backup
            await this.copyDirectory(backupPath, restorePath);

            // Remove backup metadata from restored project
            try {
                await fs.unlink(path.join(restorePath, 'backup-info.json'));
            } catch {
                // File might not exist
            }

            console.log(chalk.green(`✅ Project restored: ${projectName}`));
            return restorePath;

        } catch (error) {
            console.log(chalk.red(`❌ Restore failed: ${error.message}`));
            throw error;
        }
    }

    async copyDirectory(source, destination) {
        const entries = await fs.readdir(source, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(source, entry.name);
            const destPath = path.join(destination, entry.name);

            if (entry.isDirectory()) {
                await fs.mkdir(destPath, { recursive: true });
                await this.copyDirectory(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
    }

    async getDirectorySize(dirPath) {
        let totalSize = 0;

        async function calculateSize(itemPath) {
            const stats = await fs.stat(itemPath);

            if (stats.isDirectory()) {
                const items = await fs.readdir(itemPath);
                for (const item of items) {
                    await calculateSize(path.join(itemPath, item));
                }
            } else {
                totalSize += stats.size;
            }
        }

        await calculateSize(dirPath);
        return totalSize;
    }

    async promptOverwrite(projectName) {
        // In a real implementation, this would prompt the user
        // For now, return false to be safe
        console.log(chalk.yellow(`⚠️  Project "${projectName}" already exists`));
        return false;
    }

    async initializeGit(projectPath) {
        console.log(chalk.blue('🔧 Initializing Git repository...'));

        try {
            // Check if git is available
            execSync('git --version', { stdio: 'pipe' });

            // Initialize repository
            execSync('git init', { cwd: projectPath, stdio: 'pipe' });

            // Create .gitignore
            const gitignore = await this.generateGitignore(projectPath);
            await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);

            // Initial commit
            execSync('git add .', { cwd: projectPath, stdio: 'pipe' });
            execSync('git commit -m "Initial commit - Bot created with Comprehensive Bot Builder"', {
                cwd: projectPath,
                stdio: 'pipe'
            });

            console.log(chalk.green('✅ Git repository initialized'));
            return true;

        } catch (error) {
            console.log(chalk.yellow('⚠️  Git not available or failed to initialize'));
            return false;
        }
    }

    async generateGitignore(projectPath) {
        // Read project configuration to determine language
        let language = 'generic';
        try {
            const configPath = path.join(projectPath, 'project.json');
            const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
            language = config.language;
        } catch {
            // Use generic gitignore
        }

        let gitignore = `# Bot Builder Project
.env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output/

# Dependency directories
`;

        switch (language) {
            case 'javascript':
                gitignore += `node_modules/
jspm_packages/

# Optional npm cache directory
.npm/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE files
.vscode/
.idea/
*.swp
*.swo
`;
                break;

            case 'python':
                gitignore += `__pycache__/
*.py[cod]
*$py.class

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
*.manifest
*.spec

# Unit test / coverage reports
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# Virtual environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/
`;
                break;

            case 'java':
                gitignore += `# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs
hs_err_pid*

# IDE files
.vscode/
.idea/
*.swp
*.swo
`;
                break;

            case 'cpp':
                gitignore += `# Prerequisites
*.d

# Compiled Object files
*.slo
*.lo
*.o
*.obj

# Precompiled Headers
*.gch
*.pch

# Compiled Dynamic libraries
*.so
*.dylib
*.dll

# Fortran module files
*.mod
*.smod

# Compiled Static libraries
*.lai
*.la
*.a
*.lib

# Executables
*.exe
*.out
*.app

# Build directories
build/
cmake-build-*/
`;
                break;

            case 'go':
                gitignore += `# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary, built with 'go test -c'
*.test

# Output of the go coverage tool
*.out

# Dependency directories
vendor/
`;
                break;

            case 'rust':
                gitignore += `# Generated by Cargo
/target/

# Remove the # to ignore the local registry of crates
# /registry/

# Backups
*.bak

# IDE files
.vscode/
.idea/
*.swp
*.swo
`;
                break;
        }

        gitignore += `
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Bot Builder specific
test-report.json
*.tmp
`;

        return gitignore;
    }

    async createProjectTemplate(projectPath, language, botType) {
        console.log(chalk.blue(`📝 Creating template for ${language} ${botType} bot...`));

        const templateDir = path.join(this.templatesDir, language);
        const templatePath = path.join(templateDir, `${botType}-template`);

        try {
            // Create template directory
            await fs.mkdir(templatePath, { recursive: true });

            // Copy project files as template
            await this.copyDirectory(projectPath, templatePath);

            // Remove project-specific files
            const filesToRemove = ['project.json', '.env', 'node_modules', '__pycache__'];
            for (const file of filesToRemove) {
                try {
                    const fullPath = path.join(templatePath, file);
                    const stats = await fs.stat(fullPath);
                    if (stats.isDirectory()) {
                        await fs.rm(fullPath, { recursive: true, force: true });
                    } else {
                        await fs.unlink(fullPath);
                    }
                } catch {
                    // File might not exist
                }
            }

            // Create template metadata
            const metadata = {
                language,
                botType,
                created: new Date().toISOString(),
                description: `Template for ${botType} bot in ${language}`,
                files: await this.listTemplateFiles(templatePath)
            };

            await fs.writeFile(
                path.join(templatePath, 'template.json'),
                JSON.stringify(metadata, null, 2)
            );

            console.log(chalk.green(`✅ Template created: ${templatePath}`));
            return templatePath;

        } catch (error) {
            console.log(chalk.red(`❌ Template creation failed: ${error.message}`));
            throw error;
        }
    }

    async listTemplateFiles(templatePath) {
        const files = [];

        async function scanDirectory(dirPath, relativePath = '') {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                const relPath = path.join(relativePath, entry.name);

                if (entry.isDirectory()) {
                    await scanDirectory(fullPath, relPath);
                } else {
                    files.push(relPath);
                }
            }
        }

        await scanDirectory(templatePath);
        return files;
    }

    async shareProject(projectName, shareWith = 'public') {
        console.log(chalk.blue(`📤 Sharing project ${projectName}...`));

        const projectPath = path.join(this.projectsDir, projectName);
        const sharePath = path.join(this.sharedDir, projectName);

        try {
            // Check if project exists
            await fs.access(projectPath);

            // Create share directory
            await fs.mkdir(sharePath, { recursive: true });

            // Copy project files
            await this.copyDirectory(projectPath, sharePath);

            // Create share metadata
            const metadata = {
                projectName,
                sharedBy: 'Current User', // In real implementation, get from user system
                sharedAt: new Date().toISOString(),
                visibility: shareWith,
                originalPath: projectPath
            };

            await fs.writeFile(
                path.join(sharePath, 'share-info.json'),
                JSON.stringify(metadata, null, 2)
            );

            // Remove sensitive files
            const sensitiveFiles = ['.env', 'backup-info.json'];
            for (const file of sensitiveFiles) {
                try {
                    await fs.unlink(path.join(sharePath, file));
                } catch {
                    // File might not exist
                }
            }

            console.log(chalk.green(`✅ Project shared: ${sharePath}`));
            console.log(chalk.cyan(`🔗 Share link: ${shareWith === 'public' ? 'Available in shared projects' : 'Private share'}`));

            return sharePath;

        } catch (error) {
            console.log(chalk.red(`❌ Share failed: ${error.message}`));
            throw error;
        }
    }

    async importSharedProject(sharedProjectName, newName = null) {
        console.log(chalk.blue(`📥 Importing shared project ${sharedProjectName}...`));

        const sharedPath = path.join(this.sharedDir, sharedProjectName);
        const importName = newName || `${sharedProjectName}_imported`;
        const importPath = path.join(this.projectsDir, importName);

        try {
            // Check if shared project exists
            await fs.access(sharedPath);

            // Check if target name already exists
            try {
                await fs.access(importPath);
                console.log(chalk.red(`❌ Project "${importName}" already exists`));
                return null;
            } catch {
                // Good, doesn't exist
            }

            // Copy shared project
            await this.copyDirectory(sharedPath, importPath);

            // Remove share metadata
            try {
                await fs.unlink(path.join(importPath, 'share-info.json'));
            } catch {
                // File might not exist
            }

            // Update project configuration
            const configPath = path.join(importPath, 'project.json');
            try {
                const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
                config.name = importName;
                config.imported = true;
                config.importedFrom = sharedProjectName;
                config.importedAt = new Date().toISOString();

                await fs.writeFile(configPath, JSON.stringify(config, null, 2));
            } catch {
                // Config file might not exist or be malformed
            }

            console.log(chalk.green(`✅ Project imported: ${importName}`));
            return importPath;

        } catch (error) {
            console.log(chalk.red(`❌ Import failed: ${error.message}`));
            throw error;
        }
    }

    async getProjectStatistics(projectName) {
        const projectPath = path.join(this.projectsDir, projectName);

        try {
            const stats = {
                name: projectName,
                size: await this.getDirectorySize(projectPath),
                files: 0,
                directories: 0,
                lastModified: null,
                language: 'unknown',
                botType: 'unknown'
            };

            // Count files and directories
            async function countItems(dirPath) {
                const entries = await fs.readdir(dirPath, { withFileTypes: true });

                for (const entry of entries) {
                    if (entry.isDirectory()) {
                        stats.directories++;
                        await countItems(path.join(dirPath, entry.name));
                    } else {
                        stats.files++;
                        const filePath = path.join(dirPath, entry.name);
                        const fileStats = await fs.stat(filePath);
                        if (!stats.lastModified || fileStats.mtime > stats.lastModified) {
                            stats.lastModified = fileStats.mtime;
                        }
                    }
                }
            }

            await countItems(projectPath);

            // Get project info
            try {
                const configPath = path.join(projectPath, 'project.json');
                const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
                stats.language = config.language;
                stats.botType = config.botType;
            } catch {
                // Config not available
            }

            return stats;

        } catch (error) {
            console.log(chalk.red(`❌ Could not get statistics: ${error.message}`));
            return null;
        }
    }

    async listProjects() {
        try {
            const projects = await fs.readdir(this.projectsDir);
            const projectStats = [];

            for (const project of projects) {
                const stats = await this.getProjectStatistics(project);
                if (stats) {
                    projectStats.push(stats);
                }
            }

            return projectStats;
        } catch {
            return [];
        }
    }

    async cleanOldBackups(daysOld = 30) {
        console.log(chalk.blue(`🧹 Cleaning backups older than ${daysOld} days...`));

        try {
            const backups = await fs.readdir(this.backupDir);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysOld);

            let cleaned = 0;

            for (const backup of backups) {
                const backupPath = path.join(this.backupDir, backup);

                try {
                    const stats = await fs.stat(backupPath);
                    if (stats.mtime < cutoffDate) {
                        await fs.rm(backupPath, { recursive: true, force: true });
                        cleaned++;
                        console.log(chalk.gray(`  🗑️  Removed: ${backup}`));
                    }
                } catch {
                    // Skip if can't access
                }
            }

            console.log(chalk.green(`✅ Cleaned ${cleaned} old backups`));

        } catch (error) {
            console.log(chalk.red(`❌ Cleanup failed: ${error.message}`));
        }
    }
}

module.exports = ProjectManager;

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];

    const pm = new ProjectManager();

    switch (command) {
        case 'backup':
            if (args[1]) {
                pm.backupProject(args[1]);
            } else {
                console.log('Usage: node project_manager.js backup <projectName>');
            }
            break;

        case 'restore':
            if (args[1]) {
                pm.restoreProject(args[1]);
            } else {
                console.log('Usage: node project_manager.js restore <backupPath>');
            }
            break;

        case 'share':
            if (args[1]) {
                pm.shareProject(args[1]);
            } else {
                console.log('Usage: node project_manager.js share <projectName>');
            }
            break;

        case 'import':
            if (args[1]) {
                pm.importSharedProject(args[1]);
            } else {
                console.log('Usage: node project_manager.js import <sharedProjectName>');
            }
            break;

        case 'stats':
            if (args[1]) {
                pm.getProjectStatistics(args[1]).then(stats => {
                    if (stats) {
                        console.log(JSON.stringify(stats, null, 2));
                    }
                });
            } else {
                console.log('Usage: node project_manager.js stats <projectName>');
            }
            break;

        case 'cleanup':
            pm.cleanOldBackups();
            break;

        default:
            console.log('Project Manager CLI');
            console.log('Usage: node project_manager.js <command> [args]');
            console.log('');
            console.log('Commands:');
            console.log('  backup <projectName>     - Create backup of project');
            console.log('  restore <backupPath>     - Restore project from backup');
            console.log('  share <projectName>      - Share project with others');
            console.log('  import <sharedName>      - Import shared project');
            console.log('  stats <projectName>      - Show project statistics');
            console.log('  cleanup                  - Clean old backups');
    }
}
