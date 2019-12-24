[TOC]

# 1.Git(windows版本)

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

`git add .` 提交所有修改文件。

<font color="red">当提交完后，若想把本地版本库最近的修改推送到网上的github远程版本库中，则需要git push origin master把本地库的内容推送到远程库</font>

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

---

# 2.Git(Centos版本)

## 1.安装git

>方式一：yum命令安装：

`sudo yum install -y git`

>方式二：源码安装

1. 首先安装下依赖包（可使用rpm -qa | grep wget命令查看是否有安装包）

```
sudo yum install -y wget
sudo yum install -y gcc-c++
sudo yum install -y zlib-devel perl-ExtUtils-MakeMaker
```

2. 通过官网链接下载git源码包

`wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.9.0.tar.gz`


3. 解压，配置，安装

```
tar -zxvf git-2.9.0.tar.gz
cd git-2.9.0
./configure --prefix=/usr/local  
make
sudo make install
```

==./configure后面的–prefix=/usr/local，指定安装路径为usr/local==

4. 查看安装好的git版本

`git --version`


## 2.配置git用户信息

==首先创建一目录，下面所有操作在目录中执行。==

```
## 配置用户信息

git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

## 3.创建公钥私钥

```
1. 输入命令：
ssh-keygen -t rsa -C "youremail@example.com"

2. 属于文件名，用于保存密钥（不输入文件名，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件）

Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):

3. 提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码。
不输入密码，直接按回车。那么push的时候就不需要输入密码，直接提交到github上了）

Enter passphrase (empty for no passphrase): 
Enter same passphrase again:

4.之后密钥就会创建好,一般在/root/.ssh/id_rsa目录中

```

## 4.关联github

进入到密钥目录中，将生成的id_rsa.pub的内容存储到github中


## 常用命令

```

安装git后
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

$ ssh-keygen -t rsa -C "youremail@example.com" 创建ssh key，用于和github通信
(秘钥存储于C:\Users\27634\.ssh，把公钥id_rsa.pub存储于github)

创建版本库
$ pwd 命令用于显示当前目录(没啥用)
$ git init 把这个目录变成Git可以管理的仓库(后续新建提交和ssh克隆需要)	

操作版本库
$ git add 文件名 添加文件(新增或者更改都需要先add)
$ git commit -m "说明" 提交到本地版本库

$ git status 查看仓库状态
$ git diff 文件名 查看修改的地方

版本回退(从一个commit恢复)
$ git log 查看版本历史
$ git reset --hard HEAD^ 回退到上个版本
$ git reset --hard 1094a 回退到特定版本号(commit以后回退)
$ git reflog 记录每一次命令

$ git checkout -- file 直接丢弃工作区的修改(add以前回退)
$ git reset HEAD <file> 添加到了暂存区时，想丢弃修改(add以后回退)

删除文件
$ git rm file(已经add/commit,在目录中删除)

$ git checkout -- file 删错了回退

远程仓库
$ git remote add origin git@server-name:path/repo-name.git 关联远程库
$ git push -u origin master 第一次的push
$ git push origin master 常用的push，本地分支会在服务器上新建分支
$ git pull 需要有关联的分支，第一次下拉最好新建一个空文件夹
$ git branch --set-upstream-to=origin/远程分支 本地分支 关联分支

$ git clone git@server-name:path/repo-name.git 克隆(不需要另建文件夹)

分支
$ git branch -a 查看所有分支
$ git branch -vv 查看分支关联
$ git branch dev 创建分支
$ git checkout dev 切换分支
$ git merge dev 合并某分支到当前分支
$ git merge --no-ff -m "msg" dev 普通模式合并，合并后的历史有分支
$ git branch -d dev 删除分支
$ git checkout -b dev 创建并切换分支


合并分支,无法merge
$ git stash save 名字 暂存工作状态
$ git pull origin dev 拉下来 
$ git stash list 查看已经暂存的状态
$ git stash pop stash@{0} 将暂存状态merge到当前分支
还有冲突时,手动修改文件,然后add/commit
$ git log --graph 分支合并图

bug分支issue
$ git stash 暂存工作状态
$ git stash list 查看暂存工作状态
$ git stash pop 恢复暂存状态并删除状态

开发分支feature
$ git branch -D <name> 强制删除未合并的分支

rebase
$ git rebase 本地未push的分叉提交历史整理成直线

标签
$ git tag 标签名 打在最新提交的commit上
$ git tag 查询所有标签
$ git tag 标签名 f52c633 给特定的commit打标签
$ git tag -a 标签名 -m "msg" commit的id 给标签设置说明
$ git show 标签名 查询标签内容
$ git tag -d 标签名 删除标签
$ git push origin 标签名 推送某个标签到远程
$ git push origin --tags 推送所有标签
$ git push origin :refs/tags/<tagname> 可以删除一个远程标签。

```

