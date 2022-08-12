<template>
  <div>
    <div v-for="(category, index) in categorys" :key="category.id">
      <b-row>
        <b-col>
          <h5 style="color: #0b4f6c" @click="toggleCollapsed(index)">
            <i class="fas fa-list fa-fw" />
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
  </div>
</template>

<script>
import PostsList from "@/components/Feed/PostsList";
import NewPost from "@/components/Feed/NewPost";
export default {
  name: "ForumList",
  components: {
    PostsList,
    NewPost,
  },
  data() {
    return {
      categorys: [],
      nextPage: null,
      collapsed: [true],
    };
  },
  methods: {
    atualizarLista(index) {
      this.$refs["forum-" + index].limparEListarPostsFollowing();
    },
    toggleCollapsed: function (i) {
      this.$set(this.collapsed, i, !this.collapsed[i]);
    },
    listarCategorysFollowing() {
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
    listarCategorysFollowingNext() {
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
    this.listarCategorysFollowing(this.userPerfilID);
  },
  async mounted() {
    this.listarCategorysFollowingNext();
    await this.$store.dispatch("getUsuario");
    this.user = this.$store.getters.getUser;
  },
};
</script>

<style>
</style>