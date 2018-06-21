<template>
  <div>
    <h1>Coding Resources</h1>


      <pre v-if="error">{{ error }}</pre>
      <ul v-if="resources">
        <Resource v-for="resource in resources"
          :key="resource.id"
          :resource="resource"
          :user="user"
          :onRemove="handleRemove"
          />
          <hr>
      </ul>
  </div>
</template>

<script>
import {
  getResources,
  removeResources
} from '../services/api';
import Resource from './Resource';

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
  },
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.resource.id) : this.onUpVote(this.resource.id);
    },
    handleRemove(id) {
      if(confirm('Are you sure you want to delete?')) {
        return removeResources(id)
          .then(()=> {
            const index = this.resources.findIndex(resource => resource.id === id);
            if(index === -1) return;
            this.resources.splice(index, 1);
          });
      }
    }
  },
  components: {
    Resource
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