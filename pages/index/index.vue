<template>
	<view>
		<view slot="default" class="default">
			<!-- 表情输入框 -->
			<AmlxFaceEditor ref="faceTextarea" placeholder="输入内容" @onContent="hasContent = $event"></AmlxFaceEditor>
			<!-- 表情面板 -->
			<AmlxFacePanel :delActive="hasContent" @handleFace="handleFace" @delLastText="delLastText"></AmlxFacePanel>
			<!-- 发送按钮 -->
			<button @click="send">发送</button>
			<!-- 渲染表情内容 -->
			<view class="face-content">
				<AmlxFaceRender :data="text"></AmlxFaceRender>
			</view>
		</view>
	</view>
</template>

<script>
	import AmlxFaceEditor from '@/components/amlx-face-editor/amlx-face-editor.vue';
	import AmlxFacePanel from '@/components/amlx-face-editor/amlx-face-panel.vue';
	import AmlxFaceRender from '@/components/amlx-face-editor/amlx-face-render.vue';
	
	export default {
		components: {
			AmlxFaceEditor,
			AmlxFacePanel,
			AmlxFaceRender
		},
		data() {
			return {
				hasContent: false, // 输入框是否有内容
				text: ''
			};
		},
		methods: {
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