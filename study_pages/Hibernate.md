[toc]
# Hibernate
## 概述：
&emsp;&emsp;一个开放源代码的对象关系映射框架，它对JDBC进行了非常轻量级的对象封装，它将POJO与数据库表建立映射关系，是一个全自动的orm框架,<font color="red">hibernate可以自动生成SQL语句，自动执行，使得Java程序员可以随心所欲的使用对象编程思维来操纵数据库。</font>

## 第一个Hibernate的CRUD 例子

<h3>工程目录：</h3>

![2.png](../img/Hibernate_img/2.png)


<h3>①：准备数据库环境</h3>
<font color="red">在test数据库中创建user表.</font>

![1.png](../img/Hibernate_img/1.png)


<h3>②：准备Hibernate 环境</h3>

1. 创建工程项目文件。
2. 到官网上，下载Hibernate 文件（目前最新的稳定版为5.2.12）

    [Hibernate下载路径](http://hibernate.org/orm/releases/5.2/)

3. 导入hobernate 需要的jar包到工程文件的classpath 下。
需要的jar包所在是路径：hibernate-release-5.2.12.Final\lib\required



4. 导入mysql的jdbc驱动包到工程文件的classpath下：
mysql-connector-java-5.1.42-bin.jar


<h3>③：创建Hibernate 配置文件</h3>

hibernate.cfg.xml
```xml

<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
"-//Hibernate/Hibernate Configuration DTD 3.0//EN"
"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <!-- 数据库连接信息 -->
        <property name="connection.url">jdbc:mysql://localhost:3306/test</property>
        <property name="connection.username">root</property>
        <property name="connection.password">123456</property>
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
 
 		<!-- 告訴hibernate 使用什么数据库,  dialect（方言） -->
        <property name="dialect">org.hibernate.dialect.MySQLInnoDBDialect</property>
        
         <!-- 执行操作时，是否在控制台打印sql语句-->
        <property name="show_sql">true</property>
        
        <!-- 是否 对在控制台打印的sql语句进行格式化 -->
        <property name="format_sql">true</property>
        
        <!-- 指定程序运行时，是否在数据库中自动生成数据表 -->
        <property name="hbm2ddl.auto">update</property>
   
       <!-- 告诉hibernate 去哪找 映射文件（默认后缀为 .hbm.xml文件） ，resource： 表示路径为目录结构形式-->
        <mapping resource="com/hbm/xml/User.hbm.xml" />
      
        
    </session-factory>
</hibernate-configuration>

```


<h3>④：创建持久化类（实体类）</h3>

User.java
```java
package com.entity;
public class User{
 
	private Integer id;
	private String name;
	private Integer age;
	
	public User(){}

	public User(String name, Integer age) {
		super();
		this.name = name;
		this.age = age;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", age=" + age + "]";
	}
	
}

```


<h3>⑤：创建对象——关系映射文件（Object Relational Mapping,ORM）</h3>
<font color="red">注意：映射文件的扩展名：" .hbm.xml "</font>

User.hbm.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE hibernate-mapping PUBLIC "-//Hibernate/Hibernate Mapping DTD 3.0//EN"    
"http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">  
<hibernate-mapping>  
  <class name="com.entity.User" table="user">   <!-- name 为持久化类的全类名 -->
     <id name="id" type="java.lang.Integer" column="id">     <!--  指定主键的生成方式，native：使用数据库本地的方式-->
     	<generator class="native"/> 
     </id>  

     <property name="name" type="java.lang.String" column="name"></property>  
     <property name="age" type="java.lang.Integer" column="age"></property>  
  </class>  
  
</hibernate-mapping>


```

<h3>⑥：test</h3>

hibernate_test.java
```java
package com.test;

import static org.junit.Assert.*;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import org.junit.Test;

import com.entity.User;

public class hibernate_test {
	
	private static SessionFactory sessionFactory=null;
	private static Session session=null;
	
	/*
	 * 通过静态代码块创建Session对象
	 * */
	static{
		/*
		 * 1.创建Configuration对象，调用configure()方法，加载 hibernate.cfg.xml配置文件. 
		 *  	注意：configure()方法 会默认加载 名字叫 hibernate.cfg.xml 的文件。
		 * 	   	 所以配置文件的名字最好叫hibernate.cfg.xml
		 * 2.创建StandardServiceRegistry 对象，hibernate的所有配置与服务都需要在该对象中注册才能有效。
		   3.创建SessionFactory对象。
		   4.创建Session对象
		 * 
		 * */
		Configuration cfg = new Configuration().configure();
	    sessionFactory=cfg.buildSessionFactory();
	
		/*这种生成 sessionFactory 的方式也可以：
 		 * 
		 * StandardServiceRegistry serviceRegistry=new StandardServiceRegistryBuilder().configure().build();
		   SessionFactory sessionFactory=new MetadataSources(serviceRegistry).buildMetadata().buildSessionFactory();
		 * 
		 * */
	    
	    session=sessionFactory.openSession();
		
	}
	
	
	/*
	 * 插入数据
	 * */
	@Test
	public void insert(){
		/*
		 * 1.创建Configuration对象，调用configure()方法，加载 hibernate.cfg.xml配置文件. 
		 * 	    注意：configure()方法 会默认加载 名字叫 hibernate.cfg.xml 的文件。
		 * 	    所以配置文件的名字最好叫hibernate.cfg.xml。
		 * 2.创建StandardServiceRegistry 对象，hibernate的所有配置与服务都需要在该对象中注册才能有效。
		 * 3.创建SessionFactory对象。
		 * 4.创建Session对象
		 * 5.开启事务
		 * 6.执行插入操作：
		 * 7.提交事务
		 * 8.关闭session，sessionFactory
		 * */
		
		
		Transaction transaction=session.beginTransaction();   //开启事务
		
		User user=new User("xiaoming",44);
		session.save(user);        //插入数据
		
		transaction.commit();       //提交事务
		
		session.close();
		sessionFactory.close();
	}
	
	
	/*
	 * session.update(user);  默认以id来更新数据，如果对象没有id值（或id=null,或数据库没有该id值）,则无法 更新
	 * */
	@Test
	public void update(){
		
		Transaction transaction=session.beginTransaction();   //开启事务
		User user=new User("xiaoho",11);
		user.setId(8);
		
		session.update(user);
		
		transaction.commit();
		
		session.close();
		sessionFactory.close();
		
	}
	
	/*
	 * session.delete(user);  默认以id来删除数据，如果对象没有id值（或id=null,或数据库没有该id值）,则无法删除
	 * */
	@Test
	public void delete(){
		Transaction transaction=session.beginTransaction();   //开启事务
		User user=new User();   
		user.setId(1);
		
		session.delete(user);
		transaction.commit();
		
		session.close();
		sessionFactory.close();

	}
	
	/*
	 * 查询操作，不需要提交事务
	 * 
	 * 	session.get(User.class, 7);    //参数1:需要查询的类对应的clas文件  , 参数2： 查询条件（唯一标识，id值）
	 * */
	@Test
	public void selectone(){
		User user =session.get(User.class,7);
		
		session.close();
		sessionFactory.close();
		
		System.out.println(user);
	
	}

	
	/*
	 * 多条查询，不需要提交事务。
	 * */
	@Test
	public void selectAll(){
		/*
		 * 通过hibernate提供的查询语句进行查询
		 * 此处Users是类名，而不是数据库的表名, select * 不写
		 * */
	    String hql = "from User";   
	    
		//执行hql语句
	    List<User> user_list=session.createQuery(hql).list();
		
	    for (User user : user_list) {
			System.out.println(user);
		}
	    
		session.close();
		sessionFactory.close();
	}
	
}


```

<h3>⑦：解析：</h3>
 
在Hibernate的配置文件 hibernate.cfg.xml 中：
```xml
 <!-- 指定程序运行时，是否在数据库中自动生成数据表 -->
  <property name="hbm2ddl.auto">update</property>
```

==name属性：有4种取值。create , update, create-drop, validate。==

> 1. create
会根据.hbm.xml的文件来生成数据表，但是每次运行都会删除上一次的表，重新生成表，即使表之前之后没有任何改变。

> 2. create-drop:
会根据 .hbm.xml 文件生成表，但是SessionFactory 一旦关闭，表就自动删除。

> 3. update（最常用）：
<font color="red">会根据 .hbm.xml 文件生成表，若 .hbm.xml 文件和数据库的对应的数据表的结构不同，Hibernate 会更新数据表的结构，但不会删除之前存在的数据或结构。</font>

> 4. validate：
会与数据库的表进行比较，若 .hbm.xml文件的列在数据表中不存在，抛出异常。





