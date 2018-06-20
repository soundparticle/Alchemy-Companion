<template>
  <div>
    <li id="tip-grid">
      <button
        :class="{ upvoted: votedPost }"
        @click="handleVote">⬆️</button>
      <h4 class="tip-votes">( {{ tip.upvotes }} )</h4>
      <h4 class="tip-title">{{ tip.title }}</h4>
      <p class="tip-text">{{ tip.text }}</p>
      <h6 class="tip-submitted">Submitted by {{ tip.firstName }} {{ tip.lastName }}</h6>
      <div class="tip-buttons">
      <button>⭐</button>
      <button v-if="user.id === tip.authorID" @click="onRemove(tip.id)">❌</button>
      <button v-if="user.id === tip.authorID">✏️</button>
      </div>
    </li>
  </div>
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


#tip-grid {
  display: grid;
  grid-template-columns: .5fr 1fr 1.5fr 5fr 1fr 1fr;
  grid-template-rows: auto;
  margin-top: 15px;
  background: linear-gradient(270deg, #33cccc, steelblue);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 30s ease infinite;
  -moz-animation: AnimationName 30s ease infinite;
  animation: AnimationName 30s ease infinite;
  color: white;
  border-radius: 15px 15px 15px 15px;
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

.tip-votes {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upvoted {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tip-title {
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.tip-text {
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
}
.tip-submitted {
  grid-column-start: 5;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tip-buttons {
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
</style>
