// https://live.vhall.com/room/watch/296206465?
const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const babel = require('babel-core')


let ID = 0

// 构建当前脚本的依赖资源
function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8')
    const ast = babylon.parse(content, {sourceType: 'module'})

    const dependencies = []

    traverse(ast, {
        ImportDeclaration: ( {node} ) => {
            dependencies.push(node.source.value)
        }
    })
    const id = ID++
    const {code} = babel.transformFromAst(ast, null, {presets: ['env']})
    return {
        id,
        filename,
        dependencies,
        code
    }
 }


//构建所有依赖的依赖图谱   allAsset 就是一个完整的依赖树
function createGraph(entry) {
    const mainAsset = createAsset(entry)
    const allAsset = [mainAsset]

    for(let asset of allAsset) {
        // 获取当前文件的绝对文件夹路径
        const dirname = path.dirname(asset.filename)
        asset.mapping = {}
        
        asset.dependencies.forEach(relativePath => {
            // 获取依赖文件的绝对路径
            const absolutePath = path.join(dirname, relativePath)
            // 获取依赖文件的依赖资源，依赖的依赖
            const childAsset = createAsset(absolutePath)
            asset.mapping[relativePath] = childAsset.id
            // 添加的数组的末尾，可以继续执行循环
            allAsset.push(childAsset)
        })
    }
    return allAsset
}

// 根据依赖图谱生成bundle
function bundle(graph) {
    let modules = ''
    graph.forEach(module => {
        modules += ` ${module.id}: [
            function(require, module, exports) {
                ${module.code}
            },
            ${JSON.stringify(module.mapping)}
        ],`
    })

    const result = `
        (function (modules) {
            function require(id) {
                const [fn, mapping] = modules[id]
                function localRequire(relativePath) {
                    return require(mapping[relativePath])
                }
                const module = {exports: {}}
                fn(localRequire, module, module.exports)
                return module.exports
            }
            require(0)
        })({${modules}})
    `
    return result
}

const graph = createGraph('./source/entry.js')
const result = bundle(graph)
console.log(result);
