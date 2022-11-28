<template>
  <!-- Landing Screen -->
  <div class="mx-60">
    <!-- Nav -->
    <div class="flex sticky top-0 z-50 bg-white h-20 items-center">
      <div class="text-3xl font-bold">nt.</div>
      <div class="text-3xl font-bold ml-auto" @click="switchBlog">blog</div>
    </div>

    <div class="mt-36 flex relative">
      <div class="text-6xl font-bold">Hello I'm 👋<br />Natalie Tsang</div>
      <div class="ml-auto mt-4">
        <div class="text-4xl">
          I'm a quirky person <br />who wants a blog that no one can see
        </div>
      </div>
    </div>
    <v-icon @click="scrollToBlog" class="mt-4 text-3xl">
      mdi-arrow-down
    </v-icon>
    <div class="mt-[40vh]" />
    <!-- Blogs  -->
    <div id="blogs" class="h-48" />
    <div v-if="loadingBlog">
      <div>Loading Blogs</div>
    </div>
    <div v-else>
      <template v-for="(blog, index) in blogs" :key="index">
        <!-- Blog Template -->
        <div class="flex">
          <!-- Left Side -->
          <div class="relative flex-1">
            <div class="text-bold text-4xl">{{ blog.title }}</div>
            <div class="text-2xl mt-4 w-full">{{ blog.description }}</div>
            <div class="absolute bottom-0">See Blog</div>
          </div>
          <!-- Right Side -->
          <div class="bg-stone-500 ml-20 h-[45vh] flex flex-[2_2_0%]"></div>
        </div>
        <div
          v-if="index != blogs.length - 1"
          class="border-t-2 border-stone-700 my-20"
        />
      </template>
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
import { defineComponent, defineEmits, onMounted, ref } from "vue";
import axios from "axios";

interface Blog {
  title: string;
  description: string;
  image?: any;
  blog?: string;
  url?: string;
}

interface Props {}

const emit = defineEmits({
  // Validate submit event
  switchPage: (page) => page,
});

export default defineComponent({
  setup(props, context) {
    const loadingBlog = ref(true);
    const blogs = ref<Blog[]>([]);

    const scrollToBlog = () => {
      document.getElementById("blogs")?.scrollIntoView({
        behavior: "smooth",
      });
    };

    onMounted(() => {
      axios.get(`http://localhost:3000/api/blog`).then((resp) => {
        blogs.value = resp.data;
        loadingBlog.value = false;
      });
    });

    const goToGitHub = () => {
      window.location.href = "https://github.com/RyEggGit";
    };

    const switchBlog = () => {
      context.emit("switchPage", "post");
    };

    return {
      scrollToBlog,
      goToGitHub,
      loadingBlog,
      blogs,
      switchBlog,
    };
  },
});
</script>

