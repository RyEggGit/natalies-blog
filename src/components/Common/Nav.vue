<template>
  <div>
    <div class="flex sticky top-0 z-50 bg-white h-32 items-center">
      <router-link class="text-3xl font-bold" to="/">nt.</router-link>
      <div class="flex ml-auto">
        <v-icon class="ml-2" @click="toInstagram">mdi-instagram</v-icon>
        <!-- <v-icon class="ml-2" @click="toLinkedIn">mdi-linkedin</v-icon> -->
        <v-icon class="ml-2" @click="toWaterlooRunning">mdi-run-fast</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const toInstagram = () => {
      window.open("https://www.instagram.com/_natalietsang/", "_blank");
    };

    const toLinkedIn = () => {
      window.location.href =
        "https://www.linkedin.com/in/nataliezltsang/?originalSubdomain=ca";
    };

    const toWaterlooRunning = () => {
      window.open(
        "https://athletics.uwaterloo.ca/sports/cross-country/roster/natalie-tsang/9015",
        "_blank"
      );
    };
    return { toInstagram, toLinkedIn, toWaterlooRunning };
  },
};
</script>

<style lang="scss" scoped>
</style>