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
        <button type="submit">Submit</button>
        <button @click.prevent="handleClose">
          Cancel
        </button>
      </FormControl>
    </form>
  </section>
</template>

<script>

const initAdvice = () => {
  return {
    title: '',
    text: ''
  };
};

import FormControl from './FormControl';
export default {
  data() {
    return {
      edit: this.tip ? Object.assign({}, this.tip) : initAdvice()
    };
  },
  components: {
    FormControl
  },
  methods: {
    handleSubmit() {
      return this.onEdit(this.edit)
        .then(() => {
          this.edit = this.tip ? Object.assign({}, this.tip) : initAdvice();
        });
    },
    handleClose() {
      this.edit = this.tip ? Object.assign({}, this.tip) : initAdvice();
      this.onCancel();
    }
  },
  props: ['onEdit', 'onCancel', 'tip']
};
</script>

<style>

</style>
