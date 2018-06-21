<template>
  <li>
    <div v-if="!updating">
      <!-- <button
        :class="{ upvoted: votedPost }"
        @click="handleVote">⬆️</button> -->
      <h3>( {{ location.upvotes }} ) {{ location.title }}</h3>
      <p>{{ location.text }}</p>
      <h6>Submitted by {{ location.firstName }} {{ location.lastName }}</h6>
      <p><strong>{{ location.title }} </strong>&nbsp; is a {{ location.workspace_type }} </p>
      <p></p>
      <p>Located at {{ location.address }} : &nbsp; <em> {{location.description}} </em></p>
      <button>💬</button>
      <button>⭐</button>
      <button v-if="user.id === location.authorID" @click="onRemove(location.id)">❌</button>
      <button v-if="user.id === location.authorID" @click="updating = true">✏️</button>
    </div>
    <LocationForm
      v-if="updating"
      :onCancel="handleCancel"
      :onEdit="handleUpdate"
      :location="location"
      />
  </li>
</template>

<script>
// import LocationForm from './LocationForm';
export default {
  data() {
    return {
      updating: false
    };
  },
  props: ['location', 'user', 'onRemove'],
  // computed: {
  //   votedPost() {
  //     if(this.votes) {
  //       const votedPostIDs = this.votes.map(v => v.postID);
  //       return votedPostIDs.includes(this.location.id);
  //     }
  //   }
  // },
  methods: {
    // handleVote() {
    //   this.votedPost ? this.onNoVote(this.location.id) : this.onUpVote(this.location.id);
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
    // LocationForm
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
