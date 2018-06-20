<template>
  <div>
    <h1>Advice Page</h1>
    <nav>
      <router-link to="/advice/add"> Add Advice </router-link>
    </nav>
      <router-view :onAdd="handleAdd"></router-view>
    <pre v-if="error">{{ error }}</pre>
    <ul v-if="advice">
      <Tip  v-for="tip in advice"
        :key="tip.id"
        :tip="tip"
        :user="user"
        :onRemove="handleRemove"
        :votes="votes"
        :savedPosts="savedPosts"
        :onSave="handleSave"
        :onUpVote="handleUpVote"
        :onNoVote="handleNoVote"
        :onUpdate="handleUpdate"
      />

      <hr>
    </ul>
  </div>
</template>

<script>
import {
  getAdvice,
  addAdvice,
  updateAdvice,
  removeAdvice,
  getVotes,
  noVote,
  upVote,
  savePost,
  getSavedAdvice
} from '../services/api';
import Tip from './Tip';


export default {
  data() {
    return {
      advice: null,
      votes: null,
      error: null,
      savedPosts: null
    };
  },
  props: ['user'],
  created() {
    getAdvice()
      .then(advice => {
        this.advice = advice;
      })
      .catch(err => {
        this.error = err;
      });
    if(this.user) {
      getVotes(this.user.id)
        .then(votes => {
          this.votes = votes;
        });
      getSavedAdvice(this.user.id)
        .then(saved => {
          this.savedPosts = saved;
        });
    }
  },
  methods: {
    handleAdd(advice) {
      advice.authorID = this.user.id;
      return addAdvice(advice)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          saved.upvotes = 0;
          this.advice.push(saved);
          this.$router.push('/advice');
        });
    },
    handleUpdate(advice) {
      return updateAdvice(advice)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          const index = this.advice.findIndex(tip => tip.id === saved.id);
          if(index === -1) return;
          saved.upvotes = this.advice[index].upvotes;
          this.advice.splice(index, 1, saved);
        });
    },
    handleRemove(id) {
      if(confirm('Are you sure you want to delete?')) {
        return removeAdvice(id)
          .then(()=> {
            const index = this.advice.findIndex(tip => tip.id === id);
            if(index === -1) return;
            this.advice.splice(index, 1);
          });
      }
    },
    handleUpVote(id) {
      const vote = {
        postID: id,
        userID: this.user.id,
        tableID: 1
      };
      return upVote(vote)
        .then(saved => {
          this.votes.push(saved);
          this.advice[id].upvote++;
        });
    },
    handleNoVote(id) {
      const index = this.votes.findIndex(vote => vote.postID === id);
      return noVote(this.votes[index].id)
        .then(()=> {
          this.votes.splice(index, 1);
          this.advice[id].upvote--;
        });
    },
    handleSave(id) {
      const post = {
        postID: id,
        userID: this.user.id,
        tableID: 1
      };
      return savePost(post);
    }
  },
  components: {
    Tip
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
