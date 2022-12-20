<template>
  <div class="w-full">
    <template v-for="blog in blogs" :key="blog.uuid">
      <div class="text-center mb-20">
        <v-img
          :src="blog.image"
          @click="switchBlog(blog.uuid)"
          class="cursor-pointer w-full object-cover"
        />
        <p class="text-stone-400 my-4">
          {{
            new Date(blog.date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
          }}
        </p>
        <p class="text-3xl my-2">
          {{ blog.title }}
        </p>

        <p
          class="text-stone-600 mt-4 cursor-pointer underline text-sm"
          @click="switchBlog(blog.uuid)"
        >
          Read More
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    blogs: null,
  },

  setup(props, context) {
    const router = useRouter();

    const switchBlog = (uuid: any): void => {
      router.push({
        name: "Blog",
        params: {
          uuid: uuid,
        },
      });
    };
    return {
      switchBlog,
    };
  },
});
</script>



<style scoped>
</style>