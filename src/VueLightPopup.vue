<template>
  <div class="vue-light-popup" @click.stop="closePopup" v-show="show">
    <div class="vue-light-popup__content" ref="scrollContent">
      <div class="vue-light-popup__wrapper" @click.stop="() => false">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, nextTick, onBeforeMount, onBeforeUnmount, ref,
} from 'vue'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default defineComponent({
  name: 'VueLightPopup',
  emits: ['close'],
  setup(props, { emit }) {
    const show = ref(false)
    const scrollContent = ref()
    onBeforeMount(() => {
      disableBodyScroll(scrollContent.value, { reserveScrollBarGap: true })
      nextTick(() => {
        show.value = true
      })
    })
    onBeforeUnmount(() => {
      enableBodyScroll(scrollContent.value)
    })
    return {
      show,
      scrollContent,
      closePopup() {
        emit('close')
      },
    }
  },
})
</script>

<style>
.vue-light-popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  z-index: 1000
}

.vue-light-popup__content {
  width: 100%;
  max-height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch
}

.vue-light-popup__wrapper {
  max-width: 100%;
  margin: auto
}
</style>
