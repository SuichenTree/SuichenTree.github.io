[toc]

# Java设计模式

Java、C#、C++等编程语言，Eclipse、Visual Studio等开发工具，JSP、ASP.net等开发技术，Struts、Hibernate、JBPM等框架技术，都可以认为是招式；而数据结构、算法、设计模式、重构、软件工程等则为内功。


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

---

# 2.简单工厂模式

简单工厂模式：定义一个工厂类，它可以根据参数的不同返回不同类的实例，被创建的实例通常都具有共同的父类。

![1](../img/JavaDesignPatterns_img/1.png)

>简单工厂模式的使用方法：
>①：编写一个产品类接口。
>②：编写多个继承产品类的具体产品类。
>③：编写工厂类，根据传入的参数不同，生产不同的产品。

```java

public interface Animal {
	public void say();
}

---

public class Cat implements Animal {
	@Override
	public void say() {
		System.out.println("喵喵");
	}
}

---

public class Dog implements Animal {
	@Override
	public void say() {
		System.out.println("旺旺");
	}
}

---

public class Factory {
	//创建工厂类，通过输入的参数不同，生产不同的类实例
	public static Animal getAnimal(String str) {
		Animal animal=null;
		if(str.equals("Cat")) {
			animal=new Cat();				//父类引用指向子类对象
		}else if(str.equals("Dog")) {
			animal=new Dog();
		}
		return animal;
	}
}

---

public class Test {
	public static void main(String[] args) {
		//根据传入的数据不同，创建不同的类实例
		Animal a=Factory.getAnimal("Cat");
		a.say();
		Animal b=Factory.getAnimal("Dog");
		b.say();
	}
}

```

# 3.工厂方法模式

简单工厂模式的缺点：==系统扩展不灵活，工厂类过于庞大==。当系统中需要引入新产品时，由于通过所传入参数的不同来创建不同的产品，这必定要修改工厂类的源代码，这违反了“开闭原则”。如何实现增加新产品而不影响已有代码？工厂方法模式应运而生。

<font color="red">工厂方法模式不再提供一个统一的工厂类来创建所有的产品对象，而是提供一个抽象工厂接口，由其实现类来具体实现不同的工厂方法。与简单工厂模式相比，最重要的区别是引入了抽象工厂，抽象工厂可以是接口，也可以是抽象类或者具体类，</font>

<font color="blue">工厂方法模式：有四个类，抽象工厂类，抽象工厂实现类，抽象产品类，抽象产品实现类。不再是由一个工厂类去实例化所有的具体产品，而是由不同的抽象工厂实现类去实例化不同的具体产品。</font>

![2](../img/JavaDesignPatterns_img/2.png)

```java
//抽象产品类
public interface Animal {
	public void say();
}
//抽象工厂类
public interface Factory {
	public Animal createAnimal();
}
//具体产品类
public class Cat implements Animal {
	@Override
	public void say() {
		System.out.println("喵喵");
	}
}
//具体产品类
public class Dog implements Animal {
	@Override
	public void say() {
		System.out.println("旺旺");
	}
}
//具体工厂类
public class CatFactory implements Factory{
	//实现抽象工厂类，生产某个具体的产品
	@Override
	public Animal createAnimal() {
		return new Cat();
	}
}
//具体产品类
public class DogFactory implements Factory{
	//实现抽象工厂类，生产某个具体的产品
	@Override
	public Animal createAnimal() {
		return new Dog();
	}
}
//test
public class Test {
	public static void main(String[] args) {
		//创建具体产品的工厂类
		Factory cf=new CatFactory();
		//通过该类创建某个具体的产品，并用父类引用指向子类对象
		Animal a=cf.createAnimal();
		a.say();
		
		Factory df=new DogFactory();
		Animal b=df.createAnimal();
		b.say();
	}
}
```

>总结：
> 1.优点：在系统中加入新产品时，无须修改抽象工厂和抽象产品提供的接口，无须修改其他的具体工厂和具体产品，而只要添加一个具体工厂和具体产品就可以了。系统的可扩展性也就变得非常好，完全符合“开闭原则”。
> 2.缺点：在添加新产品时，需要编写新的具体产品类，和与之对应的具体工厂类，系统中类的个数将成对增加。

---

# 4.抽象工厂模式