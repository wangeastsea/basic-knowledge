const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry:  './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                  }],
                exclude: [path.resolve(__dirname,'node_modules')]
            }
        ]
    },
    plugins: [ //webpack插件  自动帮我们生成index.html并插入js入口文件 
        new HtmlWebpackPlugin({ 
          filename:'index.html',
          template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist']) //参数表示清除哪一个文件夹，每次打包前，先清空上次打包
    ],
    devServer: {  // devServer 回到2个地方去查找内容，1内存 2 本地 如果在内存找不到资源，就去本地去查找
    open: true, // true自动打开浏览器
    port: 9000 // 服务器监听的端口
    }
}