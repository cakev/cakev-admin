<template lang="pug">
.home-container
	d-detail
	d-screen
</template>
<script lang="ts">
import { dScreen, dDetail } from '@cakev/sdk'

export default {
	name: 'editor',
	components: { dScreen, dDetail },
}
</script>
<style lang="scss">
.home-container {
	height: 100%;
	overflow: hidden;
}
</style>
