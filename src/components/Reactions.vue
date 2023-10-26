<template>
  <div class="post-footer-reactions d-flex gap-3">
    <p class="reaction-item" @click="setReactionRequest(reaction.id)"
       :class="{'active':userStore.isAuthenticated && currentReaction(reaction.id).find(el=>el.user_id===userStore.user.id)}"
       v-for="reaction in reactions" :key="reaction.id">
      <span class="hidden-visually">{{ reaction.name }}</span>
      <img :src="reaction.url" :alt="reaction.name" class="reaction-icon">
      <span class="reaction-count">{{ currentReaction(reaction.id).length }}</span>
    </p>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import ReactionService from "@/services/ReactionService";
import ErrorHandler from "@/handlers/ErrorHandler";
import {ref} from "vue";

const userStore = useUserStore();
const props = defineProps({
  id: {
    required: true,
    type: Number,
  },
  setReactions: {
    type: Array,
  },
  reactions: {
    type: Array,
  },
  type: {
    required: true,
    validator(value) {
      // Типы для реакций
      return ["post", "comment", "image"].includes(value);
    },
  },
});

const setReactions = ref(props.setReactions);
const reactions = ref(props.reactions);

const currentReaction = id => setReactions.value.filter(r => r.reaction_id === id);
const setReactionRequest = async (id) => {
  try {
    if (userStore.isAuthenticated) {
      const resp = await ReactionService.setReaction(props.id, id, props.type);
      reactions.value = resp.data.reactions;
      setReactions.value = resp.data.set_reactions;
    }
  } catch (e) {
    ErrorHandler.handle(e);
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