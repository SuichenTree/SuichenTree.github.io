[toc]
# Vue.js - version : 2.5.16

## 1. 简介 
Vue 是一套用于构建用户界面的渐进式框架。
Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

## 2. 引用：

> ①：`<script>引入`

<font color="red">在开发环境下不要使用压缩版本，不然你就失去了所有常见错误相关的警告!</font>

```html
<!-- 开发环境版本，包含了用帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

或者

```html
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```


> ②:CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```

> ③:NPM:

在用 Vue 构建大型应用时推荐使用 NPM 安装。NPM 能很好地和诸如 webpack 或 Browserify 模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。

```
# 最新稳定版
$ npm install vue
```


## 3. 使用：

<font color="red">PS:先引用vue的js文件.</font>

### 1. 创建vue的实例对象：

```html
<div id="vue_det">
    <h1>site : {{site}}</h1>    
    <h1>url : {{url}}</h1>
    <h1>{{details()}}</h1>
</div>

<script type="text/javascript">
    //创建vue的实例对象
    var vm = new Vue({
        el: '#vue_det',   //el的值表示与之绑定的标签id，例如：<div id="vue_det">
        data: {
            site: "菜鸟教程",   //对于该实例对象对于的标签的数据绑定。
            url: "www.runoob.com",
            alexa: "10000"
        },
        methods: {
            details: function() {
                return  this.site + " - 学的不仅是技术，更是梦想！";
            }
        }
    })
</script>
```

①：每个vue的实例对象都有一个el属性,它的值为标签的id值。
<font color="red">vue的实例对象通过el属性与html标签进行绑定。对该实例对象的改动就会改动对应的标签。该标签外部不受影响。</font>

②：<font color="red">data 用于定义属性</font>，实例中有三个属性分别为：site、url、alexa。

③：<font color="red">methods用于定义函数，通过 return 来返回函数值。</font>

==④：{{ }} 用于输出对象属性和函数返回值。==

<font color="blue">⑤：当一个 Vue 实例对象被创建时，它会向 html 视图中加入了其 data 属性中的值。当这些属性的值发生改变时，html 视图将也会产生相应的变化。</font>

### 2. 基础语法：

<font color="red">数据绑定最常见的形式就是使用 {{...}}（双大括号）的文本插值。</font>
=={{ }} 用于输出对象属性和函数返回值。==

#### 1. 给标签插入文本值：

```html
<div id="app">
   {{ message }}
</div>
    
<script>
new Vue({
  el: '#app',
  data: {
    message: '菜鸟教程'    //该值与div标签内的message进行数据绑定。
  }
})
</script>
```

#### 2. 给标签插入html代码，并使其生效：

>使用 v-html 指令用于输出 html 代码
```html
<div id="app">
   <div v-html="message"></div>
</div>
    
<script>
new Vue({
  el: '#app',
  data: {
     message: '<h1>菜鸟教程</h1>'
  }
})
</script>
```

#### 3.属性绑定：v-bind

v-bind 主要用于属性绑定，比方你的class属性，style属性，value属性，href属性等等