<template>
<div>
  <div id="app">
      <div class="logo">
        <img class="alchemy" src="./assets/acl-logo.png">
      </div>
      <div class="header-links">
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
      </div>
      <div class="top-bar-background">
      </div>
    <transition name="fade">
    <router-view class="router" :on-user="handleUser" :user="user"></router-view>
    </transition>
    </div>
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

@import url('https://fonts.googleapis.com/css?family=Nunito|Quicksand|Slabo+27px');

pre {
  color: red;
}

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
#app {
  display: grid;
  max-width: 1000px;
  margin: auto;
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  grid-template-columns: 20px 40px 40px 60px auto 40px 40px 20px;
  grid-template-rows: 5px 20px 40px 20px auto 40px 20px;
}
.top-bar-background {
  border-radius: 15px 15px 0px 0px;
  background: linear-gradient(270deg, #198eda, #3ce5e5);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 30s ease infinite;
  -moz-animation: AnimationName 30s ease infinite;
  animation: AnimationName 30s ease infinite;
  z-index: -5;
  grid-column-start: 2;
  grid-column-end: span 6;
  grid-row-start: 2;
  grid-row-end: 5;
}
.router {
  grid-column-start: 2;
  grid-column-end: span 6;
  grid-row-start: 5;
  grid-row-end: 5;
}
.logo {
  display: flex;
  justify-content: center;
  grid-column-start: 2;
  grid-column-end: span 3;
  grid-row-start: 2;
  grid-row-end: span 3;
}
.alchemy{
  max-width: 100px;
  height: auto;
}
.header-links {
  font-size: 1.2em;
  color: white;
  display: flex;
  justify-content: space-evenly;
  grid-column-start: 5;
  grid-column-end: span 2;
  grid-row-start: 3;
  grid-row-end: span 1;
  align-items: center;
}
a {
  color: white;
  text-decoration: none;
  font-weight: bolder;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
