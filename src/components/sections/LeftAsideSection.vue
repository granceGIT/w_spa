<template>
  <div v-if="userStore.isAuthenticated">
    <Suspense>
      <template #default>
        <ProfileSection/>
      </template>
      <template #fallback>
        <LoadingSpinner/>
      </template>
    </Suspense>
  </div>
  <div v-else>
    <UnauthenticatedSection/>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import UnauthenticatedSection from "@/components/sections/UnauthenticatedSection.vue";
import ProfileSection from "@/components/sections/ProfileSection.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const userStore = useUserStore();
</script>

<style scoped>

</style>