<template>
	<view>
		<!-- 渲染表情内容 -->
		<view class="face-content">
			<AmlxFaceRender :data="text"></AmlxFaceRender>
		</view>
		<view class="mg">
			<view class="input">
				<!-- 表情输入框 -->
				<AmlxFaceEditor ref="faceTextarea" placeholder="请输入内容" @hasContent="hasContent = $event"></AmlxFaceEditor>
			</view>
			<!-- 表情面板 -->
			<AmlxFacePanel 
				:animateList="animateList"
				:delActive="hasContent" 
				@handleFace="handleFace" 
				@delLastText="delLastText"
			></AmlxFacePanel>
			<!-- 发送按钮 -->
			<button class="btn" hover-class="btn-hover" @click="send">发送</button>
		</view>
	</view>
</template>

<script>
	import AmlxFaceEditor from '@/uni_modules/amlx-face-editor/components/amlx-face-editor/amlx-face-editor.vue';
	import AmlxFacePanel from '@/uni_modules/amlx-face-editor/components/amlx-face-editor/amlx-face-panel.vue';
	import AmlxFaceRender from '@/uni_modules/amlx-face-editor/components/amlx-face-editor/amlx-face-render.vue';
	
	export default {
		components: {
			AmlxFaceEditor,
			AmlxFacePanel,
			AmlxFaceRender
		},
		data() {
			return {
				hasContent: false, // 输入框是否有内容
				text: '', // 输入框初始内容
				
				animateList: [
					{
						id: 1,
						url: '/static/images/avatar.jpg'
					}
				]
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
		margin: 10rpx;
		height: 300rpx;
		background: #efefef;
		border-radius: 4px;
		
		// 渲染空白符 \n \b \r
		white-space: pre-wrap;
		word-break: break-all;
	}
	.mg{
		padding: 10rpx;
		.input{
			padding: 10rpx;
			background: #efefef;
			border-radius: 4px;
			margin-bottom: 20rpx;
		}
		.btn{
			margin-top: 20rpx;
			color: #fff;
			background-color: #4cd964;
		}
		.btn-hover{
			background-color: #42bf57;
		}
	}
</style>