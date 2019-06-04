[TOC]

# java 面试和笔试

## java core

>1. 多线程有几种实现方法,都是什么?同步有几种实现方法,都是什么? 

多线程有两种实现方法，分别是继承Thread类与实现Runnable接口，并且重写run()方法。
同步的实现方面有两种，分别是synchronized,wait与notify

> 1.5 启动一个线程是用run()还是start()?有什么区别？

启动一个线程是调用start()方法，这并不意味着线程就会立即运行，只是进入了可运行状态。
直接调用run()方法不会产生线程，而是把它当作普通的方法调用，马上执行。

>2. 垃圾回收器的基本原理是什么？垃圾回收器可以马上回收内存吗？有什么办法主动通知虚拟机进行垃圾回收?

对于GC来说，当程序员创建对象时，GC就开始监控这个对象的地址、大小以及使用情况。
通常，当GC确定一些对象为"不可用"时，GC就有责任回收这些内存空间。
程序员可以手动执行System.gc()，通知GC运行，但是Java语言规范并不保证GC一定会执行。

>3. Overload和Override的区别?

重写Overriding是父类与子类之间多态性的一种表现，重载Overloading是一个类中多态性的一种表现。
如果在子类中定义某方法与其父类有相同的名称和参数，我们说该方法被重写 (Overriding)。
如果在一个类中定义了多个同名的方法，它们或有不同的参数个数或有不同的参数类型，则称为方法的重载(Overloading)。


>4. Collection与Collections的区别？

Collection是集合类的上级接口，继承与他的接口主要有Set 和List.
Collections是针对集合类的一个帮助类，他提供一系列静态方法实现对各种集合的搜索、排序、线程安全化等操作。如：reverse(List list)；sort(List list, Comparator c)等。


>5. Java成员变量默认初始化的值。

byte-0   , short-0   ,  int-0    ,   long-0L
char-'\u0000' ,    float-0.0F ,   double-0.0D ,  boolean-false
所有引用类型   null

> 6. String 和StringBuilder,StringBuffer的区别？


String的内容是不可变的。因为String的底层是一个底层不可变的字符数组（final char[]）。
StringBuffer，StringBuilder的内容可变的。它们底层是可变的字符数组（char[]）。它们用append()方法来改变内容。

```java
String s="a"+"b";
StringBuilder sb=new StringBuilder();
sb.append("a").append("b");
```

==拼接字符串时，不能使用String来进行拼接。因为开销大.要用StringBuilder或StringBuffer==

StringBuilder是线程不安全，效率高的。因为其append方法没有线程同步锁
StringBuffer是线程安全，效率低的。其append方法有线程同步锁。

>7. final, finally, finalize的区别。

final 用于声明属性，方法和类，分别表示属性不可变,注意：如果是基本类型说明变量本身不能改变，如果是引用类型，说明它不能指向其他的对象了。但对象还是可以改变的。方法不可覆盖，类不可继承。
finally是异常处理语句结构的一部分，表示无论是否出现异常总是执行。
finalize是Object类的一个方法，在垃圾收集器执行的时候会调用被回收对象的此方法，可以覆盖此方法提供垃圾收集时的其他资源回收，例如关闭文件等。

>8. &和&&的区别。 

&是位运算符，表示按位与运算，&&是逻辑运算符，表示逻辑与（and）.
＆是非短路运算符，＆＆是短路运算符.

>9. String s = new String("xyz");创建了几个String Object? 

两个，一个是对象，一个是对象的引用。

>10. short s1 = 1; s1 = s1 + 1;有什么错? short s1 = 1; s1 += 1;有什么错? 

short s1 = 1; s1 = s1 + 1; 有错（s1+1运算结果是int型，需要强制转换类型）
short s1 = 1; s1 += 1;（没有错，s1==2）

>11. sleep() 和 wait() 有什么区别? 

sleep导致此线程暂停执行指定时间（休息），把执行机会给其他线程，但是监控状态依然保持，到时后会自动恢复，时间到了会继续运行。调用sleep的期间不会释放对象锁。
调用wait方法导致本线程放弃对象锁，进入等待此对象的等待锁定池，只有针对此对象发出notify方法（或notifyAll）后本线程才进入对象锁定池准备获得对象锁进入运行状态。

