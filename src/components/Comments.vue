<template>
  <div>
    <Comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import Comment from './Comment';
import { getComments } from '../services/api';
export default {
  data() {
    return {
      comments: null
    };
  },
  created() {
    getComments(this.postID)
      .then(comments => {
        this.comments = comments;
      });
  },
  components: {
    Comment
  },
  props: ['postID']
};
</script>

<style>

</style>
