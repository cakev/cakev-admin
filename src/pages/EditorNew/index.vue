<template lang="pug">
.home-container
	d-detail
	d-screen
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { dScreen, dDetail } from '@eslinkv/vue2'

@Component({
	components: { dScreen, dDetail },
})
export default class editor extends Vue {}
</script>
<style lang="scss">
.home-container {
	height: 100%;
	overflow: hidden;
}
</style>