>12. 数组有没有length()这个方法? String有没有length()这个方法？

数组没有length()这个方法，有length的属性。String有length()这个方法。

>13. ”==”与equal有何区别？

== 用于判断两个基本数据类型的值，或者两个引用类型的内存地址。

equal比较的是内容本身。

>14. error和exception有什么区别?

error 表示恢复不是不可能但很困难的情况下的一种严重问题。比如说内存溢出。不可能指望程序能处理这样的情况。
exception 表示一种设计或实现问题。也就是说，它表示如果程序运行正常，从不会发生的情况。 

> 15. abstract class和interface有什么区别?

abstract class: 如果一个类中没有包含足够的信息来描绘一个具体的对象，这样的类就是抽象类。==把相同的东西提取出来,即重用。==

interface: ==把程序模块进行固化的契约,是为了降低偶合。==

>16. 是否可以继承String类?

答：String类是final类故不可以继承

> 17. Class.forName的作用?

调用该访问返回一个类名为指定字符串的类的对象。

>18.char型变量中能不能存贮一个中文汉字?为什么? 

是能够定义成为一个中文的，因为java中以unicode编码，一个char类型占2个字节（16比特），所以放一个中文是没问题的。

>19. 当一个线程进入一个对象的一个synchronized方法后，其它线程是否可进入此对象的其它方法? 

能，一个对象的synchronized方法只能由一个线程访问。但其他线程可以同时访问这个对象的非synchronized方法 

>20. 两个对象值相同(x.equals(y) == true)，但却可有不同的hash code，这句话对不对? 

不对，如果两个对象x和y满足x.equals(y) == true，它们的哈希码（hash code）应当相同。

>21. 当一个对象被当作参数传递到一个方法后，此方法可改变这个对象的属性，并可返回变化后的结果，那么这里到底是值传递还是引用传递? 

是值传递。Java 编程语言只有值传递参数。当一个对象实例作为一个参数被传递到方法中时，参数的值就是该对象的引用一个副本。

如果参数类型是原始类型，那么传过来的就是这个参数的一个副本，也就是这个原始参数的值，这个跟之前所谈的传值是一样的。如果在函数中改变了副本的值不会改变原始的值.

如果参数类型是引用类型，那么传过来的就是这个引用参数的副本，这个副本存放的是参数的地址。如果在函数中没有改变这个副本的地址，而是改变了地址中的 值，那么在函数内的改变会影响到传入的参数。如果在函数中改变了副本的地址，如new一个，那么副本就指向了一个新的地址，此时传入的参数还是指向原来的 地址，所以不会改变参数的值。

>22. switch 是否能作用在byte 上，是否能作用在long 上，是否能作用在String上？

在Java 5以前，switch(expr)中，expr只能是byte、short、char、int。从Java 5开始，Java中引入了枚举类型，expr也可以是enum类型，从Java 7开始，express还可以是字符串（String），但是长整型（long）在目前所有的版本中都是不可以的。

>23. 如何实现对象克隆？

有两种方式：
  1). 实现Cloneable接口并重写Object类中的clone()方法；若不实现该接口，执行clone()方法会报异常
  2). 实现Serializable接口，通过对象的序列化和反序列化实现克隆，可以实现真正的深度克隆

>24. 数据类型之间的转换：如何将字符串转换为基本数据类型？如何将基本数据类型转换为字符串？

基本数据类型对应的包装类中的方法parseXXX(String)或valueOf(String)即可返回相应基本类型；
一种方法是将基本数据类型与空字符串（""）连接（+）即可获得其所对应的字符串；另一种方法是调用String 类中的valueOf()方法返回相应字符串

>25. 列出一些你常见的运行时异常？

ArithmeticException（算术异常）
ClassCastException （类转换异常）
IllegalArgumentException （非法参数异常）
IndexOutOfBoundsException （下标越界异常）
NullPointerException （空指针异常）
SecurityException （安全异常）

>26. Java中如何实现序列化，有什么意义？

序列化就是一种用来处理对象流的机制，所谓对象流也就是将对象的内容进行流化。可以对流化后的对象进行读写操作，也可将流化后的对象传输于网络之间。序列化是为了解决对象流读写操作时可能引发的问题（如果不进行序列化可能会存在数据乱序的问题）。要实现序列化，需要让一个类实现Serializable接口，

