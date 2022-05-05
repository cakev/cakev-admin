<template lang="pug">
div(
	v-if="image",
	:style="{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize, backgroundRepeat: 'no-repeat' }",
	@click="handleClick")
	slot
.empty-image(
	v-else,
	@click="handleClick",
	:style="{ backgroundImage: `url(${empty[index]})` }")
	slot
</template>
<script lang="ts">
const empty = [
	require('../../assets/empty/screen-empty1.jpeg'),
	require('../../assets/empty/screen-empty2.jpeg'),
	require('../../assets/empty/screen-empty3.jpeg'),
	require('../../assets/empty/screen-empty4.jpeg'),
]

export default {
	name: 'empty-image',
	props: {
		image: {
			type: String,
		},
		backgroundSize: {
			type: String,
			default: '100% 100%',
		},
	},
	data() {
		return {
			index: Math.floor(Math.random() * 4),
			empty,
		}
	},
	methods: {
		handleClick(): void {
			this.$emit('click')
		},
	},
}
</script>
<style lang="scss">
.empty-image {
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;
}
</style>
