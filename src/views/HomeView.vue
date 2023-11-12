<template>
  <main class="main" id="main">
    <div class="container">
      <div class="row w-100">
        <div class="col-12 col-md-3">
          <LeftAsideSection/>
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <Suspense>
            <template #default>
              <NewsSection @deletePost="deletePost"/>
            </template>
            <template #fallback>
              <LoadingSpinner/>
            </template>
          </Suspense>
        </div>
        <div class="col-12 col-md-3 d-flex flex-column">
          <AsideBannerSection/>
          <AsideNavSection @select="changeType" :active="type"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import NewsSection from "@/components/sections/NewsSection.vue";
import AsideBannerSection from "@/components/sections/AsideBannerSection.vue";
import AsideNavSection from "@/components/sections/AsideNavSection.vue";
import LeftAsideSection from "@/components/sections/LeftAsideSection.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {usePostStore} from "@/stores/post";
import {useToasterStore} from "@/stores/toaster";
import {ref, watch} from "vue";

const postStore = usePostStore();
const toastStore = useToasterStore();

const type = ref("all");

const fetchPosts = async () => {
  await postStore.updatePosts({type:type.value,page:1});
};

const changeType = (t)=>{
  type.value = t
}

watch(()=>type.value,async ()=>{
  await postStore.updatePosts({type:type.value,page:1});
})

const deletePost = async (id) => {
  const res = await postStore.deletePost(id);
  if (res) {
    toastStore.success({text: "Запись удалена"});
  }
};

await fetchPosts();
</script>

<style scoped>

</style>