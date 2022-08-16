import Perfil from "../views/Perfil.vue";
import Feed from "@/views/Feed.vue";
import Forum from "@/views/Forum.vue";
import Formularios from "@/views/Formularios"

export default [
  {
    path: "/Perfil",
    name: "Perfil",
    component: Perfil,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/forum",
    name: "Forum",
    component: Forum,
  },
  {
    path: "/formularios",
    name: "Formularios",
    component: Formularios,
  },
  {
    path: "*",
    redirect: { name: "Feed" },
  },
];
