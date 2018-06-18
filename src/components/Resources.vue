<template>
  <div>
    <h1>Resources Viewport</h1>
    <nav>
      <router-link to="/resources/frontend">Frontend Resources</router-link>
      &nbsp;
      <router-link to="/resources/backend">Backend Resources</router-link>
      &nbsp;
      <router-link to="/resources/add">Add a Resource</router-link>
      &nbsp;
      
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
