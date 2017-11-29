[toc]
# MySQL
## ALTER命令:
需要修改数据表名或者修改数据表字段时，就需要使用到MySQL ALTER命令。

### 1.展示表的结构：
<font color="red">show columns</font> from table_name;

### 2.使用 add来为数据表中添加列 id ：
alter table testalter_tbl <font color="red">add</font> id int;

### 3. 使用drop来删除表的 id 字段：
alter table testalter_tbl <font color="red">drop</font> i;

### 4.需要修改字段类型及名称:
把字段 c 的类型从 CHAR(1) 改为 CHAR(10):
alter table testalter_tbl <font color="red">modify</font> c CHAR(10);

在 change 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段的类型及名称:
alter table testalter_tbl <font color="red">change</font> i j INT;

### 5.修改表名:
将数据表 testalter_tbl 重命名为 alter_tbl：
alter table testalter_tbl <font color="red">rename to</font> alter_tbl;


## 创建MySQL的student表：
create table student(
&emsp;sid <font color="red">INT NOT NULL AUTO_INCREMENT</font>,
&emsp;sname VARCHAR(100) <font color="red">NOT NULL</font>,
&emsp;sgender VARCHAR(40) <font color="red">NOT  NULL</font>,
&emsp;<font color="blue">PRIMARY KEY (sid)</font>
);

INT ：int类型
varchar(100) ：可变字符型，长度为100
NOT NULL ：不能为空
AUTO_INCREMENT：自动增长
primary key : 主键

## 删除student表（包括数据和表的结构）：
DROP TABLE student ;

## 仅删除表中存储的数据：
delete from student [where 条件]

①如果没有指定 WHERE 子句，表中的所有记录将被删除（不删除表的结构，表还存在数据库中，只是没有了数据）。
②你可以在 WHERE 子句中指定任何条件
③您可以在单个表中一次性删除记录。

## 插入数据：
insert into table_name ( sid, sname,sgender,... ) values ( 1, 'jim','男',...);
<font color="red">注意：字符数据，统一用单引号（''）,引起来。

## 修改数据：
update table_name set sid=new-value1,sname=new-value2.... [where 条件]

①你可以同时更新一个或多个字段。
②你可以在 WHERE 子句中指定任何条件。
③你可以在一个单独表中同时更新数据。

## 单表查询数据：
select sid,sname,.. from student [where sid>10];

## 多表查询：
select field1, field2,...fieldN from table_name1,table_name2...where 条件1 [and /or] 条件2.....

![mysql-1.png](../img/mysql_img/1.png)

## 使用 LIKE 子句模糊查询：
select field1, field2,...fieldN table_name1,table_name2...where field1 like 条件 [and /or] filed2 = 'somevalue'

①如果没有使用百分号(%), LIKE 子句与等号（=）的效果是一样的。
② % 表示任意多个字符，_ 表示任意单个字符。

## 使用 order by 子句将查询数据排序后再返回数据:

select field1, field2,...fieldN from table_name1, table_name2...
order by field1, [field2...] [asc [desc]]

①你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。
②你可以设定多个字段来排序。
<font color="red">③你可以使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列。</font>
④你可以添加 WHERE...LIKE 子句来设置条件。

## group by 语句根据一个或多个列对结果集进行分组：
使用 GROUP BY 语句 把表按名字进行分组，并统计每个人有多少条记录：
 SELECT sname, COUNT(*) FROM  student group by sname;

## MySQL 连接多个表的使用(join):
join 按照功能大致分为如下三类：
&emsp;**inner join（内连接,或等值连接）：获取两个表中字段匹配关系的记录。**
&emsp;**left join（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。**
&emsp;**right join（右连接）： 与 left join 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。**

### 1.inner join:
使用MySQL的INNER JOIN(<font color="red">也可以省略 INNER 使用 JOIN，效果一样</font>)来连接以上两张表来读取w3cschool_tbl表中所有w3cschool_author字段在tcount_tbl表对应的w3cschool_count字段值：

select a.w3cschool_id, a.w3cschool_author, b.w3cschool_count <font color="red">from</font> w3cschool_tbl a <font color="red">inner join</font>tcount_tbl b <font color="red">on</font> a.w3cschool_author = b.w3cschool_author;    

### 2.left join:
以 w3cschool_tbl 为左表，tcount_tbl 为右表:

select a.w3cschool_id, a.w3cschool_author, b.w3cschool_count <font color="red">from</font> w3cschool_tbl a  <font color="red">left join</font>tcount_tbl b <font color="red">on</font> a.w3cschool_author = b.w3cschool_author;

### 3.right join:
以 tcount_tbl 为左表，w3cschool_tbl 为右表:

select b.w3cschool_id, b.w3cschool_author, a.w3cschool_count <font color="red">from</font> tcount_tbl a <font color="red">right join</font>w3cschool_tbl b <font color="red">on</font> a.w3cschool_author = b.w3cschool_author;

## NULL 值处理：
① IS NULL: 当列的值是NULL,此运算符返回true。
② IS NOT NULL: 当列的值不为NULL, 运算符返回true。
③ <=>: 比较操作符（不同于=运算符），当比较的的两个值为NULL时返回true。
④关于 NULL 的条件比较运算是比较特殊的。你不能使用 = NULL 或 != NULL 在列中查找 NULL 值 。
⑤在MySQL中，NULL值与任何其它值的比较（即使是NULL）永远返回false，即 NULL = NULL 返回false 。
⑥<font color="red">MySQL中处理NULL使用IS NULL和IS NOT NULL运算符。</font>
