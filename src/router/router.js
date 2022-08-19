import Perfil from "../views/Perfil.vue";
import Feed from "@/views/Feed.vue";
import Forum from "@/views/Forum.vue";
import Formularios from "@/views/Formularios";
import Groups from "@/views/Groups";

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
    path: "/grupos",
    name: "Grupos",
    component: Groups,
  },
  {
    path: "*",
    redirect: { name: "Feed" },
  },
];
