[toc]
# JavaScript

## 概述：
JavaScript是世界上最流行的脚本语言，因为你在电脑、手机、平板上浏览的所有的网页，以及无数基于HTML5的手机App，交互逻辑都是由JavaScript驱动的。<font color="red">简单地说，JavaScript是一种运行在浏览器中的解释型的编程语言。</font>

## 基础：

### 1.js代码的编写方式(两种)：
==JavaScript代码可以直接嵌在网页的任何地方.==

1. 通常我们都把JavaScript代码放到`<head>`中：
```html
<html>
<head>
  <script>
    alert('Hello, world');
  </script>
</head>
<body>
  ...
</body>
</html>
```

![2.png](../img/js_img/2.png)

```html
<script type="text/javascript">   //默认的type就是JavaScript，所以不必显式地把type指定为JavaScript。
  ...
</script>
```

由`<script>...</script>`包含的代码就是JavaScript代码，它将直接被浏览器执行。

2. 是把JavaScript代码放到一个单独的.js文件，然后在HTML中通过<script src="..."></script>引入这个文件：

```html
<html>
<head>
  <script src="/static/js/abc.js"></script>
</head>
<body>
  ...
</body>
</html>
```

![1.png](../img/js_img/1.png)

把JavaScript代码放入一个单独的.js文件中更利于维护代码，并且多个页面可以各自引用同一份.js文件。


3. 补充：
![3.png](../img/js_img/3.png)

**注意**: javascript作为一种脚本语言可以放在html页面中任何位置，但是==浏览器解释html时是按先后顺序的，所以前面的script就先被执行。比如进行页面显示初始化的js必须放在head里面，因为初始化都要求提前进行（如给页面body设置css等）；而如果是通过事件调用执行的function那么对位置没什么要求的==。


### 2.基本语法：

#### 1. 赋值语句：
`var x = 1;`

<font color="red">每个语句用;表示语句结束：</font>

`var x = 1; var y = 2; // 不建议一行写多个语句!`




#### 2. 注释(单行注释，多行注释)
以`//`开头直到行末的字符被视为行注释，注释是给开发人员看到，JavaScript引擎会自动忽略：

```js
// 这是单行注释
alert('hello'); // 这也是单行注释

/* 从这里开始是多行注释
仍然是注释
仍然是注释
注释结束 */
```

#### 3. 数据类型

①：Number
<font color="red">JavaScript不区分整数和浮点数，统一用Number表示。</font>

以下都是合法：
```js
123; // 整数123
0.456; // 浮点数0.456
1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
-99; // 负数
NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity

//四则运算：

1 + 2;              // 3
(1 + 2) * 5 / 2;    // 7.5
2 / 0;              // Infinity
0 / 0;              // NaN
10 % 3;             // 1 ，% 是求余运算
10.5 % 3;           // 1.5

true; // 这是一个true值
false; // 这是一个false值
2 > 1; // 这是一个true值
2 >= 3; // 这是一个false值
7 == 7; // true

/* &&运算是与运算，只有所有都为true，&&运算结果才是true */
true && true; // 这个&&语句计算结果为true
true && false; // 这个&&语句计算结果为false
false && true && false; // 这个&&语句计算结果为false

/* ||运算是或运算，只要其中有一个为true，||运算结果就是true  */
false || false; // 这个||语句计算结果为false
true || false; // 这个||语句计算结果为true
false || true || false; // 这个||语句计算结果为true

/* !运算是非运算，它是一个单目运算符，把true变成false，false变成true */
! true; // 结果为false
! false; // 结果为true
! (2 > 5); // 结果为true


false == 0; // true
false === 0; // false

```
<font color="red">注意：</font>
1. JavaScript在设计时，有两种比较运算符：
> 第一种是`==`比较，==它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果==.
> 第二种是`===`比较，==它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。==
> 由于JavaScript这个设计缺陷，不要使用`==`比较，始终坚持使用`===`比较。 


