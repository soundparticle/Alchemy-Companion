<template>
<div>
  <div id="signup">
    <div class="signup-header">
    <h2>{{ label }}</h2>
  </div>
  </div>
    <div class="auth-form">
      <h3>
      <a href="" @click.prevent="type = isSignUp ? 'signIn' : 'signUp'">
        {{
          isSignUp
          ? "Already a User? &nbsp; Sign in"
          : "New Users Click Here to Sign up"
        }}
      </a>
      </h3>
      <br>
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
      <pre> {{ error }} </pre>
    </div>
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

#signup {
  display: grid;
  grid-template-columns: 20px 50px auto 50px 20px;
  grid-template-rows: 5px 40px 40px auto 40px 20px;
}
.signup-header {
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
.auth-form > h3 > a {
  text-decoration: none;
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
.auth-form {
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgb(208, 232, 240);
  border-radius: 15px;
  max-width: 350px;
  margin: auto;
}
pre {
  color: red;
}
</style>
