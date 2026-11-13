# 人臉辨識活動簽到系統｜專題介紹

給資工系教授閱讀的技術介紹網站，使用繁體中文，採原生 HTML、CSS、JavaScript，無建置依賴。

## 內容

專題情境、可互動的四階段辨識流程、系統架構、Firestore 資料模型、比對門檻示意，以及實作限制與後續驗證計畫。

技術內容核對前端版本 `36178eadc07971abb5aaeecb11a6e89b7c94f666` 及本機原版 `backend/server.py`（2026-11-13）。後端尚未納入公開的 face-recognition 儲存庫。本頁不含憑證、照片或特徵資料，不會開啟相機、連線辨識服務或寫入 Firebase。

## 本機預覽

在專案根目錄執行 `python3 -m http.server 8081`，再開啟 http://localhost:8081 。

## GitHub Pages

可在 GitHub 儲存庫 Settings → Pages 選擇從 `main` 分支的 `/ (root)` 發布。網站檔案位於根目錄，使用相對資產路徑，不需要安裝套件。

啟用後預期網址為 https://harrylin0312.github.io/introduction/ ；是否已部署須以 GitHub Pages 實際設定與部署結果為準。

## 原專題

- 原始碼：https://github.com/harrylin0312/face-recognition
- 原網站：https://harrylin0312.github.io/face-recognition/cover/

原網站的相機辨識需額外運行 Python 後端；本介紹網站的互動只在瀏覽器內示意，不代表即時辨識結果或測試數據。
