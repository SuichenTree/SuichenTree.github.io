[TOC]

# Vuex-组件中传值(全局变量状态管理)

Vuex 是专门为 Vue.js 设计的状态管理库，采用集中式存储管理应用的所有组件的状态，更直白的说就是响应式的全局变量



vuex核心概念 | 介绍
------------ | -------------
State | 共享状态（即变量）
Getter | 基于state的派生状态，可理解为组件中的计算属性
Mutation | 更改vuex的store中状态的唯一方法，通过提交mutation修改状态，同步操作（规则上是不允许异步操作的，虽然异步也可以执行，）
Action | 类似mutation，不同之处，1.通过提交mutation修改状态   2.支持异步操作
Module | 模块，在大型项目中为了方便状态的管理和协作开发将store拆分为多个子模块（modules），每个子模块拥有完整的state、mutation、action、getter




## 2.开始

==开始前，请使用vue-cli快速创建vue工程==

1. 使用npm 将vuex插件下载到刚刚创建好的vue工程

```
npm install vuex --save
```

2. 在src目录中创建一个新的目录store,并在其中创建index.js文件

index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'
//引入Vuex并把Vuex装配到Vue中
Vue.use(Vuex);

//创建Vuex对象，并将其暴露出去
export default new Vuex.Store({
    //变量状态区域
    state:{
        Login:false,
        //在其他页面，通过 this.$store.state.count 获取值
         count:0,
        loginStatus:0, //登录状态
         userInfo:null  //用户信息
    },
    //方法区域
    mutations:{
        //在其他页面通过 this.$store.commit("addCount") 调用方法
        //不带参数
        addCount(state){
           state.count++
        },
        removeCount(state){
            state.count--
        },
        //带参数
        modifyLoginStatus(state,param){
            state.loginStatus = param.loginStatus;  //修改登录状态
        },
        addUserInfo(state,param){
            state.userInfo = param.userInfo;   //增加用户对象信息
            }
        }
    }

})
```

>  store（仓库）: 存储全局变量的位置与状态
>  mutations(方法,事件) ： 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation


3. 在main.js中将Vuex对象注入到项目根组件App.vue中

main.js
```js
import Vue from 'vue'
import App from './App'
import router from './router'

import store from "./store"
//从store目录中导入vuex对象

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,  //将vuex对象，加入到根节点中，即组件App.vue中
  components: { App },
  template: '<App/>'
})

```

4. 在组件中使用Vuex

子组件：index.vue
```html
<template>
  <div>
      this is index.vue
        <butoon @click="add()">add</butoon>
        <butoon @click="remove()">remove</butoon>
        <!--获取count的值-->
        <p>{{this.$store.state.count}}</p>
  </div>
</template>

<script>
export default {

    methods:{
        add(){
            //不带参数
            //执行mutations中的addCount方法
           this.$store.commit("addCount");

            //带参数
            //载荷提交(少用)
            that.$store.commit("modifyLoginStatus",{loginStatus:1})
            
            //对象提交(常用)
            that.$store.commit({
                type:"addUserInfo",
                userInfo:11
            })
        },
        remove(){
            this.$store.commit("removeCount")
        }
    }

}
</script>
<style>
</style>
```

小结：
1. mutation下事件的调用是通过 this.$store.commit 传入对应的type调用，
2. mutation下事件的定义分为无参的和有参的两种形式
3. mutation事件的调用有两种形式，载荷和对象


## 3.vuex的刷新页面丢失数据问题处理

vuex在页面刷新后，store中的状态将被重新初始化，赋值的数据丢失，针对这个问题怎么处理呢？ ---我们可以这样处理，在页面刷新或离开之前将store中的数据保存到sessionStorage 或 localStorage中，在页面重新加载后再将数据取出，通过vuex的$store.replaceState 将数据替换到store中。

localStorage -- 是永久存储在本地，除非你主动去删除;
sessionStorage -- 是存储到当前页面关闭为止，和其他tab页没关联;
cookie -- 则根据你设置的有效时间来存储，但缺点是不能储存大数据且不易读取，会和后台进行交互。

本方法选择的是sessionStorage，选择的原因是由于vue是单页面应用，操作都是在一个页面跳转路由，另一个原因是sessionStorage可以保证打开页面时sessionStorage的数据为空，而如果是localStorage则会读取上一次打开页面的数据。

在App.vue中编写代码

```js
<script>
export default {
    name: 'app',
    created() {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    }
}
</script>
```