>27. 面向对象的特征有那些方面？

四大基本特征：封装，抽象，继承，多态

封装：就是把对象封装成一个相对封闭的个体，对象的属性由对象的方法自己决定。
抽象：找出一类事物的相似点，并把这些相似点抽离出来。
继承：在原有的类的基础上，进行添加新的内容。
多态：父类引用指向子类对象。

>28. 为什么还要包装类型？

每个数据类型都有一一对应的包装类型。
Integer t=1; //自动装箱
int j=t;   //自动拆箱
由于java是一个面向对象的语言，而基本数据类型不具备对象的特性。因此，基本数据类型需要包装类型。

boolean-Boolean  
char-Character  
byte-Byte  
short-Short  
int-Integer  
long-Long  
float-Float  
double-Double。

>29. 是否可以继承String类?

String类是final类故不可以继承。

>30. 编程题: 用最有效率的方法算出2乘以8等於几? 

2 << 3

把十进制值2转成二进制数补码：00000010
把2的二进制位向左移动3位，高位左移后溢出（以左为高），舍弃不用，在右边补0：
把00000010向左移动三位，最左边三个0溢出——>00010，
然后再右边补三个0——>00010000
再将这个二进制码转成十进制数字就是16。

>31. 请说出你所知道的线程同步的方法。

wait():使一个线程处于等待状态，并且释放所持有的对象的lock。
sleep():使一个正在运行的线程处于睡眠状态，是一个静态方法。
notify():唤醒一个处于等待状态的线程，注意的是在调用此方法的时候，并不能确切的唤醒某一个等待状态的线程，而是由JVM确定唤醒哪个线程，而且不是按优先级。
Allnotity():唤醒所有处入等待状态的线程，注意并不是给所有唤醒线程一个对象的锁，而是让它们竞争。

>32. java中有几种类型的流？JDK为每种类型的流提供了一些抽象类以供继承，请说出他们分别是哪些类？

字节流，字符流。字节流继承于InputStream \ OutputStream，字符流继承于InputStreamReader \ OutputStreamWriter。在java.io包中还有许多其他的流，主要是为了提高性能和使用方便。

>33. 作用域public,private,protected,以及不写时的区别

作用域        当前类  同一package  子孙类       其他package
public            √              √                  √             √
protected        √              √                  √             ×
friendly          √              √                   ×            ×
private           √              ×                   ×            ×

>34. Math.round(11.5)等於多少? Math.round(-11.5)等於多少

答:  Math.round(11.5) = 12; Math.round(-11.5) = -11;round方法返回与参数最接近的长整数，参数加1/2后求其floor

>35. heap和stack有什么区别

答：栈是一种线形集合，其添加和删除元素的操作应在同一段完成。栈按照后进先出的方式进行处理。堆是栈的一个组成元素

>36. java中实现多态的机制是什么？

答：方法的重写Overriding和重载Overloading是Java多态性的不同表现。重写Overriding是父类与子类之间多态性的一种表现，重载Overloading是一个类中多态性的一种表现。

>37. 在JAVA中，如何跳出当前的多重嵌套循环？

答：用break; return 方法。

>38. 什么时候用assert。 

assertion(断言)在软件开发中是一种常用的调试方式，很多开发语言中都支持这种机制。在实现中，assertion就是在程序中的一条语句，它对一个boolean表达式进行检查，一个正确程序必须保证这个boolean表达式的值为true；如果该值为false，说明程序已经处于不正确的状态下，系统将给出警告或退出。一般来说，assertion用于保证程序最基本、关键的正确性。assertion检查通常在开发和测试时开启。为了提高性能，在软件发布后，assertion检查通常是关闭的。 

>39. Java有没有goto?

java中的保留字，现在没有在java中使用。

>40. 是否可以从一个static方法内部发出对非static方法的调用？

不可以,如果其中包含对象的method()；不能保证对象初始化.

>41. 写clone()方法时，通常都有一行代码，是什么？

Clone 有缺省行为，super.clone();他负责产生正确大小的空间，并逐位复制。

>42. 谈谈final, finally, finalize的区别。 

final 用于声明属性，方法和类，分别表示属性不可变，方法不可覆盖，类不可继承。
finally是异常处理语句结构的一部分，表示总是执行。
finalize是Object类的一个方法，在垃圾收集器执行的时候会调用被回收对象的此方法，可以覆盖此方法提供垃圾收集时的其他资源回收，例如关闭文件等。


