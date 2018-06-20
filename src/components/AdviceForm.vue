<template>
  <section>
    <h1>{{ edit }}</h1>
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
        <button type="submit">{{ label }}</button>
        <!-- <button
          v-if="onCancel"
          @click="onCancel">
          Cancel
        </button> -->
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
      edit: {
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
  props: ['onEdit', 'label']
};
</script>

<style>

</style>
