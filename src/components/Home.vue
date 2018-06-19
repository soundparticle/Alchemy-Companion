<template>
  <div>
    <h1>Welcome to Your Bootcamp Companion App</h1>

    <section v-if="humor">
      <p>Dont' take things too seriously!</P>

      <img :src="humor[todaysDate].url"
        :key="humor.id"
        >
    </section>
  </div>
</template>

<script>
import { getHumor } from '../services/api';

export default {
  data() {
    return {
      humor: null,
      error: null
    };
  },
  computed: {
    todaysDate() {
      var d = new Date();
      var n = d.getDate();
      return n;
    }
  },
  created() {
    getHumor()
      .then(humor => {
        this.humor = humor;
      })
      .catch(err => {
        this.error = err;
      });
  }

};
</script>

<style>

</style>
