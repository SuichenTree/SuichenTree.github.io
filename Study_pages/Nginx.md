[TOC]

# Nginx

Nginx是一款轻量级的Web 服务器,==反向代理服务器==,电子邮件（IMAP/POP3）代理服务器

>Nginx的应用场景

1. http服务器。Nginx是一个http服务可以独立提供http服务。可以做网页静态服务器。
2. 虚拟主机。可以实现在一台服务器虚拟出多个网站。例如个人网站使用的虚拟主机。
3. 反向代理，负载均衡。

<h4>Nginx的负载均衡</h4>

>负载：就是Nginx接受请求.
>均衡：Nginx将收到的请求按照一定的规则分发到不同的服务器进行处理。

![8](../img/Nginx_img/8.png)

## 1.什么是反向代理？

<h4>正向代理</h4>

当客户端想要间接访问一个目标服务器时。客户端可以找一个可以访问目标服务器的另外一台服务器。这个另外一台服务器就是代理服务器。

正向代理的过程：
1. 客户端把请求发送给代理服务器，再通过代理服务器把请求发送给目标服务器。
2. 代理服务器从目标服务器处获得相应的数据后，再转发给客户端。

==在正向代理的过程中，客户端和代理服务器知道目标服务器的IP地址，而目标服务器只知道代理服务器的IP地址而不知道客户端的IP地址。所以正向代理可以屏蔽或隐藏客户端的信息。所以代理服务器是为客户端作代理人，它是站在客户端这边的==

![9](../img/Nginx_img/9.png)

<h4>反向代理</h4>

<font color="red">由于正向代理是代理服务器作为客户端的代理人（客户端与代理是一伙的）。而反向代理是指代理服务器作为服务器的代理人（代理与目标服务器是一伙的）。并且在反向代理过程中，对外屏蔽了目标服务器的信息</font>

![10](../img/Nginx_img/10.png)

## 2.Nginx 的安装与启动

Nginx 的优点:

1. 高并发连接：相比 Apache，Nginx 使用更少的资源，支持更多的并发连接，体现更高的效率，能够支持高达 50,000 个并发连接数的响应.

2. 内存消耗少。

3. 配置简单。

>1. nginx的下载

[官网 http://nginx.org](http://nginx.org/)

![1](../img/Nginx_img/1.png)

下载nginx-1.16.0.zip压缩包,解压到某个文件夹中。

![2](../img/Nginx_img/2.png)

>2. nginx服务器启动

方式①：双击运行nginx.exe，就启动nginx服务器。

![3](../img/Nginx_img/3.png)

方式②：使用命令行打开nginx服务器。

1. 先使用命令行到nginx文件中：

```
d:     #进入到d盘
cd CodingEnvironment\nginx-1.16.0   #进入到nginx文件夹中

```

![4](../img/Nginx_img/4.png)

2. 运行命令：

```
start nginx     #启动nginx服务器

```

3. 在任务管理器，看到nginx服务器的标志，就表示已经启动。

![5](../img/Nginx_img/5.png)


4. 浏览器访问 localhost，即可看到Nginx 欢迎页

![7](../img/Nginx_img/7.png)

5. 有时需要在==启动前检查nginx配置是否ok==

```
nginx -t -c conf/nginx.conf   #检查nginx配置

```

6. 关闭nginx服务器命令

```
nginx -s stop    #快速关机
nginx -s quit    #优雅的关机
```

![6](../img/Nginx_img/6.png)


## 3.Nginx的基本运行命令

> 当nginx启动后,可以通过使用 -s 参数调用可执行文件来控制它。

```
nginx -s stop    #快速关闭服务
nginx -s quit    #正常关闭服务
nginx -s reload  #重新加载配置文件
nginx -s reopen  #重新打开日志文件
nginx -v         #显示 nginx 的版本。
nginx -V         #显示 nginx 的版本，编译器版本和配置参数。
nginx -c filename  #为 Nginx 指定一个配置文件，来代替缺省的.
nginx -t          #不运行，而仅仅测试配置文件，检查配置文件中是否有错。
```