## java web

>1. JSP和Servlet有哪些相同点和不同点，他们之间的联系是什么？

JSP本质上是Servlet的简易方式，所以的jsp都会翻译为一个继承servlet的类。
Servlet和JSP最主要的不同点在于，Servlet的应用逻辑是在Java文件中，并且完全从表示层中的HTML里分离开来。而JSP的情况是Java和HTML可以组合成一个扩展名为.jsp的文件。JSP侧重于视图，Servlet主要用于控制逻辑。

>2. 如何利用ServletContext和ServletConfig对象获得初始化参数

String psw = config.getInitParameter("psw");		
ServletContext ss = config.getServletContext();
String ppp = ss.getInitParameter("name");

>3. 描述forward 和redirect的区别

forward是服务器直接访问目标地址的URL，把那个URL的响应内容读取过来，然后把这些内容再发给浏览器，浏览器根本不知道服务器发送的内容是从哪儿来的，所以它的地址栏中还是原来的地址。

redirect就是服务端告诉浏览器重新去请求哪个地址，浏览器会重新进行请求，浏览器的地址栏会变成新的地址

若要跳转到一个其他服务器上的资源，要用sendRedirect()方法

>4. Servlet是什么？说出Servlet的生命周期?

servlet使用java编写的服务器端程序（要实现servlet接口），其主要用于生成动态web内容，并且servlet运行在服务器中。

当Servlet被服务器实例化后，容器运行其init方法，请求到达时运行其service方法，service方法自动派遣运行与请求对应的doXXX方法（doGet，doPost）等，当服务器决定将实例销毁的时候调用其destroy方法。

>5. get和post请求？什么情况下调用doget()和什么情况dopost?

get一般用于获取资源信息，post一般用于更新资源信息。
get请求提交的数据会在地址栏显示，post请求不会。
get请求传输的数据有限，因为地址栏有长度限制。
post请求的安全性高

当表单提交时method设置的 是 get 就调用 doget 方法，如果是 post 就调用 dopost方法。 http get方法请求一页面，调用doget() http post方法请求一页面，调用dopost()

>6. jsp内置对象？

9个内置对象：

request 用户端请求，此请求会包含来自GET/POST请求的参数。它包含了有关浏览器请求的信息，并且提供了几个用于获取cookie, header, 和session数据的有用的方法。 

response response表示HttpServletResponse对象，并提供了几个用于设置送回 浏览器的响应的方法（如cookies,头信息等） 

pageContext 用于方便存取各种范围的名字空间、servlet相关的对象的API，并且包装了通用的servlet相关功能的方法。 

session 与请求有关的会话期。Session可以存贮用户的状态信息 

application servlet 查找有关servlet引擎和servlet环境的信息 

out 提供了几个方法使你能用于向浏览器回送输出结果。

config 该对象用于存取servlet实例的初始化参数。 

page JSP网页本身,page表示从该页面产生的一个servlet实例 

exception 针对错误网页，未捕捉的例外 

>7. session 和 cookie的区别？

两个都是会话跟踪技术，cookie是在客户端记录用户信息，而session是在服务器端记录用户信息。session 是依赖于cookie 的

cookie存储的数据存放在浏览器上的。session是存储在服务器上的。
cookie是不安全的，并且保存数据不超过4k

>8. MVC是什么？

"Model" 代表的是应用的业务逻辑（通过JavaBean，EJB组件实现）
 "View" 是应用的表示面（由JSP页面产生），
"Controller" 是提供应用的处理过程控制（一般是一个Servlet）

mvc模式就是把视图和逻辑分开来。通过这种设计模型把应用逻辑，处理过程和显示逻辑分成不同的组件实现。这些组件可以进行交互和重用。

>9. JSP中动态include与静态include的区别？

动态include: `<jsp:include page="included.jsp" flush="true" />`它总是会检查所含文件中的变化，适合用于包含动态页面，并且可以带参数。
静态include: `<%@ include file="included.htm" %> ` 不会检查所含文件的变化，适用于包含静态页面

>10. tcp/ip在连接是有几次握手？释放是有几次握手？

答：建立连接是2次,释放是3次。

