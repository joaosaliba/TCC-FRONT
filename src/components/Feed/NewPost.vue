<template>
  <div>
    <div id="v-model-textarea" class="textarea-container my-1">
      <b-form-input
        id="novidades"
        class="novidades"
        v-model="post.comentario"
        placeholder="Pergunte no f"
        rows="6"
        required
        v-on:keyup.ctrl.enter="enviarPost()"
        v-if="categoryId"
      />
      <b-form-textarea
        v-else
        id="novidades"
        class="novidades"
        v-model="post.comentario"
        rows="6"
        placeholder="Diga algo novo aos seus colegas!"
        required
        v-on:keyup.ctrl.enter="enviarPost()"
      />
      <b-row id="btn-check" class="mr-1">
        <input
          id="imageInput-post"
          type="file"
          accept="image/jpeg, image/png"
          @input="onSelectImg"
          hidden
        />

        <b-btn
          v-if="post.img == null"
          @click="chooseImage()"
          variant="transparent"
        >
          <i @click="chooseImage()" class="blue fas fa-image fa-lg"></i>
        </b-btn>
        <b-btn
          @click="post.img = null"
          pill
          size="sm"
          v-else
          variant="danger"
          class="mr-1"
        >
          <i class="fas fa-times fa-sm" />
          {{ post.img ? post.img.name : "" }}
        </b-btn>

        <input @input="onSelectFile" id="fileInput-post" type="file" hidden />
        <b-btn
          v-if="post.file == null"
          @click="chooseFiles()"
          variant="transparent"
        >
          <i class="fas fa-paperclip fa-lg"></i>
        </b-btn>
        <b-btn @click="post.file = null" pill size="sm" v-else variant="danger">
          <i class="fas fa-times fa-sm" />
          {{ post.file ? post.file.name : "" }}
        </b-btn>
        <b-btn @click="enviarPost()" variant="transparent" size="lg">
          <i class="green fas fa-check fa-lg" />
        </b-btn>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewPost",
  props: ["categoryId"],
  data() {
    return {
      post: {
        comentario: null,
        file: null,
        img: null,
      },
    };
  },
  methods: {
    chooseFiles() {
      document.getElementById("fileInput-post").click();
    },
    chooseImage() {
      document.getElementById("imageInput-post").click();
    },
    onSelectFile(event) {
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.post.file = files[0];
    },
    onSelectImg(event) {
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.post.img = files[0];
    },
    limparForm() {
      let vm = this;
      Object.entries(vm.post).forEach(([key]) => {
        vm.post[key] = null;
      });
    },
    enviarPost() {
      const vm = this;

      let data = new FormData();
      data.append("body", vm.post.comentario);
      if (vm.post.img) data.append("post_image", vm.post.img);
      if (vm.post.file) data.append("post_file", vm.post.file);
      if (vm.categoryId) data.append("category", vm.categoryId);
      vm.$api
        .post("post/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          vm.limparForm();
          this.$emit("atualizarPost");
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },

    listarPost() {
      const vm = this;

      vm.$api
        .get("post/")
        .then((resp) => {
          this.posts = resp.data;
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
  },
  mounted() {
    this.listarPost();
  },
};
</script>

<style scoped>
.novidades {
  resize: none;
  border-radius: 40px;
  align-content: center;
  padding-top: 20;
  size: 300px;
  border: none;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
  outline: none;
}
::placeholder {
  padding: auto;
  text-align: center;
  font-size: 1.5rem;
  justify-content: center;
  line-height: 150px;
}
.green {
  color: forestgreen;
}
.blue {
  color: rgb(33, 110, 211);
}
.textarea-container {
  position: relative;
}
.textarea-container textarea {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.textarea-container #btn-check {
  position: absolute;
  bottom: 0;
  right: 0;
}
.textarea-container #anexos {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>