### 从git clone 项目到本地
> git clone url

### 查一下git库的状态
> git status

### 查一下分支情况
> git branch -a

### 创建本地分支
> git branch branchName

### 将本地分支推送到远端
> git push --set-upstream origin branchName

### 切换分支
> git checkout branchName

### 提交代码到暂存区 
> git add 文件名

### 提交代码到本地仓库
> git commit -m "评论"

### 推送代码到远程仓库
> git push 

### 如何删除远端分支
> git push origin -d BranchName

### 合并代码
>   git checkout master 

>   git pull

> git merge BranchName

## 删除远程分支
> git push origin --delete uat-fix-dh

## 切换远程的分支
> git checkout -b developer origin/developer