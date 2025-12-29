<template>
	<view class="face-box">
		<view class="tab" v-if="optionsPanel">
			<view class="tab-item" v-if="searchShow">
				<image style="width: 40rpx;height: 40rpx;" src="../../static/imgs/search.png" mode="aspectFit"></image>
			</view>
			<view 
				class="tab-item" 
				:class="{active: currentTab === 1}"
				@click="changeCurrentTab(1)"
			>
				<image style="width: 46rpx;height: 46rpx;" src="../../static/imgs/face.png" mode="aspectFit"></image>
			</view>
			<view 
				v-if="optionsPanel && collectionShow"
				class="tab-item"
				:class="{active: currentTab === 2}"
				@click="changeCurrentTab(2)"
			>
				<image style="width: 42rpx;height: 42rpx;" src="../../static/imgs/collection.png" mode="aspectFit"></image>
			</view>
		</view>
		<swiper 
			class="swiper"
			:current="currentTab - 1"
			:indicator-dots="false" 
			:autoplay="false" 
			:duration="200" 
			@change="changeSwiper"
		>
			<swiper-item class="swiper-item">
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
						<image v-if="delActive" src="../../static/imgs/face-del.png" mode="aspectFit"></image>
						<image v-else src="../../static/imgs/face-del2.png" mode="aspectFit"></image>
					</button>
				</view>
			</swiper-item>
			<swiper-item v-if="optionsPanel && collectionShow">
				<view class="swiper-item">
					<view class="face-scroll">
						<view class="title-text">
							添加的单个表情
						</view>
						<view class="animated-emoji">
							<view class="animated-emoji-item add" @click="openAnimatedEmoji">
								<image src="../../static/imgs/add.png" mode="aspectFit"></image>
							</view>
							<view class="animated-emoji-item" v-for="item in animateList" :key="item.id" @click="handleAnimate(item)">
								<image :src="item.url" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
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
	
	
	import faceList from '../../static/js/face.js'
	export default {
		name:"amlx-face-panel",
		props: {
			delActive: { // 删除按钮是否激活
				type: Boolean,
				default: false
			},
			optionsPanel: { // 选择面板是否显示
				type: Boolean,
				default: true
			},
			searchShow: { // 搜索按钮是否显示
				type: Boolean,
				default: false
			},
			collectionShow: { // 收藏按钮是否显示
				type: Boolean,
				default: true
			},
			animateList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				currentTab: 1,
				// 最近使用的表情
				recently: [],
				emojiList: faceList.emojiList,
			};
		},
		mounted() {
			this.recently = getRecently()
		},
		methods: {
			changeCurrentTab(value) {
				this.currentTab = value
			},
			changeSwiper(e) {
				this.changeCurrentTab(++e.detail.current)
			},
			handleFace(item) {
				setRecently(item)
				this.$emit('handleFace', item.key)
			},
			delLastText() {
				this.$emit('delLastText')
			},
			openAnimatedEmoji() {
				this.$emit('addAnimated')
			},
			handleAnimate(item) {
				this.$emit('handleAnimate', item)
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
				height: 72rpx;
				width: 72rpx;
				border-radius: 6px;
				margin-right: 15rpx;
				image{
					width: 48rpx;
					height: 48rpx;
				}
				&.active{
					background-color: #fff;
				}
			}
		}
		.swiper{
			width: 100%;
			flex: 1;
		}
		.swiper-item {
			width: 100%;
			height: 100%;
		}
		.face-scroll{
			width: 100%;
			height: 100%;
			overflow-y: auto;
			.title-text{
				@include flex-center;
				justify-content: flex-start;
				color: #606060;
				font-size: 28rpx;
				padding-left: 45rpx;
				height: 40rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
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
			.animated-emoji{
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: 50rpx;
				width: 100%;
				padding: 0 45rpx 80rpx 45rpx;
				.animated-emoji-item{
					@include flex-center;
					border-radius: 6px;
					width: 100%;
				    aspect-ratio: 1; /* 高度始终等于宽度 */
					image{
						width: 100%;
						height: 100%;
					}
					
					&.add {
						border: 1px dashed #333;
						image{
							width: 66rpx;
							height: 66rpx;
						}
					}
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