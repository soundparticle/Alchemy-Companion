<template>
  <div class="auth-form">
    <h2>{{ label }}</h2>
    <h3>
      <pre> {{ error }} </pre>
      <a href="" @click.prevent="type = isSignUp ? 'signIn' : 'signUp'">
        {{
          isSignUp
          ? "Sign in"
          : "Sign up"
        }}
      </a>
    </h3>
    <form @submit.prevent="handleSubmit">
      <FormControl v-if="isSignUp" label="First Name">
        <input required type="text" v-model="credentials.firstName">
      </FormControl>
      <FormControl v-if="isSignUp" label="Last Name">
        <input required type="text" v-model="credentials.lastName">
      </FormControl>
      <FormControl label="Email Address">
        <input required type="text" v-model="credentials.email">
      </FormControl>
      <FormControl label="Password">
        <input required type="password" v-model="credentials.password">
      </FormControl>
      <FormControl v-if="isSignUp" label="Retype Password">
        <input required type="password" v-model="credentials.passwordAgain">
      </FormControl>
      <FormControl>
        <button type="submit"> {{ label }}</button>
      </FormControl>
    </form>
  </div>
</template>

<script>
import { signUp, signIn } from '../services/api';
import FormControl from './FormControl.vue';
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      credentials: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordAgain: ''
      },
      show: false,
      type: 'signIn',
      error: null
    };
  },
  props: ['onUser'],
  computed: {
    isSignUp() {
      return this.type === 'signUp';
    },
    label() {
      return this.isSignUp ? 'Sign Up' : 'Sign In';
    }
  },
  components: {
    FormControl
  },
  methods: {
    handleSubmit() {
      if(!emailRegex.test(this.credentials.email)) {
        this.error = 'Email not valid';
        return;
      }

      if(this.type === 'signUp' && this.password !== this.passwordAgain) {
        this.error = 'Passwords do not match';
        return;
      }

      this.error = null;
      const action = this.isSignUp ? signUp : signIn;
      action(this.credentials)
        .then(user => {
          this.onUser(user);
          this.$router.push('/');
        })
        .catch(err => this.error = err);
    }
  }
};
</script>

<style>
pre {
  color: red;
}
</style>
