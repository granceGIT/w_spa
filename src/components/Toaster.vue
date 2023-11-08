<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="toastStore.toasts.length" class="toaster-wrapper">
        <TransitionGroup name="toast" tag="ul" class="toaster-items">
          <li
              v-for="toast in toastStore.toasts"
              :class="['toaster-item', toastClassMap[toast.type]]"
              :key="toast.id"
          >
        <span class="toaster-item-header d-flex w-100 align-items-center justify-content-between mb-2 gap-3">
          <span class="toaster-item-title">{{ toast.title ?? toastDefaultTitleMap[toast.type] }}</span>
          <button @click="toastStore.dismiss(toast.id)" class="btn btn-close btn-close-dark">
            <span class="hidden-visually">Закрыть</span>
          </button>
        </span>
            <span class="toaster-item-text">
              {{ toast.text }}
        </span>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import {useToasterStore} from "@/stores/toaster";

const toastClassMap = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
};

const toastDefaultTitleMap = {
  success: "Успешно",
  warning: "Предупреждение",
  error: "Ошибка",
  info: "Информация",
};

const toastStore = useToasterStore();
</script>

<style scoped>
.toaster-wrapper {
  position: fixed;
  right: 2%;
  bottom: 2%;
  padding: 0;
  margin: 0;
}

.toaster-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toaster-item {
  padding: 1rem;
  border-radius: 5px;
  max-width: 250px;
  min-height: 10ch;
  position: relative;
  margin: 10px 0;
}

.toaster-item.success {
  color: var(--bs-success-text-emphasis);
  background-color: var(--bs-success-bg-subtle);
}

.toaster-item.error {
  color: var(--bs-danger-text-emphasis);
  background-color: var(--bs-danger-bg-subtle);
}

.toaster-item.warning {
  color: var(--bs-warning-text-emphasis);
  background-color: var(--bs-warning-bg-subtle);
}

.toaster-item.info {
  color: var(--bs-info-text-emphasis);
  background-color: var(--bs-info-bg-subtle);
}

.toaster-item-title {
  font-size: var(--fz-larger);
}

.toaster-item-text {
  margin-top: auto;
}

/* toaster animation */

.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.25s all;
}

</style>