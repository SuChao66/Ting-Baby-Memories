/** 尿布状态：臭臭 / 嘘嘘 / 臭臭+嘘嘘 / 干爽 */
export const DIAPER_STATUS = {
  POOP: "poop", // 臭臭
  PEE: "pee", // 嘘嘘
  BOTH: "both", // 臭臭+嘘嘘
  DRY: "dry", // 干爽
} as const;

/** 尿布状态选项 */
/** 尿布状态图片（value 与文件名对应，如 poop.png -> poop） */
const statusImageModules = import.meta.glob(
  "../../../../assets/images/diaper_status/*.png",
  {
    eager: true, // 立即加载
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

/** 尿布状态图片映射：value -> 图片地址 */
const diaperStatusImages = Object.fromEntries(
  Object.entries(statusImageModules).map(([path, url]) => {
    const value = path
      .split("/")
      .pop()!
      .replace(/\.png$/, "");
    return [value, url];
  }),
);

// 尿布状态选择
export const diaperStatusOptions: {
  value: string;
  label: string;
  image: string;
}[] = [
  { value: DIAPER_STATUS.POOP, label: "臭臭" },
  { value: DIAPER_STATUS.PEE, label: "嘘嘘" },
  { value: DIAPER_STATUS.BOTH, label: "臭臭+嘘嘘" },
  { value: DIAPER_STATUS.DRY, label: "干爽" },
].map((item) => ({ ...item, image: diaperStatusImages[item.value] }));

/** 臭臭颜色选项 */
export const poopColorOptions = [
  { value: "yellow", label: "黄色", color: "#fdd835" },
  { value: "yellowGreen", label: "黄绿色", color: "#c0ca33" },
  { value: "darkGreen", label: "墨绿色", color: "#2e5e1e" },
  { value: "greenBrown", label: "绿褐色", color: "#6b8e23" },
  { value: "lightYellow", label: "淡黄色", color: "#fff176" },
  { value: "darkBrown", label: "暗褐色", color: "#5d4037" },
  { value: "black", label: "黑色", color: "#212121" },
  { value: "green", label: "绿色", color: "#4caf50" },
  { value: "grayWhite", label: "灰白色", color: "#e0e0e0" },
  { value: "darkRed", label: "暗红色", color: "#b71c1c" },
  { value: "red", label: "红色", color: "#e53935" },
  { value: "pink", label: "粉红色", color: "#f48fb1" },
];

/** 便便形状图片（value 与文件名对应，如 1.paste.png -> paste） */
const shapeImageModules = import.meta.glob(
  "../../../../assets/images/bianbian/*.png",
  {
    eager: true, // 立即加载
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

/** 形状图片映射：value -> 图片地址 */
export const poopShapeImages = Object.fromEntries(
  Object.entries(shapeImageModules).map(([path, url]) => {
    const value = path
      .split("/")
      .pop()!
      .replace(/^\d+\./, "")
      .replace(/\.png$/, "");
    return [value, url];
  }),
);

/** 臭臭形状选项 */
export const poopShapeOptions = [
  { value: "paste", label: "糊状" },
  { value: "dryThick", label: "干稠" },
  { value: "cream", label: "膏状" },
  { value: "milkCurds", label: "奶瓣" },
  { value: "watery", label: "稀水样" },
  { value: "foamy", label: "泡沫状" },
  { value: "muddy", label: "泥土状" },
  { value: "granular", label: "颗粒状" },
  { value: "tarry", label: "柏油状" },
  { value: "jam", label: "果酱状" },
  { value: "tofuResidue", label: "豆腐渣" },
  { value: "eggDropSoup", label: "蛋花汤" },
  { value: "mucus", label: "鼻涕样粘液" },
  { value: "asphaltLike", label: "粘稠像沥青" },
  { value: "powder", label: "粉状" },
].map((item) => ({ ...item, image: poopShapeImages[item.value] }));

/** 尿量图片（value 与文件名对应，如 little.png -> little） */
const peeImageModules = import.meta.glob(
  "../../../../assets/images/pee/*.png",
  {
    eager: true, // 立即加载
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

/** 尿量图片映射：value -> 图片地址 */
const peeAmountImages = Object.fromEntries(
  Object.entries(peeImageModules).map(([path, url]) => {
    const value = path
      .split("/")
      .pop()!
      .replace(/\.png$/, "");
    return [value, url];
  }),
);

/** 尿量选项 */
export const peeAmountOptions = [
  { value: "little", label: "少" },
  { value: "medium", label: "一般" },
  { value: "much", label: "多" },
].map((item) => ({ ...item, image: peeAmountImages[item.value] }));

/** 喂奶方式 */
export const FEED_METHOD = {
  BREAST: "breast", // 亲喂
  BOTTLE: "bottle", // 瓶喂
} as const;

/** 亲喂模式 */
export const BREAST_FEED_MODE = {
  TIMER: "timer", // 计时
  MANUAL: "manual", // 手动输入
} as const;

/** 亲喂左右侧 */
export const BREAST_SIDE = {
  LEFT: "left",
  RIGHT: "right",
} as const;

/** 瓶喂奶类型 */
export const BOTTLE_MILK_TYPE = {
  FORMULA: "formula", // 配方奶
  BREAST_MILK: "breastMilk", // 母乳
} as const;

/** 瓶喂奶类型选项 */
export const bottleMilkTypeOptions = [
  { value: BOTTLE_MILK_TYPE.FORMULA, label: "配方奶", unit: "ml" },
  { value: BOTTLE_MILK_TYPE.BREAST_MILK, label: "母乳", unit: "ml" },
];

/** 选项数组 -> value/label 映射（记录列表摘要展示用，与录入表单文案同源） */
const toLabelMap = (options: { value: string; label: string }[]) =>
  Object.fromEntries(options.map(({ value, label }) => [value, label]));

/** 尿布状态中文映射 */
export const DIAPER_STATUS_MAP = toLabelMap(diaperStatusOptions);

/** 尿量中文映射 */
export const PEE_AMOUNT_MAP = toLabelMap(peeAmountOptions);

/** 便便颜色中文映射 */
export const POOP_COLOR_MAP = toLabelMap(poopColorOptions);

/** 便便形状中文映射 */
export const POOP_SHAPE_MAP = toLabelMap(poopShapeOptions);
