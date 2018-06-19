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
        <button type="submit">{{ label }}</button>
        <button
          v-if="onCancel"
          @click="onCancel">
          Cancel
        </button>
      </FormControl>
    </form>
    <pre>{{ error }}</pre>
  </section>
</template>

<script>
import FormControl from './FormControl';
const initAdvice = () => {
  return {
    title: '',
    text: ''
  };
};
export default {
  components: {
    FormControl
  },
  props: {
    
  }


};
</script>

<style>

</style>
