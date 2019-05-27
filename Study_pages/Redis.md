[TOC]

# Redis

## 1. NOSQL

==nosql一般指非关系型数据库。nosql数据库就是为了解决大规模数据集合的存储问题。==

NOSQL数据库相比传统的关系型数据库有许多优点：
1. 易扩展，nosql数据库中数据与数据之间无关系，导致为数据库添加新的数据时，容易扩展。
2. 大数据量高性能：nosql数据库由于数据之间的无关系性，因此在大数据量的情况下有非常高的读写性能。
3. 灵活的数据模型：nosql无须为存储的数据建立字段。随时可以定义新的数据格式。

## 2.Redis的介绍

Redis: Remote Dictionary Server (远程字典服务器)
Redis是一个开源的、使用C语言编写的、支持网络交互的、可基于内存也可持久化的Key-Value数据库，是NOsql数据库之一。

Redis的特点：
1. 支持数据持久化，把内存的数据保存在磁盘中，重启的时候可以再次加载出来。
2. 不仅仅支持 key-value类型的数据，还支持list,set,zset,hash等数据结构的存储。
3. redis支持数据备份，即主从模式的数据备份。

## 3.Redis的安装

1. 从redis官网中下载的redis源码包 “redis-5.0.4.tar.gz”
2. 把源码包放到linux系统下的专门存放第三方应用程序的文件夹 /usr 或 /opt 下。
3. 解压源码包后会出现文件夹redis-5.0.4。
4. 进入到解压后的redis-5.0.4文件后，打开终端，==在redis-5.0.4文件目录下运行 make 命令,开始编译redis-5.0.4文件，把它编译为二进制数据包。==
5. 接着执行 make install 命令，一般编译后的redis文件会放在 /usr/local 目录下。
6. 新建一个myredis文件，并把redis-5.0.4 文件中的redis.conf 拷贝到myredis文件中。
7. 用Vim文本编辑器修改myredis文件中redis.conf。命令：“ vim redis.conf ”。
注意，该redis.conf可能为只读文件，需要用sudo命令来打开vim进行编辑
" sudo vim redis.conf "
8. 把配置文件中的 daemonize no 改为 daemonize yes
9. 退出vim编辑器，并保存文件。命令“ ：wq ”

<h4>Redis 的启动：</h4>

进入先前编译的redis-5.0.4/bin/ 目录下

<h5>前端启动：</h5>

直接输入命令：“ ./redis-server ”,启动效果如下。

![1](../img/redis_img/1.png)

前端启动的缺点是启动完成之后，不能再进行其他操作，如果操作必须使用ctrl+c，同时redis-server程序结束，不推荐这种开启方式。

<h5>后端启动：</h5>

执行命令“ ./redis-server ../myredis/redis.conf”，即可启动redis服务端.
然后输入命令" ./redis-cli " 即可进入客户端进行操作。
再输入命令" ping ",如果redis 回应 " pong ",表示redis启动成功

<font color="red">../myredis/redis.conf 是存放备份的redis配置文件，尽量不要动原有的配置文件。</font>

![2](../img/redis_img/2.png)

<h4>退出redis</h4>

从客户端进入redis之后，输入exit退出

---

## 4.Redis 基础

### 1.Redis基础知识

1. redis的默认端口是6379
2. 默认有16个数据库（0-15），初试默认使用0号数据库
3. 16个数据库的密码相同。
4. 应用场景：缓存，取最新N个数据的操作，排行榜应用,取TOP N 操作等

### 2.Redis基础命令

1. set 命令：在当前数据库中设置一个键值对。之前有的会覆盖
> set k1 hello
>//设置一个 key="k1",value="hello"的键值对
2. get 命令：通过key值，获取当前数据库的对于的value值。
>get k1
>"hello"
3. select 命令：切换数据库。一共有16个数据库（0-15）
>select 2
>//切换到2号数据库
4. dbsize 命令：查看当前数据库的key的数量。
>dbsize
>1
>//表示当前这个数据库只有一个键值对
5. flushdb 命令：删除当前数据库的所以key-value
>flushdb
6. flushdb 命令：删除所以（16个）数据库的所以key-value
>flushall
7. keys * 命令：查询当前数据库的所以键值对
>keys *
>"ks"
>"k1"
>"k2"
>"qwe"
>//表示当前数据库的键值对有"ks"。
8. keys ？ 命令：通过占位符查询特定的key
>keys k?
>"ks"
>"k1"
>"k2"
>//查询当前数据库的以k为首字符的key

