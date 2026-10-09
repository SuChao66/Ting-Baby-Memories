import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import ProgressHeader from "./components/ProgressHeader";
import AgeGroup from "./components/AgeGroup";
import PaidVaccineCard from "./components/PaidVaccineCard";
import AddRecord from "./components/AddRecord";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import {
  VaccineContainer,
  AddBtn,
  TabBar,
  TabItem,
  ScrollArea,
  OverdueBanner,
  OverdueTitle,
  OverdueList,
  OverdueItem,
  OverdueRegister,
  PaidIntro,
  PaidList,
  LibraryToggle,
} from "./styles";
// 导入常量与数据
import { DOSE_STATUS, VACCINE_TABS } from "./constants";
import { MAIN_PAID_VACCINE_KEYS } from "./constants";
import { FREE_VACCINE_DOSES, PAID_VACCINE_DOSES } from "./data";
// （疫苗接口统一走 useVaccineStore）
// 导入工具函数
import { calcAgeMonths, ageTextOf, deriveStatus } from "./utils";
// 导入类型
import type {
  VaccineTabKey,
  IVaccineDose,
  IVaccineRecordItem,
  IDoseWithStatus,
  IAgeGroup,
  IPaidVaccineSummary,
} from "./types";
// 导入store
import { useBabyStore, useVaccineStore } from "@/store";
import type { IBabyItem } from "@/interface/baby";

