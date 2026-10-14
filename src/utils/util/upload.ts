// 导入预签名接口与 XHR 直传方法
import { getPresignedUrlApi, uploadFileToCos } from "@/api/upload";
// 导入文件类型
import type { IFile } from "@/interface/timeline";

/** 根据 MIME 类型推断附件类型 */
const getFileType = (file: File): IFile["type"] =>
  file.type.startsWith("image/")
    ? "IMAGE"
    : file.type.startsWith("audio/")
      ? "AUDIO"
      : "VIDEO";

/**
 * 批量上传文件：并发直传 COS，按各文件字节占比汇总整体进度
 * @param fileList 待上传文件列表
 * @param onProgress 进度回调（整体百分比、已完成数、总数）
 * @returns 与入参顺序一致的结果数组，fulfilled 时携带 IFile
 */
export async function batchUploadFiles(
  fileList: File[],
  onProgress?: (percent: number, done: number, total: number) => void,
): Promise<PromiseSettledResult<IFile>[]> {
  // 文件总数
  const total = fileList.length;
  // 总字节数
  const totalSize = fileList.reduce((sum, f) => sum + f.size, 0);
  // 各文件已上传字节数（下标与 fileList 一一对应）
  const loadedList: number[] = new Array(total).fill(0);
  let lastProgressKey = "";
  const syncProgress = () => {
    if (!onProgress) return;
    const loaded = loadedList.reduce((a, b) => a + b, 0);
    const percent = totalSize ? Math.round((loaded / totalSize) * 100) : 100;
    const done = fileList.filter((f, i) => loadedList[i] >= f.size).length;
    // 进度和完成数都没变化时跳过，减少无效渲染
    const key = `${percent}-${done}`;
    if (key === lastProgressKey) return;
    lastProgressKey = key;
    onProgress(percent, done, total);
  };

  const tasks = fileList.map(async (file, index) => {
    const { data } = await getPresignedUrlApi({
      filename: file.name,
      contentType: file.type,
    });
    await uploadFileToCos(data.uploadUrl, file, (percent) => {
      loadedList[index] = (percent / 100) * file.size;
      syncProgress();
    });
    loadedList[index] = file.size;
    syncProgress();
    return {
      type: getFileType(file),
      url: data.accessUrl,
      fileName: file.name,
    } as IFile;
  });

  return Promise.allSettled(tasks);
}
