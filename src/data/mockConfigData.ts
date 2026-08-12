export interface OrgConfigRecord {
  id: number;
  sort: number;
  deptCode: string;
  deptName: string;
  bu: string;
  factory: string;
  legalEntity: string;
  maintainer: string;
  maintainTime: string;
}

export interface ShiftTypeRecord {
  id: number;
  code: string;
  name: string;
  maintainer: string;
  maintainTime: string;
  status: boolean;
}

export interface FloorRecord {
  id: number;
  sort: number;
  code: string;
  name: string;
  category: 'ONLINE' | 'OFFLINE';
  maintainer: string;
  maintainTime: string;
  status: boolean;
}

export interface EducationRecord {
  code: string;
  rawName: string;
  mappedEdu: string;
  eduCode?: string;
  status: boolean;
}

export interface ReportCategoryRecord {
  id: number;
  identityCode: string;
  identityType: string;
  reportCategory: string;
  categoryCode?: string;
  status: boolean;
}

export interface LeaveItemRecord {
  id: number;
  itemCode: string;
  itemName: string;
  mergeCount: boolean; // 是否合併於【請假人數】顯示
}

export interface LeaveCategoryRecord {
  id: number;
  sort: number;
  categoryName: string; // 假勤類別(大項)
  maintainer: string;
  maintainTime: string;
  items: LeaveItemRecord[];
}

export interface MailTemplateRecord {
  id: number;
  code: string;
  name: string;
  reportName: string;
  bu: string;
  shift: string;
  subject: string;
  status: boolean;
  maintainer: string;
  maintainTime: string;
}

export interface MailRecipientGroupRecord {
  id: number;
  code: string;
  groupName: string;
  description: string;
  toCount: number;
  ccCount: number;
  bccCount: number;
  totalCount: number;
  toRecipients: string[];
  ccRecipients: string[];
  bccRecipients: string[];
  status: boolean;
  maintainer: string;
  maintainTime: string;
}

export interface MailSendSettingRecord {
  id: number;
  mailName: string;
  templateCode: string;
  templateName: string;
  groupCode: string;
  groupName: string;
  status: boolean;
  maintainer: string;
  maintainTime: string;
}

export const availableLeaveItemsPool = [
  '補休假',
  '特休假',
  '事假',
  '家庭照顧假',
  '病假',
  '生理假',
  '病假(妊娠未滿3個月)',
  '病假(妊娠未滿2個月)',
  '婚假',
  '婚假展延',
  '婚假1',
  '八週產假',
  '四週產假',
  '八週產假(未滿半年)',
  '四週產假(未滿半年)',
  '陪產(檢)假',
  '八日喪假',
  '六日喪假',
  '公假',
  '產檢假',
  '防疫隔離假',
  '安胎休養假',
  '育嬰留職停薪假'
];

