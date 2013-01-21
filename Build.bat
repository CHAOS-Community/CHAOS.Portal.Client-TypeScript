@echo off

rem Needed to update variable in loop
setlocal enabledelayedexpansion

rem Set current dir to bat file location
CD /D %~dp0

for %%i in (src\app\CHAOS.Portal.Client\*.ts) do (set files=!files!%%~i )

echo Compiling

tsc --declaration --out build\PortalClient.js %files%

echo Minifing

tools\AjaxMin\AjaxMin.exe -clobber -rename:none build\PortalClient.js -out build\PortalClient.min.js

echo Done