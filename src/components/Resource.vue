<template>
  <div>
    <li>
      <div id="resource-grid">
        <div class="votes">
          <button v-if="user" :class="{ upvoted: votedPost }" @click="handleVote">
            <font-awesome-icon class="icon-arrow" icon="arrow-circle-up" />
          </button>
          <p class="vote-number">{{ resource.upvotes }}</p>
        </div>
        <div class="resource-title">
          <h3><a :href="resource.url" target="_blank">{{ resource.title }}</a></h3>
          <h4>{{ category }}</h4>
        </div>
        <div class="resource-description">
          <p>{{ resource.description }}</p>
          <h6 class="resource-submitted">Submitted by {{ resource.firstName }} {{ resource.lastName }}</h6>
        </div>
        <div class="user-controls" v-if="user">
          <button v-if="user.id === resource.authorID" @click="onRemove(resource.id)">
            <font-awesome-icon class="icon" icon="trash-alt" />
          </button>
          <button v-if="user.id === resource.authorID" @click="showModal">
            <font-awesome-icon class="icon" icon="edit" />
          </button>
        </div>
        <div class="always-buttons">
          <div>
            <button @click="showComments = !showComments">
              <font-awesome-icon class="icon" icon="comment-dots" />
            </button>
            <h4>{{ commentCount }}</h4>
          </div>
          <button @click="handleSave" :class="{ hide: !user }" :disabled="savedPost">
            <font-awesome-icon class="icon" icon="star" />
          </button>
        </div>
      </div>
      <ModalTemplate
        v-show="isModalVisible"
        @close="closeModal"
      >
        <h2 slot="header">Edit Post</h2>
        <ResourceForm slot="body"
          :onCancel="closeModal"
          :onEdit="handleUpdate"
          :resource="resource"
          :categories="categories"
        />
      </ModalTemplate>
      <Comments
        v-if="showComments"
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
import ModalTemplate from './ModalTemplate';
export default {
  data() {
    return {
      showComments: false,
      isModalVisible: false
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
        return savedPostIDs.includes(this.resource.id);
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
    handleUpdate(toUpdate) {
      return this.onUpdate(toUpdate)
        .then(() => {
          this.closeModal();
        });
    },
    handleSave() {
      return this.onSave(this.resource.id)
        .then(saved => {
          this.savedPosts.push(saved);
        });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  components: {
    ResourceForm,
    Comments,
    ModalTemplate
  }
};
</script>


<style scoped>
#resource-grid {
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

.resource-title {
  grid-area: title;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
}

.resource-description {
  font-family: 'Slabo 27px', serif;
  grid-area: content;
  margin-right: 10px;
}

.resource-submitted {
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

h6 {
  margin: 10px 0px;
}

h4 {
  margin: 0px;
}
</style>
