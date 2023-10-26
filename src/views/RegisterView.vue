<template>
  <main class="main" id="main">
    <div class="container">
      <div class="row w-100 ">
        <div class="col-12 col-lg-4 offset-lg-2 h-100">
          <RegisterForm/>
        </div>

        <div class="col-12 col-lg-4 h-100">
          <AuthBannerSection/>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

import RegisterForm from "@/components/forms/RegisterForm.vue";
import AuthBannerSection from "@/components/sections/AuthBannerSection.vue";
</script>

<style scoped>

</style>