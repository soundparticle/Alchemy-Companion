<template>
  <div>
    <button v-if="!adding" type="submit" @click="adding=true">Add Comment</button>
    <Comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />

    <CommentForm v-if="adding"
      :onCancel="handleCancel"
    />
  </div>
</template>

<script>
import Comment from './Comment';
import CommentForm from './CommentForm';
import { getComments, addComment } from '../services/api';
export default {
  data() {
    return {
      comments: null,
      adding: false
    };
  },
  created() {
    getComments(this.postID)
      .then(comments => {
        this.comments = comments;
      });
  },

  methods: {
    handleAdd(comment) {
      // add properties
      return addComment(comment)
        .then(saved => {
          this.comments.push(saved);
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
  props: ['postID']
};
</script>

<style>

</style>
