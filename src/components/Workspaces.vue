<template>
  <div>
    <h1>Workspace Resources Page</h1>
  <pre v-if="error">{{ error }}</pre>
    <ul v-if="workspaces">
      <li v-for="location in workspaces"
        :key="location.id"
        :onRemove="handleRemove"
        >
        <hr>
        <h3> ( {{ location.upvotes }} ) </h3> &nbsp; Tip from {{ location.first_name }}: &nbsp; <strong>{{ location.title }} </strong> &nbsp; is a {{ location.workspace_type }}
        <p></p>
        Located at {{ location.address }} : &nbsp; <em> {{location.description}} </em>
      </li>
      <hr>
    </ul>
  </div>
</template>

<script>
import { getWorkspaces, removeWorkspace } from '../services/api';

export default {
  data() {
    return {
      workspaces: null,
      error: null
    };
  },
  props: ['user'],
  created() {
    getWorkspaces()
      .then(workspaces => {
        this.workspaces = workspaces;
      })
      .catch(err => {
        this.error = err;
      });
  },

  handleRemove(id) {
    if(confirm('Are you sure you want to delete?')) {
      return removeWorkspace(id)
        .then(()=> {
          const index = this.workspace.findIndex(tip => tip.id === id);
          if(index === -1) return;
          this.workspace.splice(index, 1);
        });
    }
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
