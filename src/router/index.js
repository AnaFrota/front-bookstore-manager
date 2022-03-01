import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const RoutePath = {
  HOME: "/",
  PUNLISHER: "/publisher",
  BOOK: "/book",
  RENT: "/rent",
  USER: "/user",
};
export default new Router({
  mode: "history",
  routes: [
    {
      path: RoutePath.HOME,
      name: "Home",
      component: () => import("@/views/DashboardView/DashboardView.vue"),
    },

    {
      path: RoutePath.PUNLISHER,
      name: "PublisherView",
      component: () => import("@/views/PublisherView/PublisherView.vue"),
    },

    {
      path: RoutePath.BOOK,
      name: "BookView",
      component: () => import("@/views/BookView/BookView.vue"),
    },

    {
      path: RoutePath.RENT,
      name: "RentView",
      component: () => import("@/views/RentView/RentView.vue"),
    },
    {
      path: RoutePath.USER,
      name: "UserView",
      component: () => import("@/views/UserView/UserView.vue"),
    },
  ],

  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export const RouteHandler = {
  goToPreviousPage(context) {
    return context.$router.go(-1);
  },

  goToDashboardPage(context) {
    goToRouteIfNotThereYet(context, RoutePath.DASHBOARD);
  },
};

const goToRouteIfNotThereYet = (context, route) => {
  if (context.$route.path != route) {
    context.$router.push(route);
  }
};
