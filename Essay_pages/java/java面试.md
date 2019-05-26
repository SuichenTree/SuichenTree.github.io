[TOC]

# java 面试和笔试

## java core

>1. 多线程有几种实现方法,都是什么?同步有几种实现方法,都是什么? 

多线程有两种实现方法，分别是继承Thread类与实现Runnable接口，并且重写run()方法。
同步的实现方面有两种，分别是synchronized,wait与notify

>启动一个线程是用run()还是start()?有什么区别？

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

Collection是一个接口，但 Collections却是一个辅助类，里面有很多静态的工具方法。而且很有用的。如：reverse(List list)；sort(List list, Comparator c)等。Collections没有实现任何接口。它直接继承了Object。

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

sleep导致此线程暂停执行指定时间（休息），把执行机会给其他线程，但是监控状态依然保持，到时后会自动恢复，时间到了会继续运行。调用sleep不会释放对象锁。
调用wait方法导致本线程放弃对象锁，进入等待此对象的等待锁定池，只有针对此对象发出notify方法（或notifyAll）后本线程才进入对象锁定池准备获得对象锁进入运行状态。

>12. 数组有没有length()这个方法? String有没有length()这个方法？

数组没有length()这个方法，有length的属性。

>13. ”==”与equal有何区别？

== 用于判断两个基本数据类型的值，或者两个引用类型的内存地址。

equal比较的是内容本身。

>14. error和exception有什么区别?

Error表示系统级的错误和程序不必处理的异常，我们无法处理它。 
Exception表示是可以捕捉或者需要程序进行处理的异常。 

> 15. abstract class和interface有什么区别?

一个只能继承一个抽象类，但却可以实现多个接口。抽象类中可以有也可以没有抽象方法。并且可以定义和常规类一样的变量和方法。而接口中所有的方法都是抽象的，所有的变量都是静态不可修改的。

> 17. Class.forName的作用?

调用该访问返回一个类名为指定字符串的类的对象。

>18.char型变量中能不能存贮一个中文汉字?为什么? 

是能够定义成为一个中文的，因为java中以unicode编码，一个char类型占2个字节（16比特），所以放一个中文是没问题的。

>19. 当一个线程进入一个对象的一个synchronized方法后，其它线程是否可进入此对象的其它方法? 

能，一个对象的synchronized方法只能由一个线程访问。但其他线程可以同时访问这个对象的非synchronized方法 

>20. 两个对象值相同(x.equals(y) == true)，但却可有不同的hash code，这句话对不对? 

不对，如果两个对象x和y满足x.equals(y) == true，它们的哈希码（hash code）应当相同。

>21. 当一个对象被当作参数传递到一个方法后，此方法可改变这个对象的属性，并可返回变化后的结果，那么这里到底是值传递还是引用传递? 

是值传递。==Java 编程语言只由值传递参数==。当一个对象实例作为一个参数被传递到方法
中时，参数的值就是对该对象的引用。对象的内容可以在被调用的方法中改变，但对象的引用
是永远不会改变的。 

>22. switch 是否能作用在byte 上，是否能作用在long 上，是否能作用在String上？

在Java 5以前，switch(expr)中，expr只能是byte、short、char、int。从Java 5开始，Java中引入了枚举类型，expr也可以是enum类型，从Java 7开始，expr还可以是字符串（String），但是长整型（long）在目前所有的版本中都是不可以的。

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

>29. 


## java web

>1. JSP和Servlet有哪些相同点和不同点，他们之间的联系是什么？

JSP本质上是Servlet的简易方式，所以的jsp都会翻译为一个继承servlet的类。
Servlet和JSP最主要的不同点在于，Servlet的应用逻辑是在Java文件中，并且完全从表示层中的HTML里分离开来。而JSP的情况是Java和HTML可以组合成一个扩展名为.jsp的文件。JSP侧重于视图，Servlet主要用于控制逻辑。

>2. 如何利用ServletContext和ServletConfig对象获得初始化参数

String psw = config.getInitParameter("psw");		
ServletContext ss = config.getServletContext();
String ppp = ss.getInitParameter("name");

>3. 描述forward 和redirect的区别

forward是服务器直接访问目标地址的URL，然后把结果发给浏览器，浏览器根本不知道服务器发送的内容是从哪儿来的，所以它的地址栏中还是原来的地址。

redirect就是服务端告诉浏览器重新去请求哪个地址，浏览器会重新进行请求，浏览器的地址栏会变成新的地址

若要跳转到一个其他服务器上的资源，要用sendRedirect()方法

>4. Servlet是什么？说出Servlet的生命周期?

servlet使用java编写的服务器端程序（要实现servlet接口），其主要用于生成动态web内容，并且servlet运行在服务器中。

当Servlet被服务器实例化后，容器运行其init方法，请求到达时运行其service方法，service方法自动派遣运行与请求对应的doXXX方法（doGet，doPost）等，当服务器决定将实例销毁的时候调用其destroy方法。

>5. get和post请求？

get一般用于获取资源信息，post一般用于更新资源信息。
get请求提交的数据会在地址栏显示，post请求不会。
get请求传输的数据有限，因为地址栏有长度限制。
post请求的安全性高

>6. jsp内置对象？

9个内置对象：
request：请求对象，包含get,post请求
response:响应对象，包含服务器对用户的相应信息
pageContext:网页内容对象
session:与请求有关的会话对象
....

>7. session 和 cookie的区别？

两个都是会话跟踪技术，cookie是在客户端记录用户信息，而session是在服务器端记录用户信息。session 是依赖于cookie 的

cookie存储的数据存放在浏览器上的。session是存储在服务器上的。
cookie是不安全的，并且保存数据不超过4k

>8. MVC是什么？

Model:模型，javabean
view:视图，jsp,html,freemaker
Control:控制，servlet ,action

mvc模式就是把视图和逻辑分开来。


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
（2）HashMap 是线程不安全的，所以效率高，HashTable是线程安全的，效率低
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

Set里的元素是不能重复的，如果重复就不加到里面。用iterator()方法来区分重复与否。应该覆盖equals()判断两个Set是否相等。


## IO

>1. 拷贝一个文件是使用字节流还是字符流？

字节流，因为一个文件，可能包括字符，图片，声音等。




## java常用算法

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


