<template>
<div>
  <li>
    <div id="workspace-grid" v-if="!updating">
      <button
        v-if="user"
        :class="{ upvoted: votedPost }"
        @click="handleVote"><font-awesome-icon class="icon-arrow" icon="arrow-circle-up" /></button>
      <h4 class="workspace-votes">{{ workspace.upvotes }}</h4>
      <h4 class="workspace-title"><a :href="workspace.url">{{ workspace.title }}</a></h4>
      <p class="workspace-description">{{ workspace.description }} <br> ({{ workspace.workspaceType }} located at: {{ workspace.address }})</p>
      <h6 class="workspace-submitted">Submitted by {{ workspace.firstName }} {{ workspace.lastName }}</h6>

      <div class="workspace-buttons" v-if="user">
        <button @click="showComments = !showComments"><font-awesome-icon class="icon" icon="comment-dots" /></button>
        <button @click="handleSave" :disabled="savedPost === 'saved'"><font-awesome-icon class="icon" icon="star" /></button>
        <button v-if="user.id === workspace.authorID" @click="onRemove(workspace.id)"><font-awesome-icon class="icon" icon="trash-alt" /></button>
        <button v-if="user.id === workspace.authorID" @click="updating = true"><font-awesome-icon class="icon" icon="edit" /></button>
      </div>
    </div>
    <WorkspaceForm
      v-if="updating"
      :onCancel="handleCancel"
      :onEdit="handleUpdate"
      :workspace="workspace"
    />
    <Comments v-if="showComments"
    :postID="workspace.id"
    :user="user"
    :tableID=2
    />
  </li>
</div>
</template>

<script>
import WorkspaceForm from './WorkspaceForm';
import Comments from './Comments';
export default {
  data() {
    return {
      updating: false,
      showComments: false
    };
  },
  props: [
    'workspace',
    'user',
    'onRemove',
    'votes',
    'onUpVote',
    'onNoVote',
    'onUpdate',
    'savedPosts',
    'onSave'
  ],
  computed: {
    votedPost() {
      if(!this.votes) return;
      const votedPostIDs = this.votes.map(v => v.postID);
      return votedPostIDs.includes(this.workspace.id);
    },
    savedPost() {
      if(this.savedPosts) {
        const savedPostIDs = this.savedPosts.map(s => s.postID);
        return savedPostIDs.includes(this.workspace.id) ? 'saved' : '⭐';
      }
    }
  },
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.workspace.id) : this.onUpVote(this.workspace.id);
    },
    handleCancel() {
      this.updating = false;
    },
    handleUpdate(toUpdate) {
      return this.onUpdate(toUpdate)
        .then(() => {
          this.updating = false;
        });
    },
    handleSave() {
      return this.onSave(this.workspace.id)
        .then(saved => {
          this.savedPosts.push(saved);
        });
    }
  },
  components: {
    WorkspaceForm,
    Comments
  }
};


</script>

<style scoped>
#workspace-grid {
  display: grid;
  grid-template-columns: .5fr 1fr 1.5fr 5fr 1fr 1fr;
  grid-template-rows: auto;
  margin-top: 15px;
  color: rgb(49, 49, 49);
  background: rgb(208, 232, 240);
  border-radius: 15px;
}
.workspace-votes {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upvoted {
  color: rgb(0, 207, 0);
}
.workspace-title {
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.workspace-description {
  font-family: 'Slabo 27px', serif;
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
}
.workspace-submitted {
  font-family: 'Slabo 27px', serif;
  grid-column-start: 5;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.workspace-buttons {
  grid-column-start: 6;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
}
button {
    background-color: transparent;
    border: transparent;
}
.icon-arrow {
  font-size: 2em;
}
.icon {
  font-size: 1.5em;
}
</style>
