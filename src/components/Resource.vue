<template>
<div>
  <li>
    {{ comments }}
    <div id="resource-grid" v-if="!updating">
      <button
        v-if="user"
        :class="{ upvoted: votedPost }"
        @click="handleVote"><font-awesome-icon class="icon-arrow" icon="arrow-circle-up" /></button>
      <h4 class="resource-votes">( {{ resource.upvotes }} )</h4>
      <h4 class="resource-title"><a :href="resource.url" target="_blank">{{ resource.title }}</a></h4>
      <p class="resource-description"><strong>{{ category }} :</strong>&nbsp; {{ resource.description }}</p>
      <h6 class="resource-submitted">Submitted by {{ resource.firstName }} {{ resource.lastName }}</h6>

      <div class="resource-buttons" v-if="user">
        <button @click="showComments = !showComments"><font-awesome-icon class="icon" icon="comment-dots" /></button>
        <h4> {{ commentCount }} </h4>
        <button @click="handleSave" :disabled="savedPost === 'saved'"><font-awesome-icon class="icon" icon="star" /></button>
        <button v-if="user.id === resource.authorID" @click="onRemove(resource.id)"><font-awesome-icon class="icon" icon="trash-alt" /></button>
        <button v-if="user.id === resource.authorID" @click="updating = true"><font-awesome-icon class="icon" icon="edit" /></button>
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
    'onSave',
    'comments'
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
    },
    commentCount() {
      if(this.comments) {
        const commentsPostIDs = this.comments.map(c => c.postID);
        if(commentsPostIDs.includes(this.resource.id)) {
          return this.comments.filter(c => c.postID === this.resource.id)[0].commentCount;
        }
        else return 0;
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
#resource-grid {
  display: grid;
  grid-template-columns: .5fr 1fr 1.5fr 5fr 1fr 1fr;
  grid-template-rows: auto;
  margin-top: 15px;
  color: rgb(49, 49, 49);
  background: rgb(208, 232, 240);
  border-radius: 15px;
}
.resource-votes {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upvoted {
  color: rgb(0, 207, 0);
}
.resource-title {
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.resource-description {
  font-family: 'Slabo 27px', serif;
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
}
.resource-submitted {
  font-family: 'Slabo 27px', serif;
  grid-column-start: 5;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.resource-buttons {
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
.icon-arrow {
  font-size: 2em;
}
.icon {
  font-size: 1.5em;
}
</style>
