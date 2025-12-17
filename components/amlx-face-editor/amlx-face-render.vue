<template>
	<rich-text :nodes="renderEmoji(data)"></rich-text>
</template>

<script>
	import { renderEmoji } from '../../static/js/tools.js'
	export default {
		name:"amlx-face-render",
		props: {
			data: {
				type: String,
				default: ''
			}
		},
		methods: {
			renderEmoji
		}
	}
</script>