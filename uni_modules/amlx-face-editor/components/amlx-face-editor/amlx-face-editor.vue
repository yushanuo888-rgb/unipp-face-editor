<template>
	<view class="container">
		<editor 
			id="editor" 
			class="ql-container" 
			:placeholder="placeholder" 
			:read-only="readOnly"
			@ready="onEditorReady"
			@input="onEditorInput"
		></editor>
	</view>
</template>

<script>
	import faceList from '../../static/js/face.js'
	import * as tools from '../../static/js/tools.js'
	export default {
		name:"amlx-face-textarea",
		props: {
			defaultValue: {
				type: String,
				default: '',
			},
			placeholder: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				readOnly: false
			};
		},
		methods: {
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
				this.defaultValue && this.insertText(this.defaultValue)
				this.editorCtx.insertText({
					text: this.defaultValue
				})
				// #endif

				// #ifdef APP-PLUS || MP-WEIXIN || H5
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					this.defaultValue && this.insertText(this.defaultValue)
				}).exec()
				// #endif
			},
			onEditorInput(e) {
				this.$emit('onInput', e.detail)
				let ops = e.detail.delta.ops
				this.$emit('hasContent', !(ops.length === 1 && ops[0].insert === '\n'))
			},
			clearEditor(callback) {
				this.editorCtx.clear({
					success: function(res) {
						callback && callback()
						this.$emit('hasContent', false)
					}
				})
			},
			insertText(text) {
				this.editorCtx.insertText({
					text
				})
			},
			insertImage(image, desc, callback) {
				this.readOnly = true
				this.$nextTick(() => {
					this.editorCtx.insertImage({
						src: image,
						alt: desc,
						width: 20,
						height: 20,
						extClass: 'imgClass',
						success: () => {
							console.log('insert image success')
							callback && callback()
							
							if(this.timerId) clearTimeout(this.timerId)
							this.timerId = setTimeout(() => {
								this.readOnly = false
								clearTimeout(this.timerId)
								this.timerId = null
							}, 300)
						}
					})
				})
			},
			insertFace(faceName) {
				this.$emit('hasContent', true)
				let faceItem = faceList.emojiList.find(item => item.key === faceName)
				this.insertImage(faceItem.url)
			},
			removeLastNode() {
			  this.editorCtx.getContents({
			    success: res => {
			      let html = (res.html || '').trim()
			      if (!html) return
			
			      // 只处理单 <p>（你的结构）
			      const match = html.match(/^<p[^>]*>([\s\S]*?)<\/p>$/)
			      if (!match) return
			
			      let inner = match[1]
			
			      // 🚨 兜底：空态或仅 <br>，直接清空并 return
			      if (!inner || inner === '<br>') {
			        this.editorCtx.setContents({ html: '' })
					this.$emit('hasContent', false)
			        return
			      }
			
			      // 1️⃣ 删最后一个 img
			      if (/<img[^>]*>$/.test(inner)) {
			        inner = inner.replace(/<img[^>]*>$/, '')
			      }
			      // 2️⃣ 删最后一个“Unicode 字符”
			      else {
			        const chars = Array.from(inner)
			        chars.pop()
			        inner = chars.join('')
			      }
			
			      // 🚨 再次兜底：删完后为空
			      if (!inner || inner === '<br>') {
			        this.editorCtx.setContents({ html: '' })
					this.$emit('hasContent', false)
			        return
			      }
			
			      // 3️⃣ 回写安全 HTML
			      this.editorCtx.setContents({
			        html: `<p>${inner}</p>`
			      })
			    }
			  })
			},
			setContents(inner) {
				this.$emit('hasContent', !!inner)
				this.editorCtx.setContents({
				  html: `<p>${inner}</p>`
				})
			},
			getContents() {
				return new Promise((resolve, reject) => {
					this.editorCtx.getContents({
						success: (res) => {
							let text = tools.deltaToText(res.delta.ops, faceList.emojiList)
							text = text.replace(/\n$/, '')
							resolve(text)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		.ql-container {
			width: 100%;
			height: 100%;
			min-height: 25px;
			max-height: 100px;
			box-sizing: border-box;
			padding: 7px 7px 1px 7px;
			line-height: 1.2;
			::v-deep .imgClass{
				vertical-align: middle;
			}
		}
	}
</style>