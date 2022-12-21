<template>
  <v-container class="flex">
    <v-card class="p-4 flex-1 mr-10 shadow-md hover:shadow-2xl">
      <v-card-title class="text-2xl font-bold">Blogs</v-card-title>
      <div v-if="blogs">
        <template v-for="blog in blogs" :key="blog.uuid">
          <v-list class="flex items-center justify-center">
            <img :src="blog.image" alt="John" class="w-20 h-20 font-roboto" />
            <div class="ml-4 text-lg">{{ blog.title }}</div>
            <v-icon class="ml-auto" color="red" @click="removeBlog(blog.uuid)">
              mdi-delete
            </v-icon>
          </v-list>
          <v-divider />
        </template>
      </div>
      <div v-else class="flex justify-center items-center">
        <div>
          <v-progress-circular indeterminate color="green" />
        </div>
      </div>
    </v-card>
    <v-dialog width="1600" v-model="createBlogToggle">
      <template v-slot:activator="{ props }">
        <v-card
          v-bind="props"
          color="green"
          class="
            flex flex-col
            justify-center
            items-center
            flex-1
            ml-10
            shadow-md
            hover:shadow-2xl
          "
        >
          Create New Blog
          <v-icon large class="mt-2">mdi-plus</v-icon>
        </v-card>
      </template>
      <Post />
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useBlogStore } from "../stores/blog";
import { storeToRefs } from "pinia";
import { removeBlog } from "../mixins/mixins";
import Post from "./Post.vue";

export default defineComponent({
  setup(props, context) {
    const { blogs } = storeToRefs(useBlogStore());
    const createBlogToggle = ref(false);


    
    return {
      removeBlog,
      blogs,
      createBlogToggle,
    };
  },
  components: {
    Post,
  },
});
</script>