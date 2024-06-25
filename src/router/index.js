import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/main.vue'),
      redirect: '/layoutIndex',
      children: [
        {
          path: '/layoutIndex',
          component: () => import('@/views/layout/index.vue')
        },
        { path: '/music', component: () => import('@/views/layout/music.vue') },
        {
          path: '/musicList',
          component: () => import('@/views/layout/musicList.vue')
        }
      ]
    },
    { redirect: '/login' },
    { path: '/login', component: () => import('@/views/login/login.vue') }
  ]
})

export default router
