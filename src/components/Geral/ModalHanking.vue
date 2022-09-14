<template>
  <div>
    <b-modal id="modal-hanking" size="lg" class="mr-4 modal" hide-header>
      <b-tabs justified>
        <b-tab active title="Mais Likes">
          <h4>Hanking Mais curtidas</h4>
          <!-- {{ hankingList }} -->
          <PostsList :hankingList="true" />
        </b-tab>
        <b-tab title="Mais Dislikes">
          <h4>Hanking Mais Dislikes</h4>
          <!-- {{ hankingList }} -->
          <PostsList :hankingList="false" />
        </b-tab>
      </b-tabs>
    </b-modal>
  </div>
</template>

<script>
import PostsList from "@/components/Post/PostsList";
export default {
  name: "ModalHanking",
  components: { PostsList },
  data() {
    return {
      hankingList: [],
    };
  },
  methods: {
    wherePostFrom(post) {
      if (post.category) {
        return "Fórum " + post.category.name;
      } else if (post.group) {
        return "Grupo " + post.group.title;
      }
      return "Feed";
    },
  },
  mounted() {},
};
</script>

<style>
</style>