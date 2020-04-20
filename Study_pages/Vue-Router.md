[TOC]

# Vue Router

Vue Router 是 Vue.js 官方的路由管理器。

路由可以通过不同的 URL 访问不同的页面。类似于a标签。**使用Vue.js路由需要载入 vue-router库**

## 0.vue-router库的安装：

1. CDN方式: `https://unpkg.com/vue-router/dist/vue-router.js`
2. NPM方式：`npm install vue-router`

==注意:CDN方式，需要先引入vue.js文件==

如果在一个模块化工程(webpack + vue-cli)中使用它，必须要通过 Vue.use() 明确地在工程的main.js文件中全局安装路由功能：

```js
//这是模块化工程项目中的main.js文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

```


## 1.基础使用

==步骤：1.创建组件。2，创建路由对象，并且配置路由规则(把路由路径和组件进行键值对匹配)。3，把路由对象加载到Vue实例中==

```html
<!--引入必要的js文件-->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="vue_det">
    <router-link to="/login">登录路由</router-link>
    <router-link to="/register">注册路由</router-link>
    <!--显示当前路由路径匹配的组件页面-->
    <router-view></router-view>
</div>

<script>
// 1. 定义组件
var loginView = { template: '<div>登录组件</div>' }
var registerView = { template: '<div>注册组件</div>' }
var rootView = { template:'<div>初始化组件</div>' }

// 2.创建路由对象.并且配置路由规则routes
//路由规则为键值对数据。分别是路由路径path,和匹配的组件component
var routerObj = new VueRouter({
  routes : [
    { path: '/', component: rootView },
    { path: '/login', component: loginView },
    { path: '/register', component: registerView }
  ]
})

// 3.把路由对象挂载道vue实例中
// 从而让页面有路由功能
var vm = new Vue({
    el: '#vue_det',   
    //把路由对象加载到Vue实例中
    router:routerObj    
})
</script>
```

<font color="red">
PS:

`<router-view></router-view>`是显示当前路由路径下匹配的组件的标签
</font>

## 2.`<router-link>`导航标签

1. to属性

to属性的几种使用方式
```js
//login是目标路由路径
<router-link to="/login">Login路由</router-link>
//to属性可以绑定vue实例中的data值
<router-link v-bind:to = "{path:'/login1'}">Login路由1</router-link>
//to属性可以传递参数
//请求变为：/login?id=1&name=qwe
<router-link v-bind:to = "{path:'/route1', query: { id:'1',name:'qwe' }}">Login路由2</router-link>
```

2. replace属性

使用replace属性。导航后不会留下 history 记录
```js
<router-link to="/login" replace>Login路由</router-link>
```

3. append属性

 设置append属性后，则在当前路径前添加基路径。

 ```js
//若当前页面路径为/a.点击下面的标签后。跳转的页面路径是 /b
<router-link to="/b"></router-link>

//若当前页面路径为/a.点击下面的标签后。跳转的页面路径是 /a/b
<router-link to="/b" append></router-link>
 ```

4. tag属性

使用tag属性，把标签改变为其他标签

```js
<router-link to="/login" tag="li">login</router-link>
//会渲染为li标签
<li>login</li>
```

## 3.路由实现页面跳转的两种方式（router-link和JS）

> 1. 通过`<router-link>`实现

`<router-link>`组件用于设置一个导航链接，切换不同 HTML 内容.

```
##简单写法
<router-link to="demo2">demo2</router-link>

#######################################

##v-bind写法
<router-link :to="demo2">demo2</router-link>


#######################################

##传参写法
<router-link :to="{ name: 'demo2', params: { userId: 123 }}">demo2</router-link>


传参写法需要先在 router.js 中对 demo2 的路由路径进行配置
{
  path: '/demo2/:userId',
  name: 'demo2',
  component: demo2
}
配置完成后,页面跳转的结果就为 /demo2/123

如何在新页面获取参数：
需要在 mounted 钩子中使用 this.$route.params.xx 获取传过来的参数，如下：
mounted () {
    alert(this.$route.params.userId)
}

#########################################################

##传入地址键值对写法
<router-link :to="{ path: 'demo2', query: { plan: 'private' }}">demo2</router-link>
页面跳转的结果为 /demo2?plan=private

（注意这里不用在 router.js 里配置路径）

在新页面中获取到传过来的地址键值对plan，可以在 mounted 钩子中使用 this.$route.plan.xx. 获取传过来的地址键值对，如下：
mounted () {
  alert(this.$route.query.plan)
}


```


> 2.通过 JS 实现

```
template 部分：
<button @click="toURL">跳转页面</button>

script 部分：
（注意这里是 router，上面是 route）


##简单写法
methods:{
  toURL(){
    this.$router.push({ path: '/demo2' })
  }
}

#################################

##传参的写法
methods:{
  toURL(){
    this.$router.push({ name: 'demo2', params: { userId: 123 }})
  }
}

#################################

##传入地址键值对
methods:{
  toURL(){
    this.$router.push({ name: 'demo2', params: { userId: 123 }, query: { plan: 'private' } })
  }
}


```