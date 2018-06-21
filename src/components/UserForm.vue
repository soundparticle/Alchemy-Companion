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
        </FormControl>
        <FormControl>
          <button @click.prevent="onCancel">Cancel</button>
        </FormControl>
      </form>
    {{ userInfo }}
    </div>
</template>

<script>
import FormControl from './FormControl';
export default {
  data() {
    return {
      edit: this.userInfo ? Object.assign({}, this.userInfo) : {
        firstName: '',
        lastName: '',
        email: '',
        githubProfile: '',
        classworkRepo: '',
        linkedin: ''
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
  props: ['onEdit', 'onCancel', 'userInfo']
};
</script>

<style>

</style>

