@echo off
REM Quick Start Script for Trainer Search App

echo.
echo ========================================
echo   Trainer Search App - Quick Start
echo ========================================
echo.

REM Check if running from correct directory
if not exist "Trainer-search-Backend" (
    echo Error: Please run this script from the Exp folder
    pause
    exit /b 1
)

echo [1/4] Starting Backend...
start cmd /k "cd Trainer-search-Backend && venv\Scripts\activate && python manage.py runserver"

echo [2/4] Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak

echo [3/4] Starting Frontend...
start cmd /k "cd Trainer-Search-app-frontend && npm run dev"

echo [4/4] Opening browser...
timeout /t 3 /nobreak
start http://localhost:5173/

echo.
echo ========================================
echo   Application Started!
echo ========================================
echo.
echo Backend:  http://127.0.0.1:8000/
echo Frontend: http://localhost:5173/
echo.
echo Login Credentials:
echo   Username: ritesh
echo   Password: 123456
echo.
pause
