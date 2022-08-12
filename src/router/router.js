import Perfil from "../views/Perfil.vue";
import Feed from "@/views/Feed.vue";
import Forum from "@/views/Forum.vue";

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
    path: "*",
    redirect: { name: "Feed" },
  },
];
