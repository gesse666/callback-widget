<template>
  <div class="sticker-page">
    <h1>Страница со стикером</h1>

    <div class="content-blocks">
      <div v-for="i in 10" :key="i" class="content-block">
        <h3>Блок контента {{ i }}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    </div>

    <AnimatedSticker />

  </div>
</template>

<style scoped>
.sticker-page {
  min-height: 200vh;
  padding: 2rem;
  background: linear-gradient(180deg, #e3f2fd 0%, #f3e5f5 100%);
}

.content-blocks {
  max-width: 800px;
  margin: 2rem auto;
}

.content-block {
  background: white;
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
