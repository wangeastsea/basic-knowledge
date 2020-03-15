const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 通过文件名可以控制文件放置的目录
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 资源打包后输出的路径
    filename: 'f/js/main.js',
    publicPath: '/' // 为所有资源添加(基础路径)公共路径 斜杠／一定要加上(加载路径)
  },
  plugins: [ //webpack插件  自动帮我们生成index.html并插入js入口文件 
    new HtmlWebpackPlugin({ 
      filename:'index.html',
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist']) //参数表示清除哪一个文件夹，每次打包前，先清空上次打包
  ],
  module: {
    rules: [
      { // react deal with jsx
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
          // 可以在.babelrc 里面进行配置
          // options:{
          //   presets: ['react','env'], // env 处理已经列入标准的es6,es7更新的语法
          //   plugins: ['transform-object-rest-spread'] // 处理对象展开符号
          // }
        }],
        // babel-loader 不需要处理node_modules里面的包，开发者已经做了兼容，如果不排除，
        // 编译会非常慢
        exclude: [path.resolve(__dirname,'node_modules')]
    },
    // css-loader处理css文件中出现的url，会自动帮你引入需要引入的文件
    { // 模块化
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader:'css-loader',
          options: {
            module: true, //开始模块化 path:当前所在的目录，name:文件名 local:类名 hase:base64 默认编码
            localIdentName:'[path]-[name]-[local]_[hash:base64:6]'
          }
        }
      ],
      exclude: [ // 排除不进行css模块化的
        path.resolve(__dirname,'node_modules'),
        path.resolve(__dirname,'src/common')
      ]
    },  // 从右往左，从下往上来进行处理
    { // 全局  不想开启模块化，又想让css来进行处理
      test: /\.css$/,
      use: ['style-loader','css-loader'],
      include: [ // 只处理包含的目录
        path.resolve(__dirname,'node_modules'),
        path.resolve(__dirname,'src/common')
      ]
    },
    { // 模块化
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader:'css-loader',
          options: {
            module: true, //开始模块化
            localIdentName:'[path]-[name]-[local]_[hash:base64:6]'
          }
        },
        'sass-loader'
      ],
      exclude: [
        path.resolve(__dirname,'node_modules'),
        path.resolve(__dirname,'src/common')
      ]
    },
    { // 全局
      test: /\.scss$/,
      use: ['style-loader','css-loader','sass-loader'],
      include: [ // 表示仅仅包含这两个模块
        path.resolve(__dirname,'node_modules'),
        path.resolve(__dirname,'src/common')
      ]
    },
    { // 模块化
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader:'css-loader',
          options: {
            module: true, //开始模块化
            localIdentName:'[path]-[name]-[local]_[hash:base64:6]'
          }
        },
        'less-loader'
      ],
      exclude: [
        path.resolve(__dirname,'node_modules'),
        path.resolve(__dirname,'src/common')
      ]
    },
    { // 全局 style-loader 加载到header里面
      test: /\.less$/,
      use: ['style-loader','css-loader','less-loader'],
      include: [
        path.resolve(__dirname,'node_modules'),
        path.resolve(__dirname,'src/common')
      ]
    },
    // file-loader
    //  1:把你的资源移动到输出目录
    //  2:返回最终引入资源的url
    // url-loader 比 file-loader  多干了一件事，就是可以将图片编译成base64
    { 
      test: /\.(jpg|png|gif|jpeg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000, // 单位 byte小于10kb,编译为base64,大于10KB（交给fileloader处理）则打包到输出路径
          name: 'assets/img/[name]_[hash:8].[ext]'
        }
      }]
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|otf)$/, // webpack 会会忽略查询字符串后面的东西？
      use: [
        {
        loader: 'file-loader',
        options: { // ext 代表文件后缀   默认值s是 [hash].[ext]
          name: 'assets/fonts/[name]_[hash:8].[ext]'
        }
      }
    ]
    }
  ]
  },
  devServer: {  // devServer 回到2个地方去查找内容，1内存 2 本地 如果在内存找不到资源，就去本地去查找
    open: true, // true自动打开浏览器
    port: 9000, // 服务器监听的端口
    contentBase: './src/common',// 控制查找本地的资源位置
    // 服务器打包资源后的输出路径, 没有设置时，默认路径就是‘/’      ‘/’ + output.publicPath
    publicPath: '/'  // 如果没有配置publicPath值，就拼接output publicPath 的值 ，如果有值，就统一按照devserver
  }
}
