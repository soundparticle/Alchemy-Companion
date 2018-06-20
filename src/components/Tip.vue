<template>
  <li>
    <div v-if="!updating">
      <button
        v-if="user"
        :class="{ upvoted: votedPost }"
        @click="handleVote">⬆️</button>
      <h3>( {{ tip.upvotes }} ) {{ tip.title }}</h3>
      <p>{{ tip.text }}</p>
      <h6>Submitted by {{ tip.firstName }} {{ tip.lastName }}</h6>
      <div v-if="user">
        <button @click="handleSave" :disabled="savedPost === 'saved'">{{ savedPost }}</button>
        <button v-if="user.id === tip.authorID" @click="onRemove(tip.id)">❌</button>
        <button v-if="user.id === tip.authorID" @click="updating = true">✏️</button>
      </div>
    </div>
    <AdviceForm
      v-if="updating"
      :onCancel="handleCancel"
      :onEdit="handleUpdate"
      :tip="tip"
      />
  </li>
</template>

<script>
import AdviceForm from './AdviceForm';
export default {
  data() {
    return {
      updating: false,
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
    'onSave'
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
        //return savedPostIDs.includes(this.tip.id);
        return savedPostIDs.includes(this.tip.id) ? 'saved' : '⭐';
      }
    }
  },
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.tip.id) : this.onUpVote(this.tip.id);
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
      return this.onSave(this.tip.id)
        .then(saved => {
          this.savedPosts.push(saved);
        });
    }
  },
  components: {
    AdviceForm
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
  border: 5px solid red;
}
</style>
