import { useState, useEffect } from "react";
// 导入组件
import NavHeader from "@/components/navHeader";
import Empty from "@/baseUI/empty";
// 导入样式
import {
  TagManagerContainer,
  TagInputCard,
  SelectedTagsWrap,
  TagInput,
  TagPill,
  MyTagsCard,
  MyTagsTitle,
  MyTagsList,
  TagDelete,
  SaveBtn,
} from "./styles";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入store
import { useTagStore } from "@/store";

function TagManager() {
  const { getTags, addTag, deleteTag, tags, selectedTags, setSelectedTags } =
    useTagStore((state) => state);
  const [name, setTagName] = useState<string>("");

  // 选中标签
  const handleSelectTag = (name: string) => {
    // 去重
    const isExisted = selectedTags.includes(name);
    if (!isExisted) {
      setSelectedTags([...selectedTags, name]);
    } else {
      Toast.show({
        title: "当前标签已选中",
        icon: "warn",
      });
    }
  };

  // 删除选中标签
  const handleRemoveSelectedTag = (name: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== name));
  };

  // 获取标签列表
  const getTagsList = async () => {
    await getTags();
  };

  // 获取标签列表
  useEffect(() => {
    getTagsList();
  }, []);

  // 新增标签
  const handleSave = () => {
    // 判断name是否存在
    if (!name.trim()) {
      Toast.show({
        title: "请输入标签内容",
        icon: "warn",
      });
      return;
    }
    addTag(name).then((success) => {
      if (success) {
        setTagName("");
        getTagsList();
      }
    });
  };

  // 删除标签
  const handleDeleteTag = (event: React.MouseEvent, id: string) => {
    // 防止事件冒泡
    event.stopPropagation();
    if (!id) return;
    deleteTag(id).then((success) => {
      if (success) {
        getTagsList();
      }
    });
  };

  return (
    <>
      <NavHeader
        title="添加标签"
        back={<IoIosArrowBack size={22} />}
        right={name ? <SaveBtn onClick={handleSave}>保存</SaveBtn> : ""}
      />
      <TagManagerContainer>
        {/* 标签输入卡片 */}
        <TagInputCard>
          {selectedTags.length > 0 && (
            <SelectedTagsWrap>
              {selectedTags.map((tag, index) => (
                <TagPill key={index}>
                  {tag}
                  <TagDelete onClick={() => handleRemoveSelectedTag(tag)}>
                    <AiOutlineClose size={vw(12)} />
                  </TagDelete>
                </TagPill>
              ))}
            </SelectedTagsWrap>
          )}
          <TagInput
            value={name}
            placeholder="输入标签"
            onChange={(e) => setTagName(e.target.value)}
          />
        </TagInputCard>
        {/* 我的标签卡片 */}
        <MyTagsCard>
          <MyTagsTitle>我的标签</MyTagsTitle>
          {tags.length > 0 ? (
            <MyTagsList>
              {tags.map((tag) => (
                <TagPill
                  key={tag._id}
                  onClick={() => handleSelectTag(tag.name)}
                >
                  <span className="tag-name">{tag.name}</span>
                  <TagDelete onClick={(e) => handleDeleteTag(e, tag._id)}>
                    <AiOutlineClose size={vw(12)} />
                  </TagDelete>
                </TagPill>
              ))}
            </MyTagsList>
          ) : (
            <Empty text="暂无标签数据" />
          )}
        </MyTagsCard>
      </TagManagerContainer>
    </>
  );
}

export default TagManager;
