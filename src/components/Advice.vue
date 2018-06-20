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
        <h3><button>⬆️</button>( {{ tip.upvotes }} ) </h3>
        &nbsp; Tip from {{ tip.firstName }}
        &nbsp; <strong>{{ tip.title }}
        &nbsp; - </strong> &nbsp; {{ tip.text }}
        <button>⭐</button>
        <button v-if="user.id === tip.authorID" @click="handleRemove(tip.id)">&#x274C;</button>
        <button v-if="user.id === tip.authorID">✏️</button>
      </li>
      <hr>
    </ul>
  </div>
</template>

<script>
import { getAdvice, addAdvice, removeAdvice } from '../services/api';

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
    },
    handleRemove(id) {

      if(confirm('Are you sure you want to delete?')) {
        return removeAdvice(id)
          .then(()=> {
            const index = this.advice.findIndex(tip => tip.id === id);
            if(index === -1) return;
            this.advice.splice(index, 1);
          });
      }
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
