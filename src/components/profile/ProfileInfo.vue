<template>
  <div>
    <ProfileInfoItem v-for="{title,subtitle,icon} in userInfo"
                     :key="title"
                     :subtitle="subtitle"
                     :title="title"
                     :icon="icon"/>
  </div>
</template>

<script setup>
import DateIcon from "@/components/icons/DateIcon.vue";
import ProfileInfoItem from "@/components/profile/ProfileInfoItem.vue";
import EducationIcon from "@/components/icons/EducationIcon.vue";
import JobIcon from "@/components/icons/JobIcon.vue";
import CountryIcon from "@/components/icons/CountryIcon.vue";
import CityIcon from "@/components/icons/CityIcon.vue";
import {format} from "date-fns";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const userInfo = [
  {
    title: "Дата рождения",
    subtitle: format(new Date(props.user.birthdate), "dd.MM.yyyy"),
    icon: DateIcon,
  },
  {
    title: "Образование",
    subtitle: props.user.education,
    icon: EducationIcon,
  },
  {
    title: "Профессия",
    subtitle: props.user.job,
    icon: JobIcon,
  },
  {
    title: "Страна",
    subtitle: props.user.country,
    icon: CountryIcon,
  },
  {
    title: "Город",
    subtitle: props.user.city,
    icon: CityIcon,
  },

];
</script>

<style scoped>

</style>