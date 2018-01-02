[toc]
# HTML+CSS
1. <font color="red">HTML是网页内容的载体</font>。内容就是网页制作者放在页面上想要让用户浏览的信息，可以包含文字、图片、视频等。

2. <font color="red">CSS样式是表现</font>。就像网页的外衣。比如，标题字体、颜色变化，或为标题加入背景图片、边框等。所有这些用来改变内容外观的东西称之为表现。

3. <font color="red">JavaScript是用来实现网页上的特效效果</font>。如：鼠标滑过弹出下拉菜单。或鼠标滑过表格的背景颜色改变。还有焦点新闻（新闻图片）的轮换。可以这么理解，有动画的，有交互的一般都是用JavaScript来实现的。

## HTML（注意：标签与元素是一个概念）:

<font color="red">在 html 中是忽略回车和空格的，你输入的再多回车和空格也是显示不出来的。</font>

1. 标签由英文尖括号< >括起来，如<html>就是一个标签。

2. html中的<font color="red">标签一般都是成对出现的，分开始标签和结束标签。结束标签比开始标签多了一个/。</font>
如：	  
```html
（1） <p></p>
（2） <div></div>
（3） <span></span>
``` 	
3. 标签与标签之间是可以嵌套的，但先后顺序必须保持一致。

4. HTML标签不区分大小写，`<h1>`和`<H1>`是一样的，但建议小写，因为大部分程序员都以小写为准。


### 1.`<html>`标签:
`<html></html>`称为==根标签==，所有其他的网页标签都在`<html></html>`中。

### 2.`<head>`标签:
`<head>`标签用于定义==文档的头部==，它是所有头部元素的容器。头部元素有`<title>、<script>、 <style>、<link>、<meta>`等标签，

### 3.`<body>`标签：
在`<body>`和`</body>`标签之间的内容是==网页的主要内容==，如`<h1>、<p>、<a>、<img>`等网页内容标签，在这里的标签中的内容会在浏览器中显示出来。

一个网页的大致结构：
```html
<html>
    <head>...</head>
    <body>...</body>
</html>
```

### 4.`<title>`标签:
在`<title>`和`</title>`标签之间的文字内容是==网页的标题信息，它会出现在浏览器的标题栏中==。每个网页都应该有一个独一无二的title。

### 5.代码注释:
语法：
`<!-- 注释文字 -->`

### 6.`<p>`段落标签:
语法：
`<p>`段落文本`</p>`

 ==注意一段文字一个`<p>`标签==，如在一篇新闻文章中有3段文字，就要把这3个段落分别放到3个`<p>`标签中。这样使每一段之间会有一行空白，就像换行符‘\n’ 一样。

### 7.文章等级标题标签：
语法：
`<hx>`标题文本`</hx>` (x为1-6)

标题标签一共有6个，h1、h2、h3、h4、h5、h6分别为一级标题、二级标题、三级标题、四级标题、五级标题、六级标题。并且依据重要性递减。`<h1>`是最高的等级。

```html
<body>
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
</body>
```

### 8.强调标签（`<em>`或`<strong>`标签）
语法：
`<em>`需要强调的文本`</em>`  
`<strong>`需要强调的文本`</strong> `

`<em>` 表示强调，`<strong>`表示更强烈的强调。并且在浏览器中`<em>`默认用斜体表示，`<strong>`用粗体表示。

### 9.短文本引用 `<q>`标签
当你想引用其他人的名言，名句（注意：是短文本）时,使用它。

语法：
`<q>`引用文本`</q>`  

==当使用时，注意要引用的文本不用加双引号，浏览器会对q标签自动添加双引号==.

### 10.长文本引用标签 `<blockquote>`:
语法:
`<blockquote>`引用文本`</blockquote>`
浏览器对`<blockquote>`标签的解析是==缩进样式==。

### 11.把文字设置成单独样式的标签 `<span>`:
语法：
`<span>`文本`</span>`

`<span>`标签是没有语义的，它的作用就是为了设置单独的样式用的。（例如将文字设置成蓝色）    
```html
<span style="color:blue">文本</span>
```
 
### 12.分行标签 `<br/>`
在你想要换行的文本后面，在需要加回车换行的地方加入`<br/>`，`<br/>`标签作用相当于word文档中的回车.

