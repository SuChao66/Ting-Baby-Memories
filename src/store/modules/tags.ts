import { create } from "zustand";
// 导入类型
import type { TagsState } from "../types";
// 导入接口
import { getTagsApi, addTagApi, deleteTagApi } from "@/api";

export const useTagStore = create<TagsState>((set) => ({
  tags: [], // 所有标签
  selectedTags: [], // 已经选中的标签
  setSelectedTags: (tags: Array<string>) => {
    set({ selectedTags: tags });
  },
  // 获取当前用户标签
  getTags: async () => {
    const { code, data } = await getTagsApi();
    if (code === 0) {
      set({ tags: data });
      return true;
    }
    return false;
  },
  // 删除标签
  deleteTag: async (id: string) => {
    const { code } = await deleteTagApi({ id });
    return code === 0 ? true : false;
  },
  // 新增标签
  addTag: async (name: string) => {
    const { code } = await addTagApi({ name });
    return code === 0 ? true : false;
  },
}));
