<template>
  <div>
    <h1>Coding Resources</h1>
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="resources">
        <li v-for="resource in resources"
          :key="resource.id"
          :onRemove="handleRemove"
          >
          <hr>
          <h3> ( {{ resource.upvotes }} ) </h3>
          <button>💬</button>
          <button>⭐</button>
          <button v-if="user.id === resource.authorID" @click="onRemove(resource.id)">❌</button>
          <button v-if="user.id === resource.authorID">✏️</button>
          &nbsp; Link from {{ resource.first_name }}:
          &nbsp; <strong> {{ resource.title }}&nbsp; - </strong>
          &nbsp; <a :href="resource.url"> {{ resource.description }} </a>
        </li>
        <hr>
      </ul>
  </div>
</template>

<script>
import { getResources, removeResource } from '../services/api';

export default {
  data() {
    return {
      resources: null,
      error: null
    };
  },
  props: ['user', 'onRemove'],
  created() {
    getResources()
      .then(resources => {
        this.resources = resources;
      })
      .catch(err => {
        this.error = err;
      });
  },
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.resource.id) : this.onUpVote(this.resource.id);
    },
    handleRemove(id) {
      if(confirm('Are you sure you want to delete?')) {
        return removeResource(id)
          .then(()=> {
            const index = this.resource.findIndex(resource => resource.id === id);
            if(index === -1) return;
            this.resource.splice(index, 1);
          });
      }
    },

  },
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