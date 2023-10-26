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
              <NewsSection/>
            </template>
            <template #fallback>
              <LoadingSpinner/>
            </template>
          </Suspense>
        </div>
        <div class="col-12 col-md-3 d-flex flex-column">
          <AsideBannerSection/>
          <AsideNavSection/>
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
</script>

<style scoped>

</style>