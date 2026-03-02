@echo off
git init
git remote add origin https://github.com/miguelinarez26/DeglyaCamero.git
git fetch origin main
git reset --hard origin/main
echo Sync complete > sync_status.txt
