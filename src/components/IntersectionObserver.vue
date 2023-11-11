<template>
  <div ref="target">
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import {useIntersectionObserver} from "@vueuse/core";

const emit = defineEmits(["intersect"]);
const props = defineProps({
  listen: {
    type: Boolean,
    default: true,
  },
});

const target = ref();

const {isActive} = useIntersectionObserver(target, ([{isIntersecting}]) => {
      if (isIntersecting) emit("intersect");
    },
);

watch(() => props.listen, () => {
  isActive.value = props.listen;
});

</script>
