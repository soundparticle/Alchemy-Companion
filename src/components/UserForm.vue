<template>
    <div>

     <form @submit.prevent="handleSubmit">
        <FormControl label="First Name">
          <input v-model="edit.firstName"/>
        </FormControl>
        <FormControl label="Last Name">
          <input v-model="edit.lastName">
        </FormControl>
        <FormControl label="Email Address">
          <input v-model="edit.email">
        </FormControl>
        <FormControl label="GitHub Profile Link">
          <input v-model="edit.githubProfile">
        </FormControl>
        <FormControl label="Bootcamp Repo Link">
          <input v-model="edit.classworkRepo">
        </FormControl>
        <FormControl label="LinkedIn Link">
          <input v-model="edit.linkedin">
        </FormControl>
        <FormControl>
          <button type="submit">Submit</button>
          <button @click.prevent="onCancel">Cancel</button>
        </FormControl>
      </form>
    </div>
</template>

<script>

import FormControl from './FormControl';
export default {
  data() {
    return {
      edit: Object.assign({}, this.userInfo)
    };
  },
  components: {
    FormControl
  },
  methods: {
    handleSubmit() {
      return this.onEdit(this.edit)
        .then(() => {
          this.edit = Object.assign({}, this.userInfo);
        });
    },
    handleClose() {
      this.edit = Object.assign({}, this.userInfo);
      this.onCancel();
    }
  },
  props: ['onEdit', 'onCancel', 'userInfo']
};
</script>

<style>

</style>

