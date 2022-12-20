<template>
  <div>
    <div
      v-if="currentBlogNum !== blogUUIDs.length"
      class="h-[100vh] flex justify-center items-center"
    >
      <div class="w-96">
        <div class="mb-4 text-center font-bold">Loading Natalie's Blogs</div>
        <v-progress-linear
          :model-value="Math.ceil((currentBlogNum / blogUUIDs.length) * 100)"
          height="10"
          color="black"
          striped
          class="mb-2"
        />
        <div class="text-center" v-if="currentBlogNum !== -1">
          Loading {{ currentBlogNum }} out of {{ blogUUIDs.length }}
        </div>
        <div class="text-center" v-else>
          Connecting To Cloud Server ... This may take a few seconds
        </div>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>



<script lang="ts" >
import { defineComponent, onBeforeMount, ref } from "vue";
import { getBlogUUIDs, getBlog } from "./mixins/mixins";

export default defineComponent({
  setup(props, context) {
    const blogUUIDs = ref([]);
    const currentBlogNum = ref(-1);

    onBeforeMount(() => {
      getBlogUUIDs().then((data) => {
        blogUUIDs.value = data;
        currentBlogNum.value = 0;

        blogUUIDs.value.forEach((uuid) => {
          getBlog(uuid.uuid).then(() => {
            currentBlogNum.value += 1;
          });
        });
      });
    });

    return { blogUUIDs, currentBlogNum };
  },
});
</script>


<style></style>