**其他基础命令**

命令 | 功能
---- | ---- 
DEL key | 此命令删除一个指定键(如果存在)。
DUMP key | 此命令返回存储在指定键的值的序列化版本。
EXISTS key | 此命令检查键是否存在。
TTL key | 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。-1表示永不过期，-2表示已经过期。
TYPE key | 返回存储在键中的值的数据类型
KEYS pattern | 查找与指定模式匹配的所有键。
MOVE key db | 将键移动到另一个数据库。
PERSIST key | 删除指定键的过期时间，得永生。
RANDOMKEY | 从Redis返回一个随机的键。
RENAME key newkey  | 更改键的名称。
PTTL key | 以毫秒为单位返回 key 的剩余的过期时间。
RENAMENX key newkey | 如果新键不存在，重命名键。
EXPIRE key seconds | 设置键在指定时间秒数之后到期/过期。
EXPIREAT key timestamp | 设置在指定时间戳之后键到期/过期。这里的时间是Unix时间戳格式。
PEXPIRE key milliseconds | 设置键的到期时间(以毫秒为单位)。
PEXPIREAT key milliseconds-timestamp | 以Unix时间戳形式来设置键的到期时间(以毫秒为单位)。


---

## 5.五大数据类型

### 1.string(字符串)

string类型是redis支持的最基本的数据类型。redis的string数据类型可以存储图片或序列化对象。并且redis的每个字符串的value最多可以存储512M.

<h4>redis字符串命令</h4>

命令 | 功能
---- | ---- 
append key value | 如果 key 已经存在并且是一个字符串，该命令将指定的 value 追加到该 key 原来值（value）的末尾。
strlen key | 返回 key 所储存的字符串值的长度。
getset key value | 先get返回key的旧值,再覆盖 key 的值为 value。
incr key | 将 key 中储存的数字值增一。(==注意必须是数字才能进行加减==)
incrby key num | 将 key 所储存的值加上给定的num值。(==注意必须是数字才能进行加减==)
decr key | 将 key 中储存的数字值减一。(==注意必须是数字才能进行加减==)
decrby key num | key 所储存的值减去给定的num值 。 (==注意必须是数字才能进行加减==)
getrange key num1 num2 | 获取指定区间范围（num1-num2）的值
setrange key offset value | 从偏移量 offset 开始,重新设置key的值（会覆盖）。 
setex key seconds value | 设置键值对 ，并将 key 的过期时间设为 seconds (以秒为单位)。
setnx key value | 当key不存在时，设置键值对。==用于避免set命令导致的覆盖==
mget key1 [key2..] | 返回(一个或多个) key 的值。
mset key value [key value ...] | 同时设置一个或多个 key-value。
msetnx key value [key value ...] | 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。

```
127.0.0.1:6379> set k1 qwe
127.0.0.1:6379> append k1 rt
127.0.0.1:6379> get k1
"qwert"

127.0.0.1:6379> strlen k1
(integer) 5

127.0.0.1:6379> getset k1 abc
"qwert"
127.0.0.1:6379> get k1
"abc"

127.0.0.1:6379> getrange k1 0 1
"ab"

127.0.0.1:6379> setrange k1 0 xx
127.0.0.1:6379> get k1
"xxc"

127.0.0.1:6379> mset k2 v2 k3 v3
OK
127.0.0.1:6379> mget k1 k2 k3
1) "xxc"
2) "v2"
3) "v3"

127.0.0.1:6379> set k4 10
OK
127.0.0.1:6379> incr k4
(integer) 11
127.0.0.1:6379> incr k4
(integer) 12
127.0.0.1:6379> decr k4
(integer) 11

127.0.0.1:6379> incrby k4 5
(integer) 16
127.0.0.1:6379> decrby k4 5
(integer) 11

```