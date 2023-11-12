<template>
  <div class="tabs-wrapper w-100 d-flex flex-column">
    <ul class="tabs-header d-flex nav">
      <li v-for="(tab,index) in props.tabs"
          :key="index"
          :class="{active:activeTabIndex===index}"
          @click="activeTabIndex=index"
          :style="`width:calc(100%/${props.tabs.length})`"
          class="tabs-header-item">
        {{ tab.title }}
      </li>
    </ul>
    <div class="tabs-content mt-3 p-2">
      <slot name="content" :activeTab="props.tabs[activeTabIndex]"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
});

const activeTabIndex = ref(props.activeIndex ?? 0);
</script>

<style scoped>
.tabs-header-item {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--clr-primary);
  background-color: var(--clr-background);
  color: var(--clr-primary);
  align-items: center;
  justify-content: center;
  padding: 9px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  transition: all .25s;
}

.tabs-header-item:hover {
  background-color: var(--clr-background-alt);
}

.tabs-header-item.active {
  background-color: var(--clr-primary);
  color: var(--clr-light);
}

</style>

