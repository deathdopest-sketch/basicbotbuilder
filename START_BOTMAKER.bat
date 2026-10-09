@echo off
title Basic Bot Builder
color 0A

echo.
echo  ============================================
echo       BASIC BOT BUILDER - by Death
echo  ============================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  [!] Node.js is not installed.
    echo.
    echo  Please download and install Node.js from:
    echo  https://nodejs.org/en/download
    echo.
    echo  After installing, run this file again.
    echo.
    pause
    exit /b 1
)

:: Show Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
echo  [OK] Node.js %NODE_VER% detected
echo.

:: Install dependencies if node_modules is missing
if not exist "%~dp0node_modules" (
    echo  [*] Installing dependencies for the first time...
    echo      This may take a minute.
    echo.
    cd /d "%~dp0"
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo  [!] npm install failed. Make sure you have internet access.
        pause
        exit /b 1
    )
    echo.
    echo  [OK] Dependencies installed successfully!
    echo.
)

:: Launch the bot builder
echo  [*] Starting Bot Builder...
echo.
cd /d "%~dp0"
node bot_builder.js

echo.
pause
