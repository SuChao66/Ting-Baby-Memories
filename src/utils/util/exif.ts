import exifr from "exifr";

/** EXIF / XMP 中的时间字段，按优先级依次取值 */
const TIME_KEYS = [
  "DateTimeOriginal", // 拍摄时间（优先）
  "CreateDate", // 创建时间（部分设备 / 软件写入 XMP）
  "DateTimeDigitized", // 数字化时间
  "ModifyDate", // 修改时间（兜底）
] as const;

/**
 * 获取图片元数据中的拍摄时间
 *
 * 读取顺序：EXIF 时间字段 → 文件最后修改时间
 * 注意：需在图片压缩前调用，压缩后的图片会丢失 EXIF 信息
 *
 * @param file 图片文件
 * @returns 拍摄时间，读取失败时返回 null
 */
export async function getExifData(file: File | Blob): Promise<Date | null> {
  try {
    const metadata = await exifr.parse(file, {
      pick: [...TIME_KEYS],
      xmp: true,
    });

    if (metadata) {
      for (const key of TIME_KEYS) {
        const value = metadata[key];
        // exifr 默认将时间字段还原为 Date 对象
        if (value instanceof Date && !Number.isNaN(value.getTime())) {
          return value;
        }
        // 个别情况下未还原为 Date，尝试用字符串解析
        if (typeof value === "string") {
          const parsed = new Date(value);
          if (!Number.isNaN(parsed.getTime())) return parsed;
        }
      }
    } else {
      console.warn("该图片不包含任何元数据");
    }
  } catch (error) {
    console.error("读取图片元数据失败:", error);
  }

  // 回退：使用文件本身的最后修改时间
  if (file instanceof File && file.lastModified) {
    const lastModified = new Date(file.lastModified);
    if (!Number.isNaN(lastModified.getTime())) return lastModified;
  }

  console.warn("图片中未找到拍摄时间信息");
  return null;
}