2. NaN这个特殊的Number与所有其他值都不相等，包括它自己：
`NaN === NaN; // false`
唯一能判断NaN的方法是通过isNaN()函数：
`isNaN(NaN); // true`

<br/>

3. null和undefined
> null表示一个“空”的值，它和0以及空字符串''不同，0是一个数值，''表示长度为0的字符串，而null表示“空”。

> undefined，它表示“未定义”。undefined仅仅在判断函数参数是否传递的情况下有用



#### 4.字符串：

①：要把多个字符串连接起来，可以用+号连接：
ES6新增了一种方法`${变量}`。它会自动替换字符串中的变量

```js
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
//var message = '你好, ' + name + ', 你今年' + age + '岁了!';
alert(message);
```

②：操作字符串：
1. 获取字符串长度：
```js
var s = 'Hello, world!';
s.length; // 13
```

2. 要获取字符串某个指定位置的字符，使用类似Array的下标操作，索引号从0开始：

```js
var s = 'Hello, world!';

s[0]; // 'H'
s[6]; // ' '
s[7]; // 'w'
s[12]; // '!'
s[13]; // undefined 超出范围的索引不会报错，但一律返回undefined
```

<font color="red">注意：字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果：</font>


3. toUpperCase()把一个字符串全部变为大写：

```js
var s = 'Hello';
s.toUpperCase(); // 返回'HELLO'

```

4. toLowerCase()把一个字符串全部变为小写：
```js
var s = 'Hello';
var lower = s.toLowerCase(); // 返回'hello'并赋值给变量lower
lower; // 'hello'
```

5. indexOf()会搜索指定字符串出现的位置：
```js
var s = 'hello, world';
s.indexOf('world'); // 返回7
s.indexOf('World'); // 没有找到指定的子串，返回-1
```

6. substring()返回指定索引区间的子串：
```js
var s = 'hello, world'
s.substring(0, 5); // 从索引0开始到5（不包括5），返回'hello'
s.substring(7); // 从索引7开始到结束，返回'world'
```

#### 4.5 常量：
ES6标准引入了新的关键字const来定义常量：
```js
//通常用全部大写的变量来表示“这是一个常量，不要修改它的值”
const PI = 3.14;
PI = 3; // 某些浏览器不报错，但是无效果！
PI; // 3.14

```

#### 5. 变量：
定义变量使用关键字var,语法如下：
`var 变量名      //声明变量的关键字：var`

```js
var a; // 申明了变量a，此时a的值为undefined
var $b = 1; // 申明了变量$b，同时给$b赋值，此时$b的值为1
var s_007 = '007'; // s_007是一个字符串
var Answer = true; // Answer是一个布尔值true
var t = null; // t的值是null
```

> ①：变量不仅可以是数字，还可以是任意数据类型。
> ②：变量名是大小写英文、数字、$和_的组合，且不能用数字开头。<font color="red">变量名也不能是JavaScript的关键字，如if、while等.</font>
> ③:==在JS中区分大小写，如变量mychar与myChar是不一样的，表示是两个变量。==
> ④：变量虽然也可以不声明，直接使用，但不规范，需要先声明，后使用。

![4.png](../img/js_img/4.png)


#### 6. if语句和 循环 语句。

1. if语句：
例如，下面的代码先做了一个判断：
```js
var age = 20;

if (age >= 18) { // 如果age >= 18为true，则执行if语句块
    alert('adult');
} else { // 否则执行else语句块
    alert('teenager');
}

//{...}还可以嵌套，形成层级结构：

var age = 3;
if (age >= 18) {
    alert('adult');
} else {
    if (age >= 6) {
        alert('teenager');
    } else {
        alert('kid');
    }
}
```

2. 循环语句：

1. for循环：
```js

/*
i=1 这是初始条件，将变量i置为1；
i<=10000 这是判断条件，满足时就继续循环，不满足就退出循环；
i++ 这是每次循环后的递增条件，由于每次循环后变量i都会加1


*/

var x = 0;
var i;
for (i=1; i<=10000; i++) {
    x = x + i;
    if(x=1000){
       break; // 通过if判断来退出循环
    }
}
x; // 50005000

```

