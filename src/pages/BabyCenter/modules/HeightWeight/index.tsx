import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import RecordCard from "./components/RecordCard";
import Empty from "./components/Empty";
import AddHeightWeight from "./components/AddHeightWeight";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import {
  HeightWeightContainer,
  AddBtn,
  TabBar,
  TabItem,
  RecordList,
} from "./styles";
// 导入常量
import type { TabKey } from "./constants";
import { TABS } from "./constants";
// 导入store
import { useHeightWeightStore } from "@/store";
// 导入类型
import type { IHeightWeightItem } from "@/interface/heightWeight";

function HeightWeight() {
  // babyId
  const { id } = useParams();

  const { searchHeightWeight, deleteHeightWeight } = useHeightWeightStore(
    (state) => state,
  );

  // 当前页签
  const [activeTab, setActiveTab] = useState<TabKey>("record");
  // 记录列表数据
  const [recordList, setRecordList] = useState<IHeightWeightItem[]>([]);
  // 新增/编辑记录弹窗显示
  const [addVisible, setAddVisible] = useState(false);
  // 当前编辑记录
  const [editRecord, setEditRecord] = useState<IHeightWeightItem | undefined>(
    undefined,
  );

  useEffect(() => {
    getData();
  }, []);

  // 获取记录数据
  const getData = async () => {
    const res = await searchHeightWeight({ babyId: id });
    setRecordList(res?.list);
  };

  // 打开新增弹窗
  const handleAdd = () => {
    setEditRecord(undefined);
    setAddVisible(true);
  };

  // 打开编辑弹窗
  const handleEdit = (record: IHeightWeightItem) => {
    setEditRecord(record);
    setAddVisible(true);
  };

  // 删除记录
  const handleDelete = async (record: IHeightWeightItem) => {
    const ok = await deleteHeightWeight(record._id);
    if (ok) {
      Toast.show({ title: "删除成功" });
      getData();
    }
  };

  // 关闭弹窗
  const handleClose = () => {
    setAddVisible(false);
    setEditRecord(undefined);
  };

  return (
    <>
      <NavHeader
        title="身高体重记录"
        back={<IoIosArrowBack size={22} />}
        right={<AddBtn onClick={handleAdd}>添加</AddBtn>}
      />
      <HeightWeightContainer>
        {/* 页签切换：记录列表 / 身高曲线 / 体重曲线 / 头围曲线 */}
        <TabBar>
          {TABS.map((tab) => (
            <TabItem
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabItem>
          ))}
        </TabBar>
        {activeTab === "record" ? (
          recordList.length > 0 ? (
            <RecordList>
              {recordList.map((record) => (
                <RecordCard
                  key={record._id}
                  record={record}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </RecordList>
          ) : (
            // 未添加任何记录时的兜底展示
            <Empty />
          )
        ) : (
          // 曲线页签（TODO: 业务逻辑自行实现）
          <Empty tip="暂无曲线数据" guide={false} />
        )}
      </HeightWeightContainer>

      {/* 新增/编辑身高体重弹窗 */}
      <AddHeightWeight
        visible={addVisible}
        babyId={id}
        currentRecord={editRecord}
        onClose={handleClose}
        onGetData={getData}
      />
    </>
  );
}

export default HeightWeight;
