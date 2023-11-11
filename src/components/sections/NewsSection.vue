<template>
  <section class="page-section news-section" v-if="postStore.posts.length">
    <Post v-for="post in postStore.posts"
          :key="post.id"
          :post="post"
          @delete="deletePost"
    />
    <IntersectionObserver v-if="postLoader" :listen="postLoader" @intersect="loadMorePosts"/>
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

const postStore = usePostStore();
const toastStore = useToasterStore();
const route = useRoute();

const page = ref(1);
const postLoader = ref(true)

const fetchPosts = async () => {
  await postStore.updatePosts({type:"all",page:page.value});
};

const loadMorePosts = async()=>{
  const res = await postStore.loadMore({type:"all",page:++page.value})
  if(!res) postLoader.value = false;
}

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
