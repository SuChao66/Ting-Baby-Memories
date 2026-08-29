import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// 导入样式
import {
  ActionBar,
  ActionButton,
  CommentSection,
  CommentItem,
  CommentAvatar,
  CommentBody,
  CommentUser,
  CommentText,
  CommentInputWrap,
  CommentInput,
} from "./styles";
// 导入类型
import type { ITimelineGroupRecord } from "@/interface/timeline";
// 导入图标
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineMessage,
} from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import type { IconType } from "react-icons";
// 导入工具函数
import { vw } from "@/utils";
// 导入store
import { useUserStore, useTimelineStore } from "@/store";
// 导入context
import { TimeLineContext } from "@/context";

interface IProps {
  record: ITimelineGroupRecord;
}

interface IBtnOptions {
  key: string;
  icon: IconType;
  isShow: boolean;
}

function Menu(props: IProps) {
  const { record } = props;
  const navigate = useNavigate();
  // 使用context
  const { setRefreshKey } = useContext(TimeLineContext);

  const { userInfo } = useUserStore((state) => state);
  const { deleteTimeLine } = useTimelineStore((state) => state);
  // 是否显示评论区
  const [isShowComment, setIsShowComment] = useState(false);
  const [visible, setVisible] = useState(false);

  const operationBtns: IBtnOptions[] = [
    {
      key: "edit",
      icon: AiOutlineEdit,
      isShow: record.userInfo._id === userInfo._id,
    },
    {
      key: "delete",
      icon: AiOutlineDelete,
      isShow: record.userInfo._id === userInfo._id,
    },
    {
      key: "comment",
      icon: AiOutlineMessage,
      isShow: true,
    },
  ];

  // 操作按钮
  const handleBtnClick = async (item: IBtnOptions) => {
    const key = item.key;
    if (key === "edit") {
      navigate("/edit-timeline", {
        state: {
          id: record._id,
        },
      });
    } else if (key === "comment") {
      setIsShowComment(!isShowComment);
    } else if (key === "delete") {
      setVisible(true);
    }
  };

  // 删除记录
  const handleDeleteTimeLine = async () => {
    const ok = await deleteTimeLine(record._id);
    if (ok) {
      Toast.show({
        title: "删除成功",
        icon: "success",
      });
      setVisible(false);
      setRefreshKey((prev: number) => prev + 1); // 改变 key 触发刷新
    }
  };

  return (
    <>
      {/* 评论区 */}
      {record.comments.length > 0 && (
        <CommentSection>
          {record.comments.map((comment, cIndex) => (
            <CommentItem key={cIndex}>
              <CommentAvatar src={comment.avatar} alt="用户头像" />
              <CommentBody>
                <CommentUser>{comment.userName}</CommentUser>
                <CommentText>{comment.content}</CommentText>
              </CommentBody>
            </CommentItem>
          ))}
        </CommentSection>
      )}

      {/* 操作栏 */}
      <ActionBar>
        {operationBtns.map((item) => {
          return (
            item.isShow && (
              <ActionButton key={item.key} onClick={() => handleBtnClick(item)}>
                <item.icon size={vw(16)} style={{ color: "#00000073" }} />
              </ActionButton>
            )
          );
        })}
      </ActionBar>

      {/* 评论输入区 */}
      {isShowComment && (
        <CommentInputWrap>
          <CommentInput placeholder="写下你的评论..." />
          <IoIosSend size={vw(22)} style={{ color: "#ff6b8a" }} />
        </CommentInputWrap>
      )}

      {/* 删除记录弹窗提示 */}
      <Dialog
        className="test-dialog"
        title="提示"
        visible={visible}
        onConfirm={handleDeleteTimeLine}
        onCancel={() => setVisible(false)}
      >
        确认删除该记录?
      </Dialog>
    </>
  );
}

export default Menu;
