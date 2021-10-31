- splitChunks
  -  无改动的公共文件多次打包并不会改变hash值，便于缓存的一个优化
  - 提供公共资源


- tree shaking(webpack4 默认支持)
    - babelrc里面配置 modules:false 
    - production mode 默认开启的
    - 必须是ESmodule, CJS 不支持
    - 就是把把用的方法打入bundle， 没用到的uglify阶段被清理
    - 原理：
        - 代码不会执行，不可达到的
        - 代码执行的结果不会被用到
        - 代码只写不读（用不到）

- 代码分割以及懒加载
    - commonjs: require.ensure
    - es6动态import(目前不支持原生，需要babel 转换)
    - 原理： 通过jsonp的形式，动态的加载资源将script插入到页面上



- 代码构建速度的提升，提升二次构建速度
    - babel-loader(对于babel解析的内容缓存) 开启缓存
    - terser-webpack-plugin(代码压缩)开启缓存， webpack4 生产已经内置了
    - cache-loader（模块转换阶段的缓存） 或者 hard-source-webpack-plugin 开启缓存（模块转换阶段）


- 缩小构建目标
    - 例如babel-loader 不解析 exclude：'node_mudule'
- 减少文件的搜索范围

    - resolve.modules 减少模块的搜索层次
    - resolve.mainField
    - resolve.extensions
    - alias
- webpack 图片的优化
    - image-webpack-lader

- 动态polyfill服务（polyfill-service）
    -  只返回用户需要的polyfill
    - babel-polyfill 太大，不推荐
    - 识别不同的user Agent, 下发不同的Polyfill

总结：
体积策略的优化：
- tree-shaking
- 公共资源分离
- 图片压缩
- 动态Polyfill


构建工具的核心点：
code spliting => 懒加载，提取公共代码
hash => 充分利用缓存
    - hash: 反应了项目的构建版本，同一次构建过程中生成的hash都是一样的
        - 如果使用hash策略，存在一个问题，即使某个模块的内容压根没有变化，但是重新构建后会产生一个新的hash值，使得缓存命中率降低。
    - chunkhash:  会根据入口文件进行依赖解析
    - contenthash： 会根据文件的具体内容，生成hash值

