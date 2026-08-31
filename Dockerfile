# ============================================
# 前端 Dockerfile - 多阶段构建 (Vite build + nginx serve)
# ============================================

# ---- Stage 1: 构建前端 ----
FROM node:22-alpine AS builder
WORKDIR /app

# 安装 pnpm v9（与本地 lockfile 版本匹配）
RUN npm install -g pnpm@9

# 先复制依赖文件，利用 Docker 缓存
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 复制源码（含 .env.production，Vite 构建时需要）
COPY . .
RUN pnpm run build

# ---- Stage 2: nginx 托管静态文件 ----
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
