<template>
  <section class="page-section create-post-section" v-if="userStore.isAuthenticated">
    <CreatePostForm/>
  </section>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import CreatePostForm from "@/components/forms/CreatePostForm.vue";

const userStore = useUserStore();
</script>

<style scoped>

</style>