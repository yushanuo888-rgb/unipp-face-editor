# amlx-face-editor 插件文档

## 📋 插件简介
这是一个基于 uni-app 内置组件 editor 开发的富文本输入框插件，包含表情输入框和表情面板功能。支持最近使用表情、所有表情展示、表情渲染和删除功能。

> ⚠️ **重要提示：**
> - 内置表情是从微信中提取的，作者无版权，仅作演示用途
> - 商用请自行替换表情资源
> - 因使用内置表情带来的版权问题由使用者自行承担

## 📦 安装与使用

### 1. 引入组件
将 amlx-face-editor 、 amlx-face-panel 和 amlx-face-render 组件导入到您的 uni-app 项目中。

### 2. 基本使用示例

```vue
<template>
	<view>
		<!-- 表情输入框 -->
		<AmlxFaceEditor ref="faceTextarea" placeholder="输入内容" @hasContent="hasContent = $event"></AmlxFaceEditor>
		<!-- 表情面板 -->
		<AmlxFacePanel :delActive="hasContent" @handleFace="handleFace" @delLastText="delLastText"></AmlxFacePanel>
		<!-- 发送按钮 -->
		<button @click="send">发送</button>
		<!-- 渲染表情内容 -->
		<view class="face-content">
			<AmlxFaceRender :data="text"></AmlxFaceRender>
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
```

## 🎯 组件参数说明

### amlx-face-editor 组件
表情输入框组件，基于 uni-app 的 editor 组件封装。

#### Props 参数

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| defaultValue | String | '' | 否 | 编辑器的初始内容 |
| placeholder | String | '' | 否 | 输入框占位符文本 |

#### Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| onInput | e.detail | 编辑器输入事件，返回编辑器内容变化 |
| hasContent | Boolean | 编辑器是否有内容（true：有内容，false：无内容） |

#### Methods 方法
通过组件 ref 调用：

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| clearEditor | callback: Function | - | 清空编辑器内容，完成后执行回调 |
| insertImage | image: String, desc: String, callback: Function | - | 插入图片到编辑器 |
| insertFace | faceName: String | - | 插入表情到编辑器（基于表情名称） |
| removeLastNode | - | - | 删除编辑器最后一个节点（字符或表情） |
| setContents | inner: String | - | 设置编辑器内容（HTML格式） |
| getContents | - | Promise<String\> | 获取编辑器纯文本内容（表情会被转换为文本表示） |

### amlx-face-panel 组件
表情选择面板组件，包含最近使用表情和所有表情展示。

#### Props 参数

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| optionsPanel | Boolean | false | 否 | 是否显示操作栏 |
| delActive | Boolean | false | 否 | 删除按钮是否激活（影响删除按钮的样式状态） |
| optionsPanel | Boolean | false | 否 | 是否显示操作栏 |
| animateList | Boolean | false | 否 | 收藏表情列表（格式：[{id: 1, url: '/example/a.png'}]） |
| collectionShow | Boolean | false | 否 | 收藏表情是否显示 |

#### Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| handleFace | faceName: String | 选择表情事件，返回表情的 key 值 |
| delLastText | - | 点击删除按钮事件 |
| addAnimated | - | 点击收藏表情添加按钮 |
| handleAnimate | {id: any, url: string} | 点击具体的收藏表情按钮 |

### amlx-face-render 组件
表情渲染组件，表情输入组件（amlx-face-editor）的文本内容转换为可显示的表情。

#### Props 参数

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| data | Strubg | '' | 否 | 需要转换的字符串 |

## 🔧 表情数据配置

### 1. 表情数据源
表情数据位于 /static/js/face.js 文件中，格式如下：

```javascript
export default {
  emojiList: [
    { key: '[微笑]', url: '/static/emoji/smile.png' },
    { key: '[可爱]', url: '/static/emoji/cute.png' },
    // ... 更多表情
  ]
}
```

### 2. 自定义表情
如需替换表情资源：
- 替换 face.js 中的表情数据
- 将表情图片放入对应路径
- 确保每个表情包含 key（文本标识）和 url（图片路径）

## 🗂️ 文件结构

```text
amlx-face-editor/
├── components/
│   └── amlx-face-editor/
│       ├── amlx-face-editor.vue
│       ├── amlx-face-panel.vue
│       └── amlx-face-render.vue
└── static/
    ├── js/         
	│   ├── face.js      # 表情资源数据
	│   └── tools.js     # 工具函数
    └── emoji/           # 表情图片资源
```
