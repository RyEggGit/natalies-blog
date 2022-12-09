<template>
  <v-app>
    <!-- <v-navigation-drawer expand-on-hover rail>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="My Files"
          value="myfiles"
        />
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Shared with me"
          value="shared"
        />
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" />
      </v-list>
    </v-navigation-drawer> -->

    <v-main>
      <v-container class="flex">
        <v-card class="p-4 flex-1 mr-10">
          <v-card-title>Blogs</v-card-title>
          <template v-for="blog in blogs" :key="blog.uuid">
            <v-list class="flex items-start justify-start">
              <img :src="blog.image" alt="John" class="w-20 h-20 font-roboto" />

              {{ blog.title }}
            </v-list>
            <v-divider />
          </template>
        </v-card>
        <v-card
          color="green"
          @click="openNewBlog"
          class="flex flex-col justify-center items-center flex-1 ml-10"
        >
          Create New Blog
          <v-icon large class="mt-2">mdi-plus</v-icon>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useBlogStore } from "../stores/blog";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup(props, context) {
    const { blogs } = storeToRefs(useBlogStore());

    const openNewBlog = () => {};
    return {
      openNewBlog,
      blogs,
    };
  },
});
</script>