import { useState, useRef, useEffect } from "react";
// 导入图标
import { IoIosMore } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
// 导入工具函数
import { formatDate, vw } from "@/utils";
// 导入组件
import Dialog from "@/baseUI/dialog";
// 导入样式
import {
  Card,
  CardHeader,
  DateText,
  MoreBtn,
  MoreBtnWrap,
  DropdownMenu,
  DropdownItem,
  Grid,
  Cell,
  CellTitle,
  CellValue,
} from "./styles";
// 导入类型
import type { IHeightWeightItem } from "@/interface/heightWeight";
// 导入store
import { useUserStore } from "@/store";

/** 单列数据（身高/体重/头围） */
interface IGrowthCell {
  /** 列标题，如 "身高cm" */
  title: string;
  /** 数值文案，如 "50"，无数据传 undefined 展示 "--" */
  value?: string;
}

interface IProps {
  /** 记录数据 */
  record: IHeightWeightItem;
  /** 编辑回调 */
  onEdit?: (record: IHeightWeightItem) => void;
  /** 删除回调 */
  onDelete?: (record: IHeightWeightItem) => void;
}

/** 将记录中的数值字段转换为展示用的列数据 */
function buildCells(record: IHeightWeightItem): IGrowthCell[] {
  const fmt = (v?: number) => (v != null ? String(v) : undefined);
  return [
    { title: "身高cm", value: fmt(record.height) },
    { title: "体重kg", value: fmt(record.weight) },
    { title: "头围cm", value: fmt(record.head) },
  ];
}

function RecordCard(props: IProps) {
  const { record, onEdit, onDelete } = props;

  const userInfo = useUserStore((state) => state.userInfo);

  // 下拉菜单是否打开
  const [menuOpen, setMenuOpen] = useState(false);
  // 删除确认弹框是否显示
  const [deleteVisible, setDeleteVisible] = useState(false);
  // 是否显示操作按钮
  const isShowMenu = record?.userId === userInfo?._id;

  const wrapRef = useRef<HTMLDivElement>(null);
  const cells = buildCells(record);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // 选择操作项
  const handleAction = (action: "edit" | "delete") => {
    setMenuOpen(false);
    if (action === "edit") {
      onEdit?.(record);
    } else {
      setDeleteVisible(true);
    }
  };

  // 确认删除
  const handleDeleteConfirm = () => {
    setDeleteVisible(false);
    onDelete?.(record);
  };

  return (
    <Card>
      <CardHeader>
        <DateText>{formatDate(record.date)}</DateText>
        <MoreBtnWrap ref={wrapRef}>
          {isShowMenu && (
            <MoreBtn onClick={() => setMenuOpen((v) => !v)}>
              <IoIosMore />
            </MoreBtn>
          )}
          {menuOpen && (
            <DropdownMenu>
              <DropdownItem onClick={() => handleAction("edit")}>
                <CiEdit size={vw(14)} />
                编辑
              </DropdownItem>
              <DropdownItem $danger onClick={() => handleAction("delete")}>
                <MdDelete size={vw(14)} color="#ff4d4f" />
                删除
              </DropdownItem>
            </DropdownMenu>
          )}
        </MoreBtnWrap>
      </CardHeader>
      <Grid>
        {cells.map((cell) => (
          <Cell key={cell.title}>
            <CellTitle>{cell.title}</CellTitle>
            <CellValue $empty={!cell.value}>{cell.value || "--"}</CellValue>
          </Cell>
        ))}
      </Grid>

      {/* 删除确认弹框 */}
      <Dialog
        visible={deleteVisible}
        content="确定要删除这条身高体重记录吗？"
        confirmText="删除"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteVisible(false)}
      />
    </Card>
  );
}

export default RecordCard;
