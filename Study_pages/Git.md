[TOC]

# Git(windows版本)

Git是一个开源的分布式版本控制系统.

## 1.Git安装与配置

当git安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！

在Git Bash中进行全局个人配置:
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

## 2.常用命令

```
1. 创建版本库
$ git init    

```
<font color="red">

1. 创建一个空目录（路径中不包含中文）,在这个空目录中使用git命令来创建版本库。
2. 在git仓库中会有一个`.git`的目录，这个目录是Git来跟踪管理版本库的，不要轻易修改。

</font>

```
2. 添加文件到版本库中
    1. $ git add readme.txt
    2. $ git commit -m "add a readme file"
```
PS: `git add`命令可添加多个文件

<h5>工作区,版本库和暂存区</h5>

1. 工作区：就是当前git仓库所在的目录。
2. 版本库：工作区中的一个隐藏目录`.git`,这个目录就是版本库。
3. 暂存区：Git的版本库中最重要的就是称为stage（或者叫index）的暂存区和自动创建的第一个分支master(主分支)。

==git add把文件添加进去，实际上就是把文件添加到暂存区；==
==git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支master中。==


```
3. 查询当前仓库的状态
$ git status

4. 查询某个文件的修改内容
$ git diff readme.txt 

5. 显示版本库中从最近到最远的提交日志
$ git log

```

```
6. 版本回退
$ git reset --hard HEAD^   #回退到上一个版本
$ git reset --hard HEAD^^   #回退到上上一个版本

....

$ git reset --hard HEAD~10   #回退到往上10一个版本

$ git reset --hard commit_id  #回退到某一个具体的版本。根据commit_id
```
PS: 在Git中，用HEAD表示当前版本，上一个版本就是HEAD^。


```
7. 记录你的每一次命令历史内容
$ git reflog 

```

```
8.撤销修改

情况1: 当你工作区中某个文件的修改想要撤销时
$ git checkout -- readme.txt

情况2：当你git add后，想要撤销暂存区中某个文件的修改时
    1. $ git reset HEAD readme.txt       #先把暂存区中readme文件的修改撤销掉
    2. $ git checkout -- readme.txt      #再把工作区中readme文件的修改撤销掉

情况3： 当你git commit后，想要撤销修改，则必须进行版本回退。
```

```
9.删除文件

情况1：当你在工作区中删除某个无用的文件后。并且也把版本库中的该文件也删除。
$ git rm test.txt                   #删除版本库中的无用文件 
$ git commit -m "remove test.txt"   #更新版本库

情况2：当你把工作区中有用的文件删除了，想要恢复过来。
$ git checkout -- test.txt          #用版本库里的版本替换工作区的版本

```
PS：从来没有被添加到版本库的文件。被删除后是无法恢复的！ 


## 3.远程仓库

### 1.创建SSH key

本地Git仓库和GitHub仓库之间的传输是通过SSH加密的。

<font color="red">

为什么需要在GitHub中配置SSH Key呢？
因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的SSH Key都添加到你的GitHub，就可以在每台电脑上往你的GitHub推送了。

</font>

>连接github远程仓库的步骤

1. 先查找`.ssh`目录，看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件。若有，则不需要创建SSH key。

id_rsa是私钥文件，id_rsa.pub是公钥文件。


2. 若无`.ssh`目录，则创建SSH Key(在Git bash 界面中)

```
$ ssh-keygen -t rsa -C "youremail@example.com"
```

3. 登录你的github账号

打开 Account settings ->进入到 SSH Keys 页面 -> 点击 Add SSH Key -> 填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容.

4. 你的github中保存了你本地电脑上的SSH key,则你本地的电脑可以推送内容到你的github上去了。

### 2.将远程库与你本地的git库进行关联

```
1.关联
$ git remote add origin git@github.com:你的github上的某个仓库的全称.git

## origin 是指远程库的名字，可以更改。

2.把本地库的所有内容推送到远程库上
$ git push -u origin master     # 第一次把本地库的内容推送到远程库时的命令
$ git push origin master        # 之后把本地库的内容推送到远程库时的命令
```

### 3.从远程库克隆到本地库中

ps：首先创建一个新的空目录

```
$ git clone git@github.com:你github上的某个仓库的全称.git
```

