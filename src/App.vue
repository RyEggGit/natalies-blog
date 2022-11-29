<template>
  <div>
    <Home v-if="page === 'blog'" @switchPage="switchPage" />
    <Post v-else @switchPage="switchPage" />
  </div>
</template>

<script  setup lang="ts" >
import { defineComponent, ref } from "vue";
import Home from "./components/Home.vue";
import Post from "./components/Post.vue";

const page = ref("blog");

const switchPage = (newpage: string) => {
  console.log(newpage);
  page.value = newpage;
};
</script>


<style></style>
