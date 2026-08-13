import React from 'react';
import { SubMenuItem } from '../types';
import { Settings, Shield, UserCheck, Key, ListFilter } from 'lucide-react';

interface SystemManagementViewProps {
  title: SubMenuItem;
}

export const SystemManagementView: React.FC<SystemManagementViewProps> = ({ title }) => {
  return (
    <div className="rounded-xl border border-slate-200/80 p-5 space-y-5 animate-fade-in">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600" />
          系統管理 — {title}
        </h2>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
          系統最高管理權限
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold">
            <Shield className="w-4 h-4" />
            <span>權限管控機制</span>
          </div>
          <p className="text-slate-500">
            目前「{title}」運作正常。支援依部門（NVD製造1課/SMT/品保QC）劃分角色，防止非授權人員存取敏感考勤資訊。
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold">
            <UserCheck className="w-4 h-4" />
            <span>SSO 單一登入與稽核</span>
          </div>
          <p className="text-slate-500">
            已整合 ABBY 企業級 SSO 身份驗證機制。登入使用者：王大明 (HR Admin)，所有導出與發送郵件行為皆留存 Operation Log。
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          <div className="flex items-center space-x-2 text-blue-600 font-bold">
            <Key className="w-4 h-4" />
            <span>系統金鑰與自動化排程</span>
          </div>
          <p className="text-slate-500">
            包含 Gemini AI 每日考勤報告自動生成 API 串接與每日 08:30打卡超時自動催簽稽核作業。
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
        <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-1.5">
          <ListFilter className="w-4 h-4 text-slate-500" />
          {title} 權限與配置清單
        </h3>
        <div className="space-y-2">
          {[
            { name: 'HR 考勤超級管理員 (HR_SUPER_ADMIN)', user: '王大明', dept: 'ABBY', scope: '全廠讀寫/導出/郵件觸發' },
            { name: '製造課別權限 (MFG_LESSON_LEADER)', user: '陳課長', dept: 'NVD生產製造1課', scope: '課內員工人事與打卡瀏覽' },
            { name: '品保QC組長 (QC_LEADER)', user: '許組長', dept: '品保QC檢驗課', scope: '單位缺勤明細與即時審核' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-3 rounded-md border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">{item.name}</span>
                <span className="text-slate-400 ml-2">({item.user} - {item.dept})</span>
              </div>
              <span className="bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded-xs">
                {item.scope}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
