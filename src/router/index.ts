import { createRouter, createWebHistory } from "vue-router";

const MainPage = () => import("@/pages/index.vue");
const ContactsPage = () => import("@/pages/Contacts/index.vue");

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/contacts",
      name: "ContactsPage",
      component: ContactsPage,
    },
  ],
});
