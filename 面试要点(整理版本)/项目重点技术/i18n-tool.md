let str = "i18n:{zhCHS:{app: '123'}, zhCHT: {app:'123'}, en: {app: '123'}}"

str.replace
当栈为空的时候，获得一个数组.join("") 转化为一个字符串，然后过滤掉一些特殊字符，之后通过JSON.parse 解析出一个对象，
就是一个i8n对象。



我解决的最难的问题做一个多语言的vscode插件，用户鼠标hover多语言的时候，能够正确的去匹配出中文字符，并显示出来。二其中的难点就在从.vue文件中于获取i18n配置对象的，一开始使用的方法是fs.readFile读取当前文件的文本字符串，然后通过写各种正则匹配解析字符串中的i18n对象，非常繁琐，也能够实现，但是性能比较低，实现方式不够好。后来就想着怎么去优化，更优雅的方式去实现，然后来了灵感，可以使用babel去解析i18n对象，以及去掉不可解析的i18n的配置。然后使用babel重构了一遍，结构逻辑清晰了很多，后面反思了这个问题，一开始使用的是很粗暴的方法去解析，后面又通过先进的工具更优雅的解决，这可能就是一种进步吧，参考现有先进的技术去解决。


#### 主体思路

前置操作：
1、匹配当前的 script 内容
2、使用 babel 转换 AST 语法树
3、traverse 遍历 AST ，去除不可识别语法
    不可识别语法：
    {
        i18n: {
            ...i18n,
            a: function() {}
            a() {}
            a: () => {}
        }
    }
得到处理后的 AST 语法树

读取当前 vue 组件的 i18n 对象
    自定义
        {
            i18n: {}
        }
        traverse 遍历 AST
        node.type === 'ObjectProperty' && node.key.name === 'i18n' && node.value.type === 'ObjectExpression' ---> generate(node.value生成 i18n 对) 象节点
        再次 traverse
        eval 运行，将 i18n 对象拷贝出来
         
    外部引入赋值
        import i18n from 'xxx.js'
        {
            i18n: i18n
        }
若不存在，则获取、`utils/i18n-message/(projectname/htmlpage)/index.js`静态的中文 i18n 对象