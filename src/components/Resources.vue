<template>
  <div>
    <h1>Coding Resources</h1>
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="resources">
        <li v-for="item in resources"
          :key="item.id"
          >
          <hr>
          <h3> ( {{ item.upvotes }} ) </h3>
          &nbsp; Link from {{ item.first_name }}:
          &nbsp; <strong> {{ item.title }}&nbsp; - </strong>
          &nbsp; <a :href="item.url"> {{ item.description }} </a>
        </li>
        <hr>
      </ul>
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
  props: ['user'],
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
h3 {
  display: inline;
}
</style>