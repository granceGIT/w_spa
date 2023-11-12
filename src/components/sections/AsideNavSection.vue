<template>
  <section class="page-section aside-nav-section">
    <ul class="nav flex-column aside-nav">
      <li v-for="{name,type} in types"
          :key="name"
          :class="{'active':props.active===type}"
          @click="handleSelect(type)">
        {{ name }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import {useUserStore} from "@/stores/user";

const types = [
  {
    name: "Новости",
    type: "all",
  },
  {
    name: "Мои реакции",
    type: "reactions",
  },
  {
    name: "Сообщества",
    type: "communities",
  },
  {
    name: "Друзья",
    type: "users",
  },
  // {
  //   name: "Лента друга(?)",
  //   type: "all",
  // },
];

const emit = defineEmits(["select"]);
const props = defineProps({
  active: {
    type: String,
    default: "all",
  },
});

const userStore = useUserStore();

const handleSelect = (type) => {
  userStore.isAuthenticated && emit("select", type);
};

</script>

<style scoped>
.aside-nav-section {
  padding: 0 !important;
}

.aside-nav li {
  padding: 1rem;
  margin: 0;
  border-top: 1px solid var(--clr-background-alt);
  cursor: pointer;
  transition: all .25s;
}

.aside-nav li:hover {
  background-color: var(--clr-background-alt);
}

.aside-nav li.active {
  background-color: var(--clr-background-alt);
}
</style>