<template>
  <router-view />
</template>



<script lang="ts" >
import { defineComponent, onBeforeMount } from "vue";
import { getBlogs } from "./mixins/mixins";
import { useBlogStore } from "./stores/blog";

export default defineComponent({
  setup(props, context) {
    onBeforeMount(() => {
      getBlogs().then((resp) => {
        useBlogStore().setBlogs(resp);
      });
    });
  },
});
</script>


<style></style>