2. for ... in循环：
==for循环的一个变体是for ... in循环，它可以把一个对象的所有属性依次循环出来==
```js
var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};

for (var key in o) {
    console.log(key); // 'name', 'age', 'city'
}
//要过滤掉对象继承的属性，用hasOwnProperty()来实现：

var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
for (var key in o) {
    if (o.hasOwnProperty(key)) {
        console.log(key); // 'name', 'age', 'city'
    }
}

//由于Array也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in循环可以直接循环出Array的索引：

var a = ['A', 'B', 'C'];
for (var i in a) {
    console.log(i); // '0', '1', '2'
    console.log(a[i]); // 'A', 'B', 'C'
}
//请注意，for ... in对Array的循环得到的是String而不是Number。
```


3. while
<font color="red">while循环只有一个判断条件，条件满足，就不断循环，条件不满足时则退出循环。</font>

比如我们要计算100以内所有奇数之和，可以用while循环实现：
```js
var x = 0;
var n = 99;
while (n > 0) {
    x = x + n;
    n = n - 2;
}
x; // 2500
在循环内部变量n不断自减，直到变为-1时，不再满足while条件，循环退出。
```


4. do ... while
do { ... } while()循环，它和while循环的唯一区别在于，不是在每次循环开始的时候判断条件，而是在每次循环完成的时候判断条件：
```js
var n = 0;
do {
    n = n + 1;
} while (n < 100);
n; // 100
//用do { ... } while()循环要小心，循环体会至少执行1次，而for和while循环则可能一次都不执行。

```


#### 7.数组
==数组是一组按顺序排列的集合，集合的每个值称为元素==。
JavaScript的数组可以包括任意数据类型。
例如：
`[1, 2, 3.14, 'Hello', null, true];`
上述数组包含6个元素。数组用[]表示，元素之间用,分隔。

另一种创建数组的方法是通过Array()函数实现：
`new Array(1, 2, 3); // 创建了数组[1, 2, 3]`


数组的元素可以通过索引来访问。请注意，索引的起始值为0：
```js
var arr = [1, 2, 3.14, 'Hello', null, true];
arr[0]; // 返回索引为0的元素，即1
arr[5]; // 返回索引为5的元素，即true
arr[6]; // 索引超出了范围，返回undefined
```


<h4>操作数组：</h4>

1. Array的长度：
```js
var arr = [1, 2, 3.14, 'Hello', null, true];
arr.length; // length获取数组长度


var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;           //修改length的大小，也会改变数组长度
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]

//Array可以通过索引把对应的元素修改为新的值，因此，对Array的索引进行赋值会直接修改这个Array：

var arr = ['A', 'B', 'C'];
arr[1] = 99;
arr; // arr现在变为['A', 99, 'C']
//请注意，如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化：

var arr = [1, 2, 3];
arr[5] = 'x';
arr; // arr变为[1, 2, 3, undefined, undefined, 'x']

```
<font color="red">在编写代码时，不建议直接修改Array的大小，访问索引时要确保索引不会越界。</font>


2. indexOf
```js
//与String类似，Array也可以通过indexOf()来搜索一个指定的元素的位置：

var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(20); // 元素20的索引为1
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为2

//注意了，数字30和字符串'30'是不同的元素。
```


3. slice
```js
//slice(),它截取Array的部分元素，然后返回一个新的Array：

var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']
//注意到slice()的起止参数包括开始索引，不包括结束索引。

//如果不给slice()传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个Array

var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false

```

4. push和pop
```js
//push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉：

var arr = [1, 2];
arr.push('A', 'B'); // 返回Array新的长度: 4
arr; // [1, 2, 'A', 'B']
arr.pop(); // pop()返回'B'
arr; // [1, 2, 'A']
arr.pop(); arr.pop(); arr.pop(); // 连续pop 3次
arr; // []
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
arr; // []

```

