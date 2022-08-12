<template>
  <div>
    <b-card class="feed-class p-3 mt-2">
      <ForumList />
    </b-card>
  </div>
</template>

<script>
import ForumList from "@/components/Forum/ForumList";
export default {
  name: "Forum",
  components: {
    ForumList,
  },
  data() {
    return {
      categorys: [],
      nextPage: null,
    };
  },
};
</script>

<style>
</style>