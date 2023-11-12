<template>
  <section class="page-section create-post-section" v-if="userStore.isAuthenticated">
    <CreatePostForm :community="props.community"/>
  </section>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import CreatePostForm from "@/components/forms/CreatePostForm.vue";

const props = defineProps({
  community:{
    type:Object,
    default:()=>({}),
  }
})
const userStore = useUserStore();
</script>

<style scoped>

</style>