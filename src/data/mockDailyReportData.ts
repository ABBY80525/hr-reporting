export interface CategoryCounts {
  indirectRegular: number;
  directRegular: number;
  foreignWorker: number;
  internStudent: number;
  dispatchWorker: number;
  total: number;
}

export interface AttendanceRateCounts {
  indirectRegular: string;
  directRegular: string;
  foreignWorker: string;
  internStudent: string;
  dispatchWorker: string;
  total: string;
}

export interface ExtraPresentCounts {
  indirectRegular: number | string;
  directRegular: number | string;
  foreignWorker: number | string;
  internStudent: number | string;
  dispatchWorker: number | string;
  total: number | string;
}

export interface MfgReportRow {
  id: number;
  category: 'ONLINE' | 'OFFLINE'; // 分類
  floorName: string;               // 樓層名稱
  yesterdayOnDuty: number;        // 昨日在職
  
  // 昨日異動
  yesterdayResigned: number;
  yesterdayNewHired: number;
  yesterdayOnLeave: number;

  // 今日在職
  todayOnDuty: CategoryCounts;

  // 應到人數
  expectedPresent: CategoryCounts;

  // 實到人數
  actualPresent: CategoryCounts;

  // 額外出勤
  extraPresent: ExtraPresentCounts;

  // 出勤率
  attendanceRate: AttendanceRateCounts;

  // 缺勤
  absentTruancy: number | string;

  // 缺勤分佈
  leaveUnapproved: number | string;
  leaveApproved: number | string;

  // 出差
  domesticTrip: number | string;
  overseasTrip: number | string;
  outApplication: number | string;
}

export interface StudentReportRow {
  id: number;
  schoolName: string;    // 學校
  deptName: string;      // 科系
  shiftName: string;     // 班型名稱
  yesterdayOnDuty: number;
  yesterdayResigned: number;
  yesterdayNewHired: number;
  yesterdayOnLeave: number;
  todayTotal: number;
  expectedTotal: number;
  actualTotal: number;
  extraTotal: number | string;
  attendanceRate: string;
  absentTruancy: number | string;
  leaveUnapproved: number | string;
  leaveApproved: number | string;
}

export const mockMfgReportRows: MfgReportRow[] = [
  // ONLINE group
  {
    id: 1, category: 'ONLINE', floorName: '1-1 Google線長', yesterdayOnDuty: 30, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-', leaveUnapproved: 10, leaveApproved: 2, domesticTrip: 2, overseasTrip: 2, outApplication: 2,
  },
  {
    id: 2, category: 'ONLINE', floorName: '1-2 ASSY線長', yesterdayOnDuty: 1231, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-', leaveUnapproved: 1, leaveApproved: 1, domesticTrip: 1, overseasTrip: 1, outApplication: 1,
  },
  {
    id: 3, category: 'ONLINE', floorName: '1-2 PF線長', yesterdayOnDuty: 155, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-', leaveUnapproved: 2, leaveApproved: 2, domesticTrip: 2, overseasTrip: 2, outApplication: 2,
  },
  {
    id: 4, category: 'ONLINE', floorName: '1-2 X-RAY線長', yesterdayOnDuty: 1616, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 2, leaveUnapproved: 1, leaveApproved: 1, domesticTrip: 1, overseasTrip: 1, outApplication: 1,
  },
  {
    id: 5, category: 'ONLINE', floorName: '1-2重工', yesterdayOnDuty: 30, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-', leaveUnapproved: 2, leaveApproved: 2, domesticTrip: 2, overseasTrip: 2, outApplication: 2,
  },
  {
    id: 6, category: 'ONLINE', floorName: 'PCB_OPEN', yesterdayOnDuty: 1231, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 3, leaveUnapproved: 2, leaveApproved: 2, domesticTrip: 2, overseasTrip: 2, outApplication: 2,
  },
  {
    id: 7, category: 'ONLINE', floorName: '1-2 ASSY線長', yesterdayOnDuty: 155, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-', leaveUnapproved: 1, leaveApproved: 1, domesticTrip: 1, overseasTrip: 1, outApplication: 1,
  },
  {
    id: 8, category: 'ONLINE', floorName: '1-1 Google線長', yesterdayOnDuty: 1616, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: 1, foreignWorker: 1, internStudent: 1, dispatchWorker: '-', total: 3 },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-', leaveUnapproved: 1, leaveApproved: 1, domesticTrip: 1, overseasTrip: 1, outApplication: 1,
  },

  // OFFLINE group
  {
    id: 9, category: 'OFFLINE', floorName: '1-2 X-RAY線長', yesterdayOnDuty: 30, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 2, leaveUnapproved: 2, leaveApproved: 2, domesticTrip: 2, overseasTrip: 2, outApplication: 2,
  },
  {
    id: 10, category: 'OFFLINE', floorName: '1-2重工', yesterdayOnDuty: 1231, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-', leaveUnapproved: 1, leaveApproved: 1, domesticTrip: 1, overseasTrip: 1, outApplication: 1,
  },
  {
    id: 11, category: 'OFFLINE', floorName: 'PCB_OPEN', yesterdayOnDuty: 155, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: 2, foreignWorker: 1, internStudent: 2, dispatchWorker: '-', total: 5 },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 4, leaveUnapproved: '-', leaveApproved: '-', domesticTrip: '-', overseasTrip: '-', outApplication: '-',
  },
  {
    id: 12, category: 'OFFLINE', floorName: '1-2 PF線長', yesterdayOnDuty: 1616, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 2, leaveUnapproved: 2, leaveApproved: 2, domesticTrip: 2, overseasTrip: 2, outApplication: 2,
  },
  {
    id: 13, category: 'OFFLINE', floorName: '1-2 X-RAY線長', yesterdayOnDuty: 30, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 1, leaveUnapproved: 1, leaveApproved: 1, domesticTrip: 1, overseasTrip: 1, outApplication: 1,
  },
];

