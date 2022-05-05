<template lang="pug">
.e-layout-container
	.e-layout-content(:class="{ 'e-layout-content-padding': padding }")
		e-header
		slot
</template>
<script lang="ts">
export default {
	name: 'e-layout',
	props: {
		padding: {
			type: Boolean,
			default: true,
		},
	},
}
</script>
<style lang="scss" scoped>
.e-layout-container {
	padding-top: 50px;
}
.e-layout-content {
	min-height: calc(100vh - 50px);
	padding: 20px;
	background: #f5f9fc;
}
.e-layout-content-padding {
	min-height: calc(100vh - 90px);
	margin: 20px;
	background: #fff;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}
</style>
