<template>
    <div>

      <form @submit.prevent="handleSubmit">
        <FormControl>
          <input placeholder="Name" v-model="edit.title" required>
        </FormControl>
        <FormControl>
          <input placeholder="Address" v-model="edit.address" required>
        </FormControl>
        <FormControl>
          <select v-model="edit.workspaceType">
            <option value="" disabled>Select Workspace Type</option>
            <option value="Bar">Bar</option>
            <option value="Cafe">Cafe</option>
            <option value="Other">Other</option>
          </select>
        </FormControl>
        <FormControl>
          <input placeholder="Website URL" v-model="edit.url">
        </FormControl>
        <FormControl>
          <textarea rows="8" cols="60" placeholder="Add Description" v-model="edit.description" required></textarea>
        </FormControl>
        <FormControl>
          <button>Submit</button>
          <button @click.prevent="handleCancel">Cancel</button>
        </FormControl>

      </form>
    </div>
</template>

<script>
import FormControl from './FormControl';
export default {
  data() {
    return {
      edit: this.workspace ? Object.assign({}, this.workspace) : {
        title: '',
        address: '',
        workspaceType: '',
        url: '',
        description: ''
      }
    };
  },
  components: {
    FormControl
  },
  methods: {
    handleSubmit() {
      this.onEdit(this.edit);
      this.edit = Object.assign({}, this.workspace);
    },
    handleCancel() {
      this.edit = Object.assign({}, this.workspace);
      this.onCancel();
    }
  },
  props: ['onEdit', 'onCancel', 'workspace']
};
</script>

<style>

</style>
