<template>
	<view>
		<view slot="default" class="default">
			<!-- 表情输入框 -->
			<AmlxFaceTextarea ref="faceTextarea"></AmlxFaceTextarea>
			<!-- 表情面板 -->
			<AmlxFacePanel @handleFace="handleFace" @delLastText="delLastText"></AmlxFacePanel>
			<!-- 发送按钮 -->
			<button @click="send">发送</button>
			<!-- 渲染表情内容 -->
			<view class="face-content">
				<rich-text :nodes="renderEmoji(text)"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import AmlxFaceTextarea from '@/components/amlx-face-textarea.vue';
	import AmlxFacePanel from '@/components/amlx-face-panel.vue';
	import { renderEmoji } from '@/utils/tools.js'
	export default {
		components: {
			AmlxFaceTextarea,
			AmlxFacePanel
		},
		data() {
			return {
				text: ''
			};
		},
		methods: {
			renderEmoji,
			handleFace(e) {
				this.$refs.faceTextarea.insertFace(e)
			},
			delLastText() {
				this.$refs.faceTextarea.removeLastNode()
			},
			async send() {
				let text = await this.$refs.faceTextarea.getContents()
				this.text = text
				uni.showToast({
					icon: 'none',
					title: `发送内容：${text}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.face-content{
		padding: 10rpx;
		margin: 30rpx 20rpx;
		height: 300rpx;
		background: #efefef;
		border-radius: 4px;
		
		// 渲染空白符 \n \b \r
		white-space: pre-wrap;
		word-break: break-all;
	}
</style>