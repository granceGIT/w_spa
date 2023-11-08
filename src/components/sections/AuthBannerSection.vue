<template>
  <section class="page-section auth-banner-section">
    <div class="auth-banner">
      123
    </div>
    <div class="auth-banner">
      123
    </div>
    <div class="auth-banner">
      123
    </div>
    <div class="auth-banner">
      123
    </div>
    <div class="auth-banner">
      123
    </div>
    <div class="auth-banner">
      123
    </div>
    <div class="auth-banner">
      123
    </div>
    <div class="auth-banner">
      123
    </div>
    <div class="auth-banner" @click="modalVisible = true">
      click me
    </div>
    <Modal :visible="modalVisible" @close="modalVisible=false">
      modal test
    </Modal>
  </section>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import {ref} from "vue";

const modalVisible = ref(false);
</script>

<style scoped>
.auth-banner-section .auth-banner {
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>