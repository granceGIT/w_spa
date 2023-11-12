<template>
  <header class="header" id="header">
    <div class="container">
      <div class="header-content d-flex align-items-center gap-5 py-2">
        <RouterLink to="/" class="logo">W</RouterLink>
        <SearchBlock/>
        <ProfileBlock/>
      </div>
    </div>
  </header>
</template>

<script setup>
import ProfileBlock from "@/components/header/ProfileBlock.vue";
import SearchBlock from "@/components/header/SearchBlock.vue";
</script>

<style scoped>
#header {
  background-color: var(--clr-background);
  line-height: 1;
}

.logo {
  font-size: 45px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  color: var(--clr-primary);
  text-decoration: none;
}

/*
#header .runningText {
  color: var(--clr-text-alt);
  line-height: 2;
  max-height: 52px;
  max-width: 50%;
  margin: 0 auto;
  overflow: hidden;
}
*/
</style>