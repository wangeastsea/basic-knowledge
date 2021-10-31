### 优化打包速度
> 构建速度指的是我们每次修改代码后热更新的速度以及发布前打包文件的速度。

#### 1. 合理的配置mode参数与devtool参数

mode可设置development production两个参数
如果没有设置，webpack4 会将 mode 的默认值设置为 production 
production模式下会进行tree shaking(去除无用代码)和uglifyjs(代码压缩混淆)


#### 2. 缩小文件的搜索范围(配置include exclude alias noParse extensions)

- alias

    当我们代码中出现 import 'vue'时， webpack会采用向上递归搜索的方式去node_modules 目录下找。为了减少搜索范围我们可以直接告诉webpack去哪个路径下查找。也就是别名(alias)的配置。

- include exclude 同样配置include exclude也可以减少webpack loader的搜索转换时间。

- noParse  

    当我们代码中使用到import jq from 'jquery'时，webpack会去解析jq这个库是否有依赖其他的包。但是我们对类似jquery这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加noParse属性,告诉webpack不必解析，以此增加打包速度。

- extensions 
    webpack会根据extensions定义的后缀查找文件(频率较高的文件类型优先写在前面)

    ![image.png](https://upload-images.jianshu.io/upload_images/5016475-2f856db73f27a293.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#### 3. 使用HappyPack开启多进程Loader转换

> 在webpack构建过程中，实际上耗费时间大多数用在loader解析转换以及代码的压缩中。日常开发中我们需要使用Loader对js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大。由于js单线程的特性使得这些转换操作不能并发处理文件，而是需要一个个文件进行处理。HappyPack的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间

```
npm i -D happypack
```
![image.png](https://upload-images.jianshu.io/upload_images/5016475-854af7314a5b6d61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 4. 使用webpack-parallel-uglify-plugin 增强代码压缩

![image.png](https://upload-images.jianshu.io/upload_images/5016475-4a44bc1ad135c89d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 5. 抽离第三方模块 DllPlugin
对于开发项目中不经常会变更的静态依赖文件。类似于我们的elementUi、vue全家桶等等。因为很少会变更，所以我们不希望这些依赖要被集成到每一次的构建逻辑中去。 这样做的好处是每次更改我本地代码的文件的时候，webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库。以后只要我们不升级第三方包的时候，那么webpack就不会对这些库去打包，这样可以快速的提高打包的速度。

这里我们使用webpack内置的DllPlugin DllReferencePlugin进行抽离
在与webpack配置文件同级目录下新建webpack.dll.config.js 代码如下

```js
// webpack.dll.config.js
const path = require("path");
const webpack = require("webpack");
module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: ['vue','element-ui'] 
  },
  output: {
    path: path.resolve(__dirname, 'static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library' 
     // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    })
  ]
};
```
在package.json中配置如下命令

```
"dll": "webpack --config build/webpack.dll.config.js"
```

接下来在我们的webpack.config.js中增加以下代码

```js
module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
      {from: 'static', to:'static'}
    ]),
  ]
};

```
执行
```
npm run dll
```
会发现生成了我们需要的集合第三地方 代码的vendor.dll.js 我们需要在html文件中手动引入这个js文件

这样如果我们没有更新第三方依赖包，就不必npm run dll。直接执行npm run dev npm run build的时候会发现我们的打包速度明显有所提升。因为我们已经通过dllPlugin将第三方依赖包抽离出来了。


#### 6. 配置缓存

我们每次执行构建都会把所有的文件都重复编译一遍，这样的重复工作是否可以被缓存下来呢，答案是可以的，目前大部分 loader 都提供了cache 配置项。比如在 babel-loader 中，可以通过设置cacheDirectory 来开启缓存，babel-loader?cacheDirectory=true 就会将每次的编译结果写进硬盘文件（默认是在项目根目录下的node_modules/.cache/babel-loader目录内，当然你也可以自定义）

但如果 loader 不支持缓存呢？我们也有方法,我们可以通过cache-loader ，它所做的事情很简单，就是 babel-loader 开启 cache 后做的事情，将 loader 的编译结果写入硬盘缓存。再次构建会先比较一下，如果文件较之前的没有发生变化则会直接使用缓存。使用方法如官方 demo 所示，在一些性能开销较大的 loader 之前添加此 loader即可

```
npm i -D cache-loader
```

![image.png](https://upload-images.jianshu.io/upload_images/5016475-7ea01a36f81736c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 7. 优化打包后的体积

打包的速度我们是进行了优化，但是打包后的文件体积却是十分大，造成了页面加载缓慢，浪费流量等，接下来让我们从文件体积上继续优化

```
npm i -D webpack-bundle-analyzer
```

![image.png](https://upload-images.jianshu.io/upload_images/5016475-ec07d24c6716a42b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


package.json中配置
```
"analyz": "NODE_ENV=production npm_config_report=true npm run build" 
```
#### 8. externals

按照官方文档的解释，如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置Externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用
Externals的方式，我们将这些不需要打包的静态资源从构建逻辑中剔除出去，而使用 CDN
的方式，去引用它们。

webpack 官网案例如下

```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```

```js
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
}
```
```js
import $ from 'jquery';
$('.my-element').animate(/* ... */);
```


#### 8. Tree-shaking
这里单独提一下tree-shaking,是因为这里有个坑。tree-shaking的主要作用是用来清除代码中无用的部分。目前在webpack4 我们设置mode为production的时候已经自动开启了tree-shaking。但是要想使其生效，生成的代码必须是ES6模块。不能使用其它类型的模块如CommonJS之流。如果使用Babel的话，这里有一个小问题，因为Babel的预案（preset）默认会将任何模块类型都转译成CommonJS类型，这样会导致tree-shaking失效。修正这个问题也很简单，在.babelrc文件或在webpack.config.js文件中设置modules： false就好了

```js
// .babelrc
{
  "presets": [
    ["@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}

```
或者
```js
// webpack.config.js

module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', { modules: false }]
                }
            }，
            exclude: /(node_modules)/
        }
    ]
}

```