>11. Servlet的基本架构 

```java

public class ServletName extends HttpServlet { 
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws 
	ServletException, IOException { 
	} 
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws 
	ServletException, IOException { 
	} 
} 

```

>12. jsp有哪些动作?作用分别是什么? 

答:JSP共有以下6种基本动作 
jsp:include：在页面被请求的时候引入一个文件。 
jsp:useBean：寻找或者实例化一个JavaBean。 
jsp:setProperty：设置JavaBean的属性。 
jsp:getProperty：输出某个JavaBean的属性。 
jsp:forward：把请求转到一个新的页面。 
jsp:plugin：根据浏览器类型为Java插件生成OBJECT或EMBED标记 

>13. 如何现实servlet的单线程模式?

<%@ page isThreadSafe="false"%>

>14. Request对象的主要方法：

setAttribute(String name,Object)：设置名字为name的request的参数值
getAttribute(String name)：返回由name指定的属性值
getAttributeNames()：返回request对象所有属性的名字集合，结果是一个枚举的实例
getCookies()：返回客户端的所有Cookie对象，结果是一个Cookie数组
getCharacterEncoding()：返回请求中的字符编码方式
getContentLength()：返回请求的Body的长度
getHeader(String name)：获得HTTP协议定义的文件头信息
getHeaders(String name)：返回指定名字的request Header的所有值，结果是一个枚举的实例

>15. J2EE是技术还是平台还是框架？

J2EE本身是一个标准，一个为企业分布式应用的开发提供的标准平台。
J2EE也是一个框架，包括JDBC、JNDI、RMI、JMS、EJB、JTA等技术。

>16. 我们在web应用开发过程中经常遇到输出某种编码的字符，如iso8859-1等，如何输出一个某种编码的字符串？

```java
  Public String translate (String str) {
    String tempStr = "";
    try {
      tempStr = new String(str.getBytes("ISO-8859-1"), "GBK");
      tempStr = tempStr.trim();
    }
    catch (Exception e) {
      System.err.println(e.getMessage());
    }
    return tempStr;
  }
```

>17. Servlet执行时一般实现哪几个方法？

public void init(ServletConfig config)
public ServletConfig getServletConfig()
public String getServletInfo()
public void service(ServletRequest request,ServletResponse response)
public void destroy()

>18. 请对以下在J2EE中常用的名词进行解释(或简单描述)

web容器：给应用程序组件JSP，SERVLET 提供一个环境，使JSP,SERVLET直接更容器中的环境变量接口交互，不必关注其它系统问题。主要有WEB服务器来实现。例如：TOMCAT,WEBLOGIC,WEBSPHERE等。

EJB容器：Enterprise java bean 容器。更具有行业领域特色。他提供给运行在其中的组件EJB各种管理功能。只要满足J2EE规范的EJB放入该容器，马上就会被容器进行高效率的管理。并且可以通过现成的接口来获得系统级别的服务。例如邮件服务、事务管理。

>19. JAVA语言如何进行异常处理，关键字：throws,throw,try,catch,finally分别代表什么意义？在try块中可以抛出异常吗？

Java的异常处理是通过5个关键词来实现的：try、catch、throw、throws和finally。

用try来指定一块预防所有"异常"的程序。紧跟在try程序后面，应包含一个catch子句来指定你想要捕捉的"异常"的类型。
throw语句用来明确地抛出一个"异常"。
throws用来标明一个成员函数可能抛出的各种"异常"。
Finally为确保一段代码不管发生什么"异常"都被执行一段代码。



## jdbc

>0. 数据库分类？jdbc的理解？

分为关系型数据库，非关系型数据库。
关系型：mysql ，oralce,sqlserver
非关系型：redis,mongdb,hadoop等

jdbc即java数据库链接。java只需定义接口，让数据库厂商自己实现接口。因此我们只需要导入不不同厂商的接口实现。并调用java的接口就可以。

>1. 写一段Jdbc连接Oracle的程序,并实现数据查询。

