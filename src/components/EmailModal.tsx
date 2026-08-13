import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, X } from 'lucide-react';
import { AttendanceRecord } from '../types';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: AttendanceRecord[];
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, records }) => {
  const [recipient, setRecipient] = useState('manager.cesbg@foxconn.com');
  const [subject, setSubject] = useState(`【HR每日考勤系統自動發送】${new Date().toISOString().slice(0, 10)} 每日出勤分析報表`);
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSendEmail = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-slate-100 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold">
            <Mail className="w-5 h-5" />
            <span className="text-slate-800 text-base">自動發送考勤郵件</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-600">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">收件者 Email：</label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              placeholder="請輸入收件者電子郵件"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">郵件主旨：</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">郵件內文預覽：</label>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-600 font-mono text-[11px] leading-relaxed max-h-36 overflow-y-auto">
              尊敬的主管 您好：<br /><br />
              隨信附上本日 ({new Date().toISOString().slice(0, 10)}) 全廠區員工出缺勤明細與重點分析：<br />
              - 名冊總人數：{records.length} 人<br />
              - 實際出勤率：{((records.filter(r => r.status === '在職').length / Math.max(1, records.length)) * 100).toFixed(1)}%<br />
              - 附件包含 22 項詳細欄位，格式為 .xlsx 報表檔。<br /><br />
              HR REPORTING AUTOMATION (ABBY)
            </div>
          </div>

          {sentSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-lg flex items-center space-x-2 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>考勤分析報表郵件已成功寄送至 {recipient}！</span>
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
            onClick={handleSendEmail}
            disabled={sending}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold shadow-2xs flex items-center space-x-1.5 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{sending ? '發送中...' : '確認發送'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
