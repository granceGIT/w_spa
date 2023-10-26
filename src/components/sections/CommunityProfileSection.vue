<template>
  <section class="page-section community-section d-flex flex-column gap-3">
    <div class="community-header d-flex flex-column text-center align-items-center gap-1">
      <div class="profile-header-image">
        <img src="../../assets/images/icons/User_circle_light.svg" alt="user-image" class="img-cover">
      </div>
      <div class="community-header-info d-flex flex-column">
        <div class="community-header-title">Name Surname</div>
        <div class="community-header-subtitle">Profile status</div>
      </div>
    </div>
    <div class="community-actions d-flex align-items-center justify-content-around gap-1">
      <button class="btn btn-primary">Подписаться</button>
      <button class="btn btn-primary">Уведомления</button>
    </div>
    <div class="community-info d-flex flex-column gap-2">
      <div class="community-info-item row">
        <div class="col-6 title">Title</div>
        <div class="col-6 text">text</div>
      </div>

      <div class="community-info-item row">
        <div class="col-6 title">Titlsdfsdfsddfsdfsddfsdfsddfsdfsddfsdfsddfsdfsdfsdfe</div>
        <div class="col-6 text">teasdsadsadasdsadasasdaaaaaateasdsadsadasdsadasasdaaaaaa
          aaaaaaaaaaaaxt
        </div>
      </div>

      <div class="community-info-item row">
        <div class="col-6 title">sdfsdfsdfsdf</div>
        <div class="col-6 text">tesdfsdfxt</div>
      </div>

      <div class="community-info-item row">
        <div class="col-6 title">Tisdfsdfsdftle</div>
        <div class="col-6 text">texsdfsdfsdfsdfsdfsdft</div>
      </div>
    </div>

  </section>
</template>

<script setup>

</script>

<style scoped>
.community-header .community-header-title {
  font-size: var(--fz-extra-large);
}

.community-header .community-header-subtitle {
  color: var(--clr-text-alt);
}

.community-actions .btn {
  width: 100%;
}

.community-info-item {
  padding: 9px;
  border-top: 1px solid var(--clr-background-alt);
}

.community-info-item .text {
  color: var(--clr-text-alt);
}
</style>