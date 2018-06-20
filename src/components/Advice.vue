<template>
  <div>
    <h1>Advice Page</h1>
    <nav>
      <router-link to="/advice/add"> Add Advice </router-link>
    </nav>
      <router-view :onAdd="handleAdd"></router-view>
    <pre v-if="error">{{ error }}</pre>
    <ul v-if="advice">
      <li v-for="tip in advice"
        :key="tip.id"
        >
        <hr>
        <h3><button>⬆️</button>( {{ tip.upvotes }} ) </h3> &nbsp; Tip from {{ tip.firstName }}: &nbsp; <strong>{{ tip.title }} &nbsp; - </strong> &nbsp; {{ tip.text }} <button>⭐</button><button>&#x274C;</button><button>✏️</button>
      </li>
      <hr>
    </ul>
  </div>
</template>

<script>
import { getAdvice, addAdvice } from '../services/api';

export default {
  data() {
    return {
      advice: null,
      error: null
    };
  },
  methods: {
    handleAdd(advice) {
      advice.authorID = this.user.id;
      return addAdvice(advice)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          saved.upvotes = 0;
          this.advice.push(saved);
          this.$router.push('/advice');
        });
    }
  },
  props: ['user'],
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
