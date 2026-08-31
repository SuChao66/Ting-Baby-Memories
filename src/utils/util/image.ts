import Compressor from "compressorjs";

/**
 * 压缩图片
 * @param file 原始 File
 * @param maxSize 最长边像素，默认 500
 * @param quality JPEG 质量 0-1，默认 0.8
 */
export function compressImage(file: File, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        resolve(result as File);
      },
      error(err) {
        reject(err);
      },
    });
  });
}
