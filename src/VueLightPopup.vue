<template lang="pug">
  .vue-light-popup(@click.stop="closePopup")
    .vue-light-popup-content(ref="scrollContent")
        .vue-light-popup-wrapper(@click.stop="() => false")
          slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// @ts-ignore
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock/lib/bodyScrollLock.es6'

@Component<VueLightPopup>({
  mounted () {
    disableBodyScroll(this.$refs.scrollContent)
  },
  beforeDestroy () {
    enableBodyScroll(this.$refs.scrollContent)
  }
})
export default class VueLightPopup extends Vue {
  closePopup () {
    this.$emit('close')
  }
}
</script>

<style lang="stylus">
  .vue-light-popup
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background rgba(0, 0, 0, .5)
    display flex
    align-items center
    z-index 1000
    .vue-light-popup-content
      width 100%
      max-height 100%
      overflow auto
      -webkit-overflow-scrolling touch
      .vue-light-popup-wrapper
        max-width 100%
        margin auto
</style>
