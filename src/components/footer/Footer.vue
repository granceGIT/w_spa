<template>
  <footer class="footer" id="footer">
    <div class="container">
      <div class="row text-center">
        <div class="footer-item col-12 col-md-4 d-flex flex-column align-items-center">
          <p>All rights not reserved &copy; 2023</p>
        </div>
        <div class="footer-item col-12 col-md-4">
          <p>Reaction icons by <a target="_blank" href="https://icons8.com">Icons8</a></p>
        </div>
        <div class="footer-item col-12 col-md-4">
          <button class="btn btn-primary" @click="makeToast">click me</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {useToasterStore} from "@/stores/toaster";

const toastStore = useToasterStore();

const makeToast = () => {
  toastStore.info({text: "Toast test, timeout: 10s", timeout: 10000});
};
</script>

<style scoped>

</style>