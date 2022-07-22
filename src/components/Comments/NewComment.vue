<template>
  <div class="m-2">
    <b-row>
      <b-col cols="1">
        <b-avatar :src="user.picture" class="mr-4" />
      </b-col>
      <b-col>
        <b-form-textarea
          id="input-1"
          v-model="newComment.comment"
          type="text"
          placeholder="Comentario"
          required
          rows="1"
          max-rows="1"
          v-on:keyup.enter="enviarComentario()"
        />
        <b-row class="mt-2">
          <b-col class="text-left">
            <i
              v-if="newComment.commentImage == null"
              @click="chooseImage()"
              class="blue fas fa-image fa-lg mr-4"
            />
            <b-btn
              @click="newComment.commentImage = null"
              pill
              size="sm"
              v-else
              variant="danger"
            >
              <i class="fas fa-times fa-sm" />
              {{ newComment.commentImage ? newComment.commentImage.name : "" }}
            </b-btn>
          </b-col>
          <b-col class="text-right">
            <input
              id="imageInput-Comentarios"
              type="file"
              accept="image/jpeg, image/png"
              @input="onSelectImg"
              hidden
            />
            <i @click="enviarComentario()" class="green fas fa-check fa-lg" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import store from "@/utils/store.js";

export default {
  name: "NewComment",
  props: ["postID"],

  data() {
    return {
      user: {
        picture: null,
      },
      newComment: {
        comment: null,
        commentImage: null,
        replyTo: null,
        post: null,
      },
    };
  },
  methods: {
    async buscarDados() {
      await this.$store.dispatch("getUsuario");
      this.user = store.getters.getUser;
    },
    chooseImage() {
      document.getElementById("imageInput-Comentarios").click();
    },
    onSelectImg(event) {
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.newComment.commentImage = files[0];
      console.log(this.newComment.commentImage);
    },
    limparForm() {
      let vm = this;
      Object.entries(vm.newComment).forEach(([key]) => {
        vm.newComment[key] = null;
      });
    },

    enviarComentario() {
      const vm = this;
      let data = new FormData();

      if (vm.newComment.comment) data.append("comment", vm.newComment.comment);
      if (vm.newComment.commentImage)
        data.append("comment_image", vm.newComment.commentImage);
      if (vm.newComment.replyTo) data.append("reply_to", vm.newComment.replyTo);
      if (vm.postID) data.append("post", vm.postID);

      vm.$api
        .post("comments/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          vm.limparForm();
          this.$emit("atualizaListaComentarios");
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
  },
  created() {
    this.buscarDados();
  },
};
</script>

<style scoped>
.green {
  color: forestgreen;
  cursor: pointer;
}
.blue {
  color: rgb(33, 110, 211);
  cursor: pointer;
}
</style>