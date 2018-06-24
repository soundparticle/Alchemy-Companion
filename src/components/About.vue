<template>
  <div>
    <div id="about">
      <div class="about-header">
        <h3>Learn About The App and Developers
        &nbsp;
        </h3>
        <router-link to="/about/app">About This App</router-link>
        &nbsp;
        <router-link to="/about/us">About Us</router-link>
        &nbsp;
      </div>
      <transition name="fade">
        <router-view class="about-router"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
#about {
  display: grid;
  grid-template-columns: 10px 50px auto 50px 20px;
  grid-template-rows: 5px 40px 5px auto auto 40px 20px;
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

.about-header {
  border-radius: 0px 0px 15px 15px;
  background: linear-gradient(270deg, #2c3e50, #2980b9);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 30s ease infinite;
  -moz-animation: AnimationName 30s ease infinite;
  animation: AnimationName 30s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 2;
  grid-row-end: 2;
}

.about-router {
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 4;
  grid-row-end: 4;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bolder;
}

ul {
  padding: 0;
  list-style-type: none;
}

pre {
  color: red;
}

h3 {
  color: white;
  display: inline;
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