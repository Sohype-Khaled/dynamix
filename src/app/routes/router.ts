import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/app/modules/HomeView.vue"),
  },
  {
    path: "/alerts",
    name: "Alerts",
    component: () => import("@/app/modules/alerts/AlertView.vue"),
  },
  {
    path: "/buttons",
    name: "Buttons",
    component: () => import("@/app/modules/buttons/ButtonView.vue"),
  },
  {
    path: "/listing",
    name: "Listing",
    component: () => import("@/app/modules/listing/ListingView.vue"),
  },
  {
    path: '/dialogs',
    name: 'Modals',
    component: () => import('@/app/modules/dialogs/DialogsView.vue')
  },
  {
    path: '/inputs',
    name: 'Inputs',
    component: () => import('@/app/modules/inputs/InputView.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/app/modules/chat/ChatView.vue')
  },
  {
    path: '/lightbox',
    name: 'Lightbox',
    component: () => import('@/app/modules/lightbox/LightboxView.vue')
  },


]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
