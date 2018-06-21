<template>
  <li>
    <div v-if="!updating">
      <!-- <button
        :class="{ upvoted: votedPost }"
        @click="handleVote">⬆️</button> -->
      <h3>( {{ resource.upvotes }} ) {{ resource.title }}</h3>
      <p>{{ resource.text }}</p>
      <h6>Submitted by {{ resource.firstName }} {{ resource.lastName }}</h6>
      <p><strong> {{ resource.title }} </strong>&nbsp; <a :href="resource.url"> {{ resource.description }} </a></p>
      <p></p>
      <p>Web Link: {{ resource.url }}</p>
      <button>💬</button>
      <button>⭐</button>
      <button v-if="user.id === resource.authorID" @click="onRemove(resource.id)">❌</button>
      <button v-if="user.id === resource.authorID" @click="updating = true">✏️</button>
    </div>
    <ResourceForm
      v-if="updating"
      :onCancel="handleCancel"
      :onEdit="handleUpdate"
      :resource="resource"
      />
  </li>
</template>

<script>
// import resourceForm from './resourceForm';
export default {
  data() {
    return {
      updating: false
    };
  },
  props: ['resource', 'user', 'onRemove'],
  // computed: {
  //   votedPost() {
  //     if(this.votes) {
  //       const votedPostIDs = this.votes.map(v => v.postID);
  //       return votedPostIDs.includes(this.resource.id);
  //     }
  //   }
  // },
  methods: {
    // handleVote() {
    //   this.votedPost ? this.onNoVote(this.resource.id) : this.onUpVote(this.resource.id);
    // },
    
    // handleCancel() {
    //   this.updating = false;
    // },
    // handleUpdate(toUpdate) {
    //   return this.onUpdate(toUpdate)
    //     .then(() => {
    //       this.updating = false;
    //     });
    // }
  },
  components: {
    // ResourceForm
  }
};


</script>

<style>
li {
  margin: 30px;
}

h3 {
  margin: 0px;
}

.upvoted {
  border: 5px solid red;
}
</style>
