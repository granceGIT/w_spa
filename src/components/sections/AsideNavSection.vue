<template>
  <section class="page-section aside-nav-section">
    <ul class="nav flex-column aside-nav">
      <li class="active">Новости</li>
      <li>Мои реакции</li>
      <li>Сообщества</li>
      <li>Друзья</li>
      <li>Лента друга(?)</li>
    </ul>
  </section>
</template>

<script setup>

</script>

<style scoped>
.aside-nav-section {
  padding: 0 !important;
}

.aside-nav li {
  padding: 1rem;
  margin: 0;
  border-top: 1px solid var(--clr-background-alt);
  cursor: pointer;
  transition: all .25s;
}

.aside-nav li:hover {
  background-color: var(--clr-background-alt);
}

.aside-nav li.active {
  background-color: var(--clr-background-alt);
}
</style>