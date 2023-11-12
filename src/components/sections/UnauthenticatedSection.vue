<template>
  <section class="page-section unauthenticated-section d-flex flex-column gap-3">
    <h2 class="banner-title">Присоединяйтесь к нам</h2>
    <div class="banner-info">
      <div class="banner-subtitle">Авторизовавшись вы сможете:</div>
      <ul class="banner-abilities-list">
        <li>Создать свой профиль</li>
        <li>Добавить пост</li>
        <li>Написать комментарий</li>
        <li>Оставлять реакции</li>
        <li>Добавить друзей</li>
        <li>Подписаться на любимые сообщества</li>
        <li>Отслеживать новости друзей и сообществ</li>
      </ul>
    </div>
    <div class="banner-actions d-flex align-items-center justify-content-center gap-2">
      <RouterLink to="/login" class="btn btn-primary">Войти</RouterLink>
      <RouterLink to="/register" class="btn btn-primary">Регистрация</RouterLink>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
.unauthenticated-section {
  padding: 1.5rem !important;
}

.unauthenticated-section .banner-title {
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}

.unauthenticated-section .banner-subtitle {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.unauthenticated-section .banner-abilities-list {
  list-style: '#  ';
}

.unauthenticated-section .banner-abilities-list li {
  font-size: var(--fz-larger);
  color: var(--clr-text-alt);
  padding: 9px 0;
}

.unauthenticated-section .banner-actions .btn {
  width: 45%;
}
</style>