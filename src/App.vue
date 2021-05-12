<template>
  <VueLightPopup>Test content</VueLightPopup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueLightPopup from './VueLightPopup.vue'

export default defineComponent({
  name: 'App',
  components: {
    VueLightPopup,
  },
})
</script>
