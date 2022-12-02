<template>
  <div class="flex justify-center mt-20">
    <div class="w-4/6">
      <v-card class="p-2 mb-10" variant="outlined" color="green">
        <v-card elevation="0">
          <v-toolbar class="text-3xl font-bold pl-2" color="green">
            Create New Blog📄
          </v-toolbar>
          <div class="flex flex-row">
            <div class="flex-1">
              <v-text-field
                placeholder="Title"
                variant="outlined"
                class="pt-2"
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
              class="pt-2 mr-4 flex-1"
              color="green"
              v-model="password"
            />
          </div>
        </v-card>
      </v-card>
      <QuillEditor
        theme="snow"
        toolbar="full"
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
      axios.post(`http://localhost:3000/api/blog`, newform).then((resp) => {
        form.title = "";
        form.description = "";
        form.image = "";
        form.blog = "";
        form.date = "";
        (form.uuid = ""), (form.category = null);
      });
    };

    const backHome = () => {
      context.emit("switchPage", "home");
    };

    const updatePic = (pic: { image: string; blob: Blob }) => {
      form.image = pic.image;
    };

    return {
      form,
      submitBlog,
      backHome,
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

