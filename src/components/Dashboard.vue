<template>
  <div>
    <div id="dashbord" v-if="userInfo">
      <div class="dash-header">
        <h3>Welcome to your Dashboard, {{ userInfo.firstName }}. </h3>
        <button  @click="showModal">Edit Profile</button>
      </div>

      <div>
        <ModalTemplate
          v-show="isModalVisible"
          @close="closeModal"
        >
        <h2 slot="header">Update Profile</h2>
        <UserForm slot="body"
          :onCancel="closeModal"
          :onEdit="handleUpdate"
          :userInfo="userInfo"
        />
      </ModalTemplate>
      </div>

      <section id="external-links">
        <a :href="userInfo.githubProfile" target="_blank"><button class="btn"><img class="button-img" src="../assets/githubLogo.png">Your GitHub</button></a>
        <a :href="userInfo.classworkRepo" target="_blank"><button class="btn"><img class="button-img" src="../assets/acl-logo.png">Class GitHub</button></a>
        <a :href="userInfo.linkedin" target="_blank"><button class="btn"><img class="button-img" src="../assets/linkedin.png">LinkedIn</button></a>
      </section>
      <br>

      <section id="saved-posts">
        <div id="saved-items">
          <ul v-if="savedAdvice">
            <h2>Advice</h2>
            <li v-for="advice in savedAdvice" :key="advice.id">
              <p class="post-title">{{ advice.title }}</p>
              <div class="post-item">
              <p>{{ advice.text }}</p>
              <p class="submitted">Submitted by {{ advice.firstName }} {{ advice.lastName }} &nbsp; <button @click="handleDelete(advice.id)" type="submit">Remove</button></p>
            </div>
            </li>
          </ul>
        </div>
        <div id="saved-items">
          <ul v-if="savedResources">
            <h2>Resources</h2>
            <li v-for="resource in savedResources" :key="resource.id">
              <p class="post-title">{{ resource.title }}</p>
              <div class="post-item">
                <p>{{ resource.description }}</p>
                <a :href="resource.url">Go to external link</a>
                <p class="submitted">Submitted by {{ resource.firstName }} {{ resource.lastName }} &nbsp; <button @click="handleDelete(resource.id)" type="submit">Remove</button></p>
              </div>
            </li>
          </ul>
        </div>
        <div id="saved-items">
          <ul v-if="savedWorkspaces">
            <h2>Workspaces</h2>
            <li v-for="workspace in savedWorkspaces" :key="workspace.id">
              <p class="post-title">{{ workspace.title }}</p>
              <div class="post-item">
              <p>{{ workspace.description }}</p>
              <p>A {{ workspace.workspaceType }} at {{ workspace.address }}</p>
              <a :href="workspace.url">Go to external link</a>
              <p class="submitted">Submitted by {{ workspace.firstName }} {{ workspace.lastName }} &nbsp; <button @click="handleDelete(workspace.id)" type="submit">Remove</button></p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import UserForm from './UserForm';
import ModalTemplate from './ModalTemplate';


import {
  getUser,
  getSavedAdvice,
  getSavedResources,
  getSavedWorkspaces,
  deleteSaved,
  updateUser
} from '../services/api';

export default {
  name: 'app',
  data() {
    return {
      isModalVisible: false,
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleDelete(id) {
      return deleteSaved(id)
        .then(() => {
          if(this.savedAdvice.findIndex(advice => advice.id === id) > -1) {
            let index = this.savedAdvice.findIndex(advice => advice.id === id);
            this.savedAdvice.splice(index, 1);
          }
          else if(this.savedResources.findIndex(resource => resource.id === id) > -1) {
            let index = this.savedResources.findIndex(resource => resource.id === id);
            this.savedResources.splice(index, 1);
          }
          else if(this.savedWorkspaces.findIndex(workspace => workspace.id === id) > -1) {
            let index = this.savedWorkspaces.findIndex(workspace => workspace.id === id);
            this.savedWorkspaces.splice(index, 1);
          }
          else return;
        });
    },
    handleUpdate(userEdit) {
      return updateUser(userEdit)
        .then(saved => {
          this.userInfo = saved;
          this.closeModal();

        });
    },
  },
  props: ['user'],

  components: {
    UserForm,
    ModalTemplate
  }

};

</script>

<style scoped>

.dash-header {
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
  margin-top: 5px;
  margin-bottom: 50px;
  color: white;
}
.post-title {
  font-size: 1.5em;
  background: #2c3e50;
  color: white;
  text-align: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-bottom: 5px;
}
.post-item {
  display: flex;
  flex-direction: column;
  background: rgb(208, 232, 240);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  margin-bottom: 5px;
  text-align: center;
}
h3 {
  line-height: 0%;
}
.submitted {
  font-size: .5em;
}
ul {
  list-style-type: none;
}
.button-img {
  width: 25px;
  margin-right: 10px;
}
#external-links {
  display: flex;
  justify-content: space-evenly;
}

#saved-posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  margin-right: 40px;
}

img {
  width: 150px;
}
.btn {
  display: flex;
  -webkit-border-radius: 10;
  -moz-border-radius: 10;
  border-radius: 10px;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  background: #3498db;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  cursor: pointer;
}
a {
  cursor:pointer;
  text-decoration: none;
}
.btn:hover {
  background: #3cb0fd;
  text-decoration: none;
}
</style>
