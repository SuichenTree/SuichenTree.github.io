[toc]

# Java设计模式

设计模式的一般定义如下：==设计模式是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。==

使用设计模式的目的：==使用设计模式是为了可重用代码、让代码更容易被他人理解并且保证代码可靠性。==

>学习设计模式的好处？
>让你知道，如何将代码分散在几个不同的类中？为什么要有“接口”？什么是对抽象编程？何时不应该使用继承？如果不修改源代码增加新功能？同时还让你能够更好地阅读和理解现有类库（如JDK）与其他系统中的源代码。


# 1. 单例模式

为了节约系统资源，有时系统中某个类只有唯一一个实例。当这个唯一实例创建成功之后，我们无法再创建一个同类型的其他对象，所有的操作都只能基于这个唯一实例。为了确保对象的唯一性，我们可以通过单例模式来实现。

>用单例模式实现某个类（单例类）：
>①：禁止类的外部直接使用new来创建对象，因此需要将类的构造函数的可见性改为private。
>②：在类的内部，创建唯一的类的实例对象。
>③：在类的内部编写方法，让外界能够访问这个唯一的类的实例对象。

==总结：1. 私有构造函数；2.私有静态类变量；3.公有静态成员方法，返回唯一实例。==

==设置static 可以保证直接通过类名调用变量和方法，而不需要通过创建对象来调用。==

```java

public class Singleton {
	private static Singleton singleton=null;   	//单例类的唯一的实例对象
	private Singleton() {} 						//禁止使用new创建实例对象
	
	//第一次调用getSingleton()方法时将创建唯一实例，再次调用时将返回第一次创建的实例，从而确保实例对象的唯一性。
	public static Singleton getSingleton() {
		if(singleton==null) {
			singleton = new Singleton();    	
		}
		return singleton;
	}
}

```

## 1.饿汉式写法：

```java

public class Singleton {  
    private static Singleton instance = new Singleton();  
    private Singleton (){}  
    public static Singleton getSingleton() {  
    return instance;  
    }  
}

```

当类被加载时，静态变量instance会被初始化，此时类的私有构造函数会被调用，单例类的唯一实例将被创建。


## 2.懒汉式写法（线程安全）：

懒汉式写法就是普通写法的方法上加上synchronized进行线程锁。

```java

public class Singleton {  
    private static Singleton instance=null;  
    private Singleton (){}  
    public static synchronized Singleton getSingleton() {  
        if (instance == null) {  
            instance = new Singleton();  
        }  
        return instance;  
    }  
}

```

## 3.静态内部类写法：

==饿汉式写法不管将来用不用始终占据内存；懒汉式写法线程安全控制烦琐，而且性能受影响。因此出现饿汉式写法与懒汉式写法合一的写法---静态内部类写法。==

在单例类中增加一个静态内部类，在该内部类中创建单例对象，并通过方法返回给外部使用。

```java

public class Singleton {  
    //静态内部类
    private static class SingletonHolder {  
        private static final Singleton instance = new Singleton();  
    }  
    private Singleton (){}  
    //方法中调用内部类
    public static final Singleton getInstance() {  
        return SingletonHolder.instance;  
    }  
}

```