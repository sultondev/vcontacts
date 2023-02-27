import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import { useUserStore } from "@/store/userStore";
const Layout = () => import("@/layout/layout.vue");
const DashboardPage = () => import("@/pages/Dashboard/index.vue");
const MainPage = () => import("@/pages/index.vue");
const ContactsPage = () => import("@/pages/Contacts/index.vue");
const TagsPage = () => import("@/pages/Tags/index.vue");
const RegisterPage = () => import("@/pages/Auth/Register.vue");
const LoginPage = () => import("@/pages/Auth/Login.vue");
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/registration",
      name: "RegisterPage",
      component: RegisterPage,
      meta: {
        requiresAuth: true,
      },
      beforeEnter: hideForAuth,
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
      meta: {
        requiresAuth: true,
      },
      beforeEnter: hideForAuth,
    },
    {
      path: "",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/",
      name: "MainLayout",
      component: Layout,
      children: [
        {
          path: "/dashboard",
          name: "DashboardPage",
          component: DashboardPage,
        },
        {
          path: "/contacts",
          name: "ContactsPage",
          component: ContactsPage,
        },
        {
          path: "/tags",
          component: TagsPage,
        },
      ],
      meta: {
        requiresAuth: true,
      },
      beforeEnter: guardAuth,
    },
  ],
});

function guardAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: any
) {
  const userStore = useUserStore();
  // userStore.checkAuth();
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not to redirect to login page.
    if (!localStorage.getItem("token")) {
      next({ name: "LoginPage" });
    }
    // else if (userStore.user) {
    //   next();
    // }
    else {
      next(); // go to wherever I'm going
    }
  } else {
    next();
  }
}

function hideForAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // const userStore = useUserStore();
  if (
    (to.path === "/login" || to.path === "/registration") &&
    localStorage.getItem("token")
  ) {
    next("/dashboard");
  } else {
    next();
  }
}
