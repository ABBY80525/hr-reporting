# 系統規格需求書 (Software Requirements Specification - SRS)

## 專案名稱：HR REPORTING AUTOMATION 自動化人資考勤報表管理系統
* **文件版本**：v1.0
* **產出日期**：2026 年 8 月 13 日
* **專案類型**：企業級 HR 人力考勤數據分析與自動化報表系統
* **狀態**：正式版本 (Released)

---

## 1. 專案簡介與目標 (Introduction & Objectives)

### 1.1 專案背景
在大型製造業與企業組織中，HR 與各部門主管每日需處理龐大的員工考勤數據（包含直/間接人員、外籍移工、派遣工、建考生與實習生）。傳統報表依賴人工彙整，耗時且易生人為誤差。本系統旨在實現**考勤數據可視化、每日報表自動化生成、跨部門權限管理與 AI 智慧分析**。

### 1.2 系統目標
1. **數據即時可視化**：提供高階主管與 HR 整合性儀表板，即時掌握全公司與製造處 ONLINE / OFFLINE 出勤動態。
2. **多維度考勤報表**：支援製造處日報、學生/實習生專用報表及全公司考勤日報，並提供動態欄位篩選與多格式（Excel/PDF/CSV）匯出。
3. **AI 考勤洞察分析**：整合 Google Gemini AI 模組，自動針對每日出勤異常、人力缺口與離職請假趨勢生成自然語言決策報告。
4. **靈活系統配置**：提供組織架構、報表分類、學歷映射、班別、樓層/線別、假別及郵件寄送排程等彈性設定。
5. **高度可相容部署**：支援 Cloud Run 全棧容器化部署，同時具備離線與無伺服器靜態部署（GitHub Pages Ready）相容性。

---

## 2. 系統架構與技術棧 (System Architecture & Tech Stack)

### 2.1 系統技術架構
* **前端框架 (Frontend Framework)**：React 18 + TypeScript + Vite
* **UI 樣式與動畫 (Styling & Motion)**：Tailwind CSS + Motion (Framer Motion)
* **圖表與可視化 (Data Visualization)**：Recharts + Lucide-react 圖標庫
* **後端伺服器 (Backend Server)**：Node.js + Express (處理 API 代理與 Gemini AI 分析服務)
* **AI 服務整合 (AI Engine)**：`@google/genai` (Gemini 2.5 Flash / Dynamic Fallback Engine)
* **構建與部署 (Build & Deployment)**：Vite Static Bundler (相容 GitHub Pages 相對路徑部署與靜態託管)

---

## 3. 系統角色與權限矩陣 (User Roles & Access Control)

| 系統角色 | 儀表板查閱 | 考勤報表查閱 | 報表匯出/寄送 | 系統配置管理 | 系統權限與日誌 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **系統管理者 (System Admin)** | V | V | V | V | V |
| **HR 報表管理員 (HR Admin)** | V | V | V | V | X |
| **製造處/事業部主管 (Department Manager)** | V | V | 僅限所屬單位 | X | X |
| **一般查閱者 (Viewer)** | V | 僅限閱覽 | X | X | X |

---

## 4. 功能性需求規格 (Functional Requirements)

### 4.1 數據儀表板模組 (Dashboard Module)
* **FR-DB-01 考勤核心指標 (KPI Cards)**：即時顯示「實到總人數」、「在職總人數」、「出勤率」、「請假人數」及「缺勤異常人數」等卡片。
* **FR-DB-02 製造處 ONLINE vs OFFLINE 人力結構圖**：採用 Recharts 堆疊柱狀圖，分析間接正職、直接正職、外籍移工、實習工讀與派遣人力分佈。
* **FR-DB-03 考勤異常趨勢分析**：呈現連續 7 日請假與遲到/缺勤變化折線圖。
* **FR-DB-04 Gemini AI 當日考勤洞察**：一鍵點擊自動呼叫 AI 模型生成每日出勤亮點、異常預警與人力平補建議。

### 4.2 製造處考勤日報模組 (Manufacturing Attendance Daily Report)
* **FR-MFG-01 多階層數據顯示**：
  * 支援 ONLINE (線上線別) 與 OFFLINE (線外單位) 垂直分區。
  * 支援「昨日在職/離職/報到/請假」、「應到人數」、「實到人數」、「請假人數」、「出差人數」及「缺勤人數」之指標欄位展開與折疊。
* **FR-MFG-02 跨身分分類欄位**：包含間接正職、直接正職、外籍移工、實習工讀、派遣工及總人數小計。
* **FR-MFG-03 人員名冊彈窗 (Detail Modal)**：點擊報表任意數字，可彈出對應人員名冊（工號、姓名、部門、班別、請假類別與時間）。
* **FR-MFG-04 欄位動態顯示與條件過濾**：提供多選下拉選單與圖示按鈕，可自訂隱藏/顯示特定人員類別。

### 4.3 每日出勤與特定族群報表 (Daily & Student/Intern Attendance Reports)
* **FR-AR-01 標準全公司每日考勤報表**：呈現跨廠區、事業部之出缺勤匯總。
* **FR-AR-02 學生/實習生/建考生專用報表**：針對學校合作專案學生進行特定出勤率與流失率追蹤。

