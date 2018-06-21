import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt, faCommentDots, faStar, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEdit, faTrashAlt, faCommentDots, faStar, faArrowCircleUp);

Vue.component('font-awesome-icon', FontAwesomeIcon);
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
  render: h => h(App),
  el: '#app',
  components: { App },
  template: '<App/>'
}).$mount('#app');


