
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/DashboardView"),
  },
  {
    path: "/editoras",
    component: () => import("../views/EditoraView"),
  },
  {
    path: "/usuarios",
    component: () => import("../views/UsuarioView"),
  },
  {
    path: "/livros",
    component: () => import("../views/LivroView"),
  },
  {
    path: "/alugueis",
    component: () => import("../views/AluguelView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;