// 1. 組織配置
export const initialOrgData: OrgConfigRecord[] = [
  { id: 1, sort: 3, deptCode: '1BGA010201', deptName: 'NVD中央辦公室-秘書組', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 2, sort: 4, deptCode: '1BGA020101', deptName: 'NVD經管課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 3, sort: 4, deptCode: '1BGA020101', deptName: 'NVD經管課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 4, sort: 4, deptCode: '1BGA020101', deptName: 'NVD經管課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 5, sort: 4, deptCode: '1BGA020101', deptName: 'NVD經管課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 6, sort: 4, deptCode: '1BGA020101', deptName: 'NVD經管課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 7, sort: 4, deptCode: '1BGA020101', deptName: 'NVD經管課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 8, sort: 4, deptCode: '1BGA020101', deptName: 'NVD經管課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 9, sort: 5, deptCode: '1BGA030000', deptName: 'NVD台灣製造處', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 10, sort: 5, deptCode: '1BGA030000', deptName: 'NVD台灣製造處', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 11, sort: 5, deptCode: '1BGA030000', deptName: 'NVD台灣製造處', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 12, sort: 5, deptCode: '1BGA030000', deptName: 'NVD台灣製造處', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 13, sort: 5, deptCode: '1BGA030000', deptName: 'NVD台灣製造處', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 14, sort: 5, deptCode: '1BGA030000', deptName: 'NVD台灣製造處', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 15, sort: 5, deptCode: '1BGA030000', deptName: 'NVD台灣製造處', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 16, sort: 6, deptCode: '1BGA030101', deptName: 'NVD供應商管理課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 17, sort: 6, deptCode: '1BGA030101', deptName: 'NVD供應商管理課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
  { id: 18, sort: 6, deptCode: '1BGA030101', deptName: 'NVD供應商管理課', bu: 'NVD', factory: '工程技術部', legalEntity: '龍華', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39' },
];

// 2. 報表分類
export const initialReportCategoryData: ReportCategoryRecord[] = [
  { id: 1, identityCode: 'IG身004', identityType: '間接-正職', reportCategory: '間接正職', status: true },
  { id: 2, identityCode: 'IG身001', identityType: '間接-正職-新幹班', reportCategory: '間接正職', status: true },
  { id: 3, identityCode: 'IG身003', identityType: '直接-正職', reportCategory: '直接正職', status: true },
  { id: 4, identityCode: 'IG身005', identityType: '間接-約聘-按摩師', reportCategory: '間接正職', status: true },
  { id: 5, identityCode: 'IG身015', identityType: '直接-約聘-工讀生-時', reportCategory: '實習工讀', status: true },
  { id: 6, identityCode: 'IG身008', identityType: '直接-派遣-時薪', reportCategory: '派遣', status: true },
  { id: 7, identityCode: 'IG身006', identityType: '直接-派遣-月薪', reportCategory: '派遣', status: true },
  { id: 8, identityCode: 'IG身009', identityType: '間接-派遣-時薪', reportCategory: '派遣', status: true },
  { id: 9, identityCode: 'IG身010', identityType: '直接-派遣-假日', reportCategory: '派遣', status: true },
  { id: 10, identityCode: 'IG身024', identityType: '直接-約聘-實習生-月', reportCategory: '實習工讀', status: true },
  { id: 11, identityCode: 'IG身024', identityType: '直接-約聘-實習生-時', reportCategory: '實習工讀', status: true },
  { id: 12, identityCode: 'IG身025', identityType: '間接-約聘-實習生-月', reportCategory: '實習工讀', status: true },
  { id: 13, identityCode: 'IG身023', identityType: '間接-約聘-實習生-時', reportCategory: '實習工讀', status: true },
  { id: 14, identityCode: 'IG身026', identityType: '直接-約聘-建考生', reportCategory: '實習工讀', status: true },
  { id: 15, identityCode: 'IG身027', identityType: '間接-約聘-建考生', reportCategory: '實習工讀', status: true },
  { id: 16, identityCode: 'IG身016', identityType: '間接-約聘-工讀生-月', reportCategory: '實習工讀', status: true },
  { id: 17, identityCode: 'IG身014', identityType: '直接-約聘-工讀生-月', reportCategory: '實習工讀', status: true },
  { id: 18, identityCode: 'SIYO2', identityType: '間接-正職-新幹班', reportCategory: '外籍移工', status: true },
];

// 3. 學歷管理
export const initialEducationData: EducationRecord[] = [
  { code: '1', rawName: '二年制', mappedEdu: '—', status: false },
  { code: '2', rawName: '二專', mappedEdu: '專科', status: true },
  { code: '3', rawName: '三專', mappedEdu: '專科', status: true },
  { code: '5', rawName: '五專', mappedEdu: '專科', status: true },
  { code: '6', rawName: '四技', mappedEdu: '大學', status: true },
  { code: 'B', rawName: '學士', mappedEdu: '大學', status: true },
  { code: 'C', rawName: '二技', mappedEdu: '大學', status: true },
  { code: 'D', rawName: '博士', mappedEdu: '博士', status: true },
  { code: 'H', rawName: '高中（普通科）', mappedEdu: '高中職', status: true },
  { code: 'J', rawName: '國中/附設國中部', mappedEdu: '國中', status: true },
  { code: 'M', rawName: '碩士', mappedEdu: '碩士', status: true },
  { code: 'P', rawName: '綜合高中部', mappedEdu: '高中職', status: true },
  { code: 'V', rawName: '高職（職業科）', mappedEdu: '高中職', status: true },
  { code: 'X', rawName: '4+X', mappedEdu: '—', status: false },
  { code: 'EE', rawName: '國小', mappedEdu: '國小', status: true },
  { code: 'A', rawName: '附設進修部', mappedEdu: '高中職', status: true },
  { code: 'E', rawName: '延教班/實用技能班', mappedEdu: '高中職', status: true },
];

// 4. 樓層管理
export const initialFloorData: FloorRecord[] = [
  { id: 1, sort: 3, code: 'LC00001', name: '1-1 Google線長', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 2, sort: 4, code: 'LC00001', name: '1-2 ASSY線長', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 3, sort: 4, code: 'LC00001', name: '1-2 PF線長', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 4, sort: 4, code: 'LC00001', name: '1-2 X-RAY線長', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 5, sort: 4, code: 'LC00001', name: '1-2重工', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 6, sort: 4, code: 'LC00001', name: 'PCB_OPEN', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 7, sort: 4, code: 'LC00001', name: '1-2 ASSY線長', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 8, sort: 4, code: 'LC00001', name: '1-1 Google線長', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 9, sort: 5, code: 'LC00001', name: '1-2 X-RAY線長', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 10, sort: 5, code: 'LC00001', name: '1-2重工', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 11, sort: 5, code: 'LC00001', name: 'PCB_OPEN', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 12, sort: 5, code: 'LC00001', name: '1-2 PF線長', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 13, sort: 5, code: 'LC00001', name: '1-2 X-RAY線長', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 14, sort: 5, code: 'LC00001', name: '1-2 ASSY線長', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 15, sort: 5, code: 'LC00001', name: 'PCB_OPEN', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 16, sort: 6, code: 'LC00001', name: '1-2重工', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 17, sort: 6, code: 'LC00001', name: '1-1 Google線長', category: 'OFFLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 18, sort: 6, code: 'LC00001', name: 'PCB_OPEN', category: 'ONLINE', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
];

// 5. 班型管理
export const initialShiftTypeData: ShiftTypeRecord[] = [
  { id: 1, code: 'BSO01', name: '一二三四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 2, code: 'BSO02', name: '一二三', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 3, code: 'BSO03', name: '四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 4, code: 'BSO04', name: '三四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 5, code: 'BSO05', name: '一二三四五', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 6, code: 'BSO06', name: '二三四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 7, code: 'BSO07', name: '二三四五', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 8, code: 'BSO08', name: '二三四五日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 9, code: 'BSO09', name: '一二四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 10, code: 'BSO010', name: '一二三四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 11, code: 'BSO011', name: '一二三四五', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 12, code: 'BSO012', name: '一二三', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 13, code: 'BSO013', name: '二三四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 14, code: 'BSO014', name: '三四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 15, code: 'BSO015', name: '四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 16, code: 'BSO016', name: '二三四五', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 17, code: 'BSO017', name: '二三四五日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
  { id: 18, code: 'BSO018', name: '一二四五六日', maintainer: 'IG123156/張三', maintainTime: '2026-08-03 11:22:39', status: true },
];

// 6. 假別管理
export const initialLeaveData: LeaveCategoryRecord[] = [
  {
    id: 1,
    sort: 1,
    categoryName: '補休假',
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39',
    items: [
      { id: 101, itemCode: 'SO002-1', itemName: '補休假', mergeCount: true },
    ],
  },
  {
    id: 2,
    sort: 2,
    categoryName: '特休假',
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39',
    items: [
      { id: 201, itemCode: 'SO002-1', itemName: '-', mergeCount: true },
    ],
  },
  {
    id: 3,
    sort: 3,
    categoryName: '事假',
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39',
    items: [
      { id: 301, itemCode: 'SO002-1', itemName: '事假', mergeCount: true },
      { id: 302, itemCode: 'SO002-1', itemName: '家庭照顧假', mergeCount: true },
    ],
  },
  {
    id: 4,
    sort: 4,
    categoryName: '病假',
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39',
    items: [
      { id: 401, itemCode: 'SO002-1', itemName: '病假', mergeCount: true },
      { id: 402, itemCode: 'SO002-1', itemName: '生理假', mergeCount: true },
      { id: 403, itemCode: 'SO002-1', itemName: '病假(妊娠未滿3個月)', mergeCount: true },
      { id: 404, itemCode: 'SO002-1', itemName: '病假(妊娠未滿2個月)', mergeCount: true },
    ],
  },
  {
    id: 5,
    sort: 5,
    categoryName: '婚假',
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39',
    items: [
      { id: 501, itemCode: 'SO002-1', itemName: '婚假', mergeCount: true },
      { id: 502, itemCode: 'SO002-1', itemName: '婚假展延', mergeCount: true },
      { id: 503, itemCode: 'SO002-1', itemName: '婚假1', mergeCount: true },
    ],
  },
  {
    id: 6,
    sort: 6,
    categoryName: '產假',
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39',
    items: [
      { id: 601, itemCode: 'SO002-1', itemName: '八週產假', mergeCount: true },
      { id: 602, itemCode: 'SO002-1', itemName: '四週產假', mergeCount: true },
      { id: 603, itemCode: 'SO002-1', itemName: '八週產假(未滿半年)', mergeCount: true },
      { id: 604, itemCode: 'SO002-1', itemName: '四週產假(未滿半年)', mergeCount: true },
    ],
  },
  {
    id: 7,
    sort: 7,
    categoryName: '陪產(檢)假',
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39',
    items: [
      { id: 701, itemCode: 'SO002-1', itemName: '陪產(檢)假', mergeCount: true },
    ],
  },
  {
    id: 8,
    sort: 8,
    categoryName: '喪假',
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39',
    items: [
      { id: 801, itemCode: 'SO002-1', itemName: '八日喪假', mergeCount: true },
      { id: 802, itemCode: 'SO002-1', itemName: '六日喪假', mergeCount: true },
    ],
  },
];

// 7. 郵件管理 - 郵件模板
export const initialMailTemplateData: MailTemplateRecord[] = [
  {
    id: 1,
    code: 'TMP001',
    name: '每日出勤報表-NVD-日班',
    reportName: '每日出勤報表',
    bu: 'NVD',
    shift: '日班',
    subject: '新竹光復北NVD日班員工每日出勤狀況彙總表 ${ReportDate}',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 2,
    code: 'TMP002',
    name: '每日出勤報表-NVD-夜班',
    reportName: '每日出勤報表',
    bu: 'NVD',
    shift: '夜班',
    subject: '新竹光復北NVD夜班員工每日出勤狀況彙總表 ${ReportDate}',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 3,
    code: 'TMP003',
    name: '每日出勤報表-NVD-製造-日班',
    reportName: '每日出勤報表-製造',
    bu: 'NVD',
    shift: '日班',
    subject: '新竹光復北NVD日班製造每日出勤狀況彙總表 ${ReportDate}',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 4,
    code: 'TMP004',
    name: '每日出勤報表-NVD-製造-夜班',
    reportName: '每日出勤報表-製造',
    bu: 'NVD',
    shift: '夜班',
    subject: '新竹光復北NVD夜班製造每日出勤狀況彙總表 ${ReportDate}',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 5,
    code: 'TMP005',
    name: '每日出勤報表-NVD-學生-日班',
    reportName: '每日出勤報表-學生',
    bu: 'NVD',
    shift: '日班',
    subject: '新竹光復北NVD日班學生每日出勤狀況彙總表 ${ReportDate}',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 6,
    code: 'TMP006',
    name: '每日出勤報表-NVD-學生-夜班',
    reportName: '每日出勤報表-學生',
    bu: 'NVD',
    shift: '夜班',
    subject: '新竹光復北NVD夜班學生每日出勤狀況彙總表 ${ReportDate}',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  }
];

// 郵件管理 - 收件人群組
export const initialMailRecipientGroupData: MailRecipientGroupRecord[] = [
  {
    id: 1,
    code: 'GRP001',
    groupName: 'NVD主管群',
    description: 'NVD廠區各部門主管',
    toCount: 20,
    ccCount: 20,
    bccCount: 20,
    totalCount: 60,
    toRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    ccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    bccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 2,
    code: 'GRP002',
    groupName: '製造主管群',
    description: '製造處各課幹部與生管',
    toCount: 15,
    ccCount: 15,
    bccCount: 15,
    totalCount: 45,
    toRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    ccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    bccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 3,
    code: 'GRP003',
    groupName: '人資群',
    description: 'HR處考勤與招募小組',
    toCount: 10,
    ccCount: 10,
    bccCount: 10,
    totalCount: 30,
    toRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    ccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    bccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 4,
    code: 'GRP004',
    groupName: '測試人員',
    description: '報表自動化系統測試團隊',
    toCount: 5,
    ccCount: 5,
    bccCount: 5,
    totalCount: 15,
    toRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    ccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    bccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  }
];

// 郵件管理 - 郵件寄送設定
export const initialMailSendSettingData: MailSendSettingRecord[] = [
  {
    id: 1,
    mailName: 'NVD日班出勤報表-8點',
    templateCode: 'TMP001',
    templateName: '每日出勤報表-NVD-日班',
    groupCode: 'GRP001',
    groupName: 'NVD主管群',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 2,
    mailName: 'NVD日班出勤報表-20點',
    templateCode: 'TMP002',
    templateName: '每日出勤報表-NVD-夜班',
    groupCode: 'GRP002',
    groupName: 'NVD主管群',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 3,
    mailName: 'NVD製造日班出勤報表-8點',
    templateCode: 'TMP003',
    templateName: '每日出勤報表-NVD-製造-日班',
    groupCode: 'GRP003',
    groupName: '人資群',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  },
  {
    id: 4,
    mailName: 'NVD製造夜班出勤報表-20點',
    templateCode: 'TMP004',
    templateName: '每日出勤報表-NVD-製造-夜班',
    groupCode: 'GRP004',
    groupName: '測試人員',
    status: true,
    maintainer: 'IG123156/張三',
    maintainTime: '2026-08-03 11:22:39'
  }
];
