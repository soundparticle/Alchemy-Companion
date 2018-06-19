<template>
  <div id="app">
   <h1>Main App Page</h1>
   <nav>
     <router-link to="/">Home</router-link>
     &nbsp;
     <router-link to="/about">About</router-link>
     &nbsp;
     <router-link to="/resources">Resources</router-link>
     &nbsp;
     <router-link to="/workspaces">Workspaces</router-link>
     &nbsp;
     <router-link to="/advice">Advice</router-link>
     &nbsp;
     <router-link to="/dashboard">Your Dashboard</router-link>
     &nbsp;
     <router-link to="/auth">Sign In</router-link>

   </nav>
   <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {

  }
};
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
