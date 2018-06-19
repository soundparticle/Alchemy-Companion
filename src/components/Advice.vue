<template>
  <div>
    <h1>Advice Page</h1>
    <pre v-if="error">{{ error }}</pre>
    <ul v-if="advice">
      <li v-for="tip in advice"
        :key="tip.id"
        >
        <hr>
        <h3> ( {{ tip.upvotes }} ) </h3> &nbsp; Tip from {{ tip.first_name }}: &nbsp; <strong>{{ tip.title }} &nbsp; - </strong> &nbsp; {{ tip.text }}
      </li>
      <hr>
    </ul>
  </div>
</template>

<script>
import { getAdvice } from '../services/api';

export default {
  data() {
    return {
      advice: null,
      error: null
    };
  },
  created() {
    getAdvice()
      .then(advice => {
        this.advice = advice;
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
