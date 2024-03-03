# Node.jsの公式イメージをベースにする
FROM node:20.11-alpine

# アプリケーションのディレクトリを作成し、そこに移動する
WORKDIR /app

# アプリケーションの依存関係をインストールする
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコンテナにコピーする
COPY . .

# ビルドステージ
FROM node:20.11-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 実行ステージ
FROM node:20.11-alpine AS runtime
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json

# アプリケーションを実行するコマンド
CMD ["npm", "start"]
