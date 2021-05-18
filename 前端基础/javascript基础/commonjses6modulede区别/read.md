CommonJs是一种模块规范，最初被应用于node.js，成为nodejs的模块规范。运行在浏览器端的js由于也缺少类似的规范，在es6出来之前，前端也实现了一套相同的模块规范(例如:AMD)，用来对前端模块进行管理。自es6起，引入了一套新的es6 module规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。但目前浏览器对ES6 Module兼容还不太好，我们平时在webpack中使用的export&import，会经过babel转换为CommonJS规范。在使用上的差别主要有：
- （1）CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- （2）CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- （3）CommonJs是单个值导出，ES6 Module可以导出多个
- （4）CommonJs是动态语法可以写在判断里，ES6 Module静态语法只能写在顶层
- （5）CommonJs的 this 是当前模块，ES6 Module的 this 是 undefined