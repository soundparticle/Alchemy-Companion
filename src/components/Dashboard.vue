<template>
  <div>
    <h1>Your Dashboard</h1>
  <nav>
      <router-link to="/dashboard/posts">Your Posts</router-link>
      &nbsp;
      <router-link to="/dashboard/favorites">Your Favorites</router-link>
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
