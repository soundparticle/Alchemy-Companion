import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.component('modal', {
  template: '#modal-template'
}),


new Vue({
  data: {
    showModal: false
  },
  router,
  render: h => h(App)
}).$mount('#app');


