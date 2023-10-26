<template>
  <div class="search-results box-shadow" v-if="props.users.length">
    <SearchResultItem v-for="user in props.users" :key="user.id" :user="user"/>
  </div>
  <div class="search-results box-shadow d-flex align-items-center" v-else>
    <ContentNotFound text="Ничего не найдено"/>
  </div>
</template>

<script setup>
import SearchResultItem from "@/components/header/SearchResultItem.vue";
import ContentNotFound from "@/components/ContentNotFound.vue";

const props = defineProps({
  users: {
    type: Array,
  },
});
</script>

<style scoped>
.search-results {
  position: absolute;
  z-index: 100;
  width: 100%;
  top: 100%;
  min-height: 10ch;
  max-height: 35ch;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: var(--clr-background-alt);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: var(--clr-text-alt);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--clr-primary);
}
</style>