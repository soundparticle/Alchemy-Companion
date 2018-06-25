<template>
  <div>
    <div v-if="!updating">
      <p>{{ comment.text }}</p>
      <p>- {{ comment.firstName }} {{ comment.lastName }}</p>
      <div class="comment-buttons" v-if="user">
        <button v-if="user.id === comment.authorID" @click="onRemove(comment.id)"><font-awesome-icon class="icon" icon="trash-alt" /></button>
        <button v-if="user.id === comment.authorID" @click="updating = true"><font-awesome-icon class="icon" icon="edit" /></button>
      </div>
    </div>
    <CommentForm
      v-if="updating"
      :comment="comment"
      :onCancel="handleCancel"
      :onEdit="handleUpdate"
    />
    <hr>
  </div>
</template>

<script>
import CommentForm from './CommentForm';
export default {
  data() {
    return {
      updating: false
    };
  },
  props: ['comment', 'user', 'onRemove', 'onEdit'],
  components: {
    CommentForm
  },
  methods: {
    handleCancel() {
      this.updating = false;
    },
    handleUpdate(comment) {
      this.onEdit(comment)
        .then(this.updating = false);
    }
  }
};
</script>

<style scoped>

button {
  background-color: transparent;
  border: transparent;
}

.icon {
  font-size: 1.5em;
}
</style>
