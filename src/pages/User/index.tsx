import { useNavigate } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineUser, AiOutlineRight } from "react-icons/ai";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入状态
import { useUserStore } from "@/store";
// 导入通用样式组件
import {
  Card,
  CardRow,
  RowLabel,
  RowValue,
  RowAvatar,
  RowArrow,
} from "@/styles/common";
// 导入样式
import { UserContainer } from "./styls";

function User() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore((state) => state);

  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <UserContainer>
      <NavBar
        title="用户信息"
        back={<IoIosArrowBack size={22} />}
        onBackClick={handleBack}
      />
      {/* 我的资料卡片 */}
      <Card>
        <CardRow>
          <RowLabel>头像</RowLabel>
          <RowValue>
            <RowAvatar>
              <AiOutlineUser color="#ff6b8a" size={vw(18)} />
            </RowAvatar>
          </RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        <CardRow>
          <RowLabel>昵称</RowLabel>
          <RowValue>{userInfo?.nickname || "未设置"}</RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        <CardRow>
          <RowLabel>性别</RowLabel>
          <RowValue>
            {userInfo?.gender === 1
              ? "男"
              : userInfo?.gender === 0
                ? "女"
                : "未设置"}
          </RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        <CardRow>
          <RowLabel>生日</RowLabel>
          <RowValue>{userInfo?.profile?.birthday || "未设置"}</RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        <CardRow $isLast>
          <RowLabel>手机号</RowLabel>
          <RowValue>{userInfo?.phone || "未设置"}</RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
      </Card>
    </UserContainer>
  );
}

export default User;
