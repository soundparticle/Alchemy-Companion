<template>
<div>
  <li>
    <div id="workspace-grid" v-if="!updating">
      <button
        v-if="user"
        :class="{ upvoted: votedPost }"
        @click="handleVote"
        >
        ⬆️
      </button>
      <h4 class="workspace-votes">{{ workspace.upvotes }}</h4>
      <h4 class="workspace-title">
        <a :href="workspace.url">{{ workspace.title }}</a>
      </h4>
      <h4>{{ workspace.workspaceType }}</h4>
      <h4>{{ workspace.addresss }}</h4>
      <p class="workspace-description">{{ workspace.description }}</p>
      <h6>Submitted by {{ workspace.firstName }} {{ workspace.lastName }}</h6>

      <div class="workspace-buttons" v-if="user">
        <button @click="showComments = !showComments">💬</button>
        <button @click="handleSave" :disabled="savedPost === 'saved'">{{ savedPost }}</button>
        <button v-if="user.id === workspace.authorID" @click="onRemove(workspace.id)">❌</button>
        <button v-if="user.id === workspace.authorID" @click="updating = true">✏️</button>
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

<style>
li {
  margin: 30px;
}

h3 {
  margin: 0px;
}

.upvoted {
  background: green;
}
</style>
