<template>
  <div id="forum">
    <b-row>
      <b-col>
        <h4 style="color: #0b4f6c">
          <i class="fas fa-list fa-fw" />
          <a><b> Grupos </b></a>
        </h4>
      </b-col>
      <b-col class="text-right mb-4">
        <b-btn
          @click="newForumAdd"
          pill
          style="background-color: #0b4f6c; color: white"
          size="lg"
        >
          Novo Grupo
        </b-btn>
      </b-col>
    </b-row>
    <div v-for="(group, index) in groups" :key="group.id">
      <b-row>
        <b-col>
          <h5 style="color: #0b4f6c" @click="toggleCollapsed(index)">
            <a
              ><b> {{ group.title }} </b></a
            >
            <span
              v-if="collapsed[index] && atualUserParticipa(group)"
              class="fas fa-minus"
            />
            <span v-else class="fas fa-plus" />
          </h5>
        </b-col>

        <b-col class="text-right">
          <b> {{ group.participants_count }}</b>
          <small style="color: #0b4f6c">
            {{
              group.participants_count > 1 ? "participantes" : "participante"
            }}</small
          >

          <i
            v-if="
              (isAdmin || group.created_by.id == user.id) &&
              atualUserParticipa(group)
            "
            @click="deleteGroup(group.id)"
            variant="danger"
            class="fas fa-trash danger ml-2"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-btn
            size="sm"
            pill
            @click="joinOrUnJoinGroup(group, index)"
            :variant="
              atualUserParticipa(group) ? 'outline-danger' : 'outline-success'
            "
          >
            {{ atualUserParticipa(group) ? "Sair" : "Participar" }}
          </b-btn>
        </b-col></b-row
      >
      <b-collapse v-model="collapsed[index]">
        <NewPost
          v-if="collapsed[index] && atualUserParticipa(group)"
          @atualizarPost="atualizarLista(index)"
          :groupId="group.id"
        />
        <PostsList
          v-if="collapsed[index] && atualUserParticipa(group)"
          :ref="'forum-' + index"
          :groupId="group.id"
        />
      </b-collapse>
      <hr />
    </div>
    <b-row class="text-center">
      <b-col>
        <a v-if="!!nextPage" @click="loadMore()"> Carregar mais</a>
      </b-col>
    </b-row>
    <NewGroup ref="new-group" @salvar="salvar" />
  </div>
</template>

<script>
import PostsList from "@/components/Post/PostsList";
import NewPost from "@/components/Post/NewPost";
import NewGroup from "@/components/Groups/NewGroup";
export default {
  name: "ForumList",
  components: {
    PostsList,
    NewPost,
    NewGroup,
  },
  data() {
    return {
      groups: [],
      nextPage: null,
      collapsed: [],
      user: {},
      isAdmin: false,
    };
  },
  methods: {
    async joinOrUnJoinGroup(group, index) {
      const vm = this;
      return await vm.$api
        .post(`group/join/${group.id}/`)
        .then((resp) => {
          group = resp.data.results[0];
          this.$set(this.groups, index, group);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    deleteGroup(id) {
      const vm = this;
      vm.$api
        .delete(`group/${id}/`)
        .then((resp) => {
          this.groups = this.groups.filter((p) => p.id != id);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    salvar(descricao) {
      const vm = this;
      let obj = {
        title: descricao.toUpperCase(),
      };
      vm.$api.post(`/group/`, obj).then((resp) => {
        this.listarGrupos();
      });
    },
    newForumAdd() {
      this.$bvModal.show("new-group");
      this.$refs["new-group"].descricao = "";
    },
    atualizarLista(index) {
      this.$refs["group-" + index].limparEListarPostsFollowing();
    },
    toggleCollapsed: function (i) {
      this.$set(this.collapsed, i, !this.collapsed[i]);
    },
    listarGrupos() {
      const vm = this;

      this.groups = [];
      vm.$api
        .get(`group/?page=1&itens=5`)
        .then((resp) => {
          resp.data.results.forEach((p) => this.groups.push(p));
          this.nextPage = resp.data.next;
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    loadMore() {
      this.$api.get(`${this.nextPage}`).then((resp) => {
        resp.data.results.forEach((p) => this.groups.push(p));

        this.nextPage = resp.data.next;
      });
    },
    // listarGruposNext() {
    //   window.onscroll = () => {
    //     let bottomOfWindow =
    //       document.documentElement.scrollTop + window.innerHeight ===
    //       document.documentElement.offsetHeight;
    //     if (bottomOfWindow && this.nextPage) {
    //       this.loadMore();
    //     }
    //   };
    // },
    atualUserParticipa(group) {
      if (group.participants != undefined) {
        return group.participants.includes(this.user.id);
      }
    },
  },

  beforeMount() {
    this.listarGrupos(this.userPerfilID);
  },
  async mounted() {
    // this.listarGruposNext();
    await this.$store.dispatch("getUsuario");
    this.user = this.$store.getters.getUser;
    this.isAdmin = this.$store.getters.isAdmin;
  },
};
</script>

<style>
</style>