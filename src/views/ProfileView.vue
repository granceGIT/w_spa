<template>
  <main class="main" id="main">
    <div class="container">
      <div class="row w-100">
        <div class="col-12 col-md-4 offset-md-1">
          <Suspense>
            <template #default>
              <ProfileSection/>
            </template>
            <template #fallback>
              <LoadingSpinner/>
            </template>
          </Suspense>
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <CreatePostSection v-if="userStore.user.id===id"/>
          <Suspense>
            <template #default>
              <ProfileNewsSection/>
            </template>
            <template #fallback>
              <LoadingSpinner/>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import ProfileSection from "@/components/sections/ProfileSection.vue";
import CreatePostSection from "@/components/sections/CreatePostSection.vue";
import ProfileNewsSection from "@/components/sections/ProfileNewsSection.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/user";
import {ref, watch} from "vue";

const userStore = useUserStore();
const route = useRoute();
const id = ref(Number(route.params.id));

watch(
    () => route.params.id,
    () => id.value = Number(route.params.id),
);

</script>

<style scoped>

</style>