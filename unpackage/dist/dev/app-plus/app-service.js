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
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const faceList = {
    emojiList: [
      { key: "[微笑]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_01.png" },
      { key: "[撇嘴]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_02.png" },
      { key: "[色]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_03.png" },
      { key: "[发呆]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_04.png" },
      { key: "[得意]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_05.png" },
      { key: "[流泪]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_06.png" },
      { key: "[害羞]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_07.png" },
      { key: "[闭嘴]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_08.png" },
      { key: "[睡]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_09.png" },
      { key: "[大哭]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_10.png" },
      { key: "[尴尬]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_11.png" },
      { key: "[发怒]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_12.png" },
      { key: "[调皮]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_13.png" },
      { key: "[呲牙]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_14.png" },
      { key: "[惊讶]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_15.png" },
      { key: "[难过]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_16.png" },
      { key: "[囧]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_17.png" },
      { key: "[抓狂]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_18.png" },
      { key: "[吐]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_19.png" },
      { key: "[偷笑]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_20.png" },
      { key: "[愉快]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_21.png" },
      { key: "[白眼]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_22.png" },
      { key: "[傲慢]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_23.png" },
      { key: "[困]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_24.png" },
      { key: "[惊恐]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_25.png" },
      { key: "[憨笑]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_26.png" },
      { key: "[悠闲]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_27.png" },
      { key: "[咒骂]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_28.png" },
      { key: "[疑问]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_29.png" },
      { key: "[嘘]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_30.png" },
      { key: "[晕]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_31.png" },
      { key: "[衰]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_32.png" },
      { key: "[骷髅]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_33.png" },
      { key: "[敲打]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_34.png" },
      { key: "[再见]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_35.png" },
      { key: "[擦汗]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_36.png" },
      { key: "[抠鼻]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_37.png" },
      { key: "[鼓掌]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_38.png" },
      { key: "[坏笑]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_39.png" },
      { key: "[右哼哼]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_40.png" },
      { key: "[鄙视]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_41.png" },
      { key: "[委屈]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_42.png" },
      { key: "[快哭了]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_43.png" },
      { key: "[阴险]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_44.png" },
      { key: "[亲亲]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_45.png" },
      { key: "[可怜]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_46.png" },
      { key: "[笑脸]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_47.png" },
      { key: "[生病]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_48.png" },
      { key: "[脸红]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_49.png" },
      { key: "[破涕为笑]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_50.png" },
      { key: "[恐惧]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_51.png" },
      { key: "[失望]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_52.png" },
      { key: "[无语]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_53.png" },
      { key: "[嘿哈]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_54.png" },
      { key: "[捂脸]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_55.png" },
      { key: "[奸笑]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_56.png" },
      { key: "[机智]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_57.png" },
      { key: "[皱眉]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_58.png" },
      { key: "[耶]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_59.png" },
      { key: "[吃瓜]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_60.png" },
      { key: "[加油]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_61.png" },
      { key: "[汗]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_62.png" },
      { key: "[天啊]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_63.png" },
      { key: "[Emm]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_64.png" },
      { key: "[社会社会]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_65.png" },
      { key: "[旺财]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_66.png" },
      { key: "[好的]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_67.png" },
      { key: "[打脸]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_68.png" },
      { key: "[哇]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_69.png" },
      { key: "[翻白眼]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_70.png" },
      { key: "[666]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_71.png" },
      { key: "[让我看看]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_72.png" },
      { key: "[叹气]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_73.png" },
      { key: "[苦涩]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_74.png" },
      { key: "[裂开]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_75.png" },
      { key: "[嘴唇]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_76.png" },
      { key: "[爱心]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_77.png" },
      { key: "[心碎]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_78.png" },
      { key: "[拥抱]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_79.png" },
      { key: "[强]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_80.png" },
      { key: "[弱]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_81.png" },
      { key: "[握手]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_82.png" },
      { key: "[胜利]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_83.png" },
      { key: "[抱拳]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_84.png" },
      { key: "[勾引]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_85.png" },
      { key: "[拳头]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_86.png" },
      { key: "[OK]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_87.png" },
      { key: "[合十]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_88.png" },
      { key: "[啤酒]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_89.png" },
      { key: "[咖啡]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_90.png" },
      { key: "[蛋糕]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_91.png" },
      { key: "[玫瑰]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_92.png" },
      { key: "[凋谢]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_93.png" },
      { key: "[菜刀]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_94.png" },
      { key: "[炸弹]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_95.png" },
      { key: "[便便]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_96.png" },
      { key: "[月亮]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_97.png" },
      { key: "[太阳]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_98.png" },
      { key: "[庆祝]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_99.png" },
      { key: "[礼物]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_100.png" },
      { key: "[红包]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_101.png" },
      { key: "[發]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_102.png" },
      { key: "[福]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_103.png" },
      { key: "[烟花]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_104.png" },
      { key: "[爆竹]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_105.png" },
      { key: "[猪头]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_106.png" },
      { key: "[跳跳]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_107.png" },
      { key: "[发抖]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_108.png" },
      { key: "[转圈]", url: "/uni_modules/amlx-face-editor/static/emoji/emoji_109.png" }
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
        const match = imageUrl.match(/\/uni_modules\/amlx-face-editor\/static\/emoji\/emoji_\d+\.png$/);
        if (match && emojiMap2[match[0]]) {
          result += emojiMap2[match[0]];
        } else {
          result += "";
        }
      }
    });
    return result;
  }
  const system = uni.getSystemInfoSync();
  function getSystemInfo() {
    return {
      // 系统信息
      statusBarHeight: system.statusBarHeight,
      // 状态栏高度
      screenHeight: system.screenHeight,
      // 屏幕高度
      screenWidth: system.screenWidth,
      // 屏幕宽度
      safeBottom: system.safeAreaInsets.bottom
      // 底部安全区域高度
    };
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$a = {
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
          this.defaultValue && this.insertText(this.defaultValue);
        }).exec();
      },
      onEditorInput(e) {
        this.$emit("onInput", e.detail);
        let ops = e.detail.delta && e.detail.delta.ops;
        if (!ops)
          return;
        this.$emit("hasContent", !(ops.length === 1 && ops[0].insert === "\n"));
      },
      clearEditor(callback) {
        this.editorCtx.clear({
          success: () => {
            callback && callback();
            this.$emit("hasContent", false);
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
              formatAppLog("log", "at uni_modules/amlx-face-editor/components/amlx-face-editor/amlx-face-editor.vue:80", "insert image success");
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
        this.$emit("hasContent", true);
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
              this.$emit("hasContent", false);
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
              this.$emit("hasContent", false);
              return;
            }
            this.editorCtx.setContents({
              html: `<p>${inner}</p>`
            });
          }
        });
      },
      setContents(inner) {
        this.$emit("hasContent", !!inner);
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
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
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
  const AmlxFaceEditor = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-a979930e"], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/amlx-face-editor/components/amlx-face-editor/amlx-face-editor.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal$1 = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$9 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal$1(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick(e) {
        this.$emit("click", e);
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-d31e1c47"], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$8 = {
    name: "UniStatusBar",
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight + "px"
      };
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ height: $data.statusBarHeight }),
        class: "uni-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-7920e3e0"], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue"]]);
  const getVal = (val) => typeof val === "number" ? val + "px" : val;
  const _sfc_main$7 = {
    name: "UniNavBar",
    components: {
      statusBar
    },
    emits: ["clickLeft", "clickRight", "clickTitle"],
    props: {
      dark: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      leftText: {
        type: String,
        default: ""
      },
      rightText: {
        type: String,
        default: ""
      },
      leftIcon: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: ""
      },
      fixed: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: ""
      },
      backgroundColor: {
        type: String,
        default: ""
      },
      statusBar: {
        type: [Boolean, String],
        default: false
      },
      shadow: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      height: {
        type: [Number, String],
        default: 44
      },
      leftWidth: {
        type: [Number, String],
        default: 60
      },
      rightWidth: {
        type: [Number, String],
        default: 60
      },
      showMenuButtonWidth: {
        type: Boolean,
        default: false
      },
      stat: {
        type: [Boolean, String],
        default: ""
      }
    },
    data() {
      return {
        navWidth: "auto"
      };
    },
    computed: {
      themeBgColor() {
        if (this.dark) {
          if (this.backgroundColor) {
            return this.backgroundColor;
          } else {
            return this.dark ? "#333" : "#FFF";
          }
        }
        return this.backgroundColor || "#FFF";
      },
      themeColor() {
        if (this.dark) {
          if (this.color) {
            return this.color;
          } else {
            return this.dark ? "#fff" : "#333";
          }
        }
        return this.color || "#333";
      },
      navbarHeight() {
        if (this.fixed && this.height === 0) {
          return getVal(44);
        }
        return getVal(this.height);
      },
      leftIconWidth() {
        return getVal(this.leftWidth);
      },
      rightIconWidth() {
        return getVal(this.rightWidth);
      }
    },
    created() {
    },
    mounted() {
      if (uni.report && this.stat && this.title !== "") {
        uni.report("title", this.title);
      }
    },
    methods: {
      onClickLeft() {
        this.$emit("clickLeft");
      },
      onClickRight() {
        this.$emit("clickRight");
      },
      onClickTitle() {
        this.$emit("clickTitle");
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_status_bar = vue.resolveComponent("status-bar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-navbar", { "uni-dark": $props.dark, "uni-nvue-fixed": $props.fixed }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-navbar__content", { "uni-navbar--fixed": $props.fixed, "uni-navbar--shadow": $props.shadow, "uni-navbar--border": $props.border }]),
            style: vue.normalizeStyle({ "background-color": $options.themeBgColor })
          },
          [
            $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle({ color: $options.themeColor, backgroundColor: $options.themeBgColor, height: $options.navbarHeight, width: $props.showMenuButtonWidth ? $data.navWidth + "px" : "100%" }),
                class: "uni-navbar__header"
              },
              [
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClickLeft && $options.onClickLeft(...args)),
                    class: "uni-navbar__header-btns uni-navbar__header-btns-left",
                    style: vue.normalizeStyle({ width: $options.leftIconWidth })
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "left", {}, () => [
                      $props.leftIcon.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "uni-navbar__content_view"
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          color: $options.themeColor,
                          type: $props.leftIcon,
                          size: "20"
                        }, null, 8, ["color", "type"])
                      ])) : vue.createCommentVNode("v-if", true),
                      $props.leftText.length ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 1,
                          class: vue.normalizeClass([{ "uni-navbar-btn-icon-left": !$props.leftIcon.length > 0 }, "uni-navbar-btn-text"])
                        },
                        [
                          vue.createElementVNode(
                            "text",
                            {
                              style: vue.normalizeStyle({ color: $options.themeColor, fontSize: "12px" })
                            },
                            vue.toDisplayString($props.leftText),
                            5
                            /* TEXT, STYLE */
                          )
                        ],
                        2
                        /* CLASS */
                      )) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", {
                  class: "uni-navbar__header-container",
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickTitle && $options.onClickTitle(...args))
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, () => [
                    $props.title.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "uni-navbar__header-container-inner"
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uni-nav-bar-text uni-ellipsis-1",
                          style: vue.normalizeStyle({ color: $options.themeColor })
                        },
                        vue.toDisplayString($props.title),
                        5
                        /* TEXT, STYLE */
                      )
                    ])) : vue.createCommentVNode("v-if", true)
                  ], true)
                ]),
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[2] || (_cache[2] = (...args) => $options.onClickRight && $options.onClickRight(...args)),
                    class: "uni-navbar__header-btns uni-navbar__header-btns-right",
                    style: vue.normalizeStyle({ width: $options.rightIconWidth })
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "right", {}, () => [
                      $props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                        vue.createVNode(_component_uni_icons, {
                          color: $options.themeColor,
                          type: $props.rightIcon,
                          size: "22"
                        }, null, 8, ["color", "type"])
                      ])) : vue.createCommentVNode("v-if", true),
                      $props.rightText.length && !$props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "uni-navbar-btn-text"
                      }, [
                        vue.createElementVNode(
                          "text",
                          {
                            class: "uni-nav-bar-right-text",
                            style: vue.normalizeStyle({ color: $options.themeColor })
                          },
                          vue.toDisplayString($props.rightText),
                          5
                          /* TEXT, STYLE */
                        )
                      ])) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  4
                  /* STYLE */
                )
              ],
              4
              /* STYLE */
            )
          ],
          6
          /* CLASS, STYLE */
        ),
        $props.fixed ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-navbar__placeholder"
        }, [
          $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: "uni-navbar__placeholder-view",
              style: vue.normalizeStyle({ height: $options.navbarHeight })
            },
            null,
            4
            /* STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-26544265"], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$6 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 0,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return this;
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          if (typeof this.animation[key] === "function") {
            Array.isArray(value) ? this.animation[key](...value) : this.animation[key](value);
          }
        });
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.isShow = true;
        this.transform = this.styleInit(false).transform || "";
        this.opacity = this.styleInit(false).opacity || 0;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run(() => {
              this.transform = "";
              this.opacity = this.styleInit(false).opacity || 1;
              this.$emit("change", {
                detail: this.isShow
              });
            });
          }, 80);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = { transform: "", opacity: 1 };
        const buildStyle = (type2, mode) => {
          const value = this.animationType(type2)[mode];
          if (mode.startsWith("fade")) {
            styles.opacity = value;
          } else {
            styles.transform += value + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => buildStyle(type, mode));
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$5 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:310", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          this.showPoptrans();
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      showPoptrans() {
        this.$nextTick(() => {
          this.showPopup = true;
          this.showTrans = true;
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-4dd3c44b"], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _imports_0$1 = "/uni_modules/amlx-face-editor/static/imgs/plus-disabled.png";
  const _imports_1$1 = "/uni_modules/amlx-face-editor/static/imgs/plus-active.png";
  const _imports_2$1 = "/uni_modules/amlx-face-editor/static/emoji/emoji_01.png";
  const _imports_3$1 = "/uni_modules/amlx-face-editor/static/imgs/checked.png";
  const _sfc_main$4 = {
    data() {
      return {
        systemInfo: getSystemInfo(),
        isEdit: false
        // 是否编辑
      };
    },
    computed: {
      contentHeight() {
        const { screenHeight, statusBarHeight, safeBottom } = this.systemInfo;
        const footerHeight = this.isEdit ? 66 : 0;
        return screenHeight - statusBarHeight - safeBottom - footerHeight - 44;
      }
    },
    methods: {
      open() {
        this.$refs.popup.open();
      },
      close() {
        this.$refs.popup.close();
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1);
    return vue.openBlock(), vue.createBlock(
      _component_uni_popup,
      {
        ref: "popup",
        type: "bottom"
      },
      {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "popup" }, [
            vue.createElementVNode(
              "view",
              {
                class: "top-placeholder",
                style: vue.normalizeStyle({ height: $data.systemInfo.statusBarHeight + "px" })
              },
              null,
              4
              /* STYLE */
            ),
            vue.createVNode(_component_uni_nav_bar, { backgroundColor: "#ededed" }, {
              left: vue.withCtx(() => [
                !$data.isEdit ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "left",
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.close && $options.close(...args))
                }, "关闭")) : vue.createCommentVNode("v-if", true)
              ]),
              right: vue.withCtx(() => [
                !$data.isEdit ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "right",
                  onClick: _cache[1] || (_cache[1] = ($event) => $data.isEdit = true)
                }, "整理")) : vue.createCommentVNode("v-if", true),
                $data.isEdit ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "right",
                  onClick: _cache[2] || (_cache[2] = ($event) => $data.isEdit = false)
                }, "取消")) : vue.createCommentVNode("v-if", true)
              ]),
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "center" }, " 添加的单个表情 ")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode(
              "view",
              {
                class: "content",
                style: vue.normalizeStyle({ height: $options.contentHeight + "px" })
              },
              [
                vue.createElementVNode("view", { class: "animated-emoji" }, [
                  vue.createElementVNode("view", {
                    class: "animated-emoji-item add",
                    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.openAnimatedEmoji && _ctx.openAnimatedEmoji(...args))
                  }, [
                    $data.isEdit ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 0,
                      src: _imports_0$1,
                      mode: "aspectFit"
                    })) : (vue.openBlock(), vue.createElementBlock("image", {
                      key: 1,
                      src: _imports_1$1,
                      mode: "aspectFit"
                    }))
                  ]),
                  vue.createElementVNode("view", {
                    class: "animated-emoji-item edit check",
                    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.openAnimatedEmoji && _ctx.openAnimatedEmoji(...args))
                  }, [
                    vue.createElementVNode("image", {
                      src: _imports_2$1,
                      mode: "aspectFit"
                    }),
                    $data.isEdit ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "edit-mask"
                    }, [
                      vue.createElementVNode("view", { class: "ref" }, [
                        vue.createElementVNode("image", {
                          src: _imports_3$1,
                          mode: ""
                        })
                      ])
                    ])) : vue.createCommentVNode("v-if", true)
                  ])
                ])
              ],
              4
              /* STYLE */
            ),
            $data.isEdit ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "footer"
            }, [
              vue.createElementVNode("view", { class: "left" }),
              vue.createElementVNode("view", { class: "right" }, "删除")
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                class: "footer-placeholder",
                style: vue.normalizeStyle({ height: $data.systemInfo.safeBottom + "px" })
              },
              null,
              4
              /* STYLE */
            )
          ])
        ]),
        _: 1
        /* STABLE */
      },
      512
      /* NEED_PATCH */
    );
  }
  const AnimatedEmojiManage = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-5edef30a"], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/amlx-face-editor/components/animated-emoji-manage/animated-emoji-manage.vue"]]);
  const _imports_0 = "/uni_modules/amlx-face-editor/static/imgs/search.png";
  const _imports_1 = "/uni_modules/amlx-face-editor/static/imgs/face.png";
  const _imports_2 = "/uni_modules/amlx-face-editor/static/imgs/collection.png";
  const _imports_3 = "/uni_modules/amlx-face-editor/static/imgs/face-del.png";
  const _imports_4 = "/uni_modules/amlx-face-editor/static/imgs/face-del2.png";
  const _imports_5 = "/uni_modules/amlx-face-editor/static/imgs/add.png";
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
    components: {
      AnimatedEmojiManage
    },
    props: {
      delActive: {
        // 删除按钮是否激活
        type: Boolean,
        default: false
      },
      optionsPanel: {
        // 选择面板是否显示
        type: Boolean,
        default: true
      },
      searchShow: {
        // 搜索按钮是否显示
        type: Boolean,
        default: false
      },
      collectionShow: {
        // 收藏按钮是否显示
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentTab: 1,
        // 最近使用的表情
        recently: [],
        emojiList: faceList.emojiList
      };
    },
    mounted() {
      this.recently = getRecently();
    },
    methods: {
      changeCurrentTab(value) {
        this.currentTab = value;
      },
      changeSwiper(e) {
        this.changeCurrentTab(++e.detail.current);
      },
      handleFace(item) {
        setRecently(item);
        this.$emit("handleFace", item.key);
      },
      delLastText() {
        this.$emit("delLastText");
      },
      openAnimatedEmoji() {
        this.$refs.AnimatedEmojiManageRef.open();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_AnimatedEmojiManage = vue.resolveComponent("AnimatedEmojiManage");
    return vue.openBlock(), vue.createElementBlock("view", { class: "face-box" }, [
      $props.optionsPanel ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "tab"
      }, [
        $props.searchShow ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "tab-item"
        }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            mode: "aspectFit"
          })
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab-item", { active: $data.currentTab === 1 }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $options.changeCurrentTab(1))
          },
          [
            vue.createElementVNode("image", {
              src: _imports_1,
              mode: "aspectFit"
            })
          ],
          2
          /* CLASS */
        ),
        $props.collectionShow ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["tab-item", { active: $data.currentTab === 2 }]),
            onClick: _cache[1] || (_cache[1] = ($event) => $options.changeCurrentTab(2))
          },
          [
            vue.createElementVNode("image", {
              src: _imports_2,
              mode: "aspectFit"
            })
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("swiper", {
        class: "swiper",
        current: $data.currentTab - 1,
        "indicator-dots": false,
        autoplay: false,
        duration: 200,
        onChange: _cache[4] || (_cache[4] = (...args) => $options.changeSwiper && $options.changeSwiper(...args))
      }, [
        vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
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
              onClick: _cache[2] || (_cache[2] = (...args) => $options.delLastText && $options.delLastText(...args))
            }, [
              $props.delActive ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                src: _imports_3,
                mode: "aspectFit"
              })) : (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                src: _imports_4,
                mode: "aspectFit"
              }))
            ])
          ])
        ]),
        vue.createElementVNode("swiper-item", null, [
          vue.createElementVNode("view", { class: "swiper-item" }, [
            vue.createElementVNode("view", { class: "face-scroll" }, [
              vue.createElementVNode("view", { class: "title-text" }, " 添加的单个表情 "),
              vue.createElementVNode("view", { class: "animated-emoji" }, [
                vue.createElementVNode("view", {
                  class: "animated-emoji-item add",
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.openAnimatedEmoji && $options.openAnimatedEmoji(...args))
                }, [
                  vue.createElementVNode("image", {
                    src: _imports_5,
                    mode: "aspectFit"
                  })
                ])
              ])
            ])
          ])
        ])
      ], 40, ["current"]),
      vue.createVNode(
        _component_AnimatedEmojiManage,
        { ref: "AnimatedEmojiManageRef" },
        null,
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const AmlxFacePanel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-b0ebf446"], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/amlx-face-editor/components/amlx-face-editor/amlx-face-panel.vue"]]);
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
  const AmlxFaceRender = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/files/uniapp/amlx-face-editor/uni_modules/amlx-face-editor/components/amlx-face-editor/amlx-face-render.vue"]]);
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
      vue.createVNode(
        _component_AmlxFaceEditor,
        {
          ref: "faceTextarea",
          placeholder: "输入内容",
          onHasContent: _cache[0] || (_cache[0] = ($event) => $data.hasContent = $event)
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
