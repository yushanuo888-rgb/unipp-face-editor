<template>
	<view class="face-box">
		<view class="tab">
			<view class="tab-item active">
				<image src="/uni_modules/amlx-face-editor/static/emoji/face.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="face-scroll">
			<template v-if="recently.length">
				<view class="title-text">
					最近使用
				</view>
				<view class="face-content" style="padding-bottom: 0;">
					<button v-for="(item, index) of recently" :key="index" @click="handleFace(item)" hover-class="transparent">
						<image :src="item.url" mode="aspectFit"></image>
					</button>
				</view>
			</template>
			<view class="title-text">
				所有表情
			</view>
			<view class="face-content">
				<button v-for="(item, index) of emojiList" :key="index" @click="handleFace(item)" hover-class="transparent">
					<image :src="item.url" mode="aspectFit"></image>
				</button>
			</view>
		</view>
		<view class="del">
			<button @click="delLastText">
				<image v-if="delActive" src="/uni_modules/amlx-face-editor/static/emoji/face-del.png" mode="aspectFit"></image>
				<image v-else src="/uni_modules/amlx-face-editor/static/emoji/face-del2.png" mode="aspectFit"></image>
			</button>
		</view>
	</view>
</template>

<script>
	// 最近使用的表情
	const RECENTLY = 'recently'
	function setRecently(data){
		let list = getRecently()
		
		let index = list.findIndex(item => item.key === data.key)
		
		if (index != -1) {
			list.splice(index, 1)
		}
		
		// 超限删除数组最后一个
		if (list.length >= 7) list.pop()
			
		// 添加到数组第一项
		list.unshift(data)
		uni.setStorageSync(RECENTLY, list);
	}
	function getRecently(){
		return uni.getStorageSync(RECENTLY) || [];
	}
	
	
	import faceList from '/uni_modules/amlx-face-editor/static/js/face.js'
	export default {
		name:"amlx-face-panel",
		props: {
			delActive: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 最近使用的表情
				recently: [],
				emojiList: faceList.emojiList,
			};
		},
		mounted() {
			this.recently = getRecently()
		},
		methods: {
			handleFace(item) {
				setRecently(item)
				this.$emit('handleFace', item.key)
			},
			delLastText() {
				this.$emit('delLastText')
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 混入 */
	// 水平垂直居中
	@mixin flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	// 水平贴边
	@mixin flex-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	view {
		box-sizing: border-box;
	}
	view, text{
		color: #000;
	}
	uni-button{
		font-size: 24rpx;
		color: #1a1a1a;
		background-color: unset;
		border-radius: 0;
		text-align: left;
		line-height: unset;
		padding: 0;
		margin: 0;
		&.button-hover{
			
		}
		&:after{
			border: 0;
		}
	}
	
	.face-box{
		@include flex-center;
		flex-direction: column;
		position: relative;
		height: 650rpx;
		background-color: #ECECEC;
		.tab{
			@include flex-center;
			justify-content: flex-start;
			align-items: center;
			overflow-x: auto;
			width: 100%;
			height: 90rpx;
			background-color: #f6f6f6;
			padding-left: 30rpx;
			border-bottom: 0.5px solid transparent;
			border-image: linear-gradient(to right, #dadada, #dadada) 1;
			.tab-item{
				@include flex-center;
				height: 80rpx;
				width: 80rpx;
				border-radius: 6px;
				margin-right: 10rpx;
				image{
					width: 48rpx;
					height: 48rpx;
				}
				&.active{
					background-color: #fff;
				}
			}
		}
		.face-scroll{
			flex: 1;
			width: 100%;
			overflow-y: auto;
			.title-text{
				@include flex-center;
				justify-content: flex-start;
				color: #606060;
				font-size: 24rpx;
				padding-left: 45rpx;
				height: 40rpx;
				margin-top: 20rpx;
				margin-bottom: 10rpx;
			}
			.face-content{
				display: grid;
				grid-template-columns: repeat(7, 1fr);
				row-gap: 30rpx;
				width: 100%;
				padding: 0 20rpx 80rpx 20rpx;
				button{
					@include flex-center;
					height: 66rpx;
					image {
						width: 66rpx;
						height: 66rpx;
					}
				}
				.transparent{
					background-color: transparent;
				}
			}
		}
		.del{
			position: absolute;
			bottom: 56rpx;
			right: 45rpx;
			border-radius: 6px;
			background-color: #cfceca;
			button{
				@include flex-center;
				width: 120rpx;
				height: 90rpx;
				border-radius: 6px;
				image{
					width: 50rpx;
					height: 30rpx;
				}
			}
		}
	}
</style>