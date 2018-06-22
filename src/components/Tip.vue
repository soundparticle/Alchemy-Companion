<template>
<div>
  <li>
    <div id="tip-grid">
      <div class="votes">
        <button
          v-if="user"
          :class="{ upvoted: votedPost }"
          @click="handleVote"><font-awesome-icon class="icon-arrow" icon="arrow-circle-up" /></button>
        <p class="vote-number">{{ tip.upvotes }}</p>
      </div>
      <div class="tip-title">
        <h3>{{ tip.title }}</h3>
      </div>
      <div class="tip-text">
        <p>{{ tip.text }}</p>
        <h6 class="tip-submitted">Submitted by {{ tip.firstName }} {{ tip.lastName }}</h6>
      </div>
      <div class="user-controls" v-if="user">
        <button v-if="user.id === tip.authorID" @click="onRemove(tip.id)"><font-awesome-icon class="icon" icon="trash-alt" /></button>
        <button v-if="user.id === tip.authorID" @click="showModal"><font-awesome-icon class="icon" icon="edit" /></button>
      </div>
      <div class="always-buttons">
        <button @click="showComments = !showComments"><font-awesome-icon class="icon" icon="comment-dots" /></button>
        <h4> {{ commentCount }} </h4>
        <button @click="handleSave" :class="{ hide: !user }" :disabled="savedPost === 'saved'"><font-awesome-icon class="icon" icon="star" /></button>
      </div>
    </div>
    <ModalTemplate
      v-show="isModalVisible"
      @close="closeModal"
    >
      <h2 slot="header">Edit Advice</h2>
      <AdviceForm slot="body"
        :onEdit="handleUpdate"
        :onCancel="closeModal"
        :tip="tip"
      />
    </ModalTemplate>
    <Comments v-if="showComments"
    :postID="tip.id"
    :user="user"
    :tableID=1
    />
  </li>
</div>

</template>

<script>
import AdviceForm from './AdviceForm';
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
    'tip',
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
      if(this.votes) {
        const votedPostIDs = this.votes.map(v => v.postID);
        return votedPostIDs.includes(this.tip.id);
      }
    },
    savedPost() {
      if(this.savedPosts) {
        const savedPostIDs = this.savedPosts.map(s => s.postID);
        return savedPostIDs.includes(this.tip.id);
      }
    },
    commentCount() {
      if(this.comments) {
        const commentsPostIDs = this.comments.map(c => c.postID);
        if(commentsPostIDs.includes(this.tip.id)) {
          return this.comments.filter(c => c.postID === this.tip.id)[0].commentCount;
        }
        else return 0;
      }
    }
  },
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.tip.id) : this.onUpVote(this.tip.id);
    },
    handleUpdate(toUpdate) {
      return this.onUpdate(toUpdate)
        .then(() => {
          this.closeModal();
        });
    },
    handleSave() {
      return this.onSave(this.tip.id)
        .then(saved => {
          this.savedPosts.push(saved);
        });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  components: {
    AdviceForm,
    Comments,
    ModalTemplate
  }
};


</script>

<style scoped>


#tip-grid {
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
.tip-title {
  grid-area: title;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;

}
.tip-text {
  font-family: 'Slabo 27px', serif;
  grid-area: content;
  margin-right: 10px;
}
.tip-submitted {
  font-family: 'Slabo 27px', serif;
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
