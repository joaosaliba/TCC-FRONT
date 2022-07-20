<template>
  <div class="feed-class">
    <div id="v-model-textarea" class="textarea-container my-1">
      <b-form-textarea
        id="novidades"
        class="novidades"
        v-model="post.comentario"
        rows="6"
        placeholder="Diga algo novo aos seus colegas!"
        required
      />
      <b-row id="anexos" class="ml-2">
        <b-col class="padding-0">
          <input
            id="imageInput"
            type="file"
            accept="image/jpeg, image/png"
            @input="onSelectImg"
            hidden
          />

          <b-btn @click="chooseImage()" class="pr-0 mr-0" variant="transparent">
            <i class="blue fas fa-image fa-lg"></i>
          </b-btn>
        </b-col>

        <b-col class="padding-0">
          <input @input="onSelectFile" id="fileInput" type="file" hidden />
          <b-btn @click="chooseFiles()" class="pl-0 ml-0" variant="transparent">
            <i class="fas fa-paperclip fa-lg"></i>
          </b-btn>
        </b-col>
      </b-row>

      <b-btn
        id="btn-check"
        @click="enviarPost()"
        variant="transparent"
        size="lg"
      >
        <i class="green fas fa-check fa-lg" />
      </b-btn>
    </div>

    {{ posts }}
  </div>
</template>

<script>
export default {
  name: "FeedComponent",
  data() {
    return {
      posts: {},
      post: {
        comentario: null,
        file: null,
        img: null,
      },
    };
  },
  methods: {
    chooseFiles() {
      document.getElementById("fileInput").click();
    },
    chooseImage() {
      document.getElementById("imageInput").click();
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
      console.log(vm.post);

      let data = new FormData();
      data.append("body", vm.post.comentario);
      if (vm.post.img) data.append("post_image", vm.post.img);
      if (vm.post.file) data.append("post_file", vm.post.file);

      vm.$api
        .post("post/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          console.log(resp);
          vm.limparForm();
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
          Object.assign(this.user, this.copiaUser);
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
.feed-class {
  padding: 20px 40px 600px 40px;
  background-color: rgba(255, 255, 255, 0.79);
  border-radius: 50px;
  /* opacity: 0.79; */
  margin: 0 auto;
  margin-top: 10px;
}
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