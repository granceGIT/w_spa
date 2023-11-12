<template>
  <main class="main" id="main">
    <div class="container">
      <div class="row w-100 ">
        <div class="col-12 col-lg-6 offset-lg-3 h-100">
          <CommunityUpdateForm :community="community"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import CommunityUpdateForm from "@/components/forms/CommunityUpdateForm.vue";
import CommunityService from "@/services/CommunityService";
import {useRoute} from "vue-router";
import {ref} from "vue";
import ErrorHandler from "@/handlers/ErrorHandler";

const route = useRoute();

const community = ref({});
const id = ref(Number(route.params.id));

const fetchCommunity = async () => {
  try {
    const res = await CommunityService.fetchCommunity(id.value);
    return res.data;
  } catch (e) {
    ErrorHandler.handle(e);
  }
};

community.value = await fetchCommunity();
</script>

<style scoped>

</style>