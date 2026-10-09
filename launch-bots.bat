@echo off
echo ============================================
echo      HELL ROOM COMBAT BOTS LAUNCHER
echo ============================================
echo.

echo 🚀 Starting XploitBot (Security Bot) in new window...
start "XploitBot - Security & Exploitation" cmd /k "cd /d %~dp0projects\xploit-stumblechat && echo XploitBot starting... && npm run stumblechat"

echo ⏳ Waiting 5 seconds before starting decoder bot...
timeout /t 5 /nobreak > nul

echo 🚀 Starting Skullkey (Decoder Bot) in new window...
start "Skullkey - Decoder Bot" cmd /k "cd /d %~dp0projects\Skullkey && echo Skullkey starting... && npm run stumblechat"

echo.
echo ============================================
echo ✅ Both security bots launched successfully!
echo 📋 Check the new command windows for each bot
echo 🌐 Web interfaces will be available at:
echo    - XploitBot: http://localhost:3004
echo    - Skullkey: http://localhost:3005
echo 🔐 XploitBot communicates in encoded messages + skull codes
echo 🦴 Skullkey automatically decodes and interprets
echo 💀 Their conversation appears as cute skull emojis!
echo ============================================
echo.
echo Press any key to close this launcher...
pause > nul
