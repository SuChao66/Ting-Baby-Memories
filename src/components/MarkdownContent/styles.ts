// 导入 styled-components
import styled from "styled-components";
// 导入工具函数
import { vw } from "@/utils";

/**
 * Markdown 内容排版容器
 * 上下留白统一只压 margin-bottom，由 & > :last-child 收尾去空隙
 * 颜色/字号继承气泡（BubbleAnswer），不在此处覆盖
 */
export const MarkdownBody = styled.div`
  font-size: ${vw(14)};
  line-height: ${vw(22)};
  word-break: break-word;

  /* 段落 */
  p {
    margin: 0 0 ${vw(8)};
  }

  /* 标题（LLM 常用 ### 小标题，统一降级为近正文大小） */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: ${vw(12)} 0 ${vw(6)};
    font-weight: 600;
    line-height: ${vw(20)};
    &:first-child {
      margin-top: 0;
    }
  }
  h1 {
    font-size: ${vw(17)};
  }
  h2 {
    font-size: ${vw(16)};
  }
  h3,
  h4,
  h5,
  h6 {
    font-size: ${vw(15)};
  }

  /* 列表 */
  ul,
  ol {
    margin: 0 0 ${vw(8)};
    padding-left: ${vw(20)};
  }
  li {
    margin: 0 0 ${vw(4)};
    &::marker {
      color: #ff6b8a;
    }
  }
  /* GFM 任务列表项：mdast 输出自带 task-list-item 类，去圆点防双重标记 */
  li.task-list-item {
    list-style: none;
  }
  input[type="checkbox"] {
    margin: 0 ${vw(6)} 0 0;
    accent-color: #ff6b8a;
  }

  /* 行内代码 */
  code {
    padding: ${vw(1)} ${vw(5)};
    border-radius: ${vw(4)};
    background: #fff0f3;
    color: #e05575;
    font-size: ${vw(13)};
    font-family: "SF Mono", Menlo, Consolas, monospace;
    word-break: break-all;
  }

  /* 代码块：块级横滚防撑破气泡 */
  pre {
    margin: 0 0 ${vw(8)};
    padding: ${vw(10)} ${vw(12)};
    border-radius: ${vw(8)};
    background: #2d2d2d;
    overflow-x: auto;
    /* iOS 惯性滚动 */
    -webkit-overflow-scrolling: touch;
    code {
      display: block;
      padding: 0;
      background: transparent;
      color: #fff;
      font-size: ${vw(12)};
      line-height: ${vw(18)};
      white-space: pre;
      word-break: normal;
    }
  }

  /* 引用 */
  blockquote {
    margin: 0 0 ${vw(8)};
    padding: ${vw(2)} 0 ${vw(2)} ${vw(10)};
    border-left: 3px solid #ffd3dd;
    color: #8a8a8a;
    p:last-child {
      margin-bottom: 0;
    }
  }

  /* 分割线 */
  hr {
    margin: ${vw(10)} 0;
    border: none;
    border-top: 1px solid #ffd3dd;
  }

  /* 链接 */
  a {
    color: #ff6b8a;
    text-decoration: underline;
    word-break: break-all;
  }

  /* 图片：限宽防大图撑爆气泡 */
  img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: ${vw(8)};
  }

  /* 表格（外层 TableScroll 横滚） */
  table {
    border-collapse: collapse;
    font-size: ${vw(13)};
    th,
    td {
      padding: ${vw(6)} ${vw(10)};
      border: 1px solid #ffd3dd;
      text-align: left;
      /* 单元格不换行，宽度交给横向滚动 */
      white-space: nowrap;
    }
    th {
      background: #fff0f3;
      font-weight: 600;
    }
  }

  /* 末尾元素去 margin，气泡底部不留空隙 */
  & > :last-child {
    margin-bottom: 0;
  }
`;

/** 表格横向滚动容器（表格宽度天然超出 80% 气泡宽度） */
export const TableScroll = styled.div`
  margin: 0 0 ${vw(8)};
  overflow-x: auto;
  /* iOS 惯性滚动 */
  -webkit-overflow-scrolling: touch;
`;
