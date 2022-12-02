<template>
  <v-hover>
    <template v-slot="{ isHovering, props }">
      <v-card
        width="100%"
        height="100%"
        outlined
        color="grey"
        class="d-flex align-center justify-center"
        v-bind="props"
      >
        <v-overlay
          :model-value="isHovering"
          contained
          class="align-center justify-center"
          v-if="image"
        >
          <v-btn variant="flat" color="green" @click="deleteImage">
            <v-icon class="mr-1">mdi-delete</v-icon> Delete Image
          </v-btn>
        </v-overlay>

        <v-img
          v-if="image"
          :src="image"
          max-height="200"
          max-width="200"
          contain
        />

        <v-container v-else class="d-flex flex-column align-center">
          <h1 class="text-overline">Add Image To Blog</h1>
          <v-file-input
            v-model="blob"
            @change="updateImage"
            hide-details
            class="w-0"
          />
        </v-container>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { blobToBase64 } from "../mixins/mixins";

export default defineComponent({
  setup(props, context) {
    const image = ref<string | null>(null);
    const blob = ref<Blob[]>();

    const updateImage = () => {
      if (blob.value) {
        image.value = URL.createObjectURL(blob.value[0]);
        console.log(blob.value[0]);
        console.log(image.value);
        blobToBase64(blob.value[0]).then((resp) => {
          context.emit("updatePic", { image: resp, blob: blob.value });
        });
      }
    };

    const deleteImage = () => {
      image.value = null;
      blob.value = [];
    };

    return {
      image,
      blob,
      updateImage,
      deleteImage,
    };
  },
});
</script>
