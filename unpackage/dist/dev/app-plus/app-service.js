if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const faceList = {
    emojiList: [
      { key: "[微笑]", url: "/static/emoji/emoji_01.png" },
      { key: "[撇嘴]", url: "/static/emoji/emoji_02.png" },
      { key: "[色]", url: "/static/emoji/emoji_03.png" },
      { key: "[发呆]", url: "/static/emoji/emoji_04.png" },
      { key: "[得意]", url: "/static/emoji/emoji_05.png" },
      { key: "[流泪]", url: "/static/emoji/emoji_06.png" },
      { key: "[害羞]", url: "/static/emoji/emoji_07.png" },
      { key: "[闭嘴]", url: "/static/emoji/emoji_08.png" },
      { key: "[睡]", url: "/static/emoji/emoji_09.png" },
      { key: "[大哭]", url: "/static/emoji/emoji_10.png" },
      { key: "[尴尬]", url: "/static/emoji/emoji_11.png" },
      { key: "[发怒]", url: "/static/emoji/emoji_12.png" },
      { key: "[调皮]", url: "/static/emoji/emoji_13.png" },
      { key: "[呲牙]", url: "/static/emoji/emoji_14.png" },
      { key: "[惊讶]", url: "/static/emoji/emoji_15.png" },
      { key: "[难过]", url: "/static/emoji/emoji_16.png" },
      { key: "[囧]", url: "/static/emoji/emoji_17.png" },
      { key: "[抓狂]", url: "/static/emoji/emoji_18.png" },
      { key: "[吐]", url: "/static/emoji/emoji_19.png" },
      { key: "[偷笑]", url: "/static/emoji/emoji_20.png" },
      { key: "[愉快]", url: "/static/emoji/emoji_21.png" },
      { key: "[白眼]", url: "/static/emoji/emoji_22.png" },
      { key: "[傲慢]", url: "/static/emoji/emoji_23.png" },
      { key: "[困]", url: "/static/emoji/emoji_24.png" },
      { key: "[惊恐]", url: "/static/emoji/emoji_25.png" },
      { key: "[憨笑]", url: "/static/emoji/emoji_26.png" },
      { key: "[悠闲]", url: "/static/emoji/emoji_27.png" },
      { key: "[咒骂]", url: "/static/emoji/emoji_28.png" },
      { key: "[疑问]", url: "/static/emoji/emoji_29.png" },
      { key: "[嘘]", url: "/static/emoji/emoji_30.png" },
      { key: "[晕]", url: "/static/emoji/emoji_31.png" },
      { key: "[衰]", url: "/static/emoji/emoji_32.png" },
      { key: "[骷髅]", url: "/static/emoji/emoji_33.png" },
      { key: "[敲打]", url: "/static/emoji/emoji_34.png" },
      { key: "[再见]", url: "/static/emoji/emoji_35.png" },
      { key: "[擦汗]", url: "/static/emoji/emoji_36.png" },
      { key: "[抠鼻]", url: "/static/emoji/emoji_37.png" },
      { key: "[鼓掌]", url: "/static/emoji/emoji_38.png" },
      { key: "[坏笑]", url: "/static/emoji/emoji_39.png" },
      { key: "[右哼哼]", url: "/static/emoji/emoji_40.png" },
      { key: "[鄙视]", url: "/static/emoji/emoji_41.png" },
      { key: "[委屈]", url: "/static/emoji/emoji_42.png" },
      { key: "[快哭了]", url: "/static/emoji/emoji_43.png" },
      { key: "[阴险]", url: "/static/emoji/emoji_44.png" },
      { key: "[亲亲]", url: "/static/emoji/emoji_45.png" },
      { key: "[可怜]", url: "/static/emoji/emoji_46.png" },
      { key: "[笑脸]", url: "/static/emoji/emoji_47.png" },
      { key: "[生病]", url: "/static/emoji/emoji_48.png" },
      { key: "[脸红]", url: "/static/emoji/emoji_49.png" },
      { key: "[破涕为笑]", url: "/static/emoji/emoji_50.png" },
      { key: "[恐惧]", url: "/static/emoji/emoji_51.png" },
      { key: "[失望]", url: "/static/emoji/emoji_52.png" },
      { key: "[无语]", url: "/static/emoji/emoji_53.png" },
      { key: "[嘿哈]", url: "/static/emoji/emoji_54.png" },
      { key: "[捂脸]", url: "/static/emoji/emoji_55.png" },
      { key: "[奸笑]", url: "/static/emoji/emoji_56.png" },
      { key: "[机智]", url: "/static/emoji/emoji_57.png" },
      { key: "[皱眉]", url: "/static/emoji/emoji_58.png" },
      { key: "[耶]", url: "/static/emoji/emoji_59.png" },
      { key: "[吃瓜]", url: "/static/emoji/emoji_60.png" },
      { key: "[加油]", url: "/static/emoji/emoji_61.png" },
      { key: "[汗]", url: "/static/emoji/emoji_62.png" },
      { key: "[天啊]", url: "/static/emoji/emoji_63.png" },
      { key: "[Emm]", url: "/static/emoji/emoji_64.png" },
      { key: "[社会社会]", url: "/static/emoji/emoji_65.png" },
      { key: "[旺财]", url: "/static/emoji/emoji_66.png" },
      { key: "[好的]", url: "/static/emoji/emoji_67.png" },
      { key: "[打脸]", url: "/static/emoji/emoji_68.png" },
      { key: "[哇]", url: "/static/emoji/emoji_69.png" },
      { key: "[翻白眼]", url: "/static/emoji/emoji_70.png" },
      { key: "[666]", url: "/static/emoji/emoji_71.png" },
      { key: "[让我看看]", url: "/static/emoji/emoji_72.png" },
      { key: "[叹气]", url: "/static/emoji/emoji_73.png" },
      { key: "[苦涩]", url: "/static/emoji/emoji_74.png" },
      { key: "[裂开]", url: "/static/emoji/emoji_75.png" },
      { key: "[嘴唇]", url: "/static/emoji/emoji_76.png" },
      { key: "[爱心]", url: "/static/emoji/emoji_77.png" },
      { key: "[心碎]", url: "/static/emoji/emoji_78.png" },
      { key: "[拥抱]", url: "/static/emoji/emoji_79.png" },
      { key: "[强]", url: "/static/emoji/emoji_80.png" },
      { key: "[弱]", url: "/static/emoji/emoji_81.png" },
      { key: "[握手]", url: "/static/emoji/emoji_82.png" },
      { key: "[胜利]", url: "/static/emoji/emoji_83.png" },
      { key: "[抱拳]", url: "/static/emoji/emoji_84.png" },
      { key: "[勾引]", url: "/static/emoji/emoji_85.png" },
      { key: "[拳头]", url: "/static/emoji/emoji_86.png" },
      { key: "[OK]", url: "/static/emoji/emoji_87.png" },
      { key: "[合十]", url: "/static/emoji/emoji_88.png" },
      { key: "[啤酒]", url: "/static/emoji/emoji_89.png" },
      { key: "[咖啡]", url: "/static/emoji/emoji_90.png" },
      { key: "[蛋糕]", url: "/static/emoji/emoji_91.png" },
      { key: "[玫瑰]", url: "/static/emoji/emoji_92.png" },
      { key: "[凋谢]", url: "/static/emoji/emoji_93.png" },
      { key: "[菜刀]", url: "/static/emoji/emoji_94.png" },
      { key: "[炸弹]", url: "/static/emoji/emoji_95.png" },
      { key: "[便便]", url: "/static/emoji/emoji_96.png" },
      { key: "[月亮]", url: "/static/emoji/emoji_97.png" },
      { key: "[太阳]", url: "/static/emoji/emoji_98.png" },
      { key: "[庆祝]", url: "/static/emoji/emoji_99.png" },
      { key: "[礼物]", url: "/static/emoji/emoji_100.png" },
      { key: "[红包]", url: "/static/emoji/emoji_101.png" },
      { key: "[發]", url: "/static/emoji/emoji_102.png" },
      { key: "[福]", url: "/static/emoji/emoji_103.png" },
      { key: "[烟花]", url: "/static/emoji/emoji_104.png" },
      { key: "[爆竹]", url: "/static/emoji/emoji_105.png" },
      { key: "[猪头]", url: "/static/emoji/emoji_106.png" },
      { key: "[跳跳]", url: "/static/emoji/emoji_107.png" },
      { key: "[发抖]", url: "/static/emoji/emoji_108.png" },
      { key: "[转圈]", url: "/static/emoji/emoji_109.png" }
    ]
  };
  const emojiMap = faceList.emojiList.reduce((map, item) => {
    map[item.key] = item.url;
    return map;
  }, {});
  function renderEmoji(text) {
    const reg = /\[[^\]]+\]/g;
    return text.replace(reg, (match) => {
      if (emojiMap[match]) {
        return `<img src="${emojiMap[match]}" style="width:20px;height:20px;vertical-align: bottom;pointer-events: none;" />`;
      }
      return match;
    });
  }
  function deltaToText(delta, emojiList) {
    if (!Array.isArray(delta))
      return "";
    const emojiMap2 = {};
    emojiList.forEach((item) => {
      emojiMap2[item.url] = item.key;
    });
    let result = "";
    delta.forEach((item) => {
      const insert = item.insert;
      if (typeof insert === "string") {
        result += insert;
        return;
      }
      if (insert && insert.image) {
        const imageUrl = insert.image;
        const match = imageUrl.match(/\/static\/emoji\/emoji_\d+\.png$/);
        if (match && emojiMap2[match[0]]) {
          result += emojiMap2[match[0]];
        } else {
          result += "";
        }
      }
    });
    return result;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$4 = {
    name: "amlx-face-textarea",
    props: {
      defaultValue: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        readOnly: false
      };
    },
    methods: {
      onEditorReady() {
        uni.createSelectorQuery().select("#editor").context((res) => {
          this.editorCtx = res.context;
          if (this.defaultValue) {
            this.insertText(this.defaultValue);
          }
        }).exec();
      },
      onEditorInput(e) {
        this.$emit("onInput", e.detail);
        let ops = e.detail.delta.ops;
        this.$emit("onContent", !(ops.length === 1 && ops[0].insert === "\n"));
      },
      clearEditor(callback) {
        this.editorCtx.clear({
          success: function(res) {
            callback && callback();
          }
        });
      },
      insertText(text) {
        this.editorCtx.insertText({
          text
        });
      },
      insertImage(image, desc, callback) {
        this.readOnly = true;
        this.$nextTick(() => {
          this.editorCtx.insertImage({
            src: image,
            alt: desc,
            width: 20,
            height: 20,
            extClass: "imgClass",
            success: () => {
              formatAppLog("log", "at components/amlx-face-editor/amlx-face-editor.vue:79", "insert image success");
              callback && callback();
              if (this.timerId)
                clearTimeout(this.timerId);
              this.timerId = setTimeout(() => {
                this.readOnly = false;
                clearTimeout(this.timerId);
                this.timerId = null;
              }, 300);
            }
          });
        });
      },
      insertFace(faceName) {
        let faceItem = faceList.emojiList.find((item) => item.key === faceName);
        this.insertImage(faceItem.url);
      },
      removeLastNode() {
        this.editorCtx.getContents({
          success: (res) => {
            let html = (res.html || "").trim();
            if (!html)
              return;
            const match = html.match(/^<p[^>]*>([\s\S]*?)<\/p>$/);
            if (!match)
              return;
            let inner = match[1];
            if (!inner || inner === "<br>") {
              this.editorCtx.setContents({ html: "" });
              return;
            }
            if (/<img[^>]*>$/.test(inner)) {
              inner = inner.replace(/<img[^>]*>$/, "");
            } else {
              const chars = Array.from(inner);
              chars.pop();
              inner = chars.join("");
            }
            if (!inner || inner === "<br>") {
              this.editorCtx.setContents({ html: "" });
              this.$emit("onContent", false);
              return;
            }
            this.editorCtx.setContents({
              html: `<p>${inner}</p>`
            });
          }
        });
      },
      setContents(inner) {
        this.$emit("onContent", !!inner);
        this.editorCtx.setContents({
          html: `<p>${inner}</p>`
        });
      },
      getContents() {
        return new Promise((resolve, reject) => {
          this.editorCtx.getContents({
            success: (res) => {
              let text = deltaToText(res.delta.ops, faceList.emojiList);
              text = text.replace(/\n$/, "");
              resolve(text);
            },
            fail(err) {
              reject(err);
            }
          });
        });
      },
      focus() {
        this.setContents("");
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("editor", {
        id: "editor",
        class: "ql-container",
        placeholder: $props.placeholder,
        "read-only": $data.readOnly,
        onReady: _cache[0] || (_cache[0] = (...args) => $options.onEditorReady && $options.onEditorReady(...args)),
        onInput: _cache[1] || (_cache[1] = (...args) => $options.onEditorInput && $options.onEditorInput(...args))
      }, null, 40, ["placeholder", "read-only"])
    ]);
  }
  const AmlxFaceEditor = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-1b677ff7"], ["__file", "C:/files/uniapp/amlx-face-editor/components/amlx-face-editor/amlx-face-editor.vue"]]);
  const _imports_0 = "/static/emoji/face.png";
  const _imports_1 = "/static/emoji/face-del.png";
  const _imports_2 = "/static/emoji/face-del2.png";
  const RECENTLY = "recently";
  function setRecently(data) {
    let list = getRecently();
    let index = list.findIndex((item) => item.key === data.key);
    if (index != -1) {
      list.splice(index, 1);
    }
    if (list.length >= 7)
      list.pop();
    list.unshift(data);
    uni.setStorageSync(RECENTLY, list);
  }
  function getRecently() {
    return uni.getStorageSync(RECENTLY) || [];
  }
  const _sfc_main$3 = {
    name: "amlx-face-panel",
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
        emojiList: faceList.emojiList
      };
    },
    mounted() {
      this.recently = getRecently();
    },
    methods: {
      handleFace(item) {
        setRecently(item);
        this.$emit("handleFace", item.key);
      },
      delLastText() {
        this.$emit("delLastText");
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "face-box" }, [
      vue.createElementVNode("view", { class: "tab" }, [
        vue.createElementVNode("view", { class: "tab-item active" }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            mode: "aspectFill"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "face-scroll" }, [
        $data.recently.length ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 0 },
          [
            vue.createElementVNode("view", { class: "title-text" }, " 最近使用 "),
            vue.createElementVNode("view", {
              class: "face-content",
              style: { "padding-bottom": "0" }
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.recently, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("button", {
                    key: index,
                    onClick: ($event) => $options.handleFace(item),
                    "hover-class": "transparent"
                  }, [
                    vue.createElementVNode("image", {
                      src: item.url,
                      mode: "aspectFit"
                    }, null, 8, ["src"])
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "title-text" }, " 所有表情 "),
        vue.createElementVNode("view", { class: "face-content" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.emojiList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("button", {
                key: index,
                onClick: ($event) => $options.handleFace(item),
                "hover-class": "transparent"
              }, [
                vue.createElementVNode("image", {
                  src: item.url,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "del" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.delLastText && $options.delLastText(...args))
        }, [
          $props.delActive ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            src: _imports_1,
            mode: "aspectFit"
          })) : (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            src: _imports_2,
            mode: "aspectFit"
          }))
        ])
      ])
    ]);
  }
  const AmlxFacePanel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-d1e43a7b"], ["__file", "C:/files/uniapp/amlx-face-editor/components/amlx-face-editor/amlx-face-panel.vue"]]);
  const _sfc_main$2 = {
    name: "amlx-face-render",
    props: {
      data: {
        type: String,
        default: ""
      }
    },
    methods: {
      renderEmoji
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("rich-text", {
      nodes: $options.renderEmoji($props.data)
    }, null, 8, ["nodes"]);
  }
  const AmlxFaceRender = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/files/uniapp/amlx-face-editor/components/amlx-face-editor/amlx-face-render.vue"]]);
  const _sfc_main$1 = {
    components: {
      AmlxFaceEditor,
      AmlxFacePanel,
      AmlxFaceRender
    },
    data() {
      return {
        hasContent: false,
        // 输入框是否有内容
        text: ""
      };
    },
    methods: {
      handleFace(e) {
        this.$refs.faceTextarea.insertFace(e);
      },
      delLastText() {
        this.$refs.faceTextarea.removeLastNode();
      },
      async send() {
        let text = await this.$refs.faceTextarea.getContents();
        this.text = text;
        uni.showToast({
          icon: "none",
          title: `发送内容：${text}`
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_AmlxFaceEditor = vue.resolveComponent("AmlxFaceEditor");
    const _component_AmlxFacePanel = vue.resolveComponent("AmlxFacePanel");
    const _component_AmlxFaceRender = vue.resolveComponent("AmlxFaceRender");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", {
        slot: "default",
        class: "default"
      }, [
        vue.createVNode(
          _component_AmlxFaceEditor,
          {
            ref: "faceTextarea",
            placeholder: "输入内容",
            onOnContent: _cache[0] || (_cache[0] = ($event) => $data.hasContent = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ),
        vue.createVNode(_component_AmlxFacePanel, {
          delActive: $data.hasContent,
          onHandleFace: $options.handleFace,
          onDelLastText: $options.delLastText
        }, null, 8, ["delActive", "onHandleFace", "onDelLastText"]),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.send && $options.send(...args))
        }, "发送"),
        vue.createElementVNode("view", { class: "face-content" }, [
          vue.createVNode(_component_AmlxFaceRender, { data: $data.text }, null, 8, ["data"])
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/files/uniapp/amlx-face-editor/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/files/uniapp/amlx-face-editor/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
