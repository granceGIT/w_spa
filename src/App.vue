<script setup>
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import Toaster from "@/components/Toaster.vue";
import ImageViewer from "@/components/ImageViewer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
</script>

<template>
  <Header/>
  <Suspense>
    <template #default>
      <RouterView/>
    </template>
    <template #fallback>
      <LoadingSpinner/>
    </template>
  </Suspense>
  <Toaster/>
  <ImageViewer/>
  <Footer/>
</template>

<style>
</style>
