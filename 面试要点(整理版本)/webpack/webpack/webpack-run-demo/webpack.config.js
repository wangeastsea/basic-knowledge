module.exports = {
    mode: 'production',
    entry: {
        // index: './src/index.js'
        index: ['./src/index.js', './src/add.js']  // 一个chunk
        // index: './src/index.js',
        // common: './src/common.js'  // 构建了2个chunk

        // index: './src/index.js',
        // other: './src/multiply.js'
    },
    output: {
        filename: '[name].js'
    },
    // devtool: "source-map"
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2, // 如果被两个chunk所引用，则被提取一个公共的chunk
                    minSize: 0, // 被提出的chunk要达到一个最小的值，才能提出
                },
                vendor: { // 打包第三方包
                    test: /node_modules/,
                    chunks: "initial",
                    name: 'vendor',
                    enforce: true
                }
            },
        }
    }
}