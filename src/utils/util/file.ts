/**
 * 检查文件类型是否为图片
 * @param fileType 文件类型
 * @returns 是否为图片
 */
export const isImage = (fileType: string) => {
  return fileType.startsWith("image/");
};

/**
 * 检查文件类型是否为视频
 * @param fileType 文件类型
 * @returns 是否为视频
 */
export const isVideo = (fileType: string) => {
  return fileType.startsWith("video/");
};

/**
 * 检查文件类型是否为音频
 * @param fileType 文件类型
 * @returns 是否为音频
 */
export const isAudio = (fileType: string) => {
  return fileType.startsWith("audio/");
};
