# 專題介紹

給資工系教授閱讀的專題與技術介紹網站，使用繁體中文與原生 HTML、CSS、JavaScript，無建置依賴。

## 網站

- 專題入口：https://harrylin0312.github.io/introduction/
- 人臉辨識專題：https://harrylin0312.github.io/introduction/face-recognition/

## 目錄

- `index.html`：專題入口。
- `face-recognition/`：人臉辨識專題介紹，含頁面、樣式與互動程式。

技術內容依前端 `36178eadc07971abb5aaeecb11a6e89b7c94f666` 與本機原版 `backend/server.py` 核對（2026-11-13）。後端尚未納入公開儲存庫。本頁不存取相機，不連線辨識服務，不讀寫 Firebase，亦不包含憑證、照片或特徵資料。

## 預覽與部署

在根目錄執行 `python3 -m http.server 8081`，開啟 http://localhost:8081/ 。
GitHub Pages 從 `main` 分支根目錄發布。

四步驟互動流程與門檻示意只說明程式邏輯，並非真實辨識結果或準確率數據。

## 備審資料補充

網站補充個人貢獻、開發歷程、設計取捨與 AI 協作方法，依據本機《AI人臉識別打卡系統》（22 頁）與《多元表現綜整 多字版》第 5–6 頁。`face-recognition/assets/process-iteration.webp` 為專題報告第 14 頁的過程紀錄，不是最終畫面。未上傳完整備審或含個人帳號的成品截圖。

報告提到的 Supabase／SQL 為歷程內容；現存程式確認採 Firebase Auth／Firestore。模型訓練未列為個人貢獻，未將感受性效率圖或未量測的改善寫成數據。
