# Webpack

## 1: webpack 中的mudule指的是什么

webpack 支持 ESModule, CommonJS, AMD, Asset(image, font, video, audio ,json)

1. ESM 
关键字 export ,可以把 ESM 中的内容暴露给其他模块
import

```js
import {ff} from './a.js'
export {bb}
```

package.json

type: mudule -> ESM
type: commonjs -> CommmonJS

 2: CommmonJs

 module.exports 可以将CommonJs中的内容暴露给其他模块

 reqire

### webpack moduels， 如何表达自己的各种依赖关系？

- ESM  import 语句
- CommonJs require
- AMD define require
- css/sass/less @import
 

### bundle 和 chunk 的区别是什么？– ！！！！！！

1: Chunk 

Chunk 是webpack 打包过程中Modules 的集合，是（打包过程中的）概念。

webpack 从一个入口模块开始，入口模块引用了其他模块，其他模块又引用了其他模块。。。
webpack 通过引用关系逐个打包模块，这些module就形成了chunk。

如果有多个入口模块，可能会产出多条打包路径，每条路径都会形成一个chunk.

2: Bundle
是最终输出的一个或多个打包好的文件。

3： chunk和bundle之间的关系
大多是情况下，一个chunk会生产出一个bundle, 但是也有例外。chunk是过程，bundle是结果。

但是如果加了sourceMap,一个entry,一个chunk,对应两个bundle.

Chunk 是过程中的代码块，Bundle 是打包结果输出的代码块。

Chunk 在构建完成之后，呈现为 bundle。

4: split chunk

                 Asset       Size  Chunks             Chunk Names
commons~index~other.js  321 bytes       0  [emitted]  commons~index~other // 被多次引用的公共模块，但是区分出来
              index.js  265 bytes       2  [emitted]  index
              other.js   71 bytes       3  [emitted]  other
            runtime.js   1.46 KiB       1  [emitted]  runtime   // 运行时的一些功能代码
            vendor.js     71 KiB        4  [emitted]  vendor   // 第三方包都在这里


###  Plugin 和 loader 分别都是做什么的？ 怎么工作？

1.  Loader:

模块转换器， 将非JS模块转换为webpack能识别的js模块。
本质上，webpack loader将所有类型的文件，转换成 应用程序**依赖图**可以直接引用的模块。

2. Plugin: 

扩展插件， webpack各个阶段，都会广播出对应的事件， 插件去监听对应的事件。


3: compiler

对象， 包含了webpack 环境的所有的配置信息，包括 options, loader, plugins. webpack 启动的时候实例化，他是全局唯一的。
可以理解为webpack的实例。


4: compilation

包含了当前的模块资源，编译生成资源。
webpack在开发模式运行的时候，每当检测到一个文件的变化，就会创建一次新的compilation.

### 简单描述下webpack的打包过程？
1: 初始化参数  shell, webpack.config.js

2: 开始编译： 初始化一个Complier对象，加载所有的配置，开始执行编译

3: 确定入口： 根据entry中的配置，找出所有的入口文件

4: 编译模块，从入口文件开始，调用所有的loader，再去递归的寻找依赖·

5: 完成模块的编译， 得到每一个模块被翻译后的最终内容，以及他们之间的依赖关系

6: 输出资源： 根据得到的依赖关系，组装成一个个包含多个文件的modle的chunk。

7: 输出完成， 根据配置，确定要输出的文件名和文件路径。



截取几个运行时的中间变量图，便于理解：

