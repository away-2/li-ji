import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
    path: '/',
    redirect: '/login',

  },
  {
    path: '/page',
    name: 'Page',
    component: () => import('../views/Page.vue'),
    children: [{
      path: '',
      redirect: '/page/home',
    }],
    children: [{
        path: 'home',
        name: 'Home',
        component: () => import('../views/pages/Home.vue'),
        // children:[{

        // }],

      },
      {
        path: 'gift',
        name: 'Gift',
        component: () => import('../views/pages/Gift.vue'),
      },
      {
        path: 'friend',
        name: 'Friend',
        component: () => import('../views/pages/Friend.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/pages/User.vue'),
        children:[
      ],
      },

    ],
  },
  {
    path: '/addGift',
    name: 'AddGift',
    component: () => import('../views/AddGift.vue'),
  },
  {
    path: '/giftItem',
    name: 'GiftItem',
    component: () => import('../views/GiftItem.vue'),
  },
  {
    path: '/addGiftItem',
    name: 'AddGiftItem',
    component: () => import('../views/AddGiftItem.vue'),
  },
  {
    path: '/itemDetail',
    name: 'itemDetail',
    component: () => import('../views/ItemDetail.vue'),
  },
  {
    path: '/toGift',
    name: 'ToGift',
    component: () => import('../views/ToGift.vue'),
  },
  {
    path: '/relationship',
    name: 'Relationship',
    component: () => import('../views/Relationship.vue'),
  },
  {      
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  
},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router