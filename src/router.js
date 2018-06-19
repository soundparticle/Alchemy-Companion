import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Workspaces from './components/Workspaces.vue';
import Advice from './components/Advice.vue';
import Resources from './components/Resources.vue';
import Dashboard from './components/Dashboard.vue';
import Frontend from './components/Frontend.vue';
import UserPosts from './components/UserPosts.vue';
import UserFavorites from './components/UserFavorites.vue';
import Backend from './components/Backend.vue';
import AddResource from './components/AddResource.vue';
import AppInfo from './components/AppInfo.vue';
import Us from './components/Us.vue';

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
    { path: '/advice', component: Advice },
    { path: '/resources',
      component: Resources,
      children: [
        { path: 'frontend', component: Frontend },
        { path: 'backend', component: Backend },
        { path: 'add', component: AddResource }
      ]
    },
    { path: '/dashboard',
      component: Dashboard,
      children: [
        { path: 'posts', component: UserPosts },
        { path: 'favorites', component: UserFavorites },
        { path: '', redirect: 'favorites' }
      ]
    },
  ]
});


