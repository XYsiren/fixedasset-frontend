<template>
  <div id="app">
    <!-- <h1>hello vue3</h1> -->
    <router-view/>
  </div>
  <!-- <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink> 
  </nav>-->
  <main>
    <!-- <RouterView /> -->
  </main> 
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 自定义样式 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<!--<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
-->

<!-- 
  <template>
    <div id="app">
      <h1>{{ message }}</h1>
      <button @click="fetchData">Get Hello Message</button>
      <p>{{ apiResponse }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: 'Welcome to Vue.js + Java Servlet!',
        apiResponse: ''
      };
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:8082/fixedasset_war_exploded/hello')
          .then(response => {
            this.apiResponse = response.data;
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  #app {
    text-align: center;
    margin-top: 60px;
  }
  </style>
  -->