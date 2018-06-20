<template>
  <div>
    <div id="home">
    <h2>Welcome to Your Bootcamp Companion App</h2>
    <section class="daily-image" v-if="humor">
      <img :src="humor[todaysDate].url"
        :key="humor.id"
        >
    </section>
    </div>
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
#home {
  display: grid;
  grid-template-columns: 20px 50px auto 50px 20px;
  grid-template-rows: 5px 40px 40px auto 40px 20px;
}
h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 3;
  grid-column-end: span 1;
  grid-row-start: 2;
  grid-row-end: span 1;
}
.daily-image {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 3;
  grid-column-end: span 1;
  grid-row-start: 4;
  grid-row-end: span 1;
}
</style>
