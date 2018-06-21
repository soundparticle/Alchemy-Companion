<template>
  <div>
    <div id="resources">
      <div class="resources-header">
        <h3>Coding Resources</h3>
        <button @click="adding = !adding">Click Here to Share!</button>
      </div>
      <pre v-if="error">{{ error }}</pre>
      <ResourceForm v-if="adding" :onEdit="handleAdd"/>
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
  </div>
</template>

<script>
import {
  getResources,
  removeResource
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
        return removeResource(id)
          .then(()=> {
            const index = this.resource.findIndex(resource => resource.id === id);
            if(index === -1) return;
            this.resource.splice(index, 1);
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