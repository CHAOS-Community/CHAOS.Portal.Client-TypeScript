@echo off

rem Needed to update variable in loop
setlocal enabledelayedexpansion

rem Set current dir to bat file location
CD /D %~dp0

for %%i in (src\app\CHAOS.Portal.Client\*.js) do (set files=!files!%%~i )

echo Merging and minifing CHAOS TypeScript SDK - %files% -

tools\AjaxMin\AjaxMin.exe -clobber -rename:none %files% -out build\PortalClient.min.js

echo Done