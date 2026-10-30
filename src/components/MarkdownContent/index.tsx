// 导入 React Hooks
import { memo } from "react";
// 导入 Markdown 渲染器：AST -> React 元素，全程不产生 HTML 字符串（无 innerHTML，结构性免疫 XSS）
import ReactMarkdown from "react-markdown";
// 导入 GFM 插件：支持表格 / 删除线 / 任务列表 / 自动链接
import remarkGfm from "remark-gfm";
// 导入样式
import { MarkdownBody, TableScroll } from "./styles";
// 导入类型
import type { Components } from "react-markdown";

/**
 * 自定义元素映射：
 * - a：外链统一新窗口打开，并加 noopener 防反向标签劫持
 * - table：外包横向滚动容器，防止宽表撑破移动端气泡
 * react-markdown 会向映射组件额外下发 node 属性，
 * 这里显式取字段而非透传展开，避免 node 漏到 DOM 触发 React 告警
 */
const components: Components = {
  a: (props) => (
    <a
      href={props.href}
      title={props.title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  ),
  table: (props) => (
    <TableScroll>
      <table>{props.children}</table>
    </TableScroll>
  ),
};

interface IProps {
  /** Markdown 源文本 */
  content: string;
}

/** AI 回答 Markdown 渲染（memo：历史消息不随新消息重复解析） */
function MarkdownContent(props: IProps) {
  const { content } = props;

  return (
    <MarkdownBody>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </MarkdownBody>
  );
}

export default memo(MarkdownContent);
