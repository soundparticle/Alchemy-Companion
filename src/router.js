import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Workspaces from './components/Workspaces.vue';
import Advice from './components/Advice.vue';
import AddAdvice from './components/AddAdvice.vue';
import Resources from './components/Resources.vue';
import Dashboard from './components/Dashboard.vue';
import UserPosts from './components/UserPosts.vue';
import UserFavorites from './components/UserFavorites.vue';
import AppInfo from './components/AppInfo.vue';
import Us from './components/Us.vue';
import AuthForm from './components/AuthForm.vue';

export default new VueRouter({

  routes: [
    { path: '/', component: Home },
    { path: '/about',
      component: About,
      children: [
        { path: 'app', component: AppInfo },
        { path: 'us', component: Us },
        { path: '', redirect: 'app' }
      ]
    },
    { path: '/workspaces', component: Workspaces },
    { path: '/advice',
      component: Advice,
      children: [
        { path: 'add', component: AddAdvice }
      ]
    },
    { path: '/resources', component: Resources },
    { path: '/dashboard', component: Dashboard },
      // children: [
      //   { path: 'posts', component: UserPosts },
        // { path: 'favorites', component: UserFavorites },
        // { path: '', redirect: 'favorites' }
    //   ]
    // },
    { path: '/auth', component: AuthForm }
  ]
});


