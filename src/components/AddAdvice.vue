<template>
  <section>
    <AdviceForm
      :on-edit="onAdd"/>
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

<style scoped>

</style>
