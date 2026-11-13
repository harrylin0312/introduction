'use strict';
const details = [
  ['CAPTURE / TRANSPORT', '每 3 秒擷取一張影像', '瀏覽器透過 getUserMedia 取得視訊，Canvas 依原始影片尺寸擷取畫面，轉為品質參數 0.7 的 JPEG data URL，再以 WebSocket JSON 傳送活動 ID 與影像。', '{\n  "type": "match_event_face",\n  "eventID": "活動 ID",\n  "data": "data:image/jpeg;base64,…"\n}', '這是定時送圖的辨識流程；3 秒是送圖間隔，不是模型推論延遲。'],
  ['DETECTION / PREPROCESSING', '找到人臉，統一輸入尺寸', 'Python 以 OpenCV 解碼影像，從 BGR 轉為 RGB。MTCNN 偵測後選取信心值最高的一張臉，要求 confidence ≥ 0.95；依邊界框裁切，等比例縮放並補黑邊至 160 × 160。', 'Base64 → OpenCV decode → RGB\nMTCNN.detect_faces(image)\nmax(faces, key=confidence)\nconfidence ≥ 0.95\nCrop → Resize + Padding → 160 × 160', '0.95 是偵測信心門檻，不是身分辨識準確率。原版未拒絕多人臉，也未用關鍵點做幾何對齊。'],
  ['FEATURE EXTRACTION', '將人臉映射為特徵向量', '裁切圖轉為 float32，加入 batch 維度後，直接送進 keras-facenet 的 FaceNet 底層模型。登錄時將輸出向量存成 UID.npy；辨識時產生輸入向量，供後續距離比較。', 'face_img.astype("float32")\n→ np.expand_dims(..., axis=0)\n→ tf.convert_to_tensor(...)\n→ embedder.model(face_tensor)[0]\n→ embedding / UID.npy', '使用既有預訓練模型進行推論；程式未包含自行訓練模型的流程，亦未見額外的輸入標準化與向量正規化。'],
  ['MATCH / CHECK-IN', '只比對這場活動的參加者', '從 Firestore 讀取活動參加者 UID，逐一載入本機特徵，計算 1 減去 L2 距離。取最佳分數，達 0.69 門檻後嘗試更新簽到狀態與伺服器時間，並回傳 UID。', 'score = 1 - np.linalg.norm(input_emb - emb)\nbest = highest_score(participants)\nif best.score ≥ 0.69:\n  checkStatus = "已打卡"\n  checkTime = firestore.SERVER_TIMESTAMP', '原版的資料庫寫入錯誤只記錄於後端，仍可能回傳 status: ok；因此辨識成功尚不等同簽到已持久保存。']
];
document.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-step]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const values = details[Number(button.dataset.step)];
    ['detail-label', 'detail-title', 'detail-copy', 'detail-code', 'detail-note'].forEach((id, index) => {
      document.getElementById(id).textContent = values[index];
    });
  });
});
const slider = document.getElementById('similarity');
slider.addEventListener('input', () => {
  const value = Number(slider.value);
  document.getElementById('score').textContent = value.toFixed(2);
  const accepted = value >= 0.69;
  const decision = document.getElementById('decision');
  decision.textContent = accepted ? '接受比對 → 嘗試寫入簽到' : '拒絕比對 → 不寫入簽到';
  decision.classList.toggle('reject', !accepted);
});
