@echo off
set ROOT=%~dp0

echo =============================================
echo        EXPLORE INDIA - MERN PROJECT
echo =============================================
echo.
echo Starting Backend and Frontend terminals...
echo.
start "Explore India Backend" cmd /k "cd /d "%ROOT%backend" && if not exist node_modules npm install && npm run dev"
start "Explore India Frontend" cmd /k "cd /d "%ROOT%frontend" && if not exist node_modules npm install && npm run dev"

echo Two terminals have been opened.
echo Backend:  http://localhost:5000
 echo Frontend: http://localhost:5173
pause
