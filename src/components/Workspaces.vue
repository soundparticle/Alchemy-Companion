<template>
  <div>
    <h1>Workspace Resources Page</h1>
    <button @click="adding = true"
    <FormControl v-if="adding">
      <input placeholder="Workspace">
    </FormControl>


    <pre v-if="error">{{ error }}</pre>
    <ul v-if="workspaces">
      <Location v-for="location in workspaces"
        :key="location.id"
        :location="location"
        :user="user"
        :onRemove="handleRemove"
        />
        <hr>
    </ul>
  </div>
</template>

<script>
import {
  getWorkspaces,
  removeWorkspaces,
} from '../services/api';
import Location from './Location';
import FormControl from './FormControl';

export default {
  data() {
    return {
      workspaces: null,
      adding: false,
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
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.location.id) : this.onUpVote(this.location.id);
    },
    handleRemove(id) {
      if(confirm('Are you sure you want to delete?')) {
        return removeWorkspaces(id)
          .then(()=> {
            const index = this.workspaces.findIndex(location => location.id === id);
            if(index === -1) return;
            this.workspaces.splice(index, 1);
          });
      }
    }
  },
  components: {
    Location,
    FormControl
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
