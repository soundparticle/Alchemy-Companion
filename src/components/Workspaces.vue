<template>
  <div>
     <div id="workspaces">
      <div class="workspaces-header">
        <h3>Great Places to Work with Wifi and Ammeneties</h3>
        <button v-if="user" @click="showModal">Add Workspace</button>

      </div>
      <pre v-if="error">{{ error }}</pre>

    <ModalTemplate
      v-show="isModalVisible"
      @close="closeModal"
    >
      <h2 slot="header">Add Workspace</h2>
      <WorkspaceForm slot="body"
        :onCancel="closeModal"
        :onEdit="handleAdd"
      />
    </ModalTemplate>

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
  getWorkspacesVotes,
  noVote,
  upVote,
  savePost,
  getSavedWorkspaces
} from '../services/api';
import Workspace from './Workspace';
import WorkspaceForm from './WorkspaceForm';
import ModalTemplate from './ModalTemplate';

export default {
  data() {
    return {
      workspaces: null,
      votes: null,
      error: null,
      savedPosts: null,
      isModalVisible: false
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
      getWorkspacesVotes(this.user.id)
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleAdd(workspace) {
      workspace.authorID = this.user.id;
      return addWorkspace(workspace)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          saved.upvotes = 0;
          this.workspaces.push(saved);
          this.closeModal();
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
    }
  },
  components: {
    Workspace,
    WorkspaceForm,
    ModalTemplate
  }

};
</script>

<style scoped>
#workspaces {
  display: grid;
  grid-template-columns: 10px 50px auto 50px 20px;
  grid-template-rows: 5px 40px 5px auto auto 40px 20px;
}

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

.workspaces-header {
  border-radius: 0px 0px 15px 15px;
  background: linear-gradient(270deg, #2c3e50, #2980b9);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 30s ease infinite;
  -moz-animation: AnimationName 30s ease infinite;
  animation: AnimationName 30s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 2;
  grid-row-end: 2;
}
.workspaces-router {
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 4;
  grid-row-end: 4;
}
.workspaces-list {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  flex-direction: column;
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 5;
  grid-row-end: 5;
}
a {
  color: white;
  text-decoration: none;
  font-weight: bolder;
}
ul {
  padding: 0;
  list-style-type: none;
}
h3 {
  color: white;
  display: inline;
}
</style>
