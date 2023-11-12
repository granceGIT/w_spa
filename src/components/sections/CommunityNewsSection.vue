<template>
  <section class="page-section news-section" v-if="postStore.posts.length">
    <Post v-for="post in postStore.posts"
          :key="post.id"
          :post="post"
          @delete="deletePost"
    />
    <IntersectionObserver v-if="postStore.postLoader" :listen="postStore.postLoader" @intersect="postStore.loadMore"/>
    <ContentNotFound class="h-auto my-4" title="Дальше ничего нет" text="Вы просмотрели все новости" v-else />
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
import {ref, watch} from "vue";
import {useToasterStore} from "@/stores/toaster";
import IntersectionObserver from "@/components/IntersectionObserver.vue";

const toastStore = useToasterStore();
const postStore = usePostStore();
const route = useRoute();
const communityId = ref(Number(route.params.id));

const fetchPosts = async () => {
  await postStore.updatePosts({type:"community",id:communityId.value,page:1});
};

const deletePost = async (id) => {
  const res = await postStore.deletePost(id);
  if (res) {
    toastStore.success({text: "Запись удалена"});
  }
};

watch(
    () => route.params.id,
    async () => {
      communityId.value = Number(route.params.id);
      await fetchPosts();
    },
);

await fetchPosts();


</script>

<style scoped>
.news-section {
  min-height: 300px;
}
</style>
