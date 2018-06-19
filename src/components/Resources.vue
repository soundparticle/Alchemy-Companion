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
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="resources">
        <li v-for="item in resources"
          :key="item.id"
          >
          <hr>
          Link from: {{ item.first_name }} &nbsp; <strong>{{ item.title }} : </strong> &nbsp; <a :href="item.url"> {{ item.description }} </a>
        </li>
        <hr>
      </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { getResources } from '../services/api';

export default {
  data() {
    return {
      resources: null,
      error: null
    };
  },
  created() {
    getResources()
      .then(resources => {
        this.resources = resources;
      })
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
pre {
  color: red;
}
</style>