5. unshift和shift和sort
```js
//如果要往Array的头部添加若干元素，使用unshift()方法，
//shift()方法则把Array的第一个元素删掉：

var arr = [1, 2];
arr.unshift('A', 'B'); // 返回Array新的长度: 4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
arr; // []
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
arr; // []


//sort()可以对当前Array进行排序，它会直接修改当前Array的元素位置，直接调用时，按照默认顺序排序：

var arr = ['B', 'C', 'A'];
arr.sort();
arr; // ['A', 'B', 'C']
//能否按照我们自己指定的顺序排序呢？完全可以，我们将在后面的函数中讲到。

```


6. reverse 和splice和concat和join
```js

//reverse()把整个Array的元素给掉个个，也就是反转：
var arr = ['one', 'two', 'three'];
arr.reverse(); 
arr; // ['three', 'two', 'one']

=====================
//splice()方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：

var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']

=========================
//concat()方法把当前的Array和另一个Array连接起来，并返回一个新的Array：

var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']
//请注意，concat()方法并没有修改当前Array，而是返回了一个新的Array。
//实际上，concat()方法可以接收任意个元素和Array，并且自动把Array拆开，然后全部添加到新的Array里：

var arr = ['A', 'B', 'C'];
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]

=============================
//join()方法是一个非常实用的方法，它把当前Array的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：

var arr = ['A', 'B', 'C', 1, 2, 3];
arr.join('-'); // 'A-B-C-1-2-3'
//如果Array的元素不是字符串，将自动转换为字符串后再连接。

```


7. 多维数组
如果数组的某个元素又是一个Array，则可以形成多维数组.
例如：
```js
var arr = [[1, 2, 3], [400, 500, 600], '-'];
//上述Array包含3个元素，其中头两个元素本身也是Array。
```

#### 8.对象
==JavaScript的对象是一组由键-值组成的无序集合==.
例如：
```js
var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    zipcode: null
};
```
==JavaScript对象的键都是字符串类型，值可以是任意数据类型。==

用对象变量.属性名的方式,要获取一个对象的属性：
```js
person.name; // 'Bob'
person.zipcode; // null
```

#### 9.Map和Set:
1. Map
<font color="red">Map是一组键值对的结构，具有极快的查找速度。</font>

```js
//初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：

var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95

var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined

//由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：

var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88

```
2. Set
<font color="red">Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。</font>

```js
要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：

var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
//重复元素在Set中自动被过滤：

var s = new Set([1, 2, 3, 3, '3']);
s; // Set {1, 2, 3, "3"}
//注意数字3和字符串'3'是不同的元素。

//通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果：
s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}
//通过delete(key)方法可以删除元素：

var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}
```


#### 10.iterable:
遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。
==具有iterable类型的集合可以通过新的for ... of循环来遍历。==

用for ... of循环遍历集合，用法如下：
```js
var a = ['A', 'B', 'C'];
var s = new Set(['A', 'B', 'C']);
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (var x of a) { // 遍历Array
    console.log(x);
}
for (var x of s) { // 遍历Set
    console.log(x);
}
for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}

```


### 3.函数：
函数是完成某个特定功能的一组语句。把完成特定功能的代码块放到一个函数里，直接调用这个函数，就省重复输入大量代码的麻烦。

#### 1.函数的定义与调用：

1. 基本语法如下:
```js
function 函数名(函数形参)      //function是定义函数的关键字
{
     函数代码;
}
```
<font color="red">注意：函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。</font>


2. ==JavaScript的函数也是一个对象==，函数名可以视为指向该函数的变量。
因此，第二种定义函数的方式如下：
```js
var abs = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};
```
function (x) { ... }是一个==匿名函数，它没有函数名==。但是，这个匿名函数赋值给了变量abs，所以，<font color="red">通过变量abs就可以调用该函数。</font>

<font color="red">注意第二种方式按照完整语法需要在函数体末尾加一个;表示赋值语句结束。</font>


