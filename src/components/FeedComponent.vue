<template>
  <div class="feed-class">

    <div id="v-model-textarea" class=" textarea-container my-1">
      <b-form-textarea
        id="novidades"
        class="novidades"
        v-model="post"
        rows="6"
        placeholder="Diga algo novo aos seus colegas!"
        required
      />
      <b-row id="anexos">
        <b-col class="padding-0">
      <b-btn  variant="transparent" size="lg">
           <i class=" blue fas fa-image fa-lg"></i>
       </b-btn>
        </b-col>
         <b-col class="padding-0">
      <b-btn  variant="transparent" size="lg">
           <i class="fas fa-paperclip fa-lg"></i>
       </b-btn>
        </b-col>
      </b-row>
      
   <b-btn id="btn-check" variant="transparent" size="lg">
           <i class=" green fas fa-check fa-md"/>
       </b-btn>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "FeedComponent",
  data() {
    return {
      post: null,
    };
  },
};
</script>

<style>
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
  padding: 20px ;
  outline: none;

}
::placeholder {
  padding: auto;
  text-align: center;
  font-size: 1.5rem;
  justify-content: center;
  line-height: 150px;
}
.green{
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