[toc]
# Spring
## 概述：
参考链接：
[Spring](http://spring.io/) 
[Spring百度百科](https://baike.baidu.com/item/spring/85061?fr=aladdin) 
[Rod Johnson](https://baike.baidu.com/item/Rod%20Johnson/1423612?fr=aladdin)

&emsp;&emsp;spring是一个开放源代码的设计层面框架，他解决的是业务逻辑层和其他各层的松耦合问题，因此它将<font color="red">面向接口的编程思想贯穿整个系统应用。</font>Spring是于2003 年兴起的一个轻量级的Java 开发框架，由Rod Johnson 创建。简单来说，Spring是一个分层的JavaSE/EEfull-stack(一站式)轻量级开源框架。

Spring是独特的，因为若干个原因：
&emsp;&emsp;它定位的领域是许多其他流行的framework没有的。Spring致力于提供一种方法管理你的业务对象。
&emsp;&emsp;Spring是全面的和模块化的。Spring有分层的体系结构，这意味着你能选择使用它孤立的任何部分，它的架构仍然是内在稳定的。因此从你的学习中，你可得到最大的价值。例如，你可能选择仅仅使用Spring来简单化JDBC的使用，或用来管理所有的业务对象。
&emsp;&emsp;它的设计从底部帮助你编写易于测试的代码。Spring是用于测试驱动工程的理想的framework。
&emsp;&emsp;Spring对你的工程来说，它不需要一个以上的framework。Spring是潜在地一站式解决方案，定位于与典型应用相关的大部分基础结构。它也涉及到其他framework没有考虑到的内容。

## spring的使用前提（spring的基础环境搭建）：
使用spring前，需要导入spring的jar包，你可以去官网下载。
spring最基础的几个jar包：
&emsp;&emsp;spring必须依赖的日志包，需要外部导入：commons-logging-1.2.jar
&emsp;&emsp;spring-aop-4.3.8.RELEASE.jar
&emsp;&emsp;spring-beans-4.3.8.RELEASE.jar
&emsp;&emsp;spring-context-4.3.8.RELEASE.jar
&emsp;&emsp;spring-core-4.3.8.RELEASE.jar
&emsp;&emsp;spring-expression-4.3.8.RELEASE.jar

把这些jar包，添加到类路径中（Add Build Path）。

***

## Spring的组成：
spring主要有7大模块组成。<font color="red">每个模块既可以单独使用，又可以与其他模块组合使用。</font>

1. core模块：
spring的core 模块是spring的核心容器。它实现了IOC 模式，提供了spring框架的基础功能。<font color="red">模块中包含的BeanFactory 类是spring的核心类，负责对bean的管理与配置。</font>

2. Context模块：
spring的Context模块 继承了BeanFactory 类，并添加了事件处理，国际化，数据校验等功能。

3. AOP模块：
spring 集成了所有的AOP功能。通过事务管理可以使任意的spring 管理的对象AOP化。

4. DAO模块：
DAO模块提供了jdbc的抽象层，大幅减少代码的编写，并且提供了对声明式事务和编程式事务的支持。

5. ORM映射模块：
ORM映射模块提供了对现有的ORM框架的支持。

6. WEB模块：
WEB模块建立在context 模块的基础上，它提供了Servlet 监听器的Context 和 WEB 应用的上下文。它对现有的WEB框架 如struts ,jsf 等提供了集成。

7. MVC模块：
其建立在spring的核心功能上，实现了控制逻辑与业务逻辑清晰的分离。

***

## Spring的XML使用方式：

### 1.例子：编写spring方式的 Hello world:
1. 编写一个JavaBean：
User.java:
```java
package com.entity;

import org.springframework.stereotype.Component;

public class Student {
    
	private String name;
	
	public Student(){
		System.out.println("this is student 无参构造函数");
	}
	
	public Student(String name){
		this.name=name;
		System.out.println(" this is student 有参构造函数");
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public void sayHelloWorld(Student stu){
		System.out.println(stu+"  say hello world");
	}

	@Override
	public String toString() {
		return "Student [name=" + name + "]";
	}
	
}

```

2. 在src目录，创建applicationContext.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:p="http://www.springframework.org/schema/p"
	xmlns:mybatis="http://mybatis.org/schema/mybatis-spring"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
    xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-4.3.xsd
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.3.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd
        http://mybatis.org/schema/mybatis-spring
        http://mybatis.org/schema/mybatis-spring.xsd">
       
       
   <!-- 
   为spring的ioc 容器（applicationContext ）添加java bean 对象，通过<bean>标签,
   当创建applicationContext 容器时，spring框架 会执行中存在的bean对象的无参构造函数 实例化bean对象  给开发者使用。
   
    -->   
 
<bean id="student" class="com.entity.Student">
 
	<!-- 属性注入，通过bean对象的set 方法注入 属性值 -->
	<property name="name" value="xiaobing"></property>
  	
	  
	<!-- 构造器注入（使用对象的构造函数来注入属性值） ,index="0" ，表示构造函数的第一个参数,type表示该属性的类型
  		<constructor-arg value="xiaohei" index="0" type="java.lang.String"/>
  	-->

</bean>
       
   
</beans>
```

3. 测试方法：
```java
public class test {

	/*
	 * 这是使用普通的方法。
	 * 1.先创建Student对象。
	 * 2.给对象赋值。
	 * 3.调用对象的方法。
	 * */
	@Test
	public void test1(){
		Student stu=new Student();
		stu.setName("xiaoming");
		stu.sayHelloWorld(stu);
	}
	
	/*
	 * 使用spring：
	 * 之前的1，2两个步骤可以交给spring框架来完成
	 * */

	@Test
	public void test2(){
		//Student stu=new Student();
		//stu.setName("xiaoming");
		
		/*
		 * 0.创建spring的配置文件（名字随意取）在src目录下，我这个叫applicationContext.xml
		 * 2.根据spring的配置文件，创建spring的容器对象，
		 * 3.从spring的容器对象中获取想要的实例对象。
		 * 4.调用实例对象的方法。

		 * */
	ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");
	
	Student stu=(Student) app.getBean("student");	
		
	stu.sayHelloWorld(stu);
	
	}
}

```

4. 运行结果(一个普通方法，一个使用spring的)：

**普通方法：**
>this is student 无参构造函数
>User [name=xiaoming]  say hello world

**使用spring的方法：**
>this is student 无参构造函数
>User [name=xiaobing]  say hello world

### 2.分析上面的实例（★★★★★）：

①：spring框架会 通过spring的配置文件（applicationContext.xml）来创建 spring的ioc 容器（applicationContext)

```java
ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");
```
		
②：当spring的ioc 容器创建时，spring框架会根据 配置文件的信息来创建java bean对象，并存放在容器中。（<font color="red">ioc 容器创建时，会执行配置文件中bean标签对象的Javabean对象的无参构造函数</font>），其中被创建的java bean对象，必须符合 java bean的格式 （get/set方法, 无参构造函数，private属性）。

```xml
<bean id="student" class="com.entity.Student">
  	<property name="name" value="xiaobing"></property>
</bean>
```

③：此时，当容器创建完成后，容器中就存在已经实例化的bean对象，可以通过ioc 容器的getBean（） 方法来获取这些bean对象。
`	Student stu=(Student) app.getBean("student");	`

④：直接调用从容器获取的bean对象的方法。
`	stu.sayHelloWorld(stu); `


## Spring的控制反转（Inverse of Control，IoC）或 依赖注入（Dependency Injection）：
<font color="blue">注意：控制反转与依赖注入是一个意思。</font>

Spring框架的核心功能有两个：
>Spring容器作为超级大工厂，负责创建、管理所有的Java对象，这些Java对象被称为Bean。
>Spring容器管理容器中Bean之间的依赖关系，Spring使用一种被称为"依赖注入（控制反转）"的方式来管理Bean之间的依赖关系。

**使用依赖注入（控制反转），不仅可以为Bean注入普通的属性值，还可以注入其他Bean的引用。依赖注入（控制反转）是一种优秀的解耦方式，其可以让Bean以配置文件组织在一起，而不是以硬编码的方式耦合在一起。**

### 1.概念：

&emsp;&emsp;当某个Java对象（调用者）需要调用另一个Java对象（被依赖对象）的方法时，在传统模式下通常有两种做法：

1. 原始做法: 调用者主动创建被依赖对象，然后再调用被依赖对象的方法
2. 简单工厂模式: 调用者先找到被依赖对象的工厂，然后主动通过工厂去获取被依赖对象，最后再调用被依赖对象的方法。

注意上面的<font color="red">主动</font>二字，**这必然会导致调用者与被依赖对象实现类的硬编码耦合，非常不利于项目升级的维护。**(<font color="red">可以理解为牵一发而动全身，或者对象与对象之间的关系太紧密，耦合度太高。</font>)

使用Spring框架之后，调用者无需主动获取，创建被依赖对象，<font color="red">调用者只要被动接受Spring容器为调用者的成员变量赋值即可</font>，由此可见，**使用Spring后，调用者获取被依赖对象的方式由原来的主动获取，变成了被动接受——所以称之为控制反转。**

**另外从Spring容器的角度来看，Spring容器负责将被依赖对象赋值给调用者要使用的成员变量——相当于为调用者注入它依赖的实例，因此被称之为依赖注入。**

### 2.spring容器的实现（BeanFactory，ApplicationContext）：
**spring容器实现方式有两种：**

BeanFactory :ioc容器的基本实现,是spring框架的基础设施，面向spring本身。

ApplicationContext : 是BeanFactory的子接口，提供更多的功能，面向开发者,<font color="blue">几乎所有的场合都使用ApplicationContext，而不是更底层的BeanFactory。</font>

```java
ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");
```
ApplicationContext是Spring容器最常用的接口，该接口有如下两个实现类：
&emsp;&emsp; ClassPathXmlApplicationContext: 从类加载路径下搜索配置文件，并根据配置文件来创建Spring容器。

&emsp;&emsp; FileSystemXmlApplicationContext: 从文件系统的相对路径或绝对路径下去搜索配置文件，并根据配置文件来创建Spring容器。


### 3.通过applicationContext来进行bean的配置：
applicationContext.xml
```xml
<bean id="student" class="com.entity.Student">
  	<property name="name" value="xiaobing"></property>
</bean>
```

test.java
```java
ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");

Student stu=(Student) app.getBean("student");
stu.sayHelloWorld(stu); 
```

id : ioc容器可以用getBean方法，通过该标识符来获取bean对象。
class : javabean对象的全类名。通过反射的方式,来寻找javaBean对象，并在容器中创建该bean对象。
<font color="red">注意：ioc容器创建时，会调用bean标签对应的对象的无参构造函数，来创建该bean对象。所以对象必须有无参构造函数。</font>


### 4.通过工厂方法配置bean（不推荐使用）：
**请自行百度**

### 5.依赖注入的方式（主要有2种）：

#### 1.属性注入：
&emsp;&emsp;属性注入通过setter方法注入Bean的属性值或依赖的对象。<font color="red">其通过&lt;property&gt; 标签，使用name 属性指定Bean对象中的某个属性，value 指定其属性值。</font>

```xml
<bean id="student" class="com.entity.Student">
  	<property name="name" value="xiaobing"></property>
</bean>
```

#### 2.构造方法注入：
```xml
<bean id="student" class="com.entity.Student">
 	
  	 <!--构造器注入 ,index="0" ，表示构造函数的第一个参数-->
  	<constructor-arg value="xiaohei" index="0" type="java.lang.String"/>
  	
</bean>
        
```

```java
...
public Student(){
	System.out.println("this is student 无参构造函数");
}
	
public Student(String name){
	this.name=name;
	System.out.println(" this is student 有参构造函数");
}
	
...
```
&emsp;&emsp;构造方法注入通过对象的有参构造方法，注入Bean的属性值或依赖的对象。<font color="red">其通过&lt;constructor-arg&gt; 标签，使用index属性指定有参构造方法中的那个参数，value 指定其属性值。type指定属性的类型</font>

**注意：当有多个有参构造方法时，可以使用index , type来区别不同的构造方法**

### 6.bean的详解：

#### 1.bean与bean之间的注入（引用）：

1. 创建学生证类 Schoolcard
```java
package com.entity;

public class Schoolcard {
	private Integer id;
	private String name;
	
	public Schoolcard(){
		System.out.println("this is Schoolcard 无参构造函数");
		
	}
	
	public Schoolcard(Integer id,String name){
		this.id=id;
		this.name=name;
		System.out.println("this is Schoolcard 有参构造函数");
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

	@Override
	public String toString() {
		return "Schoolcard [id=" + id + ", name=" + name + "]";
	};

}

```

2. 修改学生类：
Student.java
```java
private Schoolcard scard;

public Schoolcard getScard() {
		return scard;
}

public void setScard(Schoolcard scard) {
		this.scard = scard;
}

@Override
public String toString() {
		return "Student [name=" + name + ", scard=" + scard + "]";
}

```

3. 创建Schoolcard的bean标签，修改student的bean标签：
applicationContext.xml
```xml
<bean id="school_card" class="com.entity.Schoolcard">
	<property name="id" value="1"></property>
	<property name="name" value="xiaohuang"></property>
</bean>
 
 
<bean id="student" class="com.entity.Student">
 
	<!-- 属性注入，通过bean对象的set 方法注入 属性值 -->
  	<property name="name" value="xiaoming"></property>
  	
  	<!-- 引用其他的bean标签, ref 属性表示被引用的bean-->
  	<property name="scard" ref="school_card"></property>
  	
</bean>
```

4. 测试：
```java
@Test
public void test3(){
		ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");
		Student stu=(Student) app.getBean("student");	
		System.out.println(stu);
}
```
5. 结果：
>this is Schoolcard 无参构造函数
>this is student 无参构造函数
>Student [name=xiaoming, scard=Schoolcard [id=1, name=xiaohuang]]


**其中：**
```xml
<bean id="student" class="com.entity.Student">
	<!-- 属性注入，通过bean对象的set 方法注入 属性值 -->
  	<property name="name" value="xiaoming"></property>
  	
  	<!-- 引用其他的bean标签, ref 属性表示被引用的bean-->
  	<property name="scard" ref="school_card"></property>	
</bean>
```
<font color="red">ref 属性表示被引用的bean </font>


#### 2.内部bean（内部bean不能被外部引用）：
applicationContext.xml
```xml
 
<bean id="student2" class="com.entity.Student">
 
	<!-- 属性注入，通过bean对象的set 方法注入 属性值 -->
  	<property name="name" value="xiaoming"></property>
  	
  	<!--使用内部bean ,内部beam有没有id，无所谓-->
  	<property name="scard">
  		<bean id="schoolcard2" class="com.entity.Schoolcard">
  			<property name="id" value="2"></property>
  			<property name="name" value="hehe"></property>
  		</bean>
  	</property>
  	
</bean>
       

```

test.java
```java

//内部bean
	@Test
	public void test4(){
		ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");
		
		Student stu=(Student) app.getBean("student2");	
		System.out.println(stu);
	}
	
```

运行结果：
>this is Schoolcard 无参构造函数
>this is student 无参构造函数
>Student [name=xiaoming, scard=Schoolcard [id=2, name=hehe]]


#### 3.为bean中的集合属性赋值：
若一名学生有多个学生证(小学学生证，~)。

1. 修改Student.java
```java
private List<Schoolcard> cards;

public List<Schoolcard> getCards() {
		return cards;
}
public void setCards(List<Schoolcard> cards) {
		this.cards = cards;
}

@Override
public String toString() {
		return "Student [name=" + name + ", cards=" + cards + "]";
}
```

2. 修改bean
```xml

<bean id="school_card" class="com.entity.Schoolcard">
	<property name="id" value="1"></property>
	<property name="name" value="xiaohuang"></property>
</bean>
 
<bean id="school_card2" class="com.entity.Schoolcard">
	<property name="id" value="3"></property>
	<property name="name" value="mingming"></property>
</bean>


<bean id="student3" class="com.entity.Student">
 
	<!-- 属性注入，通过bean对象的set 方法注入 属性值 -->
  	<property name="name" value="xiaoming"></property>
  	
  	<!-- 为bean中的集合（list）属性赋值,可以使用list元素，或者使用内部bean的方式-->
  	<property name="cards">
  		<list>
  			<ref bean="school_card"/>
  			<ref bean="school_card2"/>
			<bean  class="com.entity.Schoolcard">
				<property name="id" value="4"></property>
				<property name="name" value="digid"></property>
			</bean>
  
  		</list>
  	</property>
  	
</bean>

```

3.结果：
>this is Schoolcard 无参构造函数
>this is Schoolcard 无参构造函数
>this is student 无参构造函数
>Student [name=xiaoming, cards=[Schoolcard [id=1, name=xiaohuang], Schoolcard [id=3, name=mingming]]]

**<font color="red">总结：使用list元素或内部bean的方式，给集合属性赋值。</font>**


#### 4.自动装配（不推荐使用）：
Spring的ioc容器可以自动装配Bean，需要做的是在<font color="red">&lt;bean&gt;的autowire属性中指定自动装配的模式。</font>

**模式有两种：**
1. byType:根据类型自动装配，<font color="red">注意：若ioc容器中有多个与目标bean类型一致的bean，在这种情况下，spring无法判定，不能执行自动装配。</font>

2. byName: 根据名称自动装配：必须把目标的名称与对象中的对应的属性名设置的相同。

```xml
<bean id="student4" class="com.entity.Student" autowire="byName">
	<property name="name" value="xiaoming"></property>
</bean>
```

#### 5.bean与bean的关系：
Spring允许继承bean的配置，被继承的bean 称为父bean。
>①：子bean从父bean中继承配置，包括属性配置。
>②：子bean 也可以覆盖从父bean哪里继承过来的配置。
>③：父bean 可以作为配置模板（抽象bean），也可以作为普通bean。若想作为配置模板，设置&lt;bean&gt;的abstract属性 为true(相当于抽象bean)，这样spring 不会实例化该bean.该bean只能被继承。

```xml

<bean id="school_card" class="com.entity.Schoolcard">
	<property name="id" value="1"></property>
	<property name="name" value="xiaohuang"></property>
</bean>


<!--abstract="true" , 表示该bean 是一个抽象bean，无法被实例化，只能被继承-->
<bean id="school_card2" class="com.entity.Schoolcard" abstract="true">
	<property name="id" value="2"></property>
	<property name="name" value="xiaohehe"></property>
</bean>


 
<!--school_card3 这个bean 继承school_card这个bean  -->
<bean id="school_card3" class="com.entity.Schoolcard" parent="school_card">
</bean>

<!--school_card4 这个bean 继承school_card这个bean ，但有些属性的值覆盖了父bean的属性 -->
<bean id="school_card4" class="com.entity.Schoolcard" parent="school_card">
	<property name="name" value="yiyi"></property>
</bean>

```

#### 6.bean的作用域：

##### 1.Singleton 作用域（默认的作用域）：
当spring中的一个bean的作用域为 singleton 时，IOC的容器中只会存在一个共享的该bean的实例，并且所有对该bean的引用，只要id 与该bean的id 相符合，就只会返回bean的单一实例。
```xml
<bean id="school_card" class="com.entity.Schoolcard" scope="singleton">
	<property name="id" value="1"></property>
	<property name="name" value="xiaohuang"></property>
</bean>
```

```java
					
	Schoolcard scard=(Schoolcard) app.getBean("school_card");	
	Schoolcard scard2=(Schoolcard) app.getBean("school_card");	
	System.out.println(scard==scard2);
	
```
<font color="red">例如：上面代码的运行结果为 true。</font>


##### 2..prototype 作用域：
prototype 作用域的bean 会导致每次对该bean的请求时 ，会创建一个新的bean实例，<font color="blue">但是,当bean创建完毕并将实例对象返回给使用者时，容器不在拥有该实例对象的引用，因此，必须使用bean的后置处理器清除prototype的bean。</font>

**scope="prototype"，表示每次向容器获取同一个bean，容器会创建新的bean对象给使用者使用。**

<font color="red">例如：上面代码的运行结果为 false。</font>





***

#### 7.IOC容器管理bean 的生命周期：
管理过程:
1. 容器通过构造器或工厂方法创建 Bean的实例。
2. 通过bean的配置，容器为bean设置属性，以及bean 与 bean 之间的关系。
3. 调用bean的初始化方法。
4. 使用者使用bean。
5. 当容器关闭时，调用bean的销毁方法。

Schoolcard.java
```java
public void create(){
		System.out.println("Schoolcard create ");
	}
	
	public void destory(){
		System.out.println("Schoolcard destory");
	}
```

```xml
<!--
	在bean 中声明并设置init-method ，destroy-method。
	为bean指定创建 和 销毁的方法
-->
<bean id="school_card" class="com.entity.Schoolcard" 
    init-method="create" destroy-method="destory">
	<property name="id" value="1"></property>
	<property name="name" value="xiaohuang"></property>
</bean>
```


### 7.Spring 配置c3p0数据源，使用外部属性文件（properties文件）：
1. 添加c3p0 的jar包，mysql的驱动包。

2. 创建外部属性文件，db.properties

```
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/blog_demo?useUnicode=true&amp;characterEncoding=utf8
jdbc.username=root
jdbc.password=123456
```


3. 增加配置在applicationContext.xml

```xml
<!-- 导入外部属性文件 -->
<context:property-placeholder location="classpath:db.properties/>
 
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">

	<!-- 使用外部属性文件的属性 -->
	<property name="driver" value="${jdbc.driver}"/>
	<property name="url" value="${jdbc.url}"/>   
	<property name="username" value="${jdbc.username}"/>
	<property name="password" value="${jdbc.password}"/>

</bean>


```

### 8.SpEL：
&emsp;&emsp;Spring的表达式语言（SpEL），是一个支持运行时查询，操作的表达式语言。语法类似EL。其使用 #{}作为定界符。#{xxx}中的字符都被认为是 SpEL表达式。


```xml
<bean id="school_card" class="com.entity.Schoolcard">
	<property name="id" value="1"></property>
	<property name="name" value="xiaohuang"></property>
</bean>
 

<bean id="student3" class="com.entity.Student">

  	<property name="name" value="xiaoming"></property>
  	
 	<!-- 使用SpEL表达式，使得该bean，引用其他bean，类似于<ref>标签 -->
  	<property name="scard" value="#{school_card}"></property>
  	
  	<!-- 使用SpEL表达式，使得该bean，使用其他bean的属性 -->
  	<property name="xxx" value="#{school_card.id}"></property>
  	
  	<!-- 使用SpEL表达式，在bean中使用三目运算符 -->
  	<property name="xxx" value="#{school_card.id > 2 ? '5':'7'}"></property>
</bean>

```


## Spring的注解使用方式：

1. 组件扫描：
spring能够从classpath 下 自动扫描，检查，实例化具有特定注解的组件。

**特定注解：**
>@Component :基本注解，用于标识一个组件，该组件将被spring管理。
>@Respository :标识持久层组件。
>@Service: 标识服务层，业务层组件。
>@Controller ：标识表现层组件。

<font color="red">Spring 对于扫描的到的组件。spring 有默认的命名方法，一般是第一个字母小写，也可以在注解中通过value 属性来给组件命名。</font>

当在组件上加上注解时，还需在配置文件中添加扫描配置：
```xml
 
   <!-- 扫描指定包，及其子包的指定注解，@Repository @Autowired，@Service，@Controller
    ,....,对有注解标记的类或组件，自动注入（通过执行无参构造函数）到ioc 容器中-->
   
   <context:component-scan base-package="com.entity"/>
   <context:component-scan base-package="com.dao,com.Controller"/>
    	
    <!-- 可以通过 resource-pattern ，过滤，指定需要扫描的资源-->	
	<context:component-scan base-package="com.service"
		resource-pattern="**/*.class"
		
	/>


	<context:component-scan base-package="com.entity">
		
		<!-- context:include-filter 子节点，表示要包含的目标组件
			xxx 为注解的全类名
		-->
		<context:include-filter type="annotation" expression="xxx"/>
		
		 <context:exclude-filter type="annotation" expression="xxx"/>
			<!--context:exclude-filter 子节点，表示要排除在外的目标组件 
			xxx 为注解的全类名
			-->
	</context:component-scan> 
       

```
base-package ：指定需要扫描的基类包及其子包。**当需要扫描多个包时，用逗号隔开。**
resource-pattern ：过滤，指定需要扫描的资源 ,<font color="red">默认值是： **/*.class 表示为基类包的所有类。</font>



### 1.通过注解的方式配置Bean:

#### 1.配置过程：
> 1. @Component , 当spring的ioc 容器启动并扫描到该注解时，会自动把该类实例化（执行bean的无参构造函数），注入到ioc 容器中（相当于在applicationContext.xml 配置文件中用xml的方式配置bean）

> 2. @Component注解可以对所有的组件进行自动注入到ioc 容器中。
> 3. @Component是所有受Spring管理组件的通用形式；而@Repository、@Service和 @Controller则是@Component的细化，用来表示更具体的用例(例如，分别对应了持久化层、服务层和表现层)。
> 4. 也就是说，你能用@Component来注解你的组件类，
> 5. 但如果用@Repository、@Service 或@Controller来注解它们，
> 6. 你的类也许能更好地被工具处理，或与切面进行关联。 

#### 2.代码：
com.entity.User
```java

@Component(value="User")
public class User {
	
	private String name;
	public User(){
		System.out.println("this is user 无参构造函数");
	}
	
	public User(String name){
		this.name=name;
		System.out.println(" this is user 有参构造函数");
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public void sayHelloWorld(User us){
		System.out.println(us+"  say hello world");
	}
	
	@Override
	public String toString() {
		return "User [name=" + name + "]";
	}
	
	
}
```

com.Controller.UserController
```java

@Controller(value="UserController")
public class UserController {
	public void  add(){
		System.out.println(" UserController ");
	}
}

```

applicationContext.xml
```xml
<context:component-scan base-package="com.service"/>
<context:component-scan base-package="com.dao,com.Controller"/>
<context:component-scan base-package="com.entity"/>
```



test.java:
```java
ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");
			
User us = (User) app.getBean("User");
System.out.println(us);
			
UserController uscontroller=(UserController) app.getBean("UserController");
System.out.println(uscontroller);

```

运行结果：
this  is  Student 无参构造函数
this is user 无参构造函数
User [name=null]
com.Controller.UserController@3869f4


### 2.通过注解的方式装配Bean到另一个bean中:
参考链接：
[@Autowired注解、@Resource注解和@Service注解](https://www.cnblogs.com/szlbm/p/5512931.html)


1. @Autowired 注解 ：
&emsp;&emsp;该注解可以自动装配具有兼容类型的单个bean属性（构造器，字段，方法都可以使用该注解）到另一个bean中,前提是bean存在ioc容器中。

```java
@Controller(value="UserController")
public class UserController {
	/**
		
		把UserServiceImpl 这个bean，从ioc容器中取出，装配到 UserController这个bean中，供 UserController 这个bean使用。
		否则程序报错。相当于 UserController 这个bean 引用了 UserServiceImpl 这个bean

	**/
	@Autowired
	private UserServiceImpl usimpl;
	
	public void  add(){
		System.out.println(" UserController ");
		usimpl.addUser();
	}
}
```
<font color="red">把UserServiceImpl 这个bean，从ioc容器中取出，装配到 UserController这个bean中，供 UserController 这个bean使用。否则程序报错.</font>

<font color="blue">@Autowired,相当于 UserController 这个bean 引用了 UserServiceImpl 这个bean,同时省去了在 UserController 类中 get/set UserServiceImpl属性的方法</font>

applicationContext.xml
```xml
<bean id="UserImpl" class="com.service.UserServiceImpl"></bean>
	
<bean id="ucontroller" class="com.Controller.UserController" >   
    <property name="usimpl" ref="UserImpl" />
</bean>
```



## Spring的AOP(面向切面编程)：
&emsp;&emsp;AOP(Aspect-Oriented Programming), 即 面向切面编程, 它与 OOP( Object-Oriented Programming, 面向对象编程) 相辅相成, 提供了与 OOP 不同的抽象软件结构的视角.
&emsp;&emsp;在 OOP 中, 我们以类(class)作为我们的基本单元, 而 AOP 中的基本单元是 Aspect(切面)

```java
public int add(int i,int j){
	System.out.println(" this is  "+i+" + "+j);
	return i+j;
}

public int sub(int i,int j){
	System.out.println(" this is  "+i+" - "+j);
	return i-j;
}

public int mul(int i,int j){
	System.out.println(" this is  "+i+" * "+j);
	return i*j;
}

public int div(int i,int j){
	System.out.println(" this is  "+i+" / "+j);
	return i/j;
}
```

<font color="red">上面是对两个参数之加减乘除的方法，里面有对该方法的日志输出。试想一想，如果对这四个方法的日志输出都修改，一次修改需要改四个地方，N次修改就需要修改4n次，并且这四个方法的日志，都差不多，是否可以抽象出来。</font>
**AOP可以分离与业务无关的代码出来,使得方法保持纯洁。日志输入与方法的逻辑是无关的。**



### 1.Spring的AOP术语：

1. 切面（Aspect）：
&emsp;&emsp;一个关注点的模块化，这个关注点实现可能另外横切多个对象。事务管理是J2EE应用中一个很好的横切关注点例子。方面用Spring的 Advisor或拦截器实现。
 
2. 连接点（Joinpoint）:
&emsp;&emsp;程序执行过程中的任意一点，都可以是连接点。如方法的调用或特定的异常被抛出。
 
3. 切入点（Pointcut）: 
&emsp;&emsp;连接点的集合。切面与程序流程的交叉点。
 
4. 通知（Advice）: 
&emsp;&emsp;某个切入点被横切后，所采取的措施。<font color="red">也就是在切入点处拦截程序。通过通知来执行切面。</font>各种类型的通知包括“around”、“before”和“throws”通知。

5. 引入（Introduction）: 
&emsp;&emsp;对一个已经写好的类，在运行期间，动态的向这个类添加属性与方法。
 
6. 目标对象（Target Object）: 
&emsp;&emsp;包含连接点的对象。也被称作被通知或被代理对象。POJO
 
7. AOP代理（AOP Proxy）:
&emsp;&emsp; 向目标对象应用通知后创建的对象。  在Spring中，AOP代理可以是JDK动态代理或者CGLIB代理。
 
8. 织入（Weaving）: 
&emsp;&emsp;把切面功能引用到目标对象的过程。