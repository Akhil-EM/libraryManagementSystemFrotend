@echo off
set /p componentName=Enter name of component :
mkdir %componentName%
cd %componentName%


@REM create a js file
echo import React from 'react';                      >>  %componentName%.js
echo import './%componentName%.css';                 >>  %componentName%.js
echo.                                                >>  %componentName%.js
echo.                                                >>  %componentName%.js
echo class %componentName% extends React.Component { >>  %componentName%.js
echo render() {                                      >>  %componentName%.js
echo   return (                                      >>  %componentName%.js
echo           ^<div^ className="%componentName%" ^>     >>  %componentName%.js
echo           ^</div^>                              >>  %componentName%.js
echo     );                                          >>  %componentName%.js
echo  }                                              >>  %componentName%.js
echo  }                                              >>  %componentName%.js
echo.                                                >>  %componentName%.js
echo.                                                >>  %componentName%.js
echo export default %componentName%;                 >>  %componentName%.js


@REM create a css file
echo ^.%componentName%{                              >> %componentName%.css
echo.                                                >> %componentName%.css
echo }                                               >> %componentName%.css

echo Created component %componentName% !! ;