<template>
<div>
  <li>
    <div id="resource-grid" v-if="!updating">
      <button
        v-if="user"
        :class="{ upvoted: votedPost }"
        @click="handleVote"
        >
        ⬆️
      </button>
      <h4 class="resource-votes">{{ resource.upvotes }}</h4>
      <h4 class="resource-title">
        <a :href="resource.url">{{ resource.title }}</a>
      </h4>
      <h4>{{ category }}</h4>
      <p class="resource-description">{{ resource.description }}</p>
      <h6>Submitted by {{ resource.firstName }} {{ resource.lastName }}</h6>

      <div class="resource-buttons" v-if="user">
        <button @click="showComments = !showComments">💬</button>
        <button @click="handleSave" :disabled="savedPost === 'saved'">{{ savedPost }}</button>
        <button v-if="user.id === resource.authorID" @click="onRemove(resource.id)">❌</button>
        <button v-if="user.id === resource.authorID" @click="updating = true">✏️</button>
      </div>
    </div>
    <ResourceForm
      v-if="updating"
      :onCancel="handleCancel"
      :onEdit="handleUpdate"
      :resource="resource"
      :categories="categories"
    />
    <Comments v-if="showComments"
    :postID="resource.id"
    :user="user"
    :tableID=2
    />
  </li>
</div>
</template>

<script>
import ResourceForm from './ResourceForm';
import Comments from './Comments';
export default {
  data() {
    return {
      updating: false,
      showComments: false
    };
  },
  props: [
    'resource',
    'categories',
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
        return votedPostIDs.includes(this.resource.id);
      }
    },
    category() {
      if(!this.categories) return;
      const category = this.categories.find(c => c.id === this.resource.categoryID);
      return category ? category.category : 'Unknown';
    },
    savedPost() {
      if(this.savedPosts) {
        const savedPostIDs = this.savedPosts.map(s => s.postID);
        return savedPostIDs.includes(this.resource.id) ? 'saved' : '⭐';
      }
    }
  },
  methods: {
    handleVote() {
      this.votedPost ? this.onNoVote(this.resource.id) : this.onUpVote(this.resource.id);
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
      return this.onSave(this.resource.id)
        .then(saved => {
          this.savedPosts.push(saved);
        });
    }
  },
  components: {
    ResourceForm,
    Comments
  }
};


</script>

<style scoped>
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