创建一个连接数据库的工具类
```java

  import java.sql.*;
   public class DbUtil {
   public static Connection getConnection(){
	   String driver = "";
	   String url = "";
	   String name = "scot";
	   String psw = "123";
	   Connection conn = null;	   
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url,name,psw);
		} catch (ClassNotFoundException e) {			
			e.printStackTrace();
		} catch (SQLException e) {			
			e.printStackTrace();
		}		
		return conn;
   }
}
import java.sql.*;
public class SearchInfo {
   public void searchInfo(int id){
	   Connection conn = null;
	   PreparedStatement pstat = null;
	   ResultSet res = null;
	   String sql = "select * from users where id=?";
	   conn = DbUtil.getConnection();
	   try {
		pstat = conn.prepareStatement(sql);
		pstat.setInt(1, id);
		res = pstat.executeQuery();
		while(res.next()){
			String name = res.getString("name");
		}
	} catch (SQLException e) {		
		e.printStackTrace();
	}
   }
}

```

>2. Statement和PreparedStatement有什么区别？哪个性能更好？

与Statement相比，
①PreparedStatement接口代表预编译的语句，比Statement快
②PreparedStatement中的SQL语句是可以带参数的，避免了用字符串连接拼接SQL语句的麻烦和不安全；
③PreparedStatement可以防止sql注入攻击。

>3. 在进行数据库编程时，连接池有什么作用？

由于创建连接和释放连接都有很大的开销（每次建立连接都需要进行TCP的三次握手，释放连接需要进行TCP四次握手，造成的开销是不可忽视的），为了提升系统访问数据库的性能，可以事先创建若干连接置于连接池中，需要时直接从连接池获取，使用结束时归还连接池而不必关闭连接，从而避免频繁创建和释放连接所造成的开销.
池化技术在Java开发中是很常见的，在使用线程时创建线程池的道理与此相同。基于Java的开源数据库连接池主要有：C3P0、Proxool、DBCP、BoneCP、Druid等。

>4. JDBC中如何进行事务处理？

Connection提供了事务处理的方法，通过调用setAutoCommit(false)可以设置手动提交事务；当事务完成后用commit()显式提交事务；如果在事务处理过程中发生异常则通过rollback()进行事务回滚。除此之外，从JDBC 3.0中还引入了Savepoint（保存点）的概念，允许通过代码设置保存点并让事务回滚到指定的保存点。

>5. 事务是什么？

事务是用户的一系列操作，这些操作要么都做，要么都不做。

>6. mysql数据库的最大连接数？

100，有的服务器支持数据库进行同时链接。

>7. 




## 集合

>0. 讲解一下java中的集合？

java集合分为按值存储，和按键值对存储两种方式。

按值存储的根接口是Collection，其有set和list 两个子接口。
List是有序的，可重复的。
set是无序的，不可重复的。根据equals和hashcode方法来判断。即若一个对象要存储在set中，要重写这两个方法。

按键值对存储的接口是map

>1. 集合框架中的泛型有什么优点？

泛型可以为集合提供一个可以容纳的对象类型，因此，如果你添加其它类型的任何元素，它会在编译时报错。而不会在运行时出现ClassCastException。泛型也使我们不需要使用显式转换和instanceOf操作符。它也给运行时带来好处，因为不会产生类型检查的字节码指令。

>2. Java集合框架的基础接口有哪些？

Collection为集合的根接口。其有set和list 两个子接口。
Set是一个无序，不能包含重复元素的集合。
List是一个有序集合，可以包含重复元素。你可以通过它的索引来访问任何元素。List更像长度动态变换的数组。
Map也是一个根接口。主要是以键值对的方式存储数据。

>3. Iterator是什么？

Iterator接口提供遍历任何Collection的接口。我们可以从一个Collection中使用迭代器方法来获取迭代器实例。迭代器允许调用者在迭代过程中移除元素。

>4. Iterater和ListIterator之间有什么区别？

（1）可以使用Iterator来遍历Set和List集合，而ListIterator只能遍历List。
（2）Iterator只可以向前遍历，而LIstIterator可以双向遍历。
（3）ListIterator从Iterator接口继承，然后添加了一些额外的功能，比如添加一个元素、替换一个元素、获取前面或后面元素的索引位置。

>5. 遍历一个List集合有哪些不同的方式？

```java

List<String> strList = new ArrayList<>();

//使用for-each循环
for(String obj : strList){
  System.out.println(obj);
}

//using iterator
Iterator<String> it = strList.iterator();
while(it.hasNext()){
  String obj = it.next();
  System.out.println(obj);
}

```

>6. UnsupportedOperationException是什么？

