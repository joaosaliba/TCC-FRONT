<template>
  <div>
    <b-card class="feed-class p-3 mt-2"><GroupList /> </b-card>
  </div>
</template>

<script>
import GroupList from "@/components/Groups/GroupList";
export default {
  name: "Groups",
  components: { GroupList },
};
</script>

<style>
</style>