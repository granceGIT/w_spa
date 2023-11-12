<template>
  <section class="page-section news-section" v-if="postStore.posts.length">
    <Post v-for="post in postStore.posts"
          :key="post.id"
          :post="post"
          @delete="deletePost(post.id)"
    />
    <IntersectionObserver v-if="postStore.postLoader" :listen="postStore.postLoader" @intersect="postStore.loadMore"/>
    <ContentNotFound class="h-auto my-4" title="Дальше ничего нет" text="Вы просмотрели все новости" v-else/>
  </section>

  <section class="page-section news-section" v-else>
    <ContentNotFound text="Записи не найдены"/>
  </section>
</template>

<script setup>
import Post from "@/components/Post.vue";
import ContentNotFound from "@/components/ContentNotFound.vue";
import IntersectionObserver from "@/components/IntersectionObserver.vue";
import {usePostStore} from "@/stores/post";

const emit = defineEmits(["deletePost"]);
const postStore = usePostStore();

const deletePost = (id) => {
  emit("deletePost", id);
};
</script>

<style scoped>
</style>
