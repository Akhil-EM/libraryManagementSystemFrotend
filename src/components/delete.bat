@echo off
set /p componentName=Enter name of component :
cd %componentName%
del %componentName%.js
del %componentName%.css
cd ..
rmdir %componentName%

echo Deleted folder %componentName% !!
