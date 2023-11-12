<template>
  <main class="main" id="main">
    <div class="container">
      <div class="row w-100">
        <div class="col-12 col-md-6 offset-md-1 d-flex flex-column">
          <CreatePostSection v-if="community.user_id===userStore.user.id" :community="community"/>
          <Suspense>
            <template #default>
              <CommunityNewsSection/>
            </template>
            <template #fallback>
              <LoadingSpinner/>
            </template>
          </Suspense>
        </div>
        <div class="col-12 col-md-4">
          <Suspense>
            <template #default>
              <CommunityProfileSection :community="community"/>
            </template>
            <template #fallback>
              <LoadingSpinner />
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import CommunityProfileSection from "@/components/sections/CommunityProfileSection.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import CommunityNewsSection from "@/components/sections/CommunityNewsSection.vue";
import {ref, watch} from "vue";
import CommunityService from "@/services/CommunityService";
import ErrorHandler from "@/handlers/ErrorHandler";
import {useRoute} from "vue-router";
import CreatePostSection from "@/components/sections/CreatePostSection.vue";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore()
const route = useRoute();
const community = ref({})
const id = ref(Number(route.params.id))

watch(
    () => route.params.id,
    async () => {
      id.value = Number(route.params.id);
      await fetchCommunity();
    },
);

const fetchCommunity = async () => {
  try{
    const resp = await CommunityService.fetchCommunity(id.value)
    community.value = resp.data
  }
  catch(e){
    ErrorHandler.handle(e)
  }
};

await fetchCommunity();
</script>

<style scoped>

</style>