export const mockStudentReportRows: StudentReportRow[] = [
  // 勤益科大
  { id: 1, schoolName: '勤益科大', deptName: '電子工程系', shiftName: '一二三四日', yesterdayOnDuty: 30, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108, todayTotal: 251, expectedTotal: 251, actualTotal: 251, extraTotal: '-', attendanceRate: '26%', absentTruancy: '-', leaveUnapproved: 2, leaveApproved: 2 },
  { id: 2, schoolName: '勤益科大', deptName: '電子工程系', shiftName: '一二三四', yesterdayOnDuty: 1231, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108, todayTotal: 158, expectedTotal: 158, actualTotal: 158, extraTotal: '-', attendanceRate: '26%', absentTruancy: '-', leaveUnapproved: 1, leaveApproved: 1 },
  { id: 3, schoolName: '勤益科大', deptName: '資訊工程系', shiftName: '一二三四日', yesterdayOnDuty: 155, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113, todayTotal: 158, expectedTotal: 158, actualTotal: 158, extraTotal: '-', attendanceRate: '26%', absentTruancy: '-', leaveUnapproved: 2, leaveApproved: 2 },
  { id: 4, schoolName: '勤益科大', deptName: '電子系', shiftName: '一二三四五', yesterdayOnDuty: 1616, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113, todayTotal: 251, expectedTotal: 251, actualTotal: 251, extraTotal: '-', attendanceRate: '26%', absentTruancy: 2, leaveUnapproved: 1, leaveApproved: 1 },
  { id: 5, schoolName: '勤益科大', deptName: '人工智慧應用工程系', shiftName: '一二三四五', yesterdayOnDuty: 30, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108, todayTotal: 158, expectedTotal: 158, actualTotal: 158, extraTotal: '-', attendanceRate: '26%', absentTruancy: 3, leaveUnapproved: 2, leaveApproved: 2 },

  // 育達科大
  { id: 6, schoolName: '育達科大', deptName: '物聯網工程與應用系', shiftName: '一二三四五', yesterdayOnDuty: 1231, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113, todayTotal: 251, expectedTotal: 251, actualTotal: 251, extraTotal: '-', attendanceRate: '26%', absentTruancy: '-', leaveUnapproved: 1, leaveApproved: 1 },
  { id: 7, schoolName: '育達科大', deptName: '智慧機電工程與應用系', shiftName: '一二三四五', yesterdayOnDuty: 155, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113, todayTotal: 251, expectedTotal: 251, actualTotal: 251, extraTotal: '-', attendanceRate: '26%', absentTruancy: 2, leaveUnapproved: 2, leaveApproved: 2 },

  // 中華大學
  { id: 8, schoolName: '中華大學', deptName: '工業工程與管理系', shiftName: '一二三四五', yesterdayOnDuty: 1616, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108, todayTotal: 158, expectedTotal: 158, actualTotal: 158, extraTotal: 3, attendanceRate: '26%', absentTruancy: '-', leaveUnapproved: 1, leaveApproved: 1 },
  { id: 9, schoolName: '中華大學', deptName: '電子工程系', shiftName: '二三四五六', yesterdayOnDuty: 30, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108, todayTotal: 158, expectedTotal: 158, actualTotal: 158, extraTotal: '-', attendanceRate: '26%', absentTruancy: 2, leaveUnapproved: 2, leaveApproved: 2 },
  { id: 10, schoolName: '中華大學', deptName: '電子工程系', shiftName: '六日', yesterdayOnDuty: 1231, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113, todayTotal: 158, expectedTotal: 158, actualTotal: 158, extraTotal: '-', attendanceRate: '26%', absentTruancy: 4, leaveUnapproved: 1, leaveApproved: 1 },
  { id: 11, schoolName: '中華大學', deptName: '電子工程系', shiftName: '三四五六', yesterdayOnDuty: 155, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108, todayTotal: 158, expectedTotal: 158, actualTotal: 158, extraTotal: 5, attendanceRate: '26%', absentTruancy: '-', leaveUnapproved: '-', leaveApproved: '-' },
  { id: 12, schoolName: '中華大學', deptName: '電子工程系', shiftName: '三四五六日', yesterdayOnDuty: 1616, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113, todayTotal: 251, expectedTotal: 251, actualTotal: 251, extraTotal: '-', attendanceRate: '26%', absentTruancy: 2, leaveUnapproved: 2, leaveApproved: 2 },
  { id: 13, schoolName: '中華大學', deptName: '電子工程系', shiftName: '一二三六日', yesterdayOnDuty: 30, yesterdayResigned: 108, yesterdayNewHired: 108, yesterdayOnLeave: 108, todayTotal: 158, expectedTotal: 158, actualTotal: 158, extraTotal: 5, attendanceRate: '26%', absentTruancy: 1, leaveUnapproved: 1, leaveApproved: 1 },
  { id: 14, schoolName: '中華大學', deptName: '電子工程系', shiftName: '一二三四五', yesterdayOnDuty: 155, yesterdayResigned: 113, yesterdayNewHired: 113, yesterdayOnLeave: 113, todayTotal: 251, expectedTotal: 251, actualTotal: 251, extraTotal: '-', attendanceRate: '26%', absentTruancy: 1, leaveUnapproved: 1, leaveApproved: 1 },
];

