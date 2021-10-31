- git reset  回退到某一次commit的记录, 但是会保留下一次commit记录的信息，并且是没有commit状态。

- git reset --hard  回退到某一次commit的记录。并全部清空下一次commit记录的信息。

- get rebase -i b4e0edfafd4cb3  
    变基操作: 基于b4e0edfafd4cb3这个commit，可以操作b4e0edfafd4cb3之后的commit（若干操作）

- git revert b4e0edfafd4cb3 : 增加一个新的commit,来 把 b4e0edfafd4cb3 的内容删除掉，但 
    是并不会删除掉b4e0edfafd4cb3这个commit。（只删除内容，不删除commit）