`<br/>`标签是一个==空标签，没有HTML内容的标签就是空标签，空标签只需要写一个开始标签==，这样的标签有`<br/>`、`<hr/>`和`<img/>`。

### 13.空格标记`&nbsp;`：
语法：
`&nbsp;`
在html代码中按空格键是不起作用的。

### 14.添加水平横线`<hr/>`：
语法：
`<hr/>`

注意：
1. `<hr />`标签和`<br />`标签一样也是一个空标签，所以只有一个开始标签，没有结束标签。
2. `<hr />`标签的在浏览器中的默认样式线条比较粗，颜色为灰色，可能有些人觉得这种样式不美观，没有关系，这些外在样式在我们以后学习了css样式表之后，都可以对其修改。

### 15.`<address>`标签，为网页加入地址信息:
语法：
`<address>`联系地址信息文本`</address>`   （ 在浏览器上显示的样式为斜体）

### 16.代码标签`<code>`(在网页上显示程序代码):
语法：
`<code>`代码语言`</code>`
==注：如果是多行代码，可以使用`<pre>`标签。当为一行代码时可用它。==

### 17.多行代码`<pre>`标签:
语法：
`<pre>`语言代码段`</pre>`

### 18.无序列表标签`<ul><li>`
语法：
```html
<ul>
    <li>信息1</li>
	<li>信息2</li>
	......
</ul>
```

### 19.有序列表标签`<ol><li>`:
语法：
```html
<ol>
   <li>信息</li>
   <li>信息</li>
   ......
</ol>
```

### 20.独立板块标签`<div>`:
语法：
`<div  id="版块名称">…</div>`
（用id属性来为`<div>`提供唯一的名称）

### 21.`<table>`标签:
创建表格的四个标签（元素）：
table,tr,th,td

1. `<table>…</table>`：整个表格以`<table>`标记开始、`</table>`标记结束。
2. `<tr>…</tr>`：表格的一行，所以有几对tr 表格就有几行。（在这个标签里用`<tr>`  , `<td>`标签）
3. `<td>…</td>`：表格的一个单元格，一行中包含几对`<td>...</td>`，说明一行中就有几列。（除第一行之外的几行，用它）
4. `<th>…</th>`：表格的头部的一个单元格，表格表头。(第一行时 ，用`<th>`标签代替`<tr>`标签)
5. 表格中列的个数，取决于一行中数据单元格的个数。

### 22.超链接标签`<a>`:
语法：
`<a  href="目标网址"  title="鼠标滑过该链接时显示的文本">文本</a>`

例如：
`<a  href="http://www.imooc.com"  title="点击进入慕课网">click here!</a>`
<a  href="http://www.imooc.com"  title="点击进入慕课网">click here!</a>

该例子作用是：
划过该链接的文本，显示点击进入慕课网的文字，单击click here!文字，网页链接到http://www.imooc.com这个网页。

ps:
`<a>`标签<font color="red">在默认情况下，链接的网页是在当前浏览器窗口中打开</font>，有时我们需要在新的浏览器窗口中打开。

如下代码`<a href="目标网址" target="_blank">click here!</a>`
==target="_blank" :表示在新窗口打开该网页。==

### 23.图片标签`<img/>`:
语法：
`<img src="图片地址" alt="下载失败时的替换文本" title = "提示文本">`

注意：
1. src：标识图像的位置；
2. alt：指定图像的描述性文本，当图像不可见时（下载不成功时），可看到该属性指定的文本；
3. title：提供在图像可见时对图像的描述(鼠标滑过图片时显示的文本)；
4. 图像可以是GIF，PNG，JPEG格式的图像文件。

举例：
`<img src ="myimage.gif" alt = "My Image" title ="My Image" />`
<img src ="myimage.gif" alt ="MyImage" title ="My Image" />

### 24.表单标签`<form>`（与用户进行交互）:
表单标签是可以把浏览者输入的数据传送到服务器端，这样服务器端程序就可以处理表单传过来的数据。

语法：
```html
<form method="post" action="save.jsp">      // 表单标签，与用户进行交互
    <label for="username">用户名:</label>
    <input type="text" name="username" />   //文本输入框
    <label for="pass">密码:</label>
    <input type="password" name="pass" />
    <input type="submit" value="提交">     //提交按钮
</form>
```

