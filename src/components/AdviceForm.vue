<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <FormControl label="Title">
        <input type="text"
          name="title" placeholder="Title" required
          v-model="edit.title">
      </FormControl>

      <FormControl label="Text">
        <textarea name="text" rows="8" cols="40" required
          v-model="edit.text"></textarea>
      </FormControl>

      <FormControl>
        <button type="submit" @click="handleSubmit">Submit</button>
        <button
          v-if="onCancel"
          @click.prevent="onCancel">
          Cancel
        </button>
      </FormControl>
    </form>
    <!-- <pre>{{ error }}</pre> -->
  </section>
</template>

<script>
import FormControl from './FormControl';
export default {
  data() {
    return {
      edit: this.tip ? Object.assign({}, this.tip) : {
        title: '',
        text: ''
      }
    };
  },
  components: {
    FormControl
  },
  methods: {
    handleSubmit() {
      this.onEdit(this.edit);
    }
  },
  props: ['onEdit', 'onCancel', 'tip']
};
</script>

<style>

</style>
