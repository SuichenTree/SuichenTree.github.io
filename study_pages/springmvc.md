# SpringMVC
## 概述：
&emsp;&emsp;Spring MVC属于SpringFrameWork的后续产品，已经融合在Spring Web Flow里面。Spring 框架提供了构建 Web 应用程序的全功能 MVC 模块。使用 Spring 可插入的 MVC 架构，从而在使用Spring进行WEB开发时，可以选择使用Spring的SpringMVC框架或集成其他MVC开发框架，如Struts1，Struts2等。

&emsp;&emsp;Spring的模型-视图-控制器（MVC）框架是围绕一个<font color="red"> DispatcherServlet </font>来设计的，<font color="blue">这个Servlet会把你做出的各个请求按照你事先定好的规则分发给各个处理器，</font>并支持可配置的处理器映射、视图渲染、本地化、时区与主题渲染等，甚至还能支持文件上传。**处理器是你的应用中注解了@Controller和@RequestMapping的类和方法**，Spring为处理器方法提供了极其多样灵活的配置。

##  DispatcherServlet:
&emsp;&emsp;Spring MVC框架，与其他很多web的MVC框架一样：请求驱动；<font color="red">所有设计都围绕着一个中央Servlet来展开，它负责把所有请求分发到控制器；</font>同时提供其他web应用开发所需要的功能。不过Spring的中央处理器，DispatcherServlet，能做的比这更多。**它与Spring IoC容器做到了无缝集成，这意味着，Spring提供的任何特性，在Spring MVC中你都可以使用。**

&emsp;&emsp;下图展示了Spring Web MVC的DispatcherServlet处理请求的工作流。DispatcherServlet应用的其实就是一个“前端控制器”的设计模式（其他很多优秀的web框架也都使用了这个设计模式）。

![流程图](../img/springmvc_img/1.png)