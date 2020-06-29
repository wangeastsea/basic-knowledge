#!/usr/bin/env node
const glob = require('glob')
const childProcess = require('child_process')
var execSync = require('child_process').execSync
const color = require('cli-color')
const inquirer = require('inquirer')
class CheckCommitMsg {
    constructor(branchsMustChecked, regSinglePages, regAllPages) {
        // 需要校验的分支
        this.branchsMustChecked = branchsMustChecked
        /**
         * 支持2种正则匹配模式
         * 1: -d 单面模式构建
         * 2: --all 全量模式构建
         */
        this.regSinglePages = regSinglePages
        this.regAllPages = regAllPages
    }
    isExitPages(globPath) {
        return glob.sync(globPath).length > 0
    }
    isBranchsMustChecked(currentBranch) {
        return this.branchsMustChecked.includes(currentBranch)
    }
    getSinglePagesByCommitMsg(commitMsg) {
        let reg = /(?<=-d\s)[\w-]+\b/g
        return commitMsg.match(reg)
    }
    getSinglePages() {
        let singpages = glob.sync('./src/pages/**/main.js').map(item => {
            return item.split('/')[3]
        })
        return singpages
    }
    // 校验提交信息
    async checkCommitMsgHandle() {
        // 如果当前分支不用检查提交信息，直接跳过
        if (!this.isBranchsMustChecked(CheckCommitMsg.currentBranch)) {
            return
        }
        if (this.regSinglePages.test(CheckCommitMsg.commitMsg)) {
            // 格式正确，需要校验是否存在此单页
            this.testSinglePagesMode(CheckCommitMsg.commitMsg)
        } else if (this.regAllPages.test(CheckCommitMsg.commitMsg)) {
            this.testAllPagesMode()
        } else {
            this.errorHandle(',please check and commit again.')
        }
    }
    // 校验单页构建模式 --build -d open-account -d project -i 注释
    testSinglePagesMode(commitMsg) {
        let singlePages = this.getSinglePagesByCommitMsg(commitMsg)
        console.log('构建的单页', singlePages)
        for (let i = 0; i < singlePages.length; i++) {
            let isExit = this.isExitPages(
                `./src/pages/${singlePages[i]}/**/main.js`
            )
            if (!isExit) {
                this.errorHandle(
                    ',the single page does not exist,please check and commit again.'
                )
            }
        }
        this.successHandle()
    }
    // 校验全量构建模式 --build --all -i 注释
    testAllPagesMode() {
        this.successHandle()
    }
    errorHandle(errorMsg = '') {
        console.error(color.red(`Incorrect information committed${errorMsg}`))
        process.exit(1)
    }
    successHandle() {
        console.log(color.green(`Committed information passed.`))
    }
}

// 当前分支
CheckCommitMsg.currentBranch = childProcess
    .execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .replace(/\s+/, '')
// CheckCommitMsg.commitMsg = fs.readFileSync('./.git/COMMIT_EDITMSG', 'utf8')
CheckCommitMsg.commitMsg = process.argv.slice(2).join(' ')
let regSinglePages = /--build\s(-d\s[\w-]+\s)+-i.+/g
let regAllPages = /--build\s--all\s-i.+$/g

let branchsMustChecked = ['dev', 'sit', 'uat']
new CheckCommitMsg(
    branchsMustChecked,
    regSinglePages,
    regAllPages
).checkCommitMsgHandle()
