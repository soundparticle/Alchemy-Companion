<template>
  <div>
    <h1>Workspace Resources Page</h1>
  <pre v-if="error">{{ error }}</pre>
    <ul v-if="workspaces">
      <li v-for="location in workspaces"
        :key="location.id"
        >
        <hr>
        Tip from: {{ location.first_name }} &nbsp; <strong>{{ location.title }} </strong> &nbsp; is a {{ location.workspace_type }}
        <p></p>
        Located at {{ location.address }} : &nbsp; <em> {{location.description}} </em>
      </li>
      <hr>
    </ul>
  </div>
</template>

<script>
import { getWorkspaces } from '../services/api';

export default {
  data() {
    return {
      workspaces: null,
      error: null
    };
  },
  created() {
    getWorkspaces()
      .then(workspaces => {
        this.workspaces = workspaces;
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
