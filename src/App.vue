<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
<!--
    <HelloWorld msg="Welcome to Your Vue.js App" class="logo"/>
-->
    <todo-list msg="TOdo list goes here" ></todo-list>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import todoList from './components/todoList.vue'

export default {
  name: 'app',
  components: {
    //HelloWorld,
    todoList
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
  }
  .container{
    max-width: 600px;
    margin: 0 auto;
  }
  .logo{
    margin: 20px auto;
    height: 75px;
    display: block;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
/*
  text-align: center;
*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
