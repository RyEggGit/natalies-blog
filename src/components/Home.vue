<template>
  <!-- Landing Screen -->
  <div class="mx-60">
    <!-- Nav -->
    <div class="flex sticky top-0 z-50 bg-white h-20 items-center">
      <div class="text-3xl font-bold">nt.</div>
    </div>

    <div class="flex h-[90vh]">
      <div class="flex-1 flex flex-col justify-center mb-48">
        <div class="text-6xl font-bold">Natalie Tsang</div>
        <v-icon @click="scrollToBlog" class="mt-10" x-large
          >mdi-arrow-down</v-icon
        >
      </div>
      <div class="flex-1">
        <iframe
          src="https://my.spline.design/untitled-2880b9e4fdf5a96c31be6f2e5c7b6732/"
          frameborder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>

    <div class="mt-[35vh]" />
    <!-- Blogs  -->
    <div id="blogs" class="h-36" />
    <div v-if="blogs.length === 0" class="flex flex-col items-center">
      <div class="text-2xl text-center mb-3">Loading Blogs</div>
      <v-progress-linear
        color="green"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </div>
    <div v-else>
      <v-tabs color="green" class="ml-[-3vh]" @update:modelValue="handleTabs">
        <v-tab>all</v-tab>
        <v-tab>food</v-tab>
        <v-tab>running</v-tab>
        <v-tab>life</v-tab>
      </v-tabs>
      <div class="mt-[5vh]">
        <template v-for="(blog, index) in blogs" :key="index">
          <!-- Blog Template -->
          <div class="flex">
            <!-- Left Side -->
            <div class="relative flex-1">
              <div class="text-bold text-4xl">{{ blog.title }}</div>
              <div class="text-2xl mt-4 w-full">{{ blog.description }}</div>
              <div
                class="absolute bottom-0 text-blue underline cursor-pointer"
                @click="switchBlog(blog)"
              >
                See Blog
              </div>
            </div>
            <!-- Right Side -->
            <v-img
              v-if="blog.image"
              :src="blog.image"
              class="flex-1 h-[45vh] w-full"
              width="100%"
            />
            <div
              class="bg-stone-500 ml-20 h-[45vh] flex flex-[2_2_0%]"
              v-else
            />
          </div>
          <div
            v-if="index != blogs.length - 1"
            class="border-t-2 border-stone-700 my-20"
          />
        </template>
      </div>
    </div>

    <div class="mt-[25vh]" />

    <!-- Footer -->
    <div class="flex p-4 bg-green h-full rounded-t-md">
      <div class="flex justify-center">
        This blog was made by <b class="mx-1"> Ryan Eggens </b>
        <v-icon @click="goToGitHub">mdi-github</v-icon>
      </div>
      <a
        href="https://www.linkedin.com/in/nataliezltsang/?originalSubdomain=ca"
        class="ml-auto"
      >
        <div>Linked In</div>
      </a>
      <a
        href="https://athletics.uwaterloo.ca/sports/cross-country/roster/natalie-tsang/9015#sidearm-roster-player-historical"
        class="ml-4"
      >
        <div>Waterloo Profile</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Blog } from "@/types/types";
import { useBlogStore } from "../stores/blog";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup(props, context) {
    const {blogs} = storeToRefs(useBlogStore());
    const filteredBlogs = ref<Blog[]>([]);
    const tabs = ref();
    const router = useRouter();

    const scrollToBlog = () => {
      document.getElementById("blogs")?.scrollIntoView({
        behavior: "smooth",
      });
    };

    const goToGitHub = () => {
      window.location.href = "https://github.com/RyEggGit";
    };

    const switchBlog = (blog: any) => {
      useBlogStore().setActiveBlog(blog.uuid);
      router.push({
        name: "Blog",
      });
    };

    const tabMap = new Map();
    tabMap.set(0, "all");
    tabMap.set(1, "food");
    tabMap.set(2, "running");
    tabMap.set(3, "life");

    const handleTabs = (tab: string) => {
      const filter = tabMap.get(tab);
      if (filter != "all") {
        filteredBlogs.value = blogs.value.filter(
          (blog) => blog.category == filter
        );
      } else {
        filteredBlogs.value = blogs.value;
      }
    };

    return {
      scrollToBlog,
      goToGitHub,
      blogs,
      switchBlog,
      handleTabs,
      tabs,
      filteredBlogs,
    };
  },
});
</script>

