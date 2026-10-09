// 导入 React hooks
import { useState } from "react";
// 导入导航hooks
import { useNavigate } from "react-router-dom";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入通用样式组件
import { Card, CardRow, RowLabel, RowValue, RowArrow } from "@/styles/common";
// 导入页面样式组件
import { BindBabyContainer, BindTip, FormInput, BindButton } from "./styles";
// 导入导航栏组件
import NavHeader from "@/components/navHeader";
// 导入关系选项
import { RELATION_OPTIONS } from "@/enums";
// 导入类型
import type { IBabyInfo } from "@/interface/baby";
// 导入store
import { useBabyStore } from "@/store";

function BindBaby() {
  const navigate = useNavigate();
  const { bindBaby } = useBabyStore((state) => state);

  const [babyNo, setBabyNo] = useState(""); // 宝宝号
  const [relation, setRelation] = useState<IBabyInfo["relation"]>(null); // 与宝宝关系
  // 弹层可见性
  const [relationVisible, setRelationVisible] = useState(false);

  // 关系选择
  const handleRelationSelect = (item: Record<string, string | boolean>) => {
    setRelation(item.value as IBabyInfo["relation"]);
    setRelationVisible(false);
  };

  // 关联宝宝
  const handleBind = async () => {
    if (!babyNo) {
      Toast.show({
        title: "请输入宝宝号",
        icon: "warn",
      });
      return;
    }
    if (!relation) {
      Toast.show({
        title: "请选择与宝宝关系",
        icon: "warn",
      });
      return;
    }
    const success = await bindBaby({
      baby_no: babyNo,
      relation,
    });
    if (success) {
      // 关联成功后，提示并返回宝宝管理列表页
      navigate("/baby-manager");
    }
  };

  return (
    <>
      <NavHeader title="关联宝宝" back={<IoIosArrowBack size={22} />} />
      <BindBabyContainer>
        {/* 关联提示 */}
        <BindTip>
          输入家人提供的宝宝号即可关联，共同记录宝宝成长；宝宝号可在「宝宝管理」列表中查看
        </BindTip>

        {/* 关联表单卡片 */}
        <Card>
          {/* 宝宝号 */}
          <CardRow>
            <RowLabel>宝宝号</RowLabel>
            <FormInput
              type="text"
              placeholder="请输入宝宝号"
              value={babyNo}
              onChange={(e) => setBabyNo(e.target.value)}
            />
          </CardRow>
          {/* 与宝宝关系 */}
          <CardRow $isLast onClick={() => setRelationVisible(true)}>
            <RowLabel>与宝宝关系</RowLabel>
            <RowValue>
              {RELATION_OPTIONS.find((opt) => opt.value === relation)?.name ||
                "请选择"}
            </RowValue>
            <RowArrow>
              <AiOutlineRight size={vw(14)} />
            </RowArrow>
          </CardRow>
        </Card>

        {/* 关联按钮 */}
        <BindButton onClick={handleBind}>关联宝宝</BindButton>
      </BindBabyContainer>

      {/* 与宝宝关系选择 */}
      <ActionSheet
        visible={relationVisible}
        options={RELATION_OPTIONS}
        cancelText="取消"
        onSelect={handleRelationSelect}
        onCancel={() => setRelationVisible(false)}
      />
    </>
  );
}

export default BindBaby;
