import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import UserContacts from '@/components/UserContacts.vue'
import AddContac from '@/components/AddContac.vue'
import ProfileUser from '@/components/ProfileUser.vue'
import UserFeeds from '@/components/UserFeeds.vue'
import UpdateContact from '@/components/UpdateContact.vue'
import HomeContact from '@/components/HomeContact.vue'
import LoginForm from '@/components/LoginForm.vue'
import DasboardContact from '@/components/DasboardContact.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeContact,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DasboardContact,
      meta: {
         requiresAuth: true
      }
    },
     {
      path: '/login',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterForm,
    },
     {
      path: '/profile',
      name: 'profile',
      component: ProfileUser,
    },
     {
      path: '/contacts',
      name: 'contacts',
      component: UserContacts,
    },
         {
      path: '/update/:_id',
      name: 'update',
      component: UpdateContact,
    },
    {
      path: '/feed',
      name: 'feed',
      component: UserFeeds,
    },
    {
      path: '/addcontacts',
      name: 'addcontacts',
      component: AddContac,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});



export default router
