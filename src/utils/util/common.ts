// 获取今日日期
export const getTodayDate = () => {
  const today = new Date();
  return {
    fullDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
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
