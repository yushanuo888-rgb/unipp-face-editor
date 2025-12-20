import faceList from './face.js'
const emojiMap = faceList.emojiList.reduce((map, item) => {
  map[item.key] = item.url
  return map
}, {})
/**
 * 文本内容渲染表情
 * @param { String } text 需要处理的字符串
 */
export function renderEmoji(text) {
	const reg = /\[[^\]]+\]/g
	return text.replace(reg, (match) => {
	  if (emojiMap[match]) {
	    return `<img src="${emojiMap[match]}" style="width:20px;height:20px;vertical-align: bottom;pointer-events: none;" />`
	  }
	  return match
	})
}
/**
 * delta 转文本（保留空格和换行）
 * @param {Array} delta
 * @param {Array} emojiList
 * @returns {String}
 */
export function deltaToText(delta, emojiList) {
  if (!Array.isArray(delta)) return '';

  // 建立 url => key 的映射表，提升性能
  const emojiMap = {};
  emojiList.forEach(item => {
    emojiMap[item.url] = item.key;
  });

  let result = '';

  delta.forEach(item => {
    const insert = item.insert;

    // 1️⃣ 纯文本
    if (typeof insert === 'string') {
      result += insert;
      return;
    }

    // 2️⃣ 图片（表情）
    if (insert && insert.image) {
      const imageUrl = insert.image;

      // 只取 /static/emoji/emoji_xx.png
      const match = imageUrl.match(/\/static\/emoji\/emoji_\d+\.png$/);

      if (match && emojiMap[match[0]]) {
        result += emojiMap[match[0]];
      } else {
        // 找不到映射的兜底（可按需改）
        result += '';
      }
    }
  });

  return result;
}
