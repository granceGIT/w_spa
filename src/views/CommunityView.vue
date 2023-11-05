<template>
  <main class="main" id="main">
    <div class="container">
      <div class="row w-100">
        <div class="col-12 col-md-6 offset-md-1 d-flex flex-column">
          <Suspense>
            <template #default>
              <NewsSection/>
            </template>
            <template #fallback>
              <LoadingSpinner/>
            </template>
          </Suspense>
        </div>
        <div class="col-12 col-md-4 ">
          <CommunityProfileSection/>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

import NewsSection from "@/components/sections/NewsSection.vue";
import CommunityProfileSection from "@/components/sections/CommunityProfileSection.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
</script>

<style scoped>

</style>