UnsupportedOperationException是用于表明操作不支持的异常。在集合框架中的所有add和remove操作中抛出这个异常。

>7. HashMap是如何工作的？

HashMap在Map.Entry静态内部类实现中存储key-value对。HashMap使用哈希算法，在put和get方法中，它使用hashCode()和equals()方法。当我们通过传递key-value对调用put方法的时候，HashMap使用Key hashCode()和哈希算法来找出存储key-value对的索引。Entry存储在LinkedList中，所以如果存在entry，它使用equals()方法来检查传递的key是否已经存在，如果存在，它会覆盖value，如果不存在，它会创建一个新的entry然后保存。当我们通过传递key调用get方法时，它再次使用hashCode()来找到数组中的索引，然后使用equals()方法找出正确的Entry，然后返回它的值。

>8. hashCode()和equals()方法有何重要性？

在某种情况下，两个不同Key也许会产生相同的hashCode()和equals()输出，HashMap将会认为它们是相同的，然后覆盖它们，而非把它们存储到不同的地方。同样的，所有不允许存储重复数据的集合类都使用hashCode()和equals()去查找重复，所以正确实现它们非常重要。

equals()和hashCode()的实现应该遵循以下规则：
（1）如果o1.equals(o2)，那么o1.hashCode() == o2.hashCode()总是为true的。
（2）如果o1.hashCode() == o2.hashCode()，并不意味着o1.equals(o2)会为true。

>9. HashMap和HashTable有何不同？

HashMap和HashTable都是键值对的方式存储数据。

（1）HashMap允许key和value为null，而HashTable不允许。
（2）HashMap 是线程不安全的,HashMap的方法是Synchronize的，所以效率高，HashTable是线程安全的,Hashtable的方法是Synchronize的，效率低
（3）ConcurrentHashMap是线程安全，效率又高（其底层是把大的hashmap分成多个小的hashtable）

>10. 如何决定选用HashMap还是TreeMap？

对于在Map中插入、删除和定位元素这类操作，HashMap是最好的选择。然而，假如你需要对一个有序的key集合进行遍历，TreeMap是更好的选择。向HashMap中添加元素会更快，将map换为TreeMap进行有序key的遍历。

>11. ArrayList和Vector有何异同点？

ArrayList和Vector在很多时候都很类似。

（1）两者都是基于索引的，内部由一个数组支持。
（2）两者维护插入的顺序，我们可以根据插入顺序来获取元素。
（4）ArrayList和Vector两者允许null值，也可以使用索引值对元素进行随机访问。

以下是ArrayList和Vector的不同点。

（1）Vector是同步的，而ArrayList不是。然而，如果你寻求在迭代的时候对列表进行改变，你应该使用CopyOnWriteArrayList。
（2）ArrayList比Vector快，它因为有同步，不会过载。
（3）ArrayList更加通用，因为我们可以使用Collections工具类轻易地获取同步列表和只读列表。

>12. 24.Array和ArrayList有何区别？什么时候更适合用Array？

Array可以容纳基本类型和对象，而ArrayList只能容纳对象。
Array是指定大小的，而ArrayList大小是固定的。
Array没有提供ArrayList那么多功能，比如addAll、removeAll和iterator等。

>13. ArrayList和LinkedList有何区别？

ArrayList的底层是数组，LinkedList的底层是链表。
数组查询元素快，插入和删除慢（数组是一块连续的内存，因此插入和删除时需要移动内存）
链表的内存是不连续的，因此插入和删除快，查询慢。

ArrayList的使用场景：查询比较多，插入，删除比较少的情况
LinkedList的使用场景，插入，删除比较多，查询比较少的情况。

>14. Comparable和Comparator接口是什么？

Comparable和Comparator接口被用来对对象集合或者数组进行排序。Comparable接口被用来提供对象的自然排序，我们可以使用它来提供基于单个逻辑的排序。

Comparator接口被用来提供不同的排序算法，我们可以选择需要使用的Comparator来对给定的对象集合进行排序。


>15. Set里的元素能重复吗？那么用什么方法区分是否重复?

Set里的元素是不能重复的，如果重复就不加到里面。用iterator()方法来区分重复与否。equals()是判读两个Set是否相等。应该覆盖equals()判断两个Set是否相等。




## IO

