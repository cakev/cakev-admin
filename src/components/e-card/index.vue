<template lang="pug">
.list-item-card.pos-r
	slot
	.list-item-card-content
		slot(name="content")
</template>
<script lang="ts">
export default {
	name: 'e-card',
}
</script>
<style lang="scss">
.list-item-card-box {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	grid-gap: 24px;
	min-width: 1135px;
	padding-right: 15px;
	margin-top: 15px;
}

.list-item-card {
	overflow: hidden;
	background-color: #fff;
	box-shadow: 0 2px 10px rgba(211, 220, 227, 0.7);
	transition: all 0.3s;

	&:hover {
		box-shadow: 0 7px 16px rgba(211, 220, 227, 0.96);
	}
}

.list-item-card-content {
	padding: 10px;
}
</style>
