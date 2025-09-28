<template>
  <div
      ref="stickerRef"
      class="sticker"
      @mouseenter="expandSticker"
      @mouseleave="collapseSticker"
  >
    <div ref="containerRef" class="sticker__container">
      <h3 ref="titleRef" class="sticker__title">
        Консультация эксперта
      </h3>

      <div ref="avatarsRef" class="sticker__avatars">
        <div
            v-for="(img, i) in catImages"
            :key="i"
            :ref="(el) => setAvatarRef(el as HTMLElement | null, i)"
            class="sticker__avatar"
        >
          <img
              :src="img"
              :alt="`Expert ${i + 1}`"
              class="sticker__avatar-image"
          />
        </div>
      </div>

      <div class="sticker__action">
        <div ref="arrowRef" class="sticker__arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
              <mask id="mask0_14_2658" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_14_2658)">
                <path d="M7.82506 13.0001L13.4251 18.6001L12.0001 20.0001L4.00006 12.0001L12.0001 4.00006L13.4251 5.40006L7.82506 11.0001H20.0001V13.0001H7.82506Z" fill="#333333"/>
              </g>
            </g>
          </svg>
        </div>
        <button ref="buttonRef" class="sticker__button">
          Получить консультацию
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, type ComponentPublicInstance } from 'vue'
import { gsap } from 'gsap'

const stickerRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const avatarsRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)

const avatarElements: (HTMLElement | null)[] = [null, null, null]
const catImages = ref<string[]>([])

function setAvatarRef(el: HTMLElement | ComponentPublicInstance | null, index: number): void {
  if (!el) return

  let element: HTMLElement | null = null

  if ('$el' in el) {
    element = el.$el as HTMLElement
  } else if (el instanceof HTMLElement) {
    element = el
  }

  if (element && index >= 0 && index < 3) {
    avatarElements[index] = element
  }
}

const loadCatImages = (): void => {
  catImages.value = Array.from(
      { length: 3 },
      (_, i) => `https://cataas.com/cat?width=80&height=80&t=${Date.now()}&r=${i}`
  )
}

let masterTimeline: gsap.core.Timeline | null = null

function createMasterTimeline(): void {
  if (
      !containerRef.value ||
      !titleRef.value ||
      !avatarsRef.value ||
      !arrowRef.value ||
      !buttonRef.value
  ) {
    console.warn('Required elements not found')
    return
  }

  if (
      !avatarElements[0] ||
      !avatarElements[1] ||
      !avatarElements[2]
  ) {
    console.warn('Avatar elements not ready')
    return
  }

  const container = containerRef.value
  const title = titleRef.value
  const avatarsContainer = avatarsRef.value
  const arrow = arrowRef.value
  const button = buttonRef.value
  const avatar0 = avatarElements[0]
  const avatar1 = avatarElements[1]
  const avatar2 = avatarElements[2]

  masterTimeline = gsap.timeline({ paused: true })

  masterTimeline
      .to(arrow, { opacity: 0, scale: 0.7, duration: 0.2, ease: 'power2.out' }, 0)
      .to(avatar0, { y: 104, scale: 0.85, duration: 0.4, ease: 'power2.out' }, 0)
      .to(avatar1, { y: 104, scale: 0.85, duration: 0.4, ease: 'power2.out' }, 0.1)
      .to(avatar2, { y: 104, scale: 0.85, duration: 0.4, ease: 'power2.out' }, 0.2)
      .to([avatar0, avatar1, avatar2], { scale: 0.8, duration: 0.2, ease: 'power2.inOut' }, 0.4)

  masterTimeline
      .to(container, {
        width: '280px',
        padding: '24px 32px',
        duration: 0.4,
        ease: 'power2.out'
      }, 0.6)
      .to(avatarsContainer, {
        width: '164',
        height: '64px',
        marginBottom: '0',
        duration: 0.4,
        ease: 'power2.out'
      }, 0.6)
      .to([avatar0, avatar1, avatar2], {
        y: 0,
        x: 80,
        duration: 0.4,
        ease: 'power2.out'
      }, 0.6)

  masterTimeline
      .to(avatar0, { y: 0, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, 1.0)
      .to(avatar1, { y: 0, x: 49, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, 1.1)
      .to(avatar2, { y: 0, x: 98, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, 1.2)

  masterTimeline
      .to(title, { opacity: 1, height: 'auto', y: 0, duration: 0.3, ease: 'power2.out' }, 1.4)
      .to(arrow, { opacity: 0, scale: 0.7, duration: 0.2, ease: 'power2.out' }, 1.4)
      .to(button, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }, 1.5)
}

function expandSticker(): void {
  masterTimeline?.play()
}

function collapseSticker(): void {
  masterTimeline?.reverse()
}

onMounted(async (): Promise<void> => {
  loadCatImages()

  await nextTick()

  createMasterTimeline()
})
</script>

<style scoped lang="scss">
$sticker-bg: rgba(255, 255, 255, 0.95);
$sticker-border: rgba(0, 0, 0, 0.1);
$sticker-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
$sticker-radius: 16px;

.sticker {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
}

.sticker__container {
  background: #F4F6F9;
  width: 68px;
  height: 266px;
  padding: 22px 2px 36px;
  border-radius: 16px 0 0 16px;
  border-right: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-family: "Exo 2", "Arial", sans-serif;
}

.sticker__title {
  font-size: 23px;
  font-weight: 600;
  text-align: center;
  line-height: 100%;
  color: #333;
  align-self: flex-start;
  overflow: hidden;
  opacity: 0;
  height: 0;
  transform: translateY(-20px);
}

.sticker__avatars {
  position: relative;
  width: 64px;
  height: 184px;
  margin-bottom: 50px;
}

.sticker__avatar {
  position: absolute;
  width: 64px;
  height: 64px;
  top: 0;
  left: 0;

  &:nth-child(1) {
    transform: translateY(0px) translateX(0px) scale(1);
  }

  &:nth-child(2) {
    transform: translateY(44px) translateX(0px) scale(1);
  }

  &:nth-child(3) {
    transform: translateY(88px) translateX(0px) scale(1);
  }
}

.sticker__avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 3px solid #F4F6F9;
  object-fit: cover;
}

.sticker__action {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
}

.sticker__arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transform: scale(1);
}

.sticker__button {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  line-height: 50px;
  background: #FFFFFF;
  color: #333333;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.8) translateY(10px);

  &:hover {
    transform: scale(1.02);
  }
}
</style>