>1. 拷贝一个文件是使用字节流还是字符流？

字节流，因为一个文件，可能包括字符，图片，声音等。




## java常用算法与编程题

>1. 冒泡排序:
   
```java  
   public class OrderbyArray {
	//写一个算法对1，8，5，2，4，9，7进行顺序排列。
    public int[] orderArray(int[] array){
    	for(int i=0;i<array.length;i++){
    		for(int j=i;j<array.length;j++){
    			if(array[i]>array[j]){
    				int s = array[i];
    				array[i] = array[j];
    				array[j] = s;
    			}
    		}
    	}
    	return array;
    }
	public static void main(String[] args) {
		int [] array = {1,8,5,2,4,9,7};
		OrderbyArray order = new OrderbyArray();
		array = order.orderArray(array);          
	}
}

```

>2. 折半查找

```java

// 使用循环实现的二分查找
   public static <T> int binarySearch(T[] x, T key, Comparator<T> comp) {
      int low = 0;
      int high = x.length - 1;
      while (low <= high) {
          int mid = (low + high) >>> 1;
          int cmp = comp.compare(x[mid], key);
          if (cmp < 0) {
            low= mid + 1;
          }
          else if (cmp > 0) {
            high= mid - 1;
          }
          else {
            return mid;
          }
      }
      return -1;
   }

```

>3. 写一个方法，实现字符串的反转，如：输入abc，输出cba

```java
public static String reverse(String s){
	int length=s.length();
	StringBuffer result=new StringBuffer(length);
	for(int i=length-1;i>=0;i--)
		result.append(s.charAt(i));
	
	return result.toString();
}

```

>4. 内部类的实现方式?

答：示例代码如下：
package test;
public class  OuterClass
{
 private class InterClass
 {
  public InterClass()
  {
   System.out.println("InterClass Create");
  }
 }
 public OuterClass()
 {
  InterClass ic = new InterClass();
  System.out.println("OuterClass Create");
 }
 public static void main(String[] args) 
 {
  OuterClass oc = new OuterClass();
 }
}

输出结果:
C:\>java test/OuterClass
InterClass Create
OuterClass Create



## 设计模式

>1. 单例模式

```java
public class LazySingleton {
	private static LazySingleton instance = null;

	// 默认的私有的构造方法,保证外界无法直接实例化
	private LazySingleton() {
	}

	// 静态方法,返回此类的唯一实例
	public  static LazySingleton getInstance() {
		if (instance == null) {
			instance = new LazySingleton();
		}
		return instance;
	}
}
```

>2. 什么是设计模式？常用设计模式？

许多程序员经过许多经验总结出的，可以反复使用，并且解决问题的设计方法。

常用设计模式有单例模式，工厂模式，包装模式，代理模式。
单例模式： 分为饱汉和饿汉模式
工厂模式：Spring的ioc容器就是使用了工厂模式
代理模式：Spring 的Aop就是使用的代理模式
包装模式：


## 前端

>1. 什么是ajax,作用是什么？

ajax:异步的js和xml。
作用是使用ajax可以与服务器进行数据交换，可以实现网页局部刷新。

>2. js和jquery的关系？

jq是封装了js的属性和方法，并且增强了js的功能。让用户使用方便。

>3. jq的ajax和原生的ajax有什么联系？

jq的ajax是在原生的基础上封装的。因为原生的使用麻烦，有大量的重复代码。

## 框架

>1. 什么是mvc模式？

先控制器接受用户的请求，然后控制器调用javabean完成业务操作，完成业务后通过跳转到jsp页面的方式给用户反馈。

>2. springmvc的执行流程：

用户发送请求，被dispatchservlet 拦截，进行解析。
根据解析的信息，找出合适的handler
handler开始进行业务操作，执行完业务操作，发送给dispatchservlet一个modelandView对象
dispatchservlet根据这个对象，选择视图解析器，来解析这个对象，并结合模型与视图进行渲染
最后，把渲染结果返回给用户。

>3. spring 的两大核心？

spring 主要是为了对javabean的生命周期进行管理的容器。

IOC或DI：

AOP：面向切面编程，使用动态代理的设计模式，在执行方法前后加入相关的逻辑操作。

>4. 什么是orm?

orm对象关系映射，是一种解决对象与数据库进行匹配的技术。


