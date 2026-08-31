// 导入 styled-components 模块
import "styled-components";
// 导入主题类型
import type { Theme } from "@/styles/theme";

// 扩展 styled-components 默认主题类型
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
