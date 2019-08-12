<template lang="pug">
  .vue-light-popup(@click.stop="closePopup")
    .vue-light-popup-content(@click.stop="() => false")
      slot
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator"
    // @ts-ignore
    import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock/lib/bodyScrollLock.es6"

    @Component<VueLightPopup>({
        mounted() {
            disableBodyScroll(this.$el)
        },
        beforeDestroy() {
            enableBodyScroll(this.$el)
        }
    })
    export default class VueLightPopup extends Vue {
        closePopup() {
            this.$emit("close");
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
    justify-content center
    align-items center
    z-index 1000
    .vue-light-popup-content
      max-height 100%
      overflow auto
</style>
