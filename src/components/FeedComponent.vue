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
      <b-row id="anexos">
        <b-col class="padding-0">
          <input
            id="imageInput"
            type="file"
            accept="image/jpeg, image/png"
            @input="onSelectImg"
            hidden
          />

          <b-btn
            @click="chooseImage()"
            class="pr-0 mr-0"
            variant="transparent"
          >
            <i class="blue fas fa-image fa-lg"></i>
          </b-btn>
        </b-col>

        <b-col class="padding-0">
          <input @input="onSelectFile" id="fileInput" type="file" hidden />
          <b-btn
            @click="chooseFiles()"
            class="pl-0 ml-0"
            variant="transparent"
          >
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
  </div>
</template>

<script>
export default {
  name: "FeedComponent",
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
    enviarPost() {
      const vm = this;
      console.log(vm.post);
    },
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