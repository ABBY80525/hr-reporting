export type EmploymentStatus = '在職' | '離職' | '留停';
export type WorkdayStatus = '是' | '否';
export type ShiftPeriod = '日班' | '中班' | '夜班';

export interface AttendanceRecord {
  id: number;
  deptCode: string; // 部門代碼
  deptName: string; // 部門名稱
  empId: string;    // 工號
  name: string;     // 姓名
  status: EmploymentStatus; // 在職狀態
  identityCode: string; // 身份代碼
  identityType: string; // 身分別
  reportCategory: string; // 報表分類
  clockTime: string;  // 打卡時間
  attendanceDate: string; // 出勤日
  isWorkday: WorkdayStatus; // 是否工作日
  shiftCode: string;  // 班別代碼
  shiftName: string;  // 班別
  shiftPeriod: ShiftPeriod; // 班段 (日班, 中班, 夜班)
  manufacturingFloor: string; // 製造樓層
  shiftSchedule: string; // 班型 (e.g. 一二三四五六)
  school?: string;    // 學校
  department?: string; // 科系
  hireDate: string;   // 到職日期
  resignDate: string; // 離職日期
  leaveDate: string;  // 留停日期
}

export type MenuCategory = 'DASHBOARD' | '基礎配置' | '出勤報表' | '系統管理';

export type SubMenuItem =
  | 'DASHBOARD'
  // 基礎配置
  | '組織配置'
  | '班型管理'
  | '樓層管理'
  | '學歷管理'
  | '報表分類'
  | '假別管理'
  | '郵件管理'
  // 出勤報表
  | '在職員工明細'
  | '每日出勤報表'
  | '每日出勤報表-製造'
  | '每日出勤報表-學生'
  // 系統管理
  | '功能清單'
  | '用戶管理'
  | '角色配置'
  | '人員角色'
  | '系統配置';

export interface AttendanceFilter {
  keyword: string;
  deptCode: string;
  status: string;
  shiftPeriod: string;
  reportCategory: string;
  manufacturingFloor: string;
  date: string;
}

export interface AttendanceStats {
  totalEmployees: number;
  scheduledPresent: number;
  actualPresent: number;
  onLeave: number;
  lateOrEarly: number;
  absent: number;
  attendanceRate: number;
  dayShiftCount: number;
  middleShiftCount: number;
  nightShiftCount: number;
}
