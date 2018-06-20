<template>
  <li>
    <button
      :class="{ upvoted: votedPost }"
      @click="handleVote">⬆️</button>
    <h3>( {{ tip.upvotes }} ) {{ tip.title }}</h3>
    <p>{{ tip.text }}</p>
    <h6>Submitted by {{ tip.firstName }} {{ tip.lastName }}</h6>
    <button>⭐</button>
    <button v-if="user.id === tip.authorID" @click="onRemove(tip.id)">❌</button>
    <button v-if="user.id === tip.authorID">✏️</button>
  </li>
</template>

<script>
export default {
  props: ['tip', 'user', 'onRemove', 'votes', 'onUpVote', 'onNoVote'],
  computed: {
    votedPost() {
      if(this.votes) {
        const votedPostIDs = this.votes.map(v => v.postID);
        return votedPostIDs.includes(this.tip.id);
      }
    }
  },
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.tip.id) : this.onUpVote(this.tip.id);
    }
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