![image.png](https://upload-images.jianshu.io/upload_images/5016475-63f5f8a5024dd872.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个依赖图谱：
![image.png](https://upload-images.jianshu.io/upload_images/5016475-afcb4e5ca10fe261.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![ ](https://upload-images.jianshu.io/upload_images/5016475-55ef64341359179b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/5016475-f9b1f32e17999453.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](https://upload-images.jianshu.io/upload_images/5016475-a674f2f639a2c80b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## webpack 应用篇目
可以参考这篇目文章

https://juejin.cn/post/6844904031240863758#heading-38

- loader 是从右往左解析
```js
  // webpack.config.js
  module.exports = {
      // ...省略其他配置
      module:{
        rules:[
          {
            test:/\.css$/,
            use:['style-loader','css-loader'] // 从右向左解析原则
          },
          {
            test:/\.less$/,
            use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
          }
        ]
      }
  } 
```
![image.png](https://upload-images.jianshu.io/upload_images/5016475-689c9e6b3f9a0033.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 记住几个常用的webpack plugins

- html-webpack-plugin  
    - html模版，可以将打包后的文件插入到html模版里
    - 可以配置多个html-webpack-plugin解决多页问题
      ```js
        const path = require('path');
        const HtmlWebpackPlugin = require('html-webpack-plugin')
        module.exports = {
            mode:'development', // 开发模式
            entry: {
              main:path.resolve(__dirname,'../src/main.js'),
              header:path.resolve(__dirname,'../src/header.js')
          }, 
            output: {
              filename: '[name].[hash:8].js',      // 打包后的文件名称
              path: path.resolve(__dirname,'../dist')  // 打包后的目录
            },
            plugins:[
              new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'../public/index.html'),
                filename:'index.html',
                chunks:['main'] // 与入口文件对应的模块名
              }),
              new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'../public/header.html'),
                filename:'header.html',
                chunks:['header'] // 与入口文件对应的模块名
              }),
            ]
        }
      ```  
- clean-webpack-plugin
    - 打包输出前清空文件夹
    ```js
      const {CleanWebpackPlugin} = require('clean-webpack-plugin')
      module.exports = {
          // ...省略其他配置
          plugins:[new CleanWebpackPlugin()]
      }

    ```

- mini-css-extract-plugin 拆分css

  这时候我们发现css通过style标签的方式添加到了html文件中，但是如果样式文件很多，全部添加到html中，难免显得混乱。这时候我们想用把css拆分出来用外链的形式引入css文件怎么做呢？这时候我们就需要借助插件来帮助我们
  ```js
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  module.exports = {
    //...省略其他配置
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
          ],
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
          filename: "[name].[hash].css",
          chunkFilename: "[id].css",
      })
    ]
  }

  ```

- extract-text-webpack-plugin

  这里需要说的细一点,上面我们所用到的mini-css-extract-plugin会将所有的css样式合并为一个css文件。如果你想拆分为一一对应的多个css文件,我们需要使用到extract-text-webpack-plugin，而目前mini-css-extract-plugin还不支持此功能。我们需要安装@next版本的extract-text-webpack-plugin

  ```js
  // webpack.config.js

  const path = require('path');
  const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
  let indexLess = new ExtractTextWebpackPlugin('index.less');
  let indexCss = new ExtractTextWebpackPlugin('index.css');
  module.exports = {
      module:{
        rules:[
          {
            test:/\.css$/,
            use: indexCss.extract({
              use: ['css-loader']
            })
          },
          {
            test:/\.less$/,
            use: indexLess.extract({
              use: ['css-loader','less-loader']
            })
          }
        ]
      },
      plugins:[
        indexLess,
        indexCss
      ]
  }


  ```

- webpack-dev-server 
  进行热更新
  ```
  npm i -D webpack-dev-server
  ```
  ```js
  const Webpack = require('webpack')
  module.exports = {
    // ...省略其他配置
    devServer:{
      port:3000,
      hot:true,
      contentBase:'../dist'
    },
    plugins:[
      new Webpack.HotModuleReplacementPlugin()
    ]
  }

  ```
  vue的配置
  ```js
  // webpack.config.js
  const path = require('path');
  const {CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
  const vueLoaderPlugin = require('vue-loader/lib/plugin')
  const Webpack = require('webpack')
  module.exports = {
      mode:'development', // 开发模式
      entry: {
        main:path.resolve(__dirname,'../src/main.js'),
      }, 
      output: {
        filename: '[name].[hash:8].js',      // 打包后的文件名称
        path: path.resolve(__dirname,'../dist')  // 打包后的目录
      },
      module:{
        rules:[
          {
            test:/\.vue$/,
            use:['vue-loader']
          },
          {
            test:/\.js$/,
            use:{
              loader:'babel-loader',
              options:{
                presets:[
                  ['@babel/preset-env']
                ]
              }
            }
          },
          {
            test:/\.css$/,
            use: ['vue-style-loader','css-loader',{
              loader:'postcss-loader',
              options:{
                plugins:[require('autoprefixer')]
              }
            }]
          },
          {
            test:/\.less$/,
            use: ['vue-style-loader','css-loader',{
              loader:'postcss-loader',
              options:{
                plugins:[require('autoprefixer')]
              }
            },'less-loader']
          }
        ]
      },
      resolve:{
        alias:{
          'vue$':'vue/dist/vue.runtime.esm.js',
          ' @':path.resolve(__dirname,'../src')
        },
        extensions:['*','.js','.json','.vue']
      },
      devServer:{
        port:3000,
        hot:true,
        contentBase:'../dist'
      },
      plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template:path.resolve(__dirname,'../public/index.html'),
          filename:'index.html'
        }),
        new vueLoaderPlugin(),
        new Webpack.HotModuleReplacementPlugin()
      ]
  }

  ```

### vue 项目生产环境和开发环境的区别
实际应用到项目中，我们需要区分开发环境与生产环境，我们在原来webpack.config.js的基础上再新增两个文件

- webpack.dev.js 开发环境配置文件

  开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap

- webpack.prod.js 生产环境配置文件

  生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码
  需要安装以下模块:
  npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
  - webpack-merge 合并配置
  - copy-webpack-plugin 拷贝静态资源
  - optimize-css-assets-webpack-plugin 压缩css
  - uglifyjs-webpack-plugin 压缩js
  
  webpack mode设置production的时候会自动压缩js代码。原则上不需要引入uglifyjs-webpack-plugin进行重复工作。但是optimize-css-assets-webpack-plugin压缩css的同时会破坏原有的js压缩，所以这里我们引入uglifyjs进行压缩



### 常用的loader

- css-loader
- style-loader
- less-loader
- postcss-loader autoprefixer  css添加浏览器前缀
  ```js
    // webpack.config.js
  module.exports = {
      module:{
          rules:[
              {
                  test:/\.less$/,
                  use:['style-loader','css-loader','postcss-loader','less-loader'] // 从右向左解析原则
            }
          ]
      }
  }
  ```
  此loader 要配合插件使用

  postcss.config.js
  ```js
    module.exports = {
      plugins: [require('autoprefixer')]  // 引用该插件即可了
    }
  ```
  直接在webpack.config.js里配置
  ```js
  // webpack.config.js
  module.exports = {
      //...省略其他配置
      module:{
          rules:[{
              test:/\.less$/,
              use:['style-loader','css-loader',{
                  loader:'postcss-loader',
                  options:{
                      plugins:[require('autoprefixer')]
                  }
              },'less-loader'] // 从右向左解析原则
          }]
      }
  }

  ```
  明确一个概念，loader 也是有自己插件的。
- file-loader

  就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中


- url-loader

  url-loader 一般与file-loader搭配使用，功能与 file-loader 类似，如果文件小于限制的大小。则会返回 base64 编码，否则使用 file-loader 将文件移动到输出的目录中
  ```js
  // webpack.config.js
  module.exports = {
    // 省略其它配置 ...
    module: {
      rules: [
        // ...
        {
          test: /\.(jpe?g|png|gif)$/i, //图片文件
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                fallback: {
                  loader: 'file-loader',
                  options: {
                      name: 'img/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'media/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
      ]
    }
  }

  ```

- babel-loader
  > npm i -D babel-loader @babel/preset-env @babel/core
  - 注意 babel-loader与babel-core的版本对应关系
    - babel-loader 8.x 对应babel-core 7.x
    - babel-loader 7.x 对应babel-core 6.x
  ```js
    // webpack.config.js
  module.exports = {
      // 省略其它配置 ...
      module:{
          rules:[
            {
              test:/\.js$/,
              use:{
                loader:'babel-loader',
                options:{
                  presets:['@babel/preset-env']
                }
              },
              exclude:/node_modules/
            },
        ]
      }
  }

  ```

  上面的babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)
  此时我们需要借助babel-polyfill来帮助我们转换

  ```
  npm i @babel/polyfill

  ```

  ```js
  // webpack.config.js
  const path = require('path')
  module.exports = {
      entry: ["@babel/polyfill",path.resolve(__dirname,'../src/index.js')],    // 入口文件
  }

  ```


- vue-loader  vue-template-compiler
- vue-style-loader

    



