<template>
  <div>
    <b-row>
      <b-col>
        <h4>
          <i class="fas fa-list fa-fw" />
          <a><b> Fórum </b></a>
        </h4>
      </b-col>
      <b-col class="text-right mb-4">
        <b-btn
          @click="newForumAdd"
          pill
          style="background-color: #0b4f6c; color: white"
          size="lg"
        >
          Novo Fórum
        </b-btn>
      </b-col>
    </b-row>
    <div v-for="(category, index) in categorys" :key="category.id">
      <b-row>
        <b-col>
          <h5 style="color: #0b4f6c" @click="toggleCollapsed(index)">
            <a
              ><b> {{ category.name }} </b></a
            >
            <span v-if="collapsed[index]" class="fas fa-minus" />
            <span v-else class="fas fa-plus" />
          </h5>
        </b-col>

        <b-col class="text-right">
          <small style="color: #0b4f6c">
            <b> {{ category.participants_count }}</b>
            {{
              category.participants_count > 1 ? "participantes" : "participante"
            }}</small
          >

          <i
            v-if="category.created_by.id == user.id"
            @click="deleteCategory(category.id)"
            variant="danger"
            class="fas fa-trash danger ml-2"
          />
        </b-col>
      </b-row>
      <b-collapse v-model="collapsed[index]">
        <NewPost
          @atualizarPost="atualizarLista(index)"
          :categoryId="category.id"
        />
        <PostsList :ref="'forum-' + index" :categoryId="category.id" />
      </b-collapse>
    </div>
    <NewForum ref="new-forum" @salvar="salvar" />
  </div>
</template>

<script>
import PostsList from "@/components/Post/PostsList";
import NewPost from "@/components/Post/NewPost";
import NewForum from "@/components/Forum/NewForum";
export default {
  name: "ForumList",
  components: {
    PostsList,
    NewPost,
    NewForum,
  },
  data() {
    return {
      categorys: [],
      nextPage: null,
      collapsed: [],
      user: {},
    };
  },
  methods: {
    deleteCategory(id) {
      const vm = this;
      vm.$api
        .delete(`category/${id}/`)
        .then((resp) => {
          this.categorys = this.categorys.filter((p) => p.id != id);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    salvar(descricao) {
      const vm = this;
      let obj = {
        name: "Fórum ".toUpperCase() + descricao.toUpperCase(),
        is_active: true,
      };
      vm.$api.post(`/category/`, obj).then((resp) => {
        this.listarCategorys();
      });
    },
    newForumAdd() {
      this.$bvModal.show("new-forum");
      this.$refs["new-forum"].descricao = "";
    },
    atualizarLista(index) {
      this.$refs["forum-" + index].limparEListarPostsFollowing();
    },
    toggleCollapsed: function (i) {
      this.$set(this.collapsed, i, !this.collapsed[i]);
    },
    listarCategorys() {
      const vm = this;

      this.categorys = [];
      vm.$api
        .get(`category/?page=1&itens=5`)
        .then((resp) => {
          resp.data.results.forEach((p) => this.categorys.push(p));
          this.nextPage = resp.data.next;
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    loadMore() {
      this.$api.get(`${this.nextPage}`).then((resp) => {
        resp.data.results.forEach((p) => this.categorys.push(p));

        this.nextPage = resp.data.next;
      });
    },
    listarCategorysNext() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && this.nextPage) {
          this.loadMore();
        }
      };
    },
  },
  beforeMount() {
    this.listarCategorys(this.userPerfilID);
  },
  async mounted() {
    this.listarCategorysNext();
    await this.$store.dispatch("getUsuario");
    this.user = this.$store.getters.getUser;
  },
};
</script>

<style>
</style>