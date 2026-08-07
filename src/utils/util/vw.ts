import { DESIGN_WIDTH } from "@/enums";

/**
 * 将 px 转为 vw 单位
 * styled-components 运行时生成样式, postcss-px-to-viewport 无法处理
 * 需手动转换保证移动端适配
 */
export function vw(px: number): string {
  return `${(px / DESIGN_WIDTH) * 100}vw`;
}
