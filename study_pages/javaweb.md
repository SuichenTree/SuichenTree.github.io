[toc]
# javaweb

## 概述：
&emsp;&emsp;Java Web，是用Java技术来解决相关web互联网领域的技术总和。web包括：web服务器和web客户端两部分。Java在客户端的应用有java applet，不过使用得很少，Java在服务器端的应用非常的丰富，比如Servlet，JSP和第三方框架等等。Java技术对Web领域的发展注入了强大的动力。

&emsp;&emsp;Java的Web框架虽然各不相同，但基本也都是遵循特定的路数的：<font color="red">使用Servlet或者Filter拦截请求，使用MVC的思想设计架构，使用约定，XML或 Annotation实现配置，运用Java面向对象的特点，面向对象实现请求和响应的流程，</font>支持Jsp，Freemarker，Velocity等视图。

## jsp

### 1.概述：
&emsp;&emsp;JSP全名为Java Server Pages，中文名叫java服务器页面，其根本是一个简化的Servlet设计.<font color="blue">它是一种动态网页技术标准</font>。JSP技术有点类似ASP技术，<font color="red">它是在传统的网页HTML文件中插入Java程序段和JSP标记(tag)，从而形成JSP文件，后缀名为(*.jsp)。</font>
1. 它使用JSP标签在HTML网页中插入Java代码。标签通常以<%开头以%>结束。
2. JSP通过网页表单获取用户输入数据、访问数据库及其他数据源，然后动态地创建网页。
3. JSP标签有多种功能，比如访问数据库、记录用户选择信息、访问JavaBeans组件等，还可以在不同的网页中传递控制信息和共享信息。

### 2.jsp原理及使用：

#### 1.jsp容器：
&emsp;&emsp;网络服务器需要一个JSP引擎，也就是一个容器来处理JSP页面。容器负责截获对JSP页面的请求。

本教程使用<font color="red">内嵌JSP容器的Apache</font>来支持JSP开发。
JSP容器与Web服务器协同合作，为JSP的正常运行提供必要的运行环境和其他服务，并且能够正确识别专属于JSP网页的特殊元素。

下图显示了JSP容器和JSP文件在Web应用中所处的位置。

![图1](../img/javaweb_img/1.png)

#### 2.jsp的处理：
以下步骤表明了Web服务器是如何使用JSP来创建网页的：
1. 就像其他普通的网页一样，您的浏览器发送一个HTTP请求给服务器。
2. Web服务器识别出这是一个对JSP网页的请求，并且将该请求传递给内部的JSP引擎。通过使用URL或者.jsp文件来完成。
3. JSP引擎从磁盘中载入JSP文件，然后将它们<font color="red">转化为servlet。这种转化只是简单地将所有模板文本改用println()语句，并且将所有的JSP元素转化成Java代码。</font>
4. JSP引擎将servlet编译成可执行类，并且将原始请求传递给servlet引擎。
5. Web服务器的某组件将会调用servlet引擎，然后载入并执行servlet类。在执行过程中，servlet产生HTML格式的输出并将其内嵌于HTTP response中上交给Web服务器。
6. <font color="red">Web服务器以静态HTML网页的形式将HTTP response返回到您的浏览器中。</font>
7. 最终，Web浏览器处理HTTP response中动态产生的HTML网页，就好像在处理静态网页一样。

以上提及到的步骤可以用下图来表示：

![图2](../img/javaweb_img/2.png)


#### 3.jsp生命周期：
JSP生命周期就是从创建到销毁的整个过程，类似于servlet生命周期，区别在于JSP生命周期还包括将JSP文件编译成servlet。

以下是JSP生命周期中所走过的几个阶段：
1. 编译阶段：
servlet容器编译servlet源文件，生成servlet类
2. 初始化阶段：
加载与JSP对应的servlet类，创建其实例，并调用它的初始化方法
3. 执行阶段：
调用与JSP对应的servlet实例的服务方法
4. 销毁阶段：
调用与JSP对应的servlet实例的销毁方法，然后销毁servlet实例.

