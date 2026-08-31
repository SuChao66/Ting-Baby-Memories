// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { CloudAlbumContainer } from "./styles";

function CloudAlbum() {
  return (
    <>
      <NavHeader title="云相册" back={<IoIosArrowBack size={22} />} />
      <CloudAlbumContainer>云相册</CloudAlbumContainer>
    </>
  );
}

export default CloudAlbum;
