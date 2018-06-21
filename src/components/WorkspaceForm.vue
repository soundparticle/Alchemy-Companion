<template>
    <div>

      <form v-if="adding" @submit.prevent="handleAdd">
        <FormControl>
          <input placeholder="Name" v-model="workspace.title" required>
        </FormControl>
        <FormControl>
          <input placeholder="Address" v-model="workspace.address" required>
        </FormControl>
        <FormControl>
          <select v-model="workspace.workspaceType">
            <option disabled>Select Workspace Type</option>
            <option value="Bar">Bar</option>
            <option value="Cafe">Cafe</option>
            <option value="Other">Other</option>
          </select>
        </FormControl>
        <FormControl>
          <input placeholder="Website URL" v-model="workspace.url">
        </FormControl>
        <FormControl>
          <textarea rows="8" cols="60" placeholder="Add Description" v-model="workspace.description" required></textarea>
        </FormControl>
        <FormControl>
          <button>Submit</button>
        </FormControl>
        <FormControl>
          <button @click="adding = false">Cancel</button>
        </FormControl>

      </form>
    </div>
</template>

<script>
import FormControl from './FormControl';
export default {
  data() {
    return {
      edit: this.tip ? Object.assign({}, this.tip) : {
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
    }
  },
  props: ['onEdit', 'onCancel', 'workspace']
};
</script>

<style>

</style>
