<template>
  <div class="loading-spinner-wrapper d-flex align-items-center justify-content-center">
    <div class="loading-spinner">
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.loading-spinner-wrapper {
  width: 100%;
  height: 100%;
  padding: 9px;
  border-radius: 10px;
}

.loading-spinner {
  position: relative;
  width: 80px;
  height: 80px;
}

.loading-spinner .spinner-item {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #BAD7E1;
  position: absolute;
  animation: spinner-animation 1.2s infinite;
}

.loading-spinner .spinner-item:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}

.loading-spinner .spinner-item:nth-child(2) {
  animation-delay: -0.2s;
  top: 22px;
  left: 62px;
}

.loading-spinner .spinner-item:nth-child(3) {
  animation-delay: -0.4s;
  top: 11px;
  left: 52px;
}

.loading-spinner .spinner-item:nth-child(4) {
  animation-delay: -0.6s;
  top: 7px;
  left: 37px;
}

.loading-spinner .spinner-item:nth-child(5) {
  animation-delay: -0.8s;
  top: 11px;
  left: 22px;
}

.loading-spinner .spinner-item:nth-child(6) {
  animation-delay: -1s;
  top: 22px;
  left: 11px;
}

.loading-spinner .spinner-item:nth-child(7) {
  animation-delay: 0s;
  top: 37px;
  left: 7px;
}

.loading-spinner .spinner-item:nth-child(8) {
  animation-delay: -0.2s;
  top: 52px;
  left: 11px;
}

.loading-spinner .spinner-item:nth-child(9) {
  animation-delay: -0.4s;
  top: 62px;
  left: 22px;
}

.loading-spinner .spinner-item:nth-child(10) {
  animation-delay: -0.6s;
  top: 66px;
  left: 37px;
}

.loading-spinner .spinner-item:nth-child(11) {
  animation-delay: -0.7s;
  top: 62px;
  left: 52px;
}

.loading-spinner .spinner-item:nth-child(12) {
  animation-delay: -1s;
  top: 52px;
  left: 62px;
}

@keyframes spinner-animation {
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
    background-color: #55B1C4;
  }
}

</style>