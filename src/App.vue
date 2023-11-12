<script setup>
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import Toaster from "@/components/Toaster.vue";
import ImageViewer from "@/components/ImageViewer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
</script>

<template>
  <Header/>
  <RouterView v-slot="{ Component }">
    <Suspense timeout="0">
      <template #default>
        <div>
          <component :is="Component" :key="$route.path"></component>
        </div>
      </template>
      <template #fallback>
        <LoadingSpinner/>
      </template>
    </Suspense>
  </RouterView>
  <Toaster/>
  <ImageViewer/>
  <Footer/>
</template>

<style>
</style>