function Vaccine() {
  // babyId
  const { id } = useParams();
  // 获取宝宝信息
  const { getBabyInfo } = useBabyStore((state) => state);
  // 疫苗接种记录方法
  const {
    addVaccineRecord,
    editVaccineRecord,
    deleteVaccineRecord,
    searchVaccineRecord,
    getVaccinePlan,
    saveVaccinePlan,
  } = useVaccineStore((state) => state);

  // 宝宝信息（生日用于月龄推导）
  const [babyInfo, setBabyInfo] = useState<IBabyItem | null>(null);
  // 当前页签，默认为免费
  const [activeTab, setActiveTab] = useState<VaccineTabKey>("free");
  // 接种记录（接口数据）
  const [records, setRecords] = useState<IVaccineRecordItem[]>([]);
  // 已加入计划的自费疫苗剂次 key 集合（持久化于后端，进入页面时拉取）
  const [plannedKeys, setPlannedKeys] = useState<Set<string>>(new Set());
  // 自费疫苗库是否展开全部
  const [showAllPaid, setShowAllPaid] = useState(false);

  // 登记弹窗：目标剂次（新增时预填）/ 编辑记录 / 编辑记录关联的规划类型
  const [addVisible, setAddVisible] = useState(false);
  const [targetDose, setTargetDose] = useState<IVaccineDose | undefined>();
  const [editRecord, setEditRecord] = useState<
    IVaccineRecordItem | undefined
  >();
  const [editDosePlan, setEditDosePlan] = useState<"free" | "paid">("free");

  useEffect(() => {
    // 获取宝宝信息
    getBabyData();
    // 获取接种记录
    getRecords();
    // 获取接种计划
    getPlanData();
  }, []);

  // 获取宝宝信息（生日）
  const getBabyData = async () => {
    if (!id) return;
    const data = await getBabyInfo({ id });
    setBabyInfo(data ?? null);
  };

  // 获取接种记录（后端 _id 映射为前端 id）
  const getRecords = async () => {
    if (!id) return;
    try {
      const data = await searchVaccineRecord({ babyId: id });
      setRecords(
        (data?.list ?? []).map((item) => ({
          id: item._id,
          doseKey: item.doseKey,
          vaccineName: item.vaccineName,
          dose: item.dose,
          injectDate: item.injectDate.slice(0, 10),
          hospital: item.hospital,
          batchNo: item.batchNo,
          fee: item.fee,
          note: item.note,
        })),
      );
    } catch {
      // 错误已由请求拦截器统一提示
    }
  };

  // 获取接种计划（自费疫苗剂次 key 集合）
  const getPlanData = async () => {
    if (!id) return;
    try {
      const data = await getVaccinePlan({ babyId: id });
      setPlannedKeys(new Set(data?.keys ?? []));
    } catch {
      // 错误已由请求拦截器统一提示
    }
  };

  // 基准生日：优先真实宝宝生日，缺失时回退当前日期（避免月龄计算崩溃）
  const birthday = useMemo(() => {
    if (babyInfo?.birthday) return new Date(babyInfo.birthday);
    return new Date();
  }, [babyInfo]);

  // 宝宝当前满月龄
  const ageMonths = useMemo(() => calcAgeMonths(birthday), [birthday]);

  // 参与时间轴推导的剂次：全部免费 + 已加入计划的自费
  const activeDoses = useMemo(
    () => [
      ...FREE_VACCINE_DOSES,
      ...PAID_VACCINE_DOSES.filter((d) => plannedKeys.has(d.key)),
    ],
    [plannedKeys],
  );

  // 剂次状态推导（纯前端计算，不落库）
  const doseWithStatus = useMemo(
    () =>
      activeDoses.map((d) => {
        const record = records.find((r) => r.doseKey === d.key);
        return {
          ...d,
          status: deriveStatus(d.recommendAge, ageMonths, !!record),
          record,
        };
      }),
    [activeDoses, records, ageMonths],
  );

  // 逾期未种剂次（置顶提醒）
  const overdueList = useMemo(
    () =>
      doseWithStatus
        .filter((d) => d.status === DOSE_STATUS.OVERDUE)
        .sort((a, b) => a.recommendAge - b.recommendAge),
    [doseWithStatus],
  );

  // 按推荐月龄分组的时间轴
  const ageGroups = useMemo(() => {
    const map = new Map<number, IDoseWithStatus[]>();
    doseWithStatus.forEach((d) => {
      const list = map.get(d.recommendAge) ?? [];
      list.push(d);
      map.set(d.recommendAge, list);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([age, doses]) => ({
        recommendAge: age,
        ageLabel: doses[0].ageLabel,
        doses,
      })) as IAgeGroup[];
  }, [doseWithStatus]);

  // 宝宝当前所处的月龄组（组标题高亮"当前阶段"）
  const currentAgeGroup = useMemo(() => {
    const reached = ageGroups.filter((g) => g.recommendAge <= ageMonths);
    if (reached.length === 0) return ageGroups[0]?.recommendAge;
    return Math.max(...reached.map((g) => g.recommendAge));
  }, [ageGroups, ageMonths]);

  // 接种进度：应种 = 推荐月龄已到达的剂次，已种 = 其中已有记录的
  const progress = useMemo(() => {
    const due = doseWithStatus.filter((d) => d.recommendAge <= ageMonths);
    return {
      doneCount: due.filter((d) => d.status === DOSE_STATUS.DONE).length,
      dueCount: due.length,
    };
  }, [doseWithStatus, ageMonths]);

  // 自费疫苗库汇总（疫苗维度，从剂次模板派生；同疫苗剂次按推荐月龄升序排列）
  const paidVaccines = useMemo(() => {
    const list: IPaidVaccineSummary[] = [];
    const map = new Map<string, IPaidVaccineSummary>();
    PAID_VACCINE_DOSES.forEach((d) => {
      const exist = map.get(d.vaccineKey);
      if (!exist) {
        const summary = {
          vaccineKey: d.vaccineKey,
          vaccineName: d.vaccineName,
          disease: d.disease,
          totalDose: d.totalDose,
          startAge: d.recommendAge,
          startAgeLabel: d.ageLabel,
          intro: d.intro,
        };
        map.set(d.vaccineKey, summary);
        list.push(summary);
      }
    });
    return list;
  }, []);

  // 自费疫苗展示列表：默认主流 7 种，展开后显示全部
  const visiblePaidVaccines = useMemo(() => {
    if (showAllPaid) return paidVaccines;
    const mainKeys = new Set<string>(MAIN_PAID_VACCINE_KEYS);
    return paidVaccines.filter((v) => mainKeys.has(v.vaccineKey));
  }, [paidVaccines, showAllPaid]);

  // 自费疫苗是否已加入计划（按该疫苗首个剂次判断）
  const isVaccinePlanned = (vaccineKey: string) => {
    const first = PAID_VACCINE_DOSES.find((d) => d.vaccineKey === vaccineKey);
    return first ? plannedKeys.has(first.key) : false;
  };

  // 自费疫苗已种剂次数
  const paidDoneCount = (vaccineKey: string) =>
    doseWithStatus.filter(
      (d) => d.vaccineKey === vaccineKey && d.status === DOSE_STATUS.DONE,
    ).length;

  // 加入/移出接种计划（整疫苗的所有剂次，先持久化到后端再更新本地）
  const handleTogglePlan = async (vaccineKey: string, planned: boolean) => {
    if (!id) return;
    const next = new Set(plannedKeys);
    PAID_VACCINE_DOSES.forEach((d) => {
      if (d.vaccineKey === vaccineKey) {
        if (planned) {
          next.add(d.key);
        } else {
          next.delete(d.key);
        }
      }
    });
    try {
      const ok = await saveVaccinePlan({ babyId: id, keys: [...next] });
      if (!ok) return;
      setPlannedKeys(next);
      Toast.show({
        title: planned ? "已加入接种计划" : "已移出接种计划",
      });
    } catch {
      // 错误已由请求拦截器统一提示
    }
  };

  // 打开登记弹窗（剂次维度）
  const handleRegister = (dose: IVaccineDose) => {
    setTargetDose(dose);
    setEditRecord(undefined);
    setAddVisible(true);
  };

  // 打开编辑弹窗（记录维度）
  const handleRecord = (record: IVaccineRecordItem) => {
    const allDoses = [...FREE_VACCINE_DOSES, ...PAID_VACCINE_DOSES];
    const bound = allDoses.find((d) => d.key === record.doseKey);
    setTargetDose(bound);
    setEditDosePlan(
      record.fee != null || bound?.plan === "paid" ? "paid" : "free",
    );
    setEditRecord(record);
    setAddVisible(true);
  };

  // 自由补录（不关联剂次）
  const handleAddFree = () => {
    setTargetDose(undefined);
    setEditRecord(undefined);
    setAddVisible(true);
  };

  // 自费疫苗卡登记：默认登记该疫苗下一个未种剂次
  const handlePaidRegister = (vaccineKey: string) => {
    const next = doseWithStatus
      .filter(
        (d) => d.vaccineKey === vaccineKey && d.status !== DOSE_STATUS.DONE,
      )
      .sort((a, b) => a.dose - b.dose)[0];
    if (next) {
      handleRegister(next);
    }
  };

  // 保存记录（编辑走编辑接口，新增走新增接口，成功后刷新列表）
  const handleSave = async (record: IVaccineRecordItem) => {
    if (!id) return;
    try {
      const params = {
        babyId: id,
        doseKey: record.doseKey,
        vaccineName: record.vaccineName,
        dose: record.dose,
        injectDate: record.injectDate,
        hospital: record.hospital,
        batchNo: record.batchNo,
        fee: record.fee,
        note: record.note,
      };
      const ok = editRecord
        ? await editVaccineRecord({ ...params, id: record.id })
        : await addVaccineRecord(params);
      if (!ok) return;
      Toast.show({ title: "保存成功" });
      setAddVisible(false);
      setEditRecord(undefined);
      setTargetDose(undefined);
      getRecords();
    } catch {
      // 错误已由请求拦截器统一提示
    }
  };

  // 删除记录
  const handleDelete = async (recordId: string) => {
    try {
      const ok = await deleteVaccineRecord(recordId);
      if (!ok) return;
      Toast.show({ title: "已删除该记录" });
      setAddVisible(false);
      setEditRecord(undefined);
      setTargetDose(undefined);
      getRecords();
    } catch {
      // 错误已由请求拦截器统一提示
    }
  };

  // 费用项显示：编辑按记录关联规划，新增按目标剂次规划，自由补录显示
  const showFee = editRecord
    ? editDosePlan === "paid"
    : targetDose
      ? targetDose.plan === "paid"
      : true;

  return (
    <>
      <NavHeader
        title="疫苗接种"
        back={<IoIosArrowBack size={22} />}
        right={<AddBtn onClick={handleAddFree}>补录</AddBtn>}
      />
      <VaccineContainer>
        {/* 进度概览 */}
        <ProgressHeader
          ageText={ageTextOf(ageMonths)}
          doneCount={progress.doneCount}
          dueCount={progress.dueCount}
        />

        {/* 页签切换：免费疫苗 / 自费疫苗 */}
        <TabBar>
          {VACCINE_TABS.map((tab) => (
            <TabItem
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabItem>
          ))}
        </TabBar>

        <ScrollArea>
          {activeTab === "free" ? (
            <>
              {/* 逾期置顶提醒 */}
              {overdueList.length > 0 && (
                <OverdueBanner>
                  <OverdueTitle>
                    有 {overdueList.length} 剂疫苗已逾期未种
                  </OverdueTitle>
                  <OverdueList>
                    {overdueList.map((d) => (
                      <OverdueItem key={d.key}>
                        <span>
                          {d.vaccineName} 第{d.dose}剂（{d.ageLabel}）
                        </span>
                        <OverdueRegister onClick={() => handleRegister(d)}>
                          登记
                        </OverdueRegister>
                      </OverdueItem>
                    ))}
                  </OverdueList>
                </OverdueBanner>
              )}

              {/* 按月龄分组时间轴 */}
              {ageGroups.map((group) => (
                <AgeGroup
                  key={group.recommendAge}
                  ageLabel={group.ageLabel}
                  isCurrent={group.recommendAge === currentAgeGroup}
                  doses={group.doses}
                  onRegister={handleRegister}
                  onRecord={handleRecord}
                />
              ))}
            </>
          ) : (
            <>
              {/* 自费疫苗说明 */}
              <PaidIntro>
                自费疫苗（非免疫规划）为知情、自愿接种，可弥补免费疫苗未覆盖的疾病。加入计划后可在接种时间轴中跟踪提醒。
              </PaidIntro>

              {/* 自费疫苗列表 */}
              <PaidList>
                {visiblePaidVaccines.map((v) => (
                  <PaidVaccineCard
                    key={v.vaccineKey}
                    summary={v}
                    planned={isVaccinePlanned(v.vaccineKey)}
                    doneCount={paidDoneCount(v.vaccineKey)}
                    onTogglePlan={() =>
                      handleTogglePlan(
                        v.vaccineKey,
                        !isVaccinePlanned(v.vaccineKey),
                      )
                    }
                    onRegister={() => handlePaidRegister(v.vaccineKey)}
                  />
                ))}
              </PaidList>

              {/* 疫苗库展开/收起 */}
              <LibraryToggle onClick={() => setShowAllPaid((prev) => !prev)}>
                {showAllPaid
                  ? "收起疫苗库"
                  : `查看全部疫苗库（共 ${paidVaccines.length} 种）`}
              </LibraryToggle>
            </>
          )}
        </ScrollArea>
      </VaccineContainer>

      {/* 登记/编辑接种记录弹窗 */}
      <AddRecord
        visible={addVisible}
        targetDose={targetDose}
        currentRecord={editRecord}
        showFee={showFee}
        onClose={() => {
          setAddVisible(false);
          setEditRecord(undefined);
          setTargetDose(undefined);
        }}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}

export default Vaccine;
