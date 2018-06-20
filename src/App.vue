<template>
  <div id="app">
   <nav>
     <router-link exact to="/">Home</router-link>
     &nbsp;
     <router-link to="/about">About</router-link>
     &nbsp;
     <router-link to="/resources">Resources</router-link>
     &nbsp;
     <router-link to="/workspaces">Workspaces</router-link>
     &nbsp;
     <router-link to="/advice">Advice</router-link>
     &nbsp;
     <router-link v-if="user" to="/dashboard">Your Dashboard</router-link>
     &nbsp;
     <router-link v-if="!user" to="/auth">Sign In</router-link>
     <a v-else @click.prevent="handleLogout">Logout</a>
   </nav>
   <pre>{{user}}</pre>
   <router-view :on-user="handleUser" :user="user"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    const raw = localStorage.user;
    if(raw) {
      try {
        this.user = JSON.parse(raw);
      }
      catch (err) {
        localStorage.removeItem('user');
      }
    }
  },
  methods: {
    handleUser(user) {
      this.user = user;
      localStorage.user = JSON.stringify(user);
    },
    handleLogout() {
      localStorage.removeItem('user');
      this.user = null;
    }
  }
};
</script>

<style>
pre {
  color: red;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
