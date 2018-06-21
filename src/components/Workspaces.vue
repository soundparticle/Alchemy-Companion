<template>
  <div>
     <div id="workspaces">
      <div class="workspaces-header">
        <h3>Workspaces</h3>
        <button @click="adding = !adding">Add Workspace</button>
      </div>
      <pre v-if="error">{{ error }}</pre>
      <WorkspaceForm
        v-if="adding"
        :onEdit="handleAdd"
        :onCancel="handleCancel"
        />
      <ul class="workspaces-list" v-if="workspaces">
        <Workspace class="workspace" v-for="workspace in workspaces"
          :key="workspace.id"
          :workspace="workspace"
          :user="user"
          :onRemove="handleRemove"
          :votes="votes"
          :savedPosts="savedPosts"
          :onSave="handleSave"
          :onUpVote="handleUpVote"
          :onNoVote="handleNoVote"
          :onUpdate="handleUpdate"
          />
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getWorkspaces,
  addWorkspace,
  updateWorkspace,
  removeWorkspace,
  getVotes,
  noVote,
  upVote,
  savePost,
  getSavedWorkspaces
} from '../services/api';
import Workspace from './Workspace';
import WorkspaceForm from './WorkspaceForm';

export default {
  data() {
    return {
      workspaces: null,
      votes: null,
      error: null,
      savedPosts: null,
      adding: false
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

    if(this.user) {
      getVotes(this.user.id)
        .then(votes => {
          this.votes = votes;
        });
      getSavedWorkspaces(this.user.id)
        .then(saved => {
          this.savedPosts = saved;
        });
    }
  },
  methods: {
    handleAdd(workspace) {
      workspace.authorID = this.user.id;
      return addWorkspace(workspace)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          saved.upvotes = 0;
          this.workspaces.push(saved);
          this.adding = false;
          this.$router.push('/workspaces');
        });
    },
    handleUpdate(workspace) {
      return updateWorkspace(workspace)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          const index = this.workspaces.findIndex(r => r.id === saved.id);
          if(index === -1) return;
          saved.upvotes = this.workspaces[index].upvotes;
          this.workspaces.splice(index, 1, saved);
        });
    },
    handleRemove(id) {
      if(confirm('Are you sure you want to delete?')) {
        return removeWorkspace(id)
          .then(()=> {
            this.workspaces = this.workspaces.filter(r => r.id !== id);
          });
      }
    },
    handleUpVote(id) {
      const vote = {
        postID: id,
        userID: this.user.id,
        tableID: 3
      };
      return upVote(vote)
        .then(saved => {
          this.votes.push(saved);
          const index = this.workspaces.findIndex(r => r.id === saved.postID);
          this.workspaces[index].upvotes++;
        });
    },
    handleNoVote(id) {
      const index = this.votes.findIndex(vote => vote.postID === id);
      return noVote(this.votes[index].id)
        .then(()=> {
          this.votes.splice(index, 1);
          const index2 = this.workspaces.findIndex(r => r.id === id);
          this.workspaces[index2].upvotes--;
        });
    },
    handleSave(id) {
      const post = {
        postID: id,
        userID: this.user.id,
        tableID: 3
      };
      return savePost(post);
    },
    handleCancel() {
      this.adding = false;
    },
  },
  components: {
    Workspace,
    WorkspaceForm
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
