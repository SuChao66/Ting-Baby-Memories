// 获取今日日期
export const getTodayDate = (date?: string) => {
  const today = date ? new Date(date) : new Date();
  return {
    fullDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: today.getHours(),
    minute: today.getMinutes(),
    seconds: today.getSeconds(),
  };
};

// 格式化生日为 YYYY-MM-DD
export const formatBirthday = (value?: Date | string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 获取宝宝的年龄，不足一周岁按天显示
export const getBabyAge = (birthday?: Date | string | null) => {
  if (!birthday) return "";
  const now = new Date();
  const birth = new Date(birthday);
  if (Number.isNaN(birth.getTime())) return "";

  // 不足一周岁，按天显示
  const diffMs = now.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (totalDays < 365) {
    return `${totalDays}天`;
  }

  // 一周岁及以上，显示 X岁X月
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return months > 0 ? `${years}岁${months}个月` : `${years}岁`;
};

// 复制文本到剪贴板，成功返回 true
export const copyToClipboard = async (text: string) => {
  // 优先使用 Clipboard API（要求 HTTPS 或 localhost 环境）
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  // 降级方案：execCommand（兼容 HTTP 环境或旧浏览器）
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    // 固定定位 + 透明，避免复制时页面滚动或闪烁
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
};

/** 获取 YYYY-MM 格式的月份字符串 */
export const formatMonth = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

/** 计算大事记发生时宝宝的月龄 */
export const getAgeAt = (birthday?: string | null, at?: string) => {
  if (!birthday || !at) return "";
  const birth = new Date(birthday);
  const date = new Date(at);
  let years = date.getFullYear() - birth.getFullYear();
  let months = date.getMonth() - birth.getMonth();
  let days = date.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years < 0) return "";
  // 不足一周岁按天显示
  if (years < 1) {
    return months < 1 ? `${days}天` : `${months}个月${days}天`;
  }
  return months > 0 ? `${years}岁${months}个月` : `${years}岁`;
};

/** 格式化日期：2025年3月8日 */
export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
};

/** 格式化时间：10:30 */
export const formatTime = (timeStr: string) => {
  const t = new Date(timeStr);
  const hour = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
  const minute = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
  return `${hour}:${minute}`;
};

/** 获取明天的日期 */
export const getTomorrowDate = (date?: Date) => {
  const tomorrow = new Date(date || new Date());
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};
