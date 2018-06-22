<template>
  <div>
    <Comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :user="user"
      :onRemove="handleRemove"
      :onEdit="handleUpdate"
    />

    <button v-if="!adding && user" type="submit" @click="adding=true">Add Comment</button>
    <CommentForm v-if="adding"
      :onEdit="handleAdd"
      :onCancel="handleCancel"
    />
  </div>
</template>

<script>
import Comment from './Comment';
import CommentForm from './CommentForm';
import { getAdviceComments, getResourcesComments, getWorkspacesComments, addComment, removeComment, updateComment } from '../services/api';
export default {
  data() {
    return {
      comments: null,
      adding: false
    };
  },
  created() {
    if(this.tableID === 1) {
      getAdviceComments(this.postID)
        .then(comments => {
          this.comments = comments;
        });
    } else if(this.tableID === 2) {
      getResourcesComments(this.postID)
        .then(comments => {
          this.comments = comments;
        });
    } else if(this.tableID === 3) {
      getWorkspacesComments(this.postID)
        .then(comments => {
          this.comments = comments;
        });
    }
    else return;
  },

  methods: {
    handleAdd(comment) {
      comment.postID = this.postID;
      comment.tableID = this.tableID;
      comment.authorID = this.user.id;
      return addComment(comment)
        .then(saved => {
          this.adding = false;
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          this.comments.push(saved);
        });
    },
    handleRemove(id) {
      return removeComment(id)
        .then(() =>
          this.comments = this.comments.filter(c => c.id !== id)
        );
    },
    handleUpdate(comment) {
      return updateComment(comment)
        .then(saved => {
          saved.firstName = this.user.firstName;
          saved.lastName = this.user.lastName;
          const index = this.comments.findIndex(c => c.id === saved.id);
          if(index === -1) return;
          this.comments.splice(index, 1, saved);
        });
    },
    
    handleCancel() {
      this.adding = false;
    },
  },
  components: {
    Comment,
    CommentForm
  },
  props: ['postID', 'tableID', 'user']
};
</script>

<style>

</style>
