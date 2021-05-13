<template>
  <div class="vue-light-popup" @click.stop="closePopup" v-show="show" :style="rootStyle">
    <div class="vue-light-popup__content" ref="scrollContent" :style="contentStyle">
      <div class="vue-light-popup__wrapper" @click.stop="() => false" :style="wrapperStyle">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, nextTick, onBeforeUnmount, onMounted, ref,
} from 'vue'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default defineComponent({
  name: 'VueLightPopup',
  emits: ['close'],
  setup(props, { emit }) {
    const show = ref(false)
    const scrollContent = ref()
    onMounted(() => {
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
      rootStyle: {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100vh',
        background: 'rgba(0, 0, 0, .5)',
        display: 'flex',
        alignItems: 'center',
        zIndex: '1000',
      },
      contentStyle: {
        width: '100%',
        maxHeight: '100%',
        overflow: 'auto',
        '-webkit-overflow-scrolling': 'touch',
      },
      wrapperStyle: {
        maxWidth: '100%',
        margin: 'auto',
      },
    }
  },
})
</script>
