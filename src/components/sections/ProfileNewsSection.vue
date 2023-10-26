<template>
  <section class="page-section news-section" v-if="postStore.posts.length">
    <Post v-for="post in postStore.posts" :key="post.id" :post="post"/>
  </section>

  <section class="page-section news-section" v-else>
    <ContentNotFound text="Записи не найдены"/>
  </section>
</template>

<script setup>
import Post from "@/components/Post.vue";
import {usePostStore} from "@/stores/post";
import {useRoute} from "vue-router";
import ContentNotFound from "@/components/ContentNotFound.vue";
import {watch} from "vue";

const postStore = usePostStore();
const route = useRoute();

const fetchPosts = async () => {
  await postStore.updatePosts({userId: route.params.id});
};

watch(
    () => route.params.id,
    fetchPosts,
);

await fetchPosts();


</script>

<style scoped>
.news-section {
  min-height: 300px;
}
</style>
