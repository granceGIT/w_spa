<template>
  <div class="post-footer-reactions d-flex gap-3">
    <p class="reaction-item"
       :class="{active:reaction.my_reaction}"
       v-for="reaction in reactions"
       :key="reaction.id"
       @click="setReaction(reaction.id)">
      <span class="hidden-visually">{{ reaction.name }}</span>
      <img :src="reaction.url" :alt="reaction.name" class="reaction-icon">
      <span class="reaction-count">{{ reaction.count }}</span>
    </p>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import {validateReactionType} from "@/validators/reactions";
import {usePostStore} from "@/stores/post";
import {ref} from "vue";

const userStore = useUserStore();
const props = defineProps({
  id: {
    required: true,
    type: Number,
  },
  reactions: {
    type: Array,
  },
  type: {
    required: true,
    validator: validateReactionType,
  },
});
const reactions = ref(props.reactions);
const postStore = usePostStore();

const setReaction = async (id) => {
  if (userStore.isAuthenticated) {
    const res = await postStore.setReaction({
      id: props.id,
      reactionId: id,
      type: props.type,
    });
    if (res) reactions.value = res.data.reactions;
  }
};

</script>

<style scoped>
.reaction-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.reaction-item {
  position: relative;
  border-radius: 50%;
  padding: .2rem;
  cursor: pointer;
  transition: all .25s;
}

.reaction-item.active {
  background-color: var(--clr-primary);
}

.reaction-count {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  font-size: .6rem;
}
</style>