<template>
  <div>
    <h1>Daily Home Page</h1>
    <section>
      <p>Dont' take things too seriously!</P>
      <img :src="humor[2].url"
        :key="humor.id"
        >
    </section>

    <section>
      <div>
        <form id="entry-form">
          <h2>Create An Account</h2>

        <input type="text" id="userName">
        </form>
      </div>
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
