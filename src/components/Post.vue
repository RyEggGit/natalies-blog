<template>
  <v-card
    class="p-2 mb-10 bg-white"
    variant="outlined"
    color="green"
    max-width="1600"
  >
    <v-toolbar class="text-3xl font-bold pl-2" color="green">
      Create New Blog📄
      <v-btn @click="submitBlog" class="ml-auto bg-white text-green"
        >Post</v-btn
      >
    </v-toolbar>
    <v-card elevation="0" class="p-2">
      <div class="flex flex-row">
        <div class="flex-1">
          <v-text-field
            placeholder="Title"
            variant="outlined"
            class="pt-4"
            color="green"
            v-model="form.title"
          />
          <v-textarea
            placeholder="Short Description"
            variant="outlined"
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
            mr-0
            flex-1 flex
            items-center
            justify-center
          "
        >
          <ImageField @updatePic="updatePic" />
        </div>
      </div>
      <div class="flex">
        <v-select
          placeholder="Type"
          :items="['food', 'life', 'running']"
          variant="outlined"
          class="pt-2 mr-4 flex-1"
          color="green"
          v-model="form.category"
        />
        <v-text-field
          type="password"
          placeholder="Password"
          variant="outlined"
          class="pt-2 flex-1"
          color="green"
          v-model="password"
        />
      </div>
      <QuillEditor
        theme="snow"
        toolbar="full"
        v-model:content="form.blog"
        class="h-40"
        contentType="html"
      />
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import ImageField from "./ImageField.vue";
import axios from "axios";
import { Blog } from "../types/types";

export default defineComponent({
  setup(props, context) {
    const form: Blog = reactive({
      title: "",
      description: "",
      image: "",
      blog: "",
      date: "",
      uuid: "",
      category: null,
    });

    const password = ref();

    const submitBlog = () => {
      const newform = form as any;
      form.date = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      newform["password"] = password;

      axios
        //@ts-ignore
        .post(`${import.meta.env.BASE_URL}api/blog`, newform)
        .then((resp) => {
          form.title = "";
          form.description = "";
          form.image = "";
          form.blog = "";
          form.date = "";
          (form.uuid = ""), (form.category = null);
        });
    };

    const updatePic = (pic: { image: string; blob: Blob }) => {
      form.image = pic.image;
    };

    return {
      form,
      submitBlog,
      updatePic,
      password,
    };
  },

  components: {
    ImageField,
    QuillEditor,
  },
});
</script>

