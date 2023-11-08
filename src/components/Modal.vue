<template>
  <div v-if="props.visible">
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="props.visible" v-bind="$attrs">
          <div class="modal-wrapper" @click="closeModal">
            <div class="modal-content" @click.stop>
              <button class="btn btn-close" type="button" @click="closeModal">
                <span class="hidden-visually">Закрыть</span>
              </button>
              <slot/>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, watch} from "vue";

const emit = defineEmits(["close"]);
const props = defineProps({
  visible: Boolean,
});

watch(() => props.visible, () => {
  document.body.classList.toggle("scroll-lock", props.visible);
});

const closeModal = () => emit("close");
</script>

<style scoped>
.image-viewer .modal-content{
  max-width: 85vw;
  width: 100%;
  max-height: 90vh;
  min-height: 7em;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, .4);
  cursor: pointer;
  z-index: 1000;
}

.modal-content {
  max-width: 700px;
  width: 80%;
  min-height: 7rem;
  border-radius: 5px;
  padding: 2rem 1.5rem;
  background-color: var(--clr-background);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  cursor: auto;
}

.modal-content .btn-close {
  position: absolute;
  top: .5rem;
  right: .5rem;
  width: 1.1rem;
  height: 1.1rem;
  background-size:cover;
  opacity: .7;
  transition: all .25s;
  z-index: 2;
}

.modal-content .btn-close:hover {
  opacity: 1;
}

/* modal animations */
.modal-enter-active,
.modal-leave-active{
  transition:all .25s;
}

.modal-enter-from,
.modal-leave-to{
  opacity: 0;
}

.modal-enter-to{
  opacity: 1;
}
</style>