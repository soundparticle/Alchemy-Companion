<template>
  <section>
    <AdviceForm
      :on-edit="onAdd"/>
      <h1>advice here</h1>
  </section>
</template>

<script>
import AdviceForm from './AdviceForm.vue';
export default {
  props: ['onAdd'],
  components: {
    AdviceForm
  }
};
</script>

<style>

</style>