3. 函数调用：
```js
//调用函数时，按顺序传入参数即可：

abs(10); // 返回10
abs(-9); // 返回9
```


#### 2.作用域(原则：由内到外)：

> 1. 如果一个变量在函数体内部申明，则该变量的作用域为整个函数体，在函数体外不可引用该变量
> 2. 不同函数内部的同名变量互相独立，互不影响：
> 3. <font color="red">内部函数可以访问外部函数定义的变量，反过来则不行</font>
> 4. 如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量.互不相干。

```js
function foo() {
    var x = 1;
    x = x + 1;
}

x = x + 2; // ReferenceError! 无法在函数体外引用变量x

//不同函数内部的同名变量互相独立，互不影响：

function foo() {
    var x = 1;
    x = x + 1;
}

function bar() {
    var x = 'A';
    x = x + 'B';
}

//由于JavaScript的函数可以嵌套，此时，内部函数可以访问外部函数定义的变量，反过来则不行：

function foo() {
    var x = 1;
    function bar() {
        var y = x + 1; // bar可以访问foo的变量x!
    }
    var z = y + 1; // ReferenceError! foo不可以访问bar的变量y!
}


//如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量.互不相干。
function foo() {
    var x = 1;
    function bar() {
        var x = 'A';
        console.log('x in bar() = ' + x); // 'A'
    }
    console.log('x in foo() = ' + x); // 1
    bar();
}

foo();     //x in foo() = 1 ，x in bar() = A

```


#### 3.全局对象window：
==不在任何函数内定义的变量就具有全局作用域。==
实际上，JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性：
```js
var course = 'Learn JavaScript';
alert(course);             // 'Learn JavaScript'
alert(window.course);      // 'Learn JavaScript'
//因此，直接访问全局变量course和访问window.course是完全一样的。

function foo() {
    alert('foo');
}

foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用

```

<font color="red">JavaScript实际上只有一个全局作用域。任何变量（函数也视为变量），如果没有在当前函数作用域中找到，就会继续往上查找，最后如果在全局作用域中也没有找到，则报ReferenceError错误。</font>


#### 4.命名空间
全局变量都会绑定到window上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同命名空间的顶层函数，都会造成命名冲突，并且很难被发现。

<font color="red">减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。</font>
例如：
```js
// 唯一的全局变量MYAPP:   
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};

//把自己的代码全部放入唯一的命名空间MYAPP中，会大大减少全局变量冲突的可能。
//许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。
```


### 4.方法：
在一个对象中绑定函数，称为这个对象的方法。

对象的定义是这样的：
```js
var xiaoming = {
    name: '小明',
    birth: 1990
};

//写个age()方法，返回xiaoming的年龄：

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
 
xiaoming.age;    // function xiaoming.age()
xiaoming.age(); // 今年调用是25,明年调用就变成26了

```
**注意：**
this:它是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。所以，this.birth可以拿到xiaoming的birth属性.


#### 1. 如果把对象的方法写在对象外面
```js
function getAge() {        
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge               
};

xiaoming.age(); // 25, 正常结果
getAge(); // NaN     


/*
getAge(); 的结果为什么是 NaN

1. 如果以对象的方法形式调用，比如xiaoming.age()，该函数的this指向被调用的对象，也就是xiaoming，这是符合我们预期的。

2. 如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window。
*/
  
```


#### 2. 如果在对象的方法里面定义函数：
```js
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        function getAgeFromBirth() {      //在方法的里面定义函数
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined
/*

为什么是这个结果：

 原因是this指针只在age方法的函数内指向xiaoming，在方法内部定义的函数，this又指向undefined或window了！

*/


//修复的办法也不是没有，我们用一个that变量首先捕获this：

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var that = this; // 在方法内部一开始就捕获this
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - that.birth; // 用that而不是this
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // 25

//用var that = this;，你就可以放心地在方法内部定义其他函数，而不是把所有语句都堆到一个方法中。
```