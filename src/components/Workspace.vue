<template>
<div>
  <li>
    <div id="workspace-grid">
      <div class="votes">
        <button
          v-if="user"
          :class="{ upvoted: votedPost }"
          @click="handleVote"><font-awesome-icon class="icon-arrow" icon="arrow-circle-up" /></button>
          <p class="vote-number">{{ workspace.upvotes }}</p>
      </div>
      <div class="workspace-title">
        <h3><a :href="workspace.url" target="_blank">{{ workspace.title }}</a></h3>
        <h4>{{ workspace.workspaceType }}</h4>
      </div>
      <div class="workspace-description">
        <p>{{ workspace.description }}</p>
        <p>{{ workspace.address }}</p>
        <h6 class="workspace-submitted">Submitted by {{ workspace.firstName }} {{ workspace.lastName }}</h6>
      </div>

      <div class="user-controls" v-if="user">
        <button v-if="user.id === workspace.authorID" @click="onRemove(workspace.id)"><font-awesome-icon class="icon" icon="trash-alt" /></button>
        <button v-if="user.id === workspace.authorID" @click="showModal"><font-awesome-icon class="icon" icon="edit" /></button>
      </div>
      <div class="always-buttons">
        <div>
          <button @click="showComments = !showComments"><font-awesome-icon class="icon" icon="comment-dots" /></button>
          <h4>{{ commentCount }}</h4>
        </div>
        <button @click="handleSave" :class="{ hide: !user }" :disabled="savedPost"><font-awesome-icon class="icon" icon="star" /></button>
      </div>
    </div>

    <ModalTemplate
      v-show="isModalVisible"
      @close="closeModal"
    >
      <h2 slot="header">Edit Post</h2>
      <WorkspaceForm slot="body"
        :onCancel="closeModal"
        :onEdit="handleUpdate"
        :workspace="workspace"
      />
    </ModalTemplate>

    <Comments v-if="showComments"
    :postID="workspace.id"
    :user="user"
    :tableID=3
    />
  </li>
</div>
</template>

<script>

import WorkspaceForm from './WorkspaceForm';
import Comments from './Comments';
import ModalTemplate from './ModalTemplate';
export default {
  data() {
    return {
      showComments: false,
      isModalVisible: false
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
    'onSave',
    'comments'
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
        return savedPostIDs.includes(this.workspace.id);
      }
    },
    commentCount() {
      if(this.comments) {
        const commentsPostIDs = this.comments.map(c => c.postID);
        if(commentsPostIDs.includes(this.workspace.id)) {
          return this.comments.filter(c => c.postID === this.workspace.id)[0].commentCount;
        }
        else return 0;
      }
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleVote() {
      this.votedPost ? this.onNoVote(this.workspace.id) : this.onUpVote(this.workspace.id);
    },
    handleUpdate(toUpdate) {
      return this.onUpdate(toUpdate)
        .then(() => {
          this.closeModal();
        });
    },
    handleSave() {
      return this.onSave(this.workspace.id)
        .then(saved => {
          this.savedPosts.push(saved);
        });
    },
  },
  components: {
    WorkspaceForm,
    Comments,
    ModalTemplate
  }
};
</script>

<style scoped>
#workspace-grid {
  display: grid;
  grid-template: 40px auto / 2fr 20fr 1.5fr;
  grid-template-areas:
    "vote title user-controls"
    "vote content controls";
  margin-top: 15px;
  color: rgb(49, 49, 49);
  background: rgb(208, 232, 240);
  border-radius: 15px;
}

.upvoted {
  color: rgb(0, 207, 0);
}

.workspace-title {
  grid-area: title;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
}

.workspace-description {
  font-family: 'Slabo 27px', serif;
  grid-area: content;
  margin-right: 10px;
}

.workspace-submitted {
  font-family: 'Slabo 27px', serif;
}

button {
    background-color: transparent;
    border: transparent;
}

button[disabled] {
  cursor: default;
}

.icon-arrow {
  font-size: 2em;
}

.icon {
  font-size: 1.5em;
}

h6 {
  margin: 10px 0px;
}

h4 {
  margin: 0px;
}
</style>
