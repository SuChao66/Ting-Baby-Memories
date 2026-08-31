// 导入首页样式组件
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeContainer } from "./styles";
// 导入组件
import RecordList from "./modules/RecordLIst";
import NavHeader from "@/components/navHeader";
// 导入store
import { useBabyStore } from "@/store";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  // 初始化store
  const { hasBaby } = useBabyStore((state) => state);
  // 是否已经添加了宝宝
  const [isAddbaby, setIsAddBaby] = useState(true);
  // visible
  const [visible, setVisible] = useState(true);

  const fromPath = location.state?.from;

  useEffect(() => {
    // 定义异步函数在useEffect内部执行
    const checkBabyStatus = async () => {
      const status = await hasBaby();
      setIsAddBaby(status);
    };
    if (fromPath === "/login") {
      checkBabyStatus();
    }
  }, []);

  return (
    <>
      <NavHeader title="汀宝宝" />
      <HomeContainer>
        {isAddbaby ? (
          <RecordList />
        ) : (
          <Dialog
            title="提示"
            content="请先添加宝宝信息"
            visible={visible}
            onConfirm={() => navigate("/add-baby")}
            onCancel={() => {
              setVisible(false);
            }}
          ></Dialog>
        )}
      </HomeContainer>
    </>
  );
}
