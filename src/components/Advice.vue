<template>
  <div>
    <div id="advice">
      <div class="advice-header">
        <h3>Smart Advice From Smart People.</h3>
        <router-link to="/advice/add"> Click Here to Share! </router-link>
      </div>
      <router-view class="advice-router" :onAdd="handleAdd"></router-view>
      <pre v-if="error">{{ error }}</pre>
      <ul class="advice-list" v-if="advice">
        <Tip class="each-Tip" v-for="tip in advice"
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
      </ul>
    </div>
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
#advice {
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

.advice-header {
  border-radius: 0px 0px 15px 15px;
  background: linear-gradient(270deg, #2c3e50, #2980b9);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 30s ease infinite;
  -moz-animation: AnimationName 30s ease infinite;
  animation: AnimationName 30s ease infinite;
  z-index: -5;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 2;
  grid-row-end: 2;
}
.advice-router {
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 4;
  grid-row-end: 4;
}
.advice-list {
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

ul {
  padding: 0;
  list-style-type: none;

}
pre {
  color: red;
}
h3 {
  color: white;
  display: inline;
}
</style>