### 4.4 系統配置管理模組 (Config Management Module)
* **FR-CFG-01 組織架構配置 (Org Config)**：管理事業部、處、部、課別與成本中心對應關係。
* **FR-CFG-02 報表分類配置 (Report Category)**：
  * 新增/編輯分類配置（如：身分代碼 `IG身004` 自動連動帶出身分別 `間接-正職`；報表分類 `間接正職` 自動連動帶出代碼 `RC001`）。
  * 狀態切換 Toggle（啟用/停用）。
* **FR-CFG-03 學歷配置管理 (Education Config)**：
  * 支援原始學歷名稱（二專、學士等）與標準學歷（專科、大學等）及學歷代碼（E04、E03）之映射配置。
* **FR-CFG-04 班別配置管理 (Shift Type Config)**：設定日班、夜班、輪班時間區間與彈性刷卡規則。
* **FR-CFG-05 樓層與線別配置 (Floor & Line Config)**：設定製造處樓層、產線名稱及 ONLINE / OFFLINE 屬性分類。
* **FR-CFG-06 假別管理 (Leave Management)**：設定事假、病假、特休等扣薪與計勤權重。

### 4.5 郵件自動化與模板管理 (Mail Management Module)
* **FR-MAIL-01 郵件模板管理 (Email Templates)**：支援自訂 HTML 郵件格式，提供插入動態變數（如：`${Date}`、`${Department}`、`${AttendanceRate}`）。
* **FR-MAIL-02 收件人群組設定 (Recipient Groups)**：可建立主管群、HR群、產線線長群等正本 (TO) 與副本 (CC) 名單。
* **FR-MAIL-03 郵件寄送排程設定 (Send Settings)**：
  * 設定特定郵件名稱（如：NVD日班出勤報表-8點）。
  * 動態綁定對應模板與目標群組，並設定狀態（啟用/停用）。

### 4.6 數據導出與發送服務 (Export & Email Modal Services)
* **FR-EXP-01 多格式導出**：支援 Excel (.xlsx)、PDF 與 CSV 格式導出。
* **FR-EXP-02 Email 快速發送**：可於報表頁面直接觸發 Email 發送彈窗，即時發送考勤日報予指定的管理人員。

---

## 5. 非功能性需求規格 (Non-Functional Requirements)

### 5.1 效能需求 (Performance)
* **頁面載入速度**：首次加載時間不超過 1.5 秒（得益於 Vite Bundle 優化）。
* **大型數據渲染**：支援 1,000+ 筆考勤列同時於虛擬化/分頁表格中順暢滾動與過濾，無明顯 Lag。

### 5.2 安全性與權限 (Security)
* **API 密鑰安全**：Gemini API Key 僅於後端伺服器環境變數（`process.env.GEMINI_API_KEY`）中讀取，嚴禁於前端暴露。
* **操作稽核日誌 (Audit Logs)**：系統管理模組記錄所有使用者之新增、修改、刪除與報表匯出操作。

### 5.3 相容性與靜態託管 (Compatibility & Deployment)
* **響應式 UI (RWD)**：支援 Desktop 大螢幕高密度檢視與 Tablet 響應式佈局。
* **無伺服器/GitHub Pages 相容**：前端封裝支援相對路徑（`base: './'`），當後端 API 無法連線時，自動回退使用前端備用數據模組（Fallback Engine），保證系統絕不崩潰。

---

## 6. 系統資料實體模型 (Data Entity Models)

```typescript
// 1. 製造處考勤紀錄模型
interface MfgAttendanceRow {
  id: number;
  category: 'ONLINE' | 'OFFLINE';
  floorName: string; // 樓層/線別名稱
  yesterdayOnDuty: number; // 昨日在職
  yesterdayResigned: number; // 昨日離職
  yesterdayNewHired: number; // 昨日報到
  yesterdayOnLeave: number; // 昨日請假
  expectedCount: number; // 應到人數
  actualCount: number; // 實到人數
  leaveCount: number; // 請假人數
  businessTripCount: number; // 出差人數
  absentCount: number; // 缺勤人數
}

// 2. 郵件寄送設定模型
interface MailSendSettingRecord {
  id: number;
  mailName: string; // 郵件名稱
  status: boolean; // 啟用狀態
  templateName: string; // 模板名稱
  templateCode: string; // 模板編碼
  groupName: string; // 群組名稱
  groupCode: string; // 群組編碼
  maintainer: string; // 修改人
  maintainTime: string; // 修改時間
}

// 3. 報表分類配置模型
interface ReportCategoryRecord {
  id: number;
  identityCode: string; // 身分代碼 (如: IG身004)
  identityType: string; // 身分別 (如: 間接-正職)
  reportCategory: string; // 報表分類 (如: 間接正職)
  categoryCode?: string; // 分類代碼 (如: RC001)
  status: boolean; // 狀態
}
```

---

## 7. 驗收標準 (Acceptance Criteria)
1. **數據精確性**：製造處日報與全公司日報之小計與總人數算術結果須 100% 正確連動。
2. **AI 分析回應**：點擊「自動產生當日分析報告」按鈕時，需在 3 秒內展現格式化之分析結論與洞察。
3. **彈窗互動規格**：所有配置新增/編輯彈窗（學歷配置、分類配置、郵件設定）皆需符合指定的藍色頂欄視覺風格與自動帶入連動邏輯。
4. **構建通過**：執行 `npm run build` 與 `npm run lint` 需無任何語法或型態錯誤（Zero Errors）。
