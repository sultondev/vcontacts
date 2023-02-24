import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/pages/index.vue";
import ContactsPage from "@/pages/Contacts/index.vue";

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
