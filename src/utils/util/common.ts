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
export const getBabyAge = (birthday: Date) => {
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
