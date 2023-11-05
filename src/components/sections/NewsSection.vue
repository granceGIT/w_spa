<template>
  <section class="page-section news-section" v-if="postStore.posts.length">
    <Post v-for="post in postStore.posts"
          :key="post.id"
          :post="post"
          @delete="deletePost"
    />
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
import {useToasterStore} from "@/stores/toaster";

const postStore = usePostStore();
const toastStore = useToasterStore();
const route = useRoute();

const fetchPosts = async () => {
  await postStore.updatePosts({});
};

const deletePost = async (id) => {
  const res = await postStore.deletePost(id);
  if (res) {
    toastStore.success({text: "Запись удалена"});
  }
};

watch(
    () => route.params.id,
    fetchPosts,
);

await fetchPosts();
</script>

<style scoped>
</style>