**JSP初始化：**

容器载入JSP文件后，它会在为请求提供任何服务前调用jspInit()方法。如果您需要执行自定义的JSP初始化任务，复写jspInit()方法就行了，就像下面这样：
```java
public void jspInit(){
  // 初始化代码
}
```
<font color="red">通常情况下您可以在jspInit()方法中初始化数据库连接、打开文件和查询数据表。</font>

**JSP销毁：**

JSP生命周期的销毁阶段描述了当一个JSP网页从容器中被移除时所发生的一切。
jspDestroy()方法在JSP中等价于servlet中的销毁方法。当您需要执行任何清理工作时复写jspDestroy()方法，比如释放数据库连接或者关闭文件夹等等。
jspDestroy()方法：
```java
public void jspDestroy()
{
   // 清理代码
}
```

#### 4.jsp的简单使用：

1. 安装Tomcat 服务器（jsp 引擎/jsp 容器）并配置：
详细过程自己百度。
<br/>
2. 把eclipse 与 tomcat 关联。
<br/>
3. 在eclipse中创建动态web 项目工程("File-->New-->Dynamic Web Project")，并选择运行环境为之前安装的tomcat 服务器 与 JDK。
<font color="red">注意:在下一步中勾选生成 web.xml 文件.</font>
详细过程自己百度。
<br/>
4. 工程目录(**使用的eclipse 的 氧气 版本,不同版本的工程目录可能有所差别**)：
![jsp_3.png](../img/javaweb_img/jsp_3.png)

上图中各个目录解析：
deployment descriptor：部署的描述。
lib：**自己需要的jar包可以放在里面，eclipse会自动加入到类路径。**
build：放入编译之后的文件。
WebContent:放进写入的jsp页面。


5. 在jsp页面写上html 标签
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h2>this is  h2 title</h2>
	<span style="color:red">this is red code</span>
</body>
</html>
```

6. 启动tomcat 服务器，在浏览器 输入网址：http://localhost:8080/ 项目工程名 / jsp页面名称.jsp 。
<br/>
7. 效果图：
![jsp_4.png](../img/javaweb_img/jsp_4.png)


### 3.jsp的基本语法：

#### 1.嵌入Java代码（脚本代码）：
在jsp页面可以嵌入Java的代码段来完成业务处理。
语法格式：
`<% 编写Java代码 %>`

1. 打印九九乘法表：
```jsp
<body>
  <%
  	for(int i=0;i<10;i++){
  		for(int j=0;j<=i;j++){
  			String s=j+" * "+i+" = "+i*j;
  			out.print(s+"    ");    //每个式子有空格
  		}
  		out.print("<br/>");
  	}
  
  %>
</body> 
```
结果：
0 * 0 = 0 
0 * 1 = 0 1 * 1 = 1 
0 * 2 = 0 1 * 2 = 2 2 * 2 = 4 
0 * 3 = 0 1 * 3 = 3 2 * 3 = 6 3 * 3 = 9 
0 * 4 = 0 1 * 4 = 4 2 * 4 = 8 3 * 4 = 12 4 * 4 = 16 
0 * 5 = 0 1 * 5 = 5 2 * 5 = 10 3 * 5 = 15 4 * 5 = 20 5 * 5 = 25 
0 * 6 = 0 1 * 6 = 6 2 * 6 = 12 3 * 6 = 18 4 * 6 = 24 5 * 6 = 30 6 * 6 = 36 
0 * 7 = 0 1 * 7 = 7 2 * 7 = 14 3 * 7 = 21 4 * 7 = 28 5 * 7 = 35 6 * 7 = 42 7 * 7 = 49 
0 * 8 = 0 1 * 8 = 8 2 * 8 = 16 3 * 8 = 24 4 * 8 = 32 5 * 8 = 40 6 * 8 = 48 7 * 8 = 56 8 * 8 = 64 
0 * 9 = 0 1 * 9 = 9 2 * 9 = 18 3 * 9 = 27 4 * 9 = 36 5 * 9 = 45 6 * 9 = 54 7 * 9 = 63 8 * 9 = 72 9 * 9 = 81 


2. 判断语句：
```
<%!int day = 3;%>
	
  <%
  if (day == 1 | day == 7) {
	%>
	
  <p>Today is weekend</p>
	
  <%
	} else {
	%>
	
  <p>Today is not weekend</p>
	
  <%
		}
	%>
