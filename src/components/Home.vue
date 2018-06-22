<template>
  <div>
    <div id="home">
      <div class="home-header">
      <h2>Welcome to Your Bootcamp Companion App</h2>
      </div>
    <section class="img-holder" v-if="humor">
      <img class="daily-image" :src="humor[todaysDate].url"
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
      error: null,
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

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

#home {
  display: grid;
  grid-template-columns: 20px 50px auto 50px 20px;
  grid-template-rows: 5px 40px 40px auto 40px 20px;
}
.home-header {
  border-radius: 0px 0px 15px 15px;
  background: linear-gradient(270deg, #2c3e50, #2980b9);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 30s ease infinite;
  -moz-animation: AnimationName 30s ease infinite;
  animation: AnimationName 30s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  grid-column-start: 1;
  grid-column-end: span 5;
  grid-row-start: 2;
  grid-row-end: 2;
  color: white;
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
.img-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 3;
  grid-column-end: span 1;
  grid-row-start: 4;
  grid-row-end: span 1;
  background: rgb(208, 232, 240);
  padding: 50px;
  border-radius: 15px;
}
.daily-image {
  max-height: 500px;
  width: auto;
  
}
</style>