<font color="red">
注意：

1. `<form>` ：`<form>`标签是成对出现的，以`<form>`开始，以`</form>`结束。
2. action ：浏览者输入的数据被传送到的地方,比如一个PHP页面(save.php)。
3. method ： 数据传送的方式（get/post）。
4. 所有表单控件（文本框`<input>`、文本域、按钮、单选框、复选框等）都必须放在 `<form></form>` 标签之间（否则用户输入的信息可提交不到服务器上）。
</font>


### 25.文本输入框,与密码输入框`<input>`:
语法：
```html
<form>
    <input type="text或password" name="名称" value="文本"/>
</form>
```

<font color="red">

1. type：
   当 type="text" 时，输入框为文本输入框;
   当 type="password" 时, 输入框为密码输入框。
2. name：为文本框命名。
3. value：为文本输入框设置默认值。(一般起到提示作用)
</font>


### 26.文本输入域`<textarea>`:
当用户需要在表单中输入大段文字时，需要用到文本输入域。
语法：
`<textarea  rows="行数" cols="列数">文本</textarea>`

1. cols ：多行输入域的列数。
2. rows ：多行输入域的行数。
3. 在`<textarea></textarea>`标签之间可以在文本域中输入默认值

### 27.单选框，多选框:
语法：
`<input   type="radio或checkbox"   value="值"    name="名称"   checked="checked"/>`

<font color="red">

1. type:
   当 type="radio" 时，控件为单选框
   当 type="checkbox" 时，控件为复选框
2. value：提交数据到服务器的值（jsp使用）
3. name：为控件命名.
4. checked：当设置 checked="checked" 时，该选项被默认选中   
==注意:同一组的单选按钮，type值与name 取值一定要一致==
</font>


### 28.下拉列表框`<select><option>`:
语法：
```html
    <select>  //下拉列表框，只能单选
      <option value="看书">看书</option>      //选项
      <option value="旅游" >旅游</option>
      <option value="运动">运动</option>
      <option value="购物"  selected="selected">购物</option>   //默认选项（因为有selected 修饰）
    </select>  
```

<font color="red">

1. value="看书" : 该值是向服务器提交的数据。
2. selected="selected"   ：表示该选项是默认选项。

</font>


==PS:下拉列表框的多选操作==：
在`<select>`标签中设置 ==multiple="multiple"== 属性，就可以实现多选功能，在 windows 操作系统下，进行多选时按下Ctrl键同时进行单击（在 Mac下使用 Command +单击），可以选择多个选项。

```HTML
<select multiple="multiple">     //下拉列表框，多选操作
     ...................
      <option value="运动">运动</option>   //选项
      <option value="购物">购物</option>
  </select>
```


### 29.提交按钮与重置按钮:
在表单中有两种按钮可以使用，分别为：提交按钮、重置按钮。
语法：
`<input   type="submit"   value="提交">`
`<input type="reset" value="重置">`

1. type：只有当type值设置为submit时，按钮才有提交作用,只有当type值设置为reset时，按钮才有重置作用

2. value：按钮上显示的文字

示例：
```html
<input type="submit" value="提交" name="submitBtn" />
<input type="reset" value="重置"   />    
```
<input type="submit" value="提交" name="submitBtn" />
<input type="reset" value="重置"  />    

### 30.`label`标签:
<font color="red">label标签不会向用户呈现任何特殊效果</font>，它的作用是为鼠标用户改进了可用性。如果你在 label 标签内点击文本，就会触发此控件。就是说，==当用户单击选中该label标签时，浏览器就会自动将焦点转到和标签相关的表单控件上==（就自动选中和该label标签相关连的表单控件上）。

语法：
`<label for="控件id名称">`
注意：标签的 for 属性中的值应当与相关控件的 id 属性值一定要相同。

例子：
```html
<form>  
  <label for="male">男</label>    //该label标签与文本输入框进行关联
  <input type="radio" name="gender" id="male" />      
  <label for="email">输入你的邮箱地址</label>          
  <input type="email" id="email" placeholder="Enter email">     
</form>
```

<font color="red">
注意：
不加label的话鼠标一定要点击文本输入框才能输入文字,加了label可以直接点击对应的文字来激活文本输入框。
</font>