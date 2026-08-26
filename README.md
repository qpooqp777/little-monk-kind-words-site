# 小沙彌向善用語專區

以「寺院晨光紙本」為設計方向的台灣繁體中文向善用語圖鑑。網站收錄 12 個類別、144 筆日常語料；每筆內容包含貼圖文案、適合情境、小沙彌動作、表情、視角與手繪特效，並支援單句 Prompt 與整類 12 格 Prompt 一鍵複製。

## 本機開發

```bash
pnpm install
pnpm dev
```

執行品質檢查與正式建置：

```bash
pnpm check
pnpm build
```

## GitHub Pages

網站使用 `.github/workflows/pages.yml` 自動部署。每次推送到 `main` 後，GitHub Actions 會先安裝依賴、執行 TypeScript 檢查與 Vite 建置，再將 `dist/public` 發布到 GitHub Pages。也可以從 Actions 手動執行工作流。

若儲存庫名稱為 `little-monk-kind-words-site`，公開網址為：

```text
https://qpooqp777.github.io/little-monk-kind-words-site/
```

Vite 會在 GitHub Actions 中自動使用 `/little-monk-kind-words-site/` 作為 base path；本機預覽則使用根路徑。

## 網站功能

網站提供左側類別索引、關鍵字搜尋、今日一句抽換、每筆語料的完整 Prompt、一鍵複製單句，以及選定類別後的一鍵複製 12 格 Prompt。全部語料狀態會保留瀏覽與搜尋功能，但整類複製需要先選擇單一類別，以避免複製過長內容。

## 內容與視覺資產

主視覺使用小沙彌插畫與品牌標誌，圖片以 WebP 形式放在 `client/public/assets/`，以降低 GitHub Pages 的載入成本。內容為台灣繁體中文，避免使用 Emoji，並以溫柔、尊重、陪伴與向善為文案原則。

## 專案結構

```text
client/
  public/assets/              # GitHub Pages 使用的 WebP 視覺資產
  src/pages/Home.tsx          # 主頁、語料資料與互動
  src/index.css               # 寺院晨光紙本視覺系統
.github/workflows/pages.yml   # GitHub Pages 自動部署
```

## 發布提醒

Manus 提供內建預覽與發布功能；GitHub Pages 則是另一個外部託管選項。若使用 GitHub Pages，請確認儲存庫為公開，並在儲存庫的 **Settings → Pages → Build and deployment** 中選擇 **GitHub Actions**。
