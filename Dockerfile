# FE 런타임 이미지 — 맥에서 미리 빌드한 Next standalone 산출물을 복사만 한다(컨테이너 내 컴파일 없음 → 2GB 서버에서 가벼움).
# 빌드: npm ci && npm run build  (next.config.ts 의 output:"standalone" 필요)
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# standalone 서버(server.js + 최소 node_modules)
COPY .next/standalone ./
# 정적 자산·public 은 standalone 밖이라 따로 복사
COPY .next/static ./.next/static
COPY public ./public
EXPOSE 3000
CMD ["node", "server.js"]