export interface DailyReportRow {
  id: number;
  factoryDept: string;      // 廠部
  deptName: string;         // 部門名稱
  yesterdayOnDuty: number;  // 昨日在職
  
  // 昨日異動
  yesterdayResigned: number; // 離職
  yesterdayNewHired: number; // 新進
  yesterdayOnLeave: number;  // 留停

  // 今日在職
  todayOnDuty: CategoryCounts;

  // 應到人數
  expectedPresent: CategoryCounts;

  // 實到人數
  actualPresent: CategoryCounts;

  // 額外出勤
  extraPresent: ExtraPresentCounts;

  // 出勤率
  attendanceRate: AttendanceRateCounts;

  // 缺勤
  absentTruancy: number | string; // 曠職

  // 缺勤分佈
  leaveUnapproved: number | string; // 請假(未簽核完成)
  leaveApproved: number | string;   // 請假(已簽核完成)

  // 出差
  domesticTrip: number | string;   // 國內出差
  overseasTrip: number | string;   // 國外出差
  outApplication: number | string; // 外出申請
}

export const mockDailyReportRows: DailyReportRow[] = [
  {
    id: 1,
    factoryDept: 'NVD生產規劃部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 30,
    yesterdayResigned: 108,
    yesterdayNewHired: 108,
    yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: '-',
    leaveApproved: 2,
    domesticTrip: 2,
    overseasTrip: 2,
    outApplication: 2,
  },
  {
    id: 2,
    factoryDept: 'NVD品質管理部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 1231,
    yesterdayResigned: 108,
    yesterdayNewHired: 108,
    yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: '-',
    leaveApproved: 1,
    domesticTrip: 1,
    overseasTrip: 1,
    outApplication: 1,
  },
  {
    id: 3,
    factoryDept: 'NVD品質管理部',
    deptName: 'NVD備品中心課',
    yesterdayOnDuty: 155,
    yesterdayResigned: 113,
    yesterdayNewHired: 113,
    yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: 1,
    leaveApproved: 2,
    domesticTrip: 2,
    overseasTrip: 2,
    outApplication: 2,
  },
  {
    id: 4,
    factoryDept: 'NVD生產規劃部',
    deptName: 'NVD備品中心課',
    yesterdayOnDuty: 1616,
    yesterdayResigned: 113,
    yesterdayNewHired: 113,
    yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 2,
    leaveUnapproved: 2,
    leaveApproved: 1,
    domesticTrip: 1,
    overseasTrip: 1,
    outApplication: 1,
  },
  {
    id: 5,
    factoryDept: 'NVD生產規劃部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 30,
    yesterdayResigned: 108,
    yesterdayNewHired: 108,
    yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: 3,
    leaveApproved: 2,
    domesticTrip: 2,
    overseasTrip: 2,
    outApplication: 2,
  },
  {
    id: 6,
    factoryDept: 'NVD品質管理部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 1231,
    yesterdayResigned: 113,
    yesterdayNewHired: 113,
    yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: '-',
    leaveApproved: 1,
    domesticTrip: 1,
    overseasTrip: 1,
    outApplication: 1,
  },
  {
    id: 7,
    factoryDept: 'NVD品質管理部',
    deptName: 'NVD備品中心課',
    yesterdayOnDuty: 155,
    yesterdayResigned: 113,
    yesterdayNewHired: 113,
    yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 3,
    leaveUnapproved: 2,
    leaveApproved: 2,
    domesticTrip: 2,
    overseasTrip: 2,
    outApplication: 2,
  },
  {
    id: 8,
    factoryDept: 'NVD生產規劃部',
    deptName: 'NVD備品中心課',
    yesterdayOnDuty: 1616,
    yesterdayResigned: 108,
    yesterdayNewHired: 108,
    yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: 1, foreignWorker: 1, internStudent: 1, dispatchWorker: '-', total: 3 },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: '-',
    leaveApproved: 1,
    domesticTrip: 1,
    overseasTrip: 1,
    outApplication: 1,
  },
  {
    id: 9,
    factoryDept: 'NVD生產規劃部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 30,
    yesterdayResigned: 108,
    yesterdayNewHired: 108,
    yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: 2,
    leaveApproved: 2,
    domesticTrip: 2,
    overseasTrip: 2,
    outApplication: 2,
  },
  {
    id: 10,
    factoryDept: 'NVD品質管理部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 1231,
    yesterdayResigned: 113,
    yesterdayNewHired: 113,
    yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 4,
    leaveUnapproved: '-',
    leaveApproved: 1,
    domesticTrip: 1,
    overseasTrip: 1,
    outApplication: 1,
  },
  {
    id: 11,
    factoryDept: 'NVD品質管理部',
    deptName: 'NVD備品中心課',
    yesterdayOnDuty: 155,
    yesterdayResigned: 108,
    yesterdayNewHired: 108,
    yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: 2, foreignWorker: 1, internStudent: 2, dispatchWorker: '-', total: 5 },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: '-',
    leaveApproved: '-',
    domesticTrip: '-',
    overseasTrip: '-',
    outApplication: '-',
  },
  {
    id: 12,
    factoryDept: 'NVD生產規劃部',
    deptName: 'NVD備品中心課',
    yesterdayOnDuty: 1616,
    yesterdayResigned: 113,
    yesterdayNewHired: 113,
    yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: 2,
    leaveApproved: 2,
    domesticTrip: 2,
    overseasTrip: 2,
    outApplication: 2,
  },
  {
    id: 13,
    factoryDept: 'NVD生產規劃部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 30,
    yesterdayResigned: 108,
    yesterdayNewHired: 108,
    yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: 5,
    leaveUnapproved: 1,
    leaveApproved: 1,
    domesticTrip: 1,
    overseasTrip: 1,
    outApplication: 1,
  },
  {
    id: 14,
    factoryDept: 'NVD品質管理部',
    deptName: 'NVD備品中心課',
    yesterdayOnDuty: 155,
    yesterdayResigned: 113,
    yesterdayNewHired: 113,
    yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 251 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: 1,
    leaveApproved: 1,
    domesticTrip: 1,
    overseasTrip: 1,
    outApplication: 1,
  },
  {
    id: 15,
    factoryDept: 'NVD生產規劃部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 155,
    yesterdayResigned: 108,
    yesterdayNewHired: 108,
    yesterdayOnLeave: 108,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: 2,
    leaveApproved: 2,
    domesticTrip: 2,
    overseasTrip: 2,
    outApplication: 2,
  },
  {
    id: 16,
    factoryDept: 'NVD品質管理部',
    deptName: 'NVD製程品質管理課',
    yesterdayOnDuty: 155,
    yesterdayResigned: 113,
    yesterdayNewHired: 113,
    yesterdayOnLeave: 113,
    todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 158 },
    extraPresent: { indirectRegular: '-', directRegular: '-', foreignWorker: '-', internStudent: '-', dispatchWorker: '-', total: '-' },
    attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
    absentTruancy: '-',
    leaveUnapproved: 2,
    leaveApproved: 2,
    domesticTrip: 2,
    overseasTrip: 2,
    outApplication: 2,
  },
];
