import Vue from "vue";
import VueRouter from "vue-router";
import header from "../components/AppHeader";
import footer from "../components/AppFooter";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "signIn" */ "../views/SignIn.vue"),
  },

  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "signIn" */ "../views/Logout.vue"),
  },

  {
    path: "/team",
    name: "Team",
    components: {
      header,
      default: () =>
        import(/* webpackChunkName: "shop" */ "../views/protected/Team.vue"),
      footer,
    },
  },

  {
    path: "/team/:id",
    name: "TeamPlayers",
    components: {
      header,
      default: () =>
        import(/* webpackChunkName: "shop" */ "../views/protected/Player.vue"),
      footer,
    },
  },

  {
    path: "/player",
    name: "Player",
    components: {
      header,
      default: () =>
        import(/* webpackChunkName: "shop" */ "../views/protected/Player.vue"),
      footer,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
