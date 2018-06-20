<template>
  <div v-if="userInfo">
    <h1>Welcome to your Dashboard, {{ userInfo.firstName }}. </h1>

    <section id="external-links">

      <a :href="userInfo.githubProfile"><img src="../assets/githubLogo.png"></a><br>

      <a :href="userInfo.classworkRepo"><img src="../assets/acl-logo.png"></a><br>

      <a :href="userInfo.linkedin"><img src="../assets/linkedin.png"></a><br>

    </section>

    <section id="saved-posts">
      <ul v-if="savedAdvice">
        <h2>Advice</h2>
        <li v-for="advice in savedAdvice" :key="advice.id">
          <h3>{{ advice.title }}</h3>
          <p>{{ advice.text }}</p>
          <h4>{{ advice.firstName }} {{ advice.lastName }}</h4>
          <button @click="handleDelete(advice.id)" type="submit">Remove</button>
        </li>
      </ul>

      <ul v-if="savedResources">
        <h2>Resources</h2>
        <li v-for="resource in savedResources" :key="resource.id">
          <h3>{{ resource.title }}</h3>
          <p>{{ resource.description }}</p>
          <a :href="resource.url">Go to external link</a>
          <h4>{{ resource.firstName }} {{ resource.lastName }}</h4>
          <button>Remove</button>
        </li>
      </ul>

      <ul v-if="savedWorkspaces">
        <h2>Workspaces</h2>
        <li v-for="workspace in savedWorkspaces" :key="workspace.id">
          <h3>{{ workspace.title }}</h3>
          <p>{{ workspace.workspaceType }}</p>
          <p>{{ workspace.description }}</p>
          <p>{{ workspace.address }}</p>
          <a :href="workspace.url">Go to external link</a>
          <h4>{{ workspace.firstName }} {{ workspace.lastName }}</h4>
          <button>Remove</button>

          {{ workspace.id }}
          
        </li>
      </ul>

    </section>
  </div>
</template>

<script>

import { getUser, getSavedAdvice, getSavedResources, getSavedWorkspaces } from '../services/api';

export default {
  data() {
    return {
      userInfo: null,
      savedAdvice: null,
      savedResources: null,
      savedWorkspaces: null,
      error: null
    };
  },

  created() {
    getUser(this.user.id)
      .then(info => {
        this.userInfo = info;
      }),
    getSavedAdvice(this.user.id)
      .then(advice => {
        this.savedAdvice = advice;
      }),
    getSavedResources(this.user.id)
      .then(resources => {
        this.savedResources = resources;
      }),
    getSavedWorkspaces(this.user.id)
      .then(workspaces => {
        this.savedWorkspaces = workspaces;
      })
      .catch(err => {
        this.error = err;
      });
  },

  methods: {
     handleDelete(id) {
      return deleteSaved(id)
        .then(() => {
          get()
            .then(cocktails => {
              this.cocktails = cocktails;
            });
        });
    },

  props: ['user'],

};

</script>

<style scoped>

ul {
  list-style-type: none;
}

#external-links {
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
  padding: 30px;
  border-style: solid;
  border-radius: 10px;
}

#saved-posts {
  display: flex;
  justify-content: space-evenly;
}

img {
  width: 150px;
}




</style>
