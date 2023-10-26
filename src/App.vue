<script setup>
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import Toaster from "@/components/Toaster.vue";
</script>

<template>
  <Header/>
  <RouterView/>
  <Toaster />
  <Footer/>
</template>

<style>
</style>
