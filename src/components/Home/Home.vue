<template>
  <!-- Landing Screen -->
  <div class="mx-20">
    <!-- Nav -->
    <Nav />
    <!-- Three Rows container -->
    <div v-if="blogs">
      <div class="flex w-full" v-if="windowWidth > 1024">
        <Column :blogs="splitBlogs(3)[0]" />
        <Column :blogs="splitBlogs(3)[1]" class="mx-10" />
        <Column :blogs="splitBlogs(3)[2]" />
      </div>
      <div class="flex w-full" v-else-if="windowWidth <= 1024 && windowWidth >= 780">
        <Column :blogs="splitBlogs(4)[0]" class="mr-5" />
        <Column :blogs="splitBlogs(4)[1]" class="ml-5" />
      </div>
      <div class="flex w-full" v-else>
        <Column :blogs="blogs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Column from "./Column.vue";
import Nav from "../../components/Common/Nav.vue";

import { defineComponent, computed, ref, onMounted } from "vue";
import { Blog } from "../../types/types";
import { useBlogStore } from "../../stores/blog";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: { Column, Nav },

  setup(props, context) {
    const { blogs } = storeToRefs(useBlogStore());

    const splitBlogs = (arraySize: number): Blog[] => {
      const numArrays = Math.ceil(blogs.value.length / arraySize);
      const arrays = [];
      for (let i = 0; i < numArrays; i++) {
        arrays.push(blogs.value.slice(i * arraySize, (i + 1) * arraySize));
      }
      return arrays;
    };

    const windowWidth = ref(window.innerWidth);
    const onWidthChange = () => (windowWidth.value = window.innerWidth);

    onMounted(() => {
      window.addEventListener("resize", onWidthChange);
    });

    return {
      blogs,
      splitBlogs,
      windowWidth,
    };
  },
});
</script>

<style scoped>
</style>

