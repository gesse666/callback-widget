<template>
  <div class="main-page">
    <h1>Главная страница</h1>
    <NuxtLink to="/sticker" class="sticker-link">
      Перейти к стикеру
    </NuxtLink>
  </div>
</template>

<style scoped>
.main-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
}

.sticker-link {
  padding: 1rem 2rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.2rem;
  margin-top: 2rem;
  transition: transform 0.2s;
}

.sticker-link:hover {
  transform: scale(1.05);
}
</style>
