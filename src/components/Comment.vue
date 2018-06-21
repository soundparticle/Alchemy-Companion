<template>
<div>
  <p>{{ comment.text }}</p>
  <p>- {{ comment.firstName }} {{ comment.lastName }}</p>
  <hr>
</div>
</template>

<script>
export default {
  props: ['comment']
};
</script>

<style>

</style>
