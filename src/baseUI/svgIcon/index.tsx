import React from "react";

// 1. 自动导入 assets/icons 目录下所有 svg 图标（eager 同步加载，作为 React 组件）
const modules = import.meta.glob("../../assets/icons/*.svg", {
  eager: true,
  query: "?react",
  import: "default",
});

// 2. 生成图标映射表，key 为文件名（不含扩展名）
const svgList = Object.entries(modules).reduce<
  Record<string, React.FC<React.SVGProps<SVGSVGElement>>>
>((acc, [path, component]) => {
  const name = path
    .split("/")
    .pop()!
    .replace(/\.svg$/, "");
  acc[name] = component as React.FC<React.SVGProps<SVGSVGElement>>;
  return acc;
}, {});

console.log(svgList);

// 3. 定义 Props 类型
type SvgIconName = keyof typeof svgList;
interface IconProps {
  name: SvgIconName;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

// 4. 主图标组件
function SvgIcon(props: IconProps) {
  const { name, size = 20, color, className, style, ...rest } = props;
  const SvgComponent = svgList[name];

  if (!SvgComponent) return null;

  return (
    <SvgComponent
      width={size}
      height={size}
      fill={color || "currentColor"}
      className={className}
      style={{ verticalAlign: "-0.25em", ...style }}
      {...rest} // 透传其他属性，如 onClick
    />
  );
}

export default SvgIcon;
