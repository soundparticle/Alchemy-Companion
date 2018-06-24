<template>
  <div>
    <div id="resources">
      <div class="resources-header">
        <h3>Coding Resources to Make the Pain Go Away</h3>
        <button v-if="user" @click="showModal">Click Here to Share!</button>
      </div>

      <ModalTemplate
        v-show="isModalVisible"
        @close="closeModal"
      >
      <h2 slot="header">Submit Resource</h2>
      <ResourceForm slot="body"
        :onEdit="handleAdd"
        :categories="categories"
        :onCancel="closeModal"
        />
      </ModalTemplate>
      <section class="resources-list">
        <div class="filter">
          Filter:
          <select v-model="filter" class="category-select">
            <option disabled value="" selected>Filter by category</option>
            <option value="">None</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.category }}
            </option>
          </select>
        </div>
        <ul v-if="resources">
          <Resource class="resource"
            v-for="resource in filteredResources"
            :key="resource.id"
            :resource="resource"
            :user="user"
            :onRemove="handleRemove"
            :votes="votes"
            :savedPosts="savedPosts"
            :onSave="handleSave"
            :onUpVote="handleUpVote"
            :onNoVote="handleNoVote"
            :onUpdate="handleUpdate"
            :categories="categories"
            :comments="comments"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<script>

import {
  getResources,
  addResource,
  updateResource,
  removeResource,
  getResourcesVotes,
  noVote,
  upVote,
  savePost,
  getSavedResources,
  getResourceCategories,
  getCommentCount
} from '../services/api';
import Resource from './Resource';
import ResourceForm from './ResourceForm';
import ModalTemplate from './ModalTemplate';

export default {
  data() {
    return {
      isModalVisible: false,
      resources: null,
      votes: null,
      error: null,
      savedPosts: null,
      adding: false,
      categories: null,
      comments: null,
      filter: null
    };
  },
  props: ['user'],
  created() {
    getResourceCategories()
      .then(categories => {
        this.categories = categories;
      });
    getResources()
      .then(resources => {
        this.resources = resources;
      })
      .catch(err => {
        this.error = err;
      });
    getCommentCount(2)
      .then(comments => {
        this.comments = comments;
      });
    if(this.user) {
      getResourcesVotes(this.user.id)
        .then(votes => {
          this.votes = votes;
        });
      getSavedResources(this.user.id)
        .then(saved => {
          this.savedPosts = saved;
        });
    }
  },
  computed: {
    filteredResources() {
      if(this.resources && this.filter) {
        return this.resources.filter(r => r.categoryID === this.filter);
      }
      else return this.resources;
    }
  },
  methods: {
    handleAdd(resource) {
      resource.authorID = this.user.id;
      return addResource(resource)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          saved.upvotes = 0;
          this.resources.push(saved);
          this.isModalVisible = false;
          this.adding = false;
          this.$router.push('/resources');
        });
    },
    handleUpdate(resource) {
      return updateResource(resource)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          const index = this.resources.findIndex(r => r.id === saved.id);
          if(index === -1) return;
          saved.upvotes = this.resources[index].upvotes;
          this.resources.splice(index, 1, saved);
        });
    },
    handleRemove(id) {
      if(confirm('Are you sure you want to delete?')) {
        return removeResource(id)
          .then(()=> {
            this.resources = this.resources.filter(r => r.id !== id);
          });
      }
    },
    handleUpVote(id) {
      const vote = {
        postID: id,
        userID: this.user.id,
        tableID: 2
      };
      return upVote(vote)
        .then(saved => {
          this.votes.push(saved);
          const index = this.resources.findIndex(r => r.id === saved.postID);
          this.resources[index].upvotes++;
        });
    },
    handleNoVote(id) {
      const index = this.votes.findIndex(vote => vote.postID === id);
      return noVote(this.votes[index].id)
        .then(()=> {
          this.votes.splice(index, 1);
          const index2 = this.resources.findIndex(r => r.id === id);
          this.resources[index2].upvotes--;
        });
    },
    handleSave(id) {
      const post = {
        postID: id,
        userID: this.user.id,
        tableID: 2
      };
      return savePost(post);
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  components: {
    Resource,
    ResourceForm,
    ModalTemplate
  }
};
</script>

<style scoped>
#resources {
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

.resources-header {
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

.resources-router {
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 4;
  grid-row-end: 4;
}

.resources-list {
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

pre {
  color: red;
}

h3 {
  color: white;
  display: inline;
}

.filter {
  margin-top: 20px;
  align-self: flex-start;
}
</style>