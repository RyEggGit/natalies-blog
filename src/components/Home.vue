<template>
  <!-- Landing Screen -->
  <div class="mx-60">
    <!-- Nav -->
    <div class="flex sticky top-0 z-50 bg-white h-20 items-center">
      <div class="text-3xl font-bold">nt.</div>
      <div class="text-3xl font-bold ml-auto">blog</div>
    </div>

    <div class="mt-36 flex relative">
      <div class="text-6xl font-bold">Hello I'm 👋<br />Natalie Tsang</div>
      <div class="ml-auto mt-4">
        <div class="text-4xl">
          I'm a quirky person <br />who wants a blog that no one can see
        </div>
      </div>
    </div>
    <i
      class="pi pi-arrow-down text-4xl text-bold mt-20"
      @click="scrollToBlog"
    ></i>
    <div class="mt-[40vh]" />
    <!-- Blogs  -->
    <div id="blogs" class="h-48" />
    <ul class="" v-for="(blog, index) in blogs" :key="index">
      <!-- Blog Template -->
      <div class="flex">
        <!-- Left Side -->
        <div class="relative">
          <div class="text-bold text-4xl">{{ blog.title }}</div>
          <div class="text-2xl mt-4 w-full">{{ blog.shortDescription }}</div>
          <div class="absolute bottom-0">See Blog</div>
        </div>
        <!-- Right Side -->
        <div class="bg-stone-500 ml-20 w-4/6 h-[45vh] flex"></div>
      </div>
      <div
        v-if="index != blogs.length - 1"
        class="border-t-2 border-stone-700 my-20"
      />
    </ul>

    <div class="mt-[25vh]" />

    <!-- Footer -->
    <div class="flex my-4">
      <div class="text-blue-500">This blog was made by <b>Ryan Eggens</b></div>
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

<script lang="ts" setup>
import { ref } from "vue"

const scrollToBlog = () => {
  document.getElementById("blogs")?.scrollIntoView({
    behavior: "smooth",
  })
}

const blogs = ref([
  {
    title: "Long Run",
    shortDescription:
      "Today I really ran really far and long just to show off #GirlBoss#YassQueen",
    image: "null",
  },
  {
    title: "Long Run",
    shortDescription:
      "Today I really ran really far and long just to show off #GirlBoss#YassQueen",
    image: "null",
  },
  {
    title: "Long Run",
    shortDescription:
      "Today I really ran really far and long just to show off #GirlBoss#YassQueen",
    image: "null",
  },
])
</script>
