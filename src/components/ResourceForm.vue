<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <FormControl label="Title">
        <input type="text"
          placeholder="Title" required
          v-model="edit.title">
      </FormControl>
      <FormControl label="Category">
        <select v-model="edit.categoryID" class="category-select">
          <option disabled value="" selected>Please choose a category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id">
            {{ category.category }}
          </option>
        </select>
      </FormControl>

      <FormControl label="Description">
        <textarea rows="8" cols="40" required
          v-model="edit.description"></textarea>
      </FormControl>

      <FormControl label="URL">
        <input placeholder="URL" required
          v-model="edit.url">
      </FormControl>

      <FormControl>
        <button type="submit">Submit</button>
        <button
          v-if="onCancel"
          @click.prevent="handleClose">
          Cancel
        </button>
      </FormControl>
    </form>
    <!-- <pre>{{ error }}</pre> -->
  </section>
</template>

<script>
const initResource = () => {
  return {
    title: '',
    categoryID: '',
    description: '',
    url: '',
  };
};
import FormControl from './FormControl';
export default {
  data() {
    return {
      edit: this.resource ? Object.assign({}, this.resource) : initResource()
    };
  },
  components: {
    FormControl
  },
  methods: {
    handleSubmit() {
      return this.onEdit(this.edit)
        .then(() => {
          this.edit = this.resource ? Object.assign({}, this.resource) : initResource();
        });
    },
    handleClose() {
      this.edit = this.resource ? Object.assign({}, this.resource) : initResource();
      this.onCancel();
    }
  },
  props: ['onEdit', 'onCancel', 'resource', 'categories']
};
</script>

<style>

</style>
