import React from 'react';
import { SubMenuItem } from '../types';
import { OrgConfigView } from './config/OrgConfigView';
import { ShiftTypeView } from './config/ShiftTypeView';
import { FloorView } from './config/FloorView';
import { EducationView } from './config/EducationView';
import { ReportCategoryView } from './config/ReportCategoryView';
import { LeaveManagementView } from './config/LeaveManagementView';
import { MailManagementView } from './config/MailManagementView';
import { Sliders } from 'lucide-react';

interface ConfigManagementViewProps {
  title: SubMenuItem;
}

export const ConfigManagementView: React.FC<ConfigManagementViewProps> = ({ title }) => {
  switch (title) {
    case '組織配置':
      return <OrgConfigView />;
    case '班型管理':
      return <ShiftTypeView />;
    case '樓層管理':
      return <FloorView />;
    case '學歷管理':
      return <EducationView />;
    case '報表分類':
      return <ReportCategoryView />;
    case '假別管理':
      return <LeaveManagementView />;
    case '郵件管理':
      return <MailManagementView />;
    default:
      return (
        <div className="flex-1 min-h-0 p-5 space-y-4 flex flex-col justify-center items-center text-slate-500">
          <Sliders className="w-10 h-10 text-blue-500 mb-2" />
          <h3 className="text-base font-bold text-slate-800">{title} 配置模組</h3>
          <p className="text-xs text-slate-400">目前模組運行正常，各項數據即時同步中。</p>
        </div>
      );
  }
};
