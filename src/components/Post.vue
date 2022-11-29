<template>
  <div class="flex justify-center mt-20">
    <div class="w-4/6">
      <v-card class="px-2 mb-10">
        <v-toolbar class="text-3xl font-bold pl-2" color="green">
          Create New Blog📄
        </v-toolbar>
        <div class="flex flex-row">
          <div class="flex-1">
            <v-text-field
              label="Title"
              outlined
              class="pt-2"
              color="green"
              v-model="form.title"
            />
            <v-textarea
              label="Short Description"
              outlined
              class="pt-2"
              color="green"
              v-model="form.description"
            />
          </div>
          <div
            class="
              w-full
              bg-stone-300
              m-4
              flex-1 flex
              items-center
              justify-center
            "
          >
            <ImageField @updatePic="updatePic" />
          </div>
        </div>
      </v-card>
      <QuillEditor
        theme="snow"
        v-model:content="form.blog"
        class="h-40"
        contentType="html"
      />
      <div class="flex">
        <v-btn color="green" class="m-2" @click="backHome"> Back </v-btn>
        <v-btn color="green" class="m-2 ml-auto" @click="submitBlog">
          Submit
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import ImageField from "./ImageField.vue";
import axios from "axios";

export default defineComponent({
  setup(props, context) {
    const form = reactive({
      title: "",
      description: "",
      image: "",
      blob: {},
      blog: "",
    });

    const submitBlog = () => {
      
      axios.post(`http://localhost:3000/api/blog`, form).then((resp) => {
        console.log(resp);
      });
    };

    const backHome = () => {
      context.emit("switchPage", "blog");
    };

    const updatePic = (pic: { image: string; blob: Blob }) => {
      form.image = pic.image;
      form.blob = pic.blob;
      console.log(form);
    };

    return {
      form,
      submitBlog,
      backHome,
      updatePic,
    };
  },

  components: {
    ImageField,
    QuillEditor,
  },
});
</script>

