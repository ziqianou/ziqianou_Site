const ENDPOINT = "https://v1.hitokoto.cn/?c=i&encode=json";
const TIMEOUT_MS = 5000;

function formatSentence(data) {
  if (!data || !data.hitokoto) return "";
  let text = data.hitokoto;
  if (data.from) {
    text += `《${data.from}》`;
    if (data.from_who) text += data.from_who;
  }
  return text;
}

export function initSlogan(element) {
  if (!element) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  fetch(ENDPOINT, { signal: controller.signal })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const text = formatSentence(data);
      if (text) element.textContent = text;
    })
    .catch((error) => {
      if (error.name !== "AbortError") console.error("一言获取失败：", error);
    })
    .finally(() => clearTimeout(timer));
}
