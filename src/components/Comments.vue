<template>
  <div>
    <button type="submit">Add Comment</button>
    <Comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />

    <CommentForm />
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
      console.log(comment);
    }
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