```

3. switch…case块:
```jsp
<%  
switch(day) { 
case 0:    
  out.println("It\'s Sunday.");    
  break; 
case 1:    
  out.println("It\'s Monday.");    
  break; 
case 2:    
  out.println("It\'s Tuesday.");    
  break; 
case 3:    
  out.println("It\'s Wednesday.");    
  break; 
case 4:    
  out.println("It\'s Thursday.");    
  break; 
case 5:    
  out.println("It\'s Friday.");    
  break; 
default:    
  out.println("It's Saturday."); 
} 
%>
```


#### 2.jsp表达式：
&emsp;&emsp;表达式元素中可以包含任何符合Java语言规范的表达式，但是不能使用分号来结束表达式。
&emsp;&emsp;**表达式中的内容先被转化成String，然后插入到表达式出现的地方。**
<font color="red">由于表达式的值会被转化成String，所以您可以在一个文本行中使用表达式而不用去管它是否是HTML标签。</font>

JSP表达式的语法格式：
<%= 表达式 %>

例子：
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<p>   
  Today's date: <%= (new java.util.Date()).toLocaleString()%>
</p>
</body> 
</html>
```

运行后得到以下结果：
`Today's date: 2017-11-30 18:40:35`

#### 3.jsp注释：
JSP注释的语法格式：
```jsp
<%-- 这里可以填写 JSP 注释 --%>
```
<br/>

#### 4.jsp指令标签（注意：<%@ ~~ %>中@与%不能分离 ，属性值不能以';' 号结尾）：
JSP指令用来设置与整个JSP页面相关的属性。 
JSP指令语法格式：
```jsp
<%@ 指令名称 指令属性="value" %>
```

<font color="red">三种指令标签：</font>
<%@ page ... %>	: 定义页面的依赖属性，比如脚本语言、error页面、缓存需求等等
<%@ include ... %>	: 包含其他文件
<%@ taglib ... %>	: 引入标签库,jar包的定义，可以是自定义标签。

##### 1. page指令：

import 属性：	导入要使用的Java类.
` <%@ page import="java.util.*" %> `

contentType 属性 ：指定当前JSP页面的MIME类型和字符编码。
errorPage 属性：指定当JSP页面发生异常时需要转向的错误处理页面。
isErrorPage 属性：指定当前页面是否可以作为另一个JSP页面的错误处理页面.

language 属性：定义JSP页面所用的脚本语言，默认是Java。
session 属性：指定JSP页面是否使用session.
~ ~ ~

##### 2. Include指令
<font color="red">JSP可以通过include指令来包含其他文件。被包含的文件可以是JSP文件、HTML文件或文本文件.</font>包含的文件就好像是该JSP文件的一部分，会被同时编译执行。

Include指令的语法格式如下：
`<%@ include file="url" %>`


##### 3. Taglib指令
JSP API允许用户自定义标签，一个自定义标签库就是自定义标签的集合。
<font color="red">Taglib指令引入一个自定义标签集合的定义，包括库路径、自定义标签。</font>

Taglib指令的语法：
`<%@ taglib url="url" prefix="prefixOfTag" %>`
url属性确定标签库的位置，prefix属性指定被引用的标签库的使用前缀。

例子,引入 jstl 标签库：
`<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`


#### 5.jsp动作标签(更多信息，自行百度)：
JSP动作标签在请求处理阶段起作用。JSP动作标签是用XML语法写成的。

语法：
`<jsp:标签名 属性名="value" />`

**常用的动作标签如下：**

