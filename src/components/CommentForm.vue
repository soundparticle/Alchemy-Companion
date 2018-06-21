<template>
  <div>
    <h1>Add comment</h1>

    <textarea rows="8" cols="60" v-model="edit.text"></textarea>
    <button type="submit">Submit</button>
    &nbsp;
    <button @click="onCancel">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: {
        text: ''
      }
    };
  },

  props: ['onCancel']
};
</script>

<style>

</style>
