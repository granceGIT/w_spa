<template>
  <div class="community-info d-flex flex-column gap-2 pt-3">
    <div class="community-info-title text-center mb-3">Информация о сообществе</div>
    <CommunityInfoItem v-for="{title,subtitle} in communityInfo"
                       :key="title"
                       :subtitle="subtitle"
                       :title="title"/>
  </div>
</template>

<script setup>
import CommunityInfoItem from "@/components/community/CommunityInfoItem.vue";
import {format} from "date-fns";

const props = defineProps({
  community: {
    type: Object,
    required: true,
  },
});

const communityInfo = [
  {
    title: "Описание",
    subtitle: props.community.description,
  },
  {
    title: "Краткое название",
    subtitle: props.community.alias,
  },
  {
    title: "Подписчиков",
    subtitle: props.community.sub_count,
  },
  {
    title: "Дата создания",
    subtitle: format(new Date(props.community.created_at),"dd.MM.yyyy"),
  },
];
</script>

<style scoped>
.community-info{
  border-top: 1px solid var(--clr-text-alt);
  font-size: var(--fz-larger);
}
</style>