jsp:include	：在页面被请求的时候引入一个文件。
jsp:useBean	：寻找或者实例化一个JavaBean。
jsp:setProperty	：设置JavaBean的属性。
jsp:getProperty	：输出某个JavaBean的属性。
jsp:forward	：把请求转到一个新的页面。

<font color="red">所有的动作要素都有两个属性：id属性和scope属性。</font>
①：id属性：
id属性是动作元素的唯一标识，可以在JSP页面中引用。动作元素创建的id值可以通过PageContext来调用。
②：scope属性：
该属性用于识别动作元素的生命周期。 id属性和scope属性有直接关系，scope属性定义了相关联id对象的寿命。 scope属性有四个可能的值： (1) page, (2)request, (3)session, 和 (4) application。


##### 1. &lt; jsp:include &gt;动作标签：
该动作标签用来包含静态和动态的文件。把指定文件插入正在生成的页面。语法格式如下：
`<jsp:include page="URL" flush="true" />`

main.jsp：
```jsp
<%-- flush	布尔属性，定义在包含目标资源前是否刷新缓存区。 --%>
<jsp:include page="date.jsp" flush="true" /> 
```

##### 2. &lt; jsp:useBean &gt;动作元素
用来装载一个将在JSP页面中使用的JavaBean。
这个功能非常有用，因为它使得我们既可以发挥Java组件重用的优势，同时也避免了损失JSP区别于Servlet的方便性。
jsp:useBean动作最简单的语法为：
```jsp
<%-- class	指定Bean的完整包名。 --%>
<jsp:useBean id="name" class="package.class" />

```

<font color="red">在类载入后，我们既可以通过 jsp:setProperty 和 jsp:getProperty 动作标签来修改和检索bean的属性。</font>


##### 3.  jsp:setProperty,  jsp:getProperty动作标签:
jsp:getProperty动作提取指定Bean属性的值，转换成字符串，然后输出。
jsp:setProperty用来设置已经实例化的Bean对象的属性.


例子如下：
```jsp
<%--  name	要检索的Bean属性名称。Bean必须已定义。。
      property	表示要提取Bean属性的值.
      class	指定Bean的完整包名。
 --%>

<jsp:useBean id="test" class="action.TestBean" />
 
<jsp:setProperty name="test" property="message"  value="Hello JSP..." />
 
<jsp:getProperty name="test" property="message" />
```

运行结果：
```
Hello JSP...
```

##### 4.&lt; jsp:forward &gt;动作元素
jsp:forward动作把请求转到另外的页面。jsp:forward标记只有一个属性page。
语法格式如下所示：
`<jsp:forward page="URL" />`


##### 5.&lt; jsp:param &gt;动作标签
用于其他标签的子标签，为其他标签传递参数。
```jsp
<%--
  name : 指定参数名称 。
  这段代码：在转发请求到addUser.jsp 页面的同时，传递参数 useName
--%>
<jsp:forward page="addUser.jsp">
  <jsp:param name="userName" value="xiaoming">
</jsp:forward>

```


#### 6.jsp九大内置对象：
内置对象：是JSP容器为每个页面提供的Java对象，开发者可以直接使用它们而不用显式声明。

##### 1.request对象
request对象是javax.servlet.http.HttpServletRequest 类的实例。
每当客户端请求一个JSP页面时，JSP容器就会制造一个新的request对象来代表这个请求。
request对象提供了一系列方法来获取HTTP头信息，cookies，HTTP方法等等。

1. 获取请求参数：
&emsp;&emsp;在一次请求中，可以在URL上通过使用' ? ' 的方式来传递参数。后通过request 对象的getParameter() 方法获取参数的值。

```html
<a href="a.jsp?id=1">点击</a>
```
a.jsp :
```jsp
<%
String id=request.getParameter("id");
%>
<%-- 返回此request中id指定的参数的参数值，若不存在则返回null --%>
```


2. 获取form 表单的信息：
<font color="red">form表单的复选框，下拉列表框中被选定的值，要使用 request 对象的getParameterValues() 方法获取被选中参数的值。</font>其他表单组件可以用getParameter() 方法获取参数的值。
```html
<body>
<form action="main.jsp" method="POST" target="_blank">
<!--
  爱好复选框 
-->
<div>
<input type="checkbox" name="like" value="Maths"/> Maths
<input type="checkbox" name="like" value="Physics"/> Physics
<input type="checkbox" name="like" value="Chemistry"/> Chemistry
</div>

<input type="submit" value="提交" />

</form>
</body>

```

```jsp
<!--
  获取多个复选框的值。

-->
String[] like=request.getParameterValues("like");

```

3. 获取请求客户端的信息（自行百度）
<br/>
4. 在作用域中管理属性：
通过使用 <font color="red">setAttribute() </font>方法可以在 request 对象的属性列表中添加一个属性，然后在request 对象中的作用域中使用它。用 <font color="red">getAttribute() </font>方法将属性取出。用 <font color="red">removeAttribute() </font>方法把属性删除。

```jsp
<body>
<%
  request.setAttribute("time",new Date());  //在request对象中添加一个属性 time，属性值为当前系统时间。

%>

获取time 的属性值：<%=request.getAttribute("time") %>
<!--删除属性 time -->
<%
request.removeAttribute("time");
%>
再次获取time 的属性值：<%=request.getAttribute("time") %>
</body>
```

<font color="red">注意：设置的属性超出request作用域就失效。</font>


##### 2.response对象
&emsp;&emsp;response对象javax.servlet.http.HttpServletResponse类的实例。当服务器创建request对象时会同时创建用于响应这个客户端的response对象。<font color="red">主要把jsp容器处理过的对象传回到客户端中。</font>
&emsp;&emsp;response对象也定义了处理HTTP头模块的接口。通过这个对象，开发者们可以<font color="red">添加新的cookies，时间戳，HTTP状态码</font>等等。


1. 重定向网页：
通过使用该对象的 sendRedirect() 方法，把相应发送到另一个指定的位置进行处理。<font color="red">重定向可以把地址重新定向到不同的主机上，用户可以从浏览器上看到跳转后的地址。并且在重定向操作后，request 中的属性失效，并且进入一个新的request 对象。</font>

`response.sendRedirect("http://www.baidu.com");`


2. 处理HTTP文件头：
setHeader() 方法同过两个参数————头名称 和 参数值 来设置HTTP 文件头。
```jsp
<%

response.setHeader("refresh","5");  //设置网页每5秒刷新一次
response.setHeader("refresh","2;URL=aa.jsp");
//设置2秒后，自动跳转到 aa.jsp页面。

%>

```


3. 设置页面响应类型：
`response.setContentType("text/html");`


##### 3.session对象

&emsp;&emsp;session对象用来跟踪在各个客户端请求间的会话。服务器为每个用户都生成一个 session 对象，用于保存该用户的的信息。
<font color="red">session 对象内部使用Map类来保存数据，数据格式为“ key / value”</font>.

1. 创建及获取session 信息：
setAttribute(String key,Object obj)方法：用于把信息保存到session 范围中。
getAttribute(String key)方法，用于获取session范围的信息。

```jsp
<%
String s="i am session";
session.setAttribute("ms",s);

out.println(session.getAttribute("ms"));
%>
```

<font color="red">注意：session在服务器的默认存储时间为30 分钟。超过30分钟，session 存储的信息失效，此时调用getAttribute（） 方法，会产生异常。 </font>

`session.setMaxInactiveInterval(10000);`
可以通过手动设置session的有效时间。



2. 移除session中的对象，销毁session对象。

removeAttribute(String key) 方法 ： 移除存储在session的对象。

`session.removeAttribute("ms");`

invalidate()方法，删除session 对象。

`session.invalidate(); `   
<font color="red">若session对象 销毁后，在调用session，则产生异常。</font>



##### 4.application对象
&emsp;&emsp;application对象的信息保存在服务器中，知道服务器关闭，否则 application对象保存的信息都有效。与session 对象相比 application 对象生命期更长，相当于系统的 “全局变量”。