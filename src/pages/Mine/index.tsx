// 导入 React Icons 图标
import {
  AiOutlineUser,
  AiOutlineRight,
  AiOutlineLock,
  AiOutlineLogout,
} from "react-icons/ai";
import { PiBabyLight } from "react-icons/pi";
// 导入路由方法
import { useNavigate } from "react-router-dom";
// 导入用户 store
import { useUserStore } from "@/store";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入我的页面样式组件
import {
  MineContainer,
  ProfileBanner,
  BannerAvatar,
  BannerInfo,
  BannerName,
  BannerDesc,
  LogoutButton,
} from "./styles";
// 导入通用样式组件
import { Card, CardRow, RowIcon, RowLabel, RowArrow } from "@/styles/common";

export default function Mine() {
  const navigate = useNavigate();
  const { userInfo, logout } = useUserStore((state) => state);

  // 退出登录处理函数
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <MineContainer>
      {/* 用户信息横幅 */}
      {userInfo?.username && (
        <ProfileBanner>
          <BannerAvatar>
            {userInfo.avatarUrl ? (
              <img src={userInfo.avatarUrl} alt="头像" className="avatar" />
            ) : (
              <AiOutlineUser color="#ff6b8a" size={vw(32)} />
            )}
          </BannerAvatar>
          <BannerInfo>
            <BannerName>{userInfo?.nickname || userInfo?.username}</BannerName>
            <BannerDesc>用户名：{userInfo?.username}</BannerDesc>
          </BannerInfo>
        </ProfileBanner>
      )}

      {/* 菜单卡片 */}
      <Card>
        <CardRow onClick={() => navigate("/user-manager")}>
          <RowIcon>
            <AiOutlineUser color="#ff6b8a" size={vw(18)} />
          </RowIcon>
          <RowLabel>我的信息</RowLabel>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        <CardRow onClick={() => navigate("/baby-manager")}>
          <RowIcon>
            <PiBabyLight color="#ff6b8a" size={vw(18)} />
          </RowIcon>
          <RowLabel>宝宝管理</RowLabel>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        <CardRow>
          <RowIcon>
            <AiOutlineLock color="#ff6b8a" size={vw(18)} />
          </RowIcon>
          <RowLabel>修改密码</RowLabel>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
      </Card>

      {/* 退出登录按钮 */}
      <LogoutButton onClick={handleLogout}>
        <AiOutlineLogout size={vw(16)} />
        退出登录
      </LogoutButton>
    </MineContainer>
  );
}
