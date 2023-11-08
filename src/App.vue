<script setup>
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import Toaster from "@/components/Toaster.vue";
import ImageViewer from "@/components/ImageViewer.vue";
</script>

<template>
  <Header/>
  <RouterView/>
  <Toaster/>
  <ImageViewer />
  <Footer/>
</template>

<style>
</style>
