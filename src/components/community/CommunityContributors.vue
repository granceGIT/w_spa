<template>
  <div class="community-contributors d-flex flex-column pt-3">
    <div class="community-contributors-title mb-3">Контакты сообщества</div>
    <CommunityContributorItem v-for="{user} in props.contributors"
                              :key="user.id"
                              :user="user"/>
  </div>
</template>

<script setup>
const props = defineProps({
  contributors:{
    type:Array,
    required:true,
  }
})

import CommunityContributorItem from "@/components/community/CommunityContributorItem.vue";
</script>

<style scoped>
.community-contributors{
  border-top: 1px solid var(--clr-text-alt);
  font-size: var(--fz-larger);
  text-align: center;
}
</style>