<template>
  <Modal :visible="imageStore.visible" @close="imageStore.close" variant="image-viewer">
    <div class="control-prev" @click="imageStore.prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Пред</span>
    </div>
    <img :src="imageStore.image.image" :alt="imageStore.image.alt ?? `image${imageStore.activeIndex}`" class="img-cover image-viewer-image">
    <div class="control-next" @click="imageStore.next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">След</span>
    </div>
  </Modal>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import {useImageStore} from "@/stores/image";

const imageStore = useImageStore()
</script>

<style scoped>
.control-prev,
.control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4em;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1em;
  transition: all .4s;
  border-radius: 3px;
  user-select: none;
  z-index: 1;
}

.control-next:hover,
.control-prev:hover {
  background-color: rgba(255, 255, 255, .1);
}

.control-prev {
  left: 0;
}

.control-next {
  right: 0;
}

.image-viewer-image{
  object-fit: contain;
  max-height: 80vh;
}
</style>