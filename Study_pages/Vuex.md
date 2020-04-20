<<<<<<< HEAD
[toc]

# Vuex-组件中传值(全局变量状态管理)

## 1.开始

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
         count:0
    },
    //方法区域
    mutations:{
        //在其他页面通过 this.$store.commit("addCount") 调用方法
        addCount(state){
           state.count++
        },
        removeCount(state){
            state.count--
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
            //执行mutations中的addCount方法
           this.$store.commit("addCount")
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
=======
[toc]

# Vuex-组件中传值(全局变量状态管理)

## 1.开始

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
         count:0
    },
    //方法区域
    mutations:{
        //在其他页面通过 this.$store.commit("addCount") 调用方法
        addCount(state){
           state.count++
        },
        removeCount(state){
            state.count--
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
            //执行mutations中的addCount方法
           this.$store.commit("addCount")
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
>>>>>>> new
