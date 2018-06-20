<template>
  <div>
    <h1>Workspace Resources Page</h1>
    <pre v-if="error">{{ error }}</pre>
    <ul v-if="location">
      <li v-for="location in workspaces"
        :key="location.id"
        :onRemove="handleRemove"
        >
        <button
          :class="{ upvoted: votedPost }"
          @click="handleVote">⬆️</button>
        <hr>
        <h3> ( {{ location.upvotes }} ) </h3>
        <button>💬</button>
        <button>⭐</button>
        <button v-if="user.id === location.authorID" @click="onRemove(location.id)">❌</button>
        <button v-if="user.id === location.authorID">✏️</button>
        &nbsp; location from {{ location.first_name }}:
        &nbsp; <strong>{{ location.title }} </strong>
        &nbsp; is a {{ location.workspace_type }}
        <p></p>
        Located at {{ location.address }} : &nbsp; <em> {{location.description}} </em>
      </li>
      <hr>
    </ul>
  </div>
</template>

<script>
import { getWorkspaces, removeLocation } from '../services/api';

export default {
  data() {
    return {
      workspaces: null,
      location: null,
      error: null
    };
  },
  props: ['user', 'onRemove'],
  created() {
    getWorkspaces()
      .then(workspaces => {
        this.workspaces = workspaces;
      })
      .catch(err => {
        this.error = err;
      });
  },
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.location.id) : this.onUpVote(this.location.id);
    },
    handleRemove(id) {
      if(confirm('Are you sure you want to delete?')) {
        return removeLocation(id)
          .then(()=> {
            const index = this.location.findIndex(location => location.id === id);
            if(index === -1) return;
            this.location.splice(index, 1);
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
