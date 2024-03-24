@echo off

rem Ten skrypt uruchamia środowisko fullstackowe
rem Napisałam go bo jestem leniem
rem Uruchamia się z głównego katalogu projektu per: ".\windows_run_env.bat"

rem Start the Postgres Docker container
cd Database
start "db" /WAIT cmd /c "docker-compose up -d"
cd ..

rem Start frontend React app
cd Frontend
start "frontend" cmd /k "npm i && npm run dev"
cd ..

rem Start backend Flask app
cd Backend
start "backend" cmd /k "flask run"
cd ..