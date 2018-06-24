<template>
  <div>
    <FormControl label="Comment">
      <textarea name="text" rows="8" cols="60" required
        v-model="edit.text"
      >
      </textarea>
    </FormControl>
    <button type="submit" @click.prevent="onEdit(edit)">Submit</button>
    &nbsp;
    <button @click="onCancel">Cancel</button>
  </div>
</template>

<script>
import FormControl from './FormControl';
export default {
  data() {
    return {
      edit: this.comment ? Object.assign({}, this.comment) : { text: '' }
    };
  },
  components: {
    FormControl
  },
  props: ['onCancel', 'onEdit', 'comment']
};
</script>

<style>

</style>
