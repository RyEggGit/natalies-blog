<template>
  <div class="mx-60">
    <!-- Nav -->
    <div class="flex sticky top-0 z-50 bg-white h-20 items-center">
      <div class="text-3xl font-bold cursor-pointer" @click="backHome">nt.</div>
      <div class="text-3xl font-bold ml-auto">blog</div>
    </div>
    <div v-if="blog" class="h-[50vh]">
      <v-img :src="blog.image" class="subheading pt-4" width="100%" />
    </div>
    <div class="text-4xl text-bold mt-10">{{ blog.title }}</div>
    <div class="text-1xl text-grey mt-10">
      {{ blog.date }}
    </div>
    <div class="mt-10" v-html="blog.blog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import { getBlogs } from "../mixins/mixins";
import { Blog } from "../types/types";

export default defineComponent({
  props: {
    blog: {},
  },
  setup(props, context) {
    const blog = ref();

    const backHome = () => {
      context.emit("switchPage", "home");
    };

    onBeforeMount(() => {
      blog.value = props.blog;
    });
    return {
      blog,
      backHome,
    };
  },
});
</script>
