<template>
  <div class="mx-20">
    <!-- Nav -->
    <Nav />

    <div class="flex" v-if="blog">
      <div
        v-if="blogs"
        class="f mx-20"
        :class="windowWidth >= 1280 ? 'flex-[0.75]' : null"
      >
        <div class="text-4xl text-bold mt-10 text-center mb-10">
          {{ blog.title }}
        </div>
        <v-img :src="blog.image" max-height="500" position-x="start" />

        <div class="text-1xl text-grey mt-10">
          {{ new Date(blog.date).toLocaleDateString() }}
        </div>
        <div class="mt-10" v-html="blog.blog" />
      </div>

      <div class="flex-[0.25] mt-24" v-if="windowWidth >= 1280">
        <p class="text-center font-bold mb-2">Most Recent Blogs</p>

        <template v-for="blog in blogs.slice(0, 3)" :key="blog.uuid">
          <v-card class="mb-4" @click="switchBlog(blog.uuid)">
            <v-img height="200" :src="blog.image" cover class="text-white">
            </v-img>
            <div class="m-2">
              <p class="text-h6">{{ blog.title }}</p>
              <p>{{ blog.description }}</p>
            </div>
          </v-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Nav from "./Common/Nav.vue";

import { defineComponent, ref, onMounted } from "vue";
import { useBlogStore } from "../stores/blog";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Nav },

  setup(props, context) {
    const router = useRouter();
    const { blogs } = storeToRefs(useBlogStore());
    const blogUUID = useRoute().params.uuid;

    const blog = ref(useBlogStore().getActiveBlog(blogUUID as string));

    const switchBlog = (uuid: any): void => {
      blog.value = useBlogStore().getActiveBlog(uuid as string);
      router.push({
        name: "Blog",
        params: {
          uuid: uuid,
        },
      });
    };

    const windowWidth = ref(window.innerWidth);
    const onWidthChange = () => (windowWidth.value = window.innerWidth);

    onMounted(() => {
      window.addEventListener("resize", onWidthChange);
    });

    return { blogs, switchBlog, blog, blogUUID, windowWidth };
  },
});
</script>
