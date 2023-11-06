<template>
  <div class="search-form" ref="searchForm">
    <div class="input-group d-flex align-items-center">
      <input type="text" class="search-input" @input="updateSearch" v-model="search" id="search" name="search"
             placeholder="Поиск..."
             @focus="handleFocus"
             aria-label="Поиск" aria-describedby="search-button">
      <label for="search" class="search-icon" id="search-button">
        <span class="hidden-visually">Поиск</span>
      </label>
    </div>
    <SearchResults v-if="searchResultsVisible" :users="searchResults"/>
  </div>
</template>

<script setup>
import SearchResults from "@/components/header/SearchResults.vue";
import {ref} from "vue";
import UserService from "@/services/UserService";
import ErrorHandler from "@/handlers/ErrorHandler";
import {onClickOutside, useDebounceFn} from "@vueuse/core";

const searchResults = ref([]);
const searchForm = ref(null);
const searchResultsVisible = ref(false);
const search = ref("");

onClickOutside(searchForm, () => {
  searchResultsVisible.value = false;
});

const handleFocus = () => {
  searchResultsVisible.value = true;
};

const searchRequest = async () => {
  try {
    if (search.value) {
      const resp = await UserService.search(search.value);
      searchResults.value = resp.data;
    }
  } catch (e) {
    ErrorHandler.handle(e);
  }
};

// Задержка 0.5сек. перед выполнением запроса на сервер после заполнения поля поиска
// максимальная задержка перед запросом 3сек
const updateSearch = useDebounceFn(searchRequest, 500, {maxWait: 3000});

</script>

<style scoped>
.search-input {
  padding: 9px 35px 9px 9px;
  border: 1px solid var(--clr-background-alt);
  border-radius: 5px;
  background-color: var(--clr-background-alt);
  min-width: 40ch;
  position: relative;
}

.search-form {
  flex-wrap: nowrap;
  position: relative;
}

.search-form .search-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1.7rem;
  height: 1.7rem;
  cursor: pointer;
}
</style>