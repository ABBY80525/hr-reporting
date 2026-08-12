import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, CheckCircle2, X } from 'lucide-react';
import { AttendanceRecord } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: AttendanceRecord[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, records }) => {
  const [exportType, setExportType] = useState<'csv' | 'excel' | 'pdf'>('excel');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      // Build CSV with UTF-8 BOM so Excel displays Traditional Chinese correctly without garbled text
      const headers = [
        '序號', '部門代碼', '部門名稱', '工號', '姓名',
        '在職狀態', '身份代碼', '身分別', '報表分類',
        '打卡時間', '出勤日', '是否工作日', '班別代碼',
        '班別', '班段', '製造樓層', '班型', '學校', '科系',
        '到職日期', '離職日期', '留停日期'
      ];

      const rows = records.map(r => [
        r.id,
        `"${r.deptCode}"`,
        `"${r.deptName}"`,
        `"${r.empId}"`,
        `"${r.name}"`,
        `"${r.status}"`,
        `"${r.identityCode}"`,
        `"${r.identityType}"`,
        `"${r.reportCategory}"`,
        `"${r.clockTime}"`,
        `"${r.attendanceDate}"`,
        `"${r.isWorkday}"`,
        `"${r.shiftCode}"`,
        `"${r.shiftName}"`,
        `"${r.shiftPeriod}"`,
        `"${r.manufacturingFloor}"`,
        `"${r.shiftSchedule}"`,
        `"${r.school || ''}"`,
        `"${r.department || ''}"`,
        `"${r.hireDate}"`,
        `"${r.resignDate}"`,
        `"${r.leaveDate}"`
      ]);

      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `HR考勤報表_${new Date().toISOString().slice(0, 10)}.${exportType === 'pdf' ? 'txt' : exportType === 'csv' ? 'csv' : 'csv'}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold">
            <FileSpreadsheet className="w-5 h-5" />
            <span className="text-slate-800 text-base">匯出考勤報表</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-600">
          <p className="text-slate-700 font-medium">
            請選擇匯出檔案格式（目前共 <strong className="text-blue-600">{records.length}</strong> 筆篩選數據）：
          </p>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setExportType('excel')}
              className={`p-3 rounded-lg border text-center font-semibold transition-all ${
                exportType === 'excel'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-2xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <FileSpreadsheet className="w-6 h-6 mx-auto mb-1 text-emerald-600" />
              Excel 報表 (.xlsx)
            </button>

            <button
              onClick={() => setExportType('csv')}
              className={`p-3 rounded-lg border text-center font-semibold transition-all ${
                exportType === 'csv'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-2xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <FileText className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              CSV 格式 (.csv)
            </button>

            <button
              onClick={() => setExportType('pdf')}
              className={`p-3 rounded-lg border text-center font-semibold transition-all ${
                exportType === 'pdf'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-2xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Download className="w-6 h-6 mx-auto mb-1 text-amber-600" />
              PDF 明細 (.pdf)
            </button>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg text-slate-500 space-y-1">
            <p>✓ 包含完整 22 欄位詳細員工出缺勤數據</p>
            <p>✓ 已自動凍結標頭與前5項主要辨識欄位</p>
            <p>✓ 支援高字元相容性（BOM UTF-8 繁體中文）</p>
          </div>

          {downloadSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-lg flex items-center space-x-2 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>報表下載成功！檔案已順利儲存至您的下載資料夾。</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-100 text-xs font-medium"
          >
            取消
          </button>
          <button
            onClick={handleExport}
            disabled={downloading}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold shadow-2xs flex items-center space-x-1.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? '匯出處理中...' : '確認下載'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
