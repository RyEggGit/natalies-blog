<template>
  <div>
    <Home v-if="page === 'home'" @switchPage="switchPage" />
    <Blog
      v-else-if="page === 'blog'"
      @switchPage="switchPage"
      :blog="currentBlog"
    />
    <Post v-else @switchPage="switchPage" />
  </div>
</template>

<script setup lang="ts" >
import { defineComponent, ref } from "vue";
import Home from "./components/Home.vue";
import Post from "./components/Post.vue";
import Blog from "./components/Blog.vue";

const page = ref("home");
const currentBlog = ref();

const switchPage = (newpage: string, blog?: any) => {
  page.value = newpage;
  if (blog) {
    currentBlog.value = blog
  }
};
</script>


<style></style>
