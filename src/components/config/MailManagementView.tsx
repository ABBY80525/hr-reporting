import React, { useState } from 'react';
import { 
  initialMailTemplateData, 
  initialMailRecipientGroupData, 
  initialMailSendSettingData,
  MailTemplateRecord,
  MailRecipientGroupRecord,
  MailSendSettingRecord 
} from '../../data/mockConfigData';
import { 
  Search, Plus, Edit2, Copy, Trash2, X, ChevronDown, 
  Undo2, Redo2, Bold, Italic, Underline, Strikethrough, 
  Baseline, Highlighter, AlignLeft, List, ListOrdered, 
  Indent, Outdent 
} from 'lucide-react';

type MailSubTab = '郵件模板' | '收件人群組' | '郵件寄送設定';

const defaultMailContent = `各位主管 好

提供 新竹光復北NVD日班員工每日出勤狀況彙總表
（資料截至當日上午08:00止之刷卡出勤紀錄）
請查閱，謝謝！

員工出勤明細連結：\${ReportLink}

※相關欄位資料來源與計算規則如下：
1-廠部: 104 EHRM人事系統組織資料
2-在職人數: 於104 EHRM人事系統中，人事基本資料該員工狀態為在職之人數統計
3-應到: 104 EHRM人事系統中，依照該班別排班規劃，需到廠工作之員工人數統計
4-實到: 於新竹光復北刷臉系統中，實際刷臉考勤明細之資料統計得之
5-出勤率: (實到人數 ÷ 應到人數) x 100%

※特殊出勤（例：國內外出差、外出申請）顯示於報表最後方。
※特殊出勤、額外出勤均不列入出勤率計算。
※當日新進、復職人員尚未計入人力計算。
※因資料來自104人事系統，臨時請假、調班未完成流程、離職未完成流程之人數，均影響與實際人力落差。`;

// Mock candidate list for recipient auto-complete
const CANDIDATE_RECIPIENTS = [
  { id: 'IG1234', name: '吳曉明', email: 'EXAMPLE@gmail.com' },
  { id: 'IG1256', name: '張三', email: 'zhangsan@gmail.com' },
  { id: 'IG2122', name: '李四', email: 'lisi@gmail.com' },
  { id: 'IG3012', name: '王五', email: 'wangwu@gmail.com' },
  { id: 'IG4589', name: '陳小華', email: 'chen@gmail.com' },
  { id: 'IG9999', name: '吳曉華', email: 'wuhua@gmail.com' },
];

interface RecipientTagInputProps {
  label: string;
  required?: boolean;
  tags: string[];
  extraCount?: number;
  onTagsChange: (newTags: string[]) => void;
}

const RecipientTagInput: React.FC<RecipientTagInputProps> = ({
  label,
  required,
  tags,
  extraCount = 0,
  onTagsChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredCandidates = CANDIDATE_RECIPIENTS.filter((item) => {
    if (!inputValue.trim()) return false;
    const query = inputValue.toLowerCase().trim();
    return (
      item.id.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  });

  const handleSelectCandidate = (candidate: { id: string; name: string; email: string }) => {
    const tagDisplay = `${candidate.id} ${candidate.name}`;
    if (!tags.includes(tagDisplay)) {
      onTagsChange([...tags, tagDisplay]);
    }
    setInputValue('');
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (filteredCandidates.length > 0) {
        handleSelectCandidate(filteredCandidates[0]);
      } else {
        const newTag = inputValue.trim();
        if (!tags.includes(newTag)) {
          onTagsChange([...tags, newTag]);
        }
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="relative">
      <label className="block font-semibold text-slate-700 mb-1.5">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <div
        className={`w-full p-2 bg-white border rounded-xl flex flex-wrap items-center gap-2 min-h-[42px] transition-all ${
          isFocused ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'
        }`}
      >
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#e0edff] text-[#2563eb] border border-blue-100/50 shrink-0"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => {
                onTagsChange(tags.filter((_, i) => i !== idx));
              }}
              className="ml-1.5 hover:text-blue-800 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}

        {extraCount > 0 && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#e0edff] text-[#2563eb] shrink-0">
            +{extraCount}
          </span>
        )}

        {/* Typing input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? '輸入姓名、工號 (如: 吳曉, IG...)' : '輸入以搜尋...'}
          className="flex-1 min-w-[130px] border-0 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 bg-transparent py-1"
        />
      </div>

      {/* Autocomplete Dropdown */}
      {isFocused && inputValue.trim() !== '' && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-52 overflow-y-auto py-1 animate-fade-in divide-y divide-slate-100">
          {filteredCandidates.map((c) => (
            <button
              key={c.id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectCandidate(c);
              }}
              className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50/80 flex items-center justify-between transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[11px] group-hover:bg-blue-100">
                  {c.id}
                </span>
                <span className="font-semibold text-slate-800 group-hover:text-blue-700">{c.name}</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px] group-hover:text-slate-600">{c.email}</span>
            </button>
          ))}

          {filteredCandidates.length === 0 && (
            <div className="px-3.5 py-2.5 text-xs text-slate-500 italic flex items-center justify-between">
              <span>無匹配人員</span>
              <span className="text-[11px] text-blue-600 font-normal">按 Enter 可新增 "{inputValue}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const MailManagementView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MailSubTab>('郵件模板');

  // Datasets
  const [templateList, setTemplateList] = useState<MailTemplateRecord[]>(initialMailTemplateData);
  const [groupList, setGroupList] = useState<MailRecipientGroupRecord[]>(initialMailRecipientGroupData);
  const [sendSettingList, setSendSettingList] = useState<MailSendSettingRecord[]>(initialMailSendSettingData);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MailTemplateRecord | null>(null);

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<MailRecipientGroupRecord | null>(null);

  const [isSendSettingModalOpen, setIsSendSettingModalOpen] = useState(false);
  const [editingSendSetting, setEditingSendSetting] = useState<MailSendSettingRecord | null>(null);

  // Dropdown states for insert variable
  const [showSubjectVarDropdown, setShowSubjectVarDropdown] = useState(false);
  const [showContentVarDropdown, setShowContentVarDropdown] = useState(false);

  const [templateFormData, setTemplateFormData] = useState({
    code: 'TMP001',
    name: '每日出勤報表-NVD-日班',
    reportName: '每日出勤報表',
    bu: 'NVD',
    shift: '日班',
    subject: '新竹光復北NVD日班員工每日出勤狀況彙總表 ${ReportDate}',
    content: defaultMailContent,
    attachExcel: true,
    attachPdf: false,
    status: true,
    maintainer: 'IG123156/張三'
  });

  const [groupFormData, setGroupFormData] = useState({
    code: 'GRP001',
    groupName: 'NVD主管群',
    description: 'NVD廠區各部門主管',
    status: true,
    toRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    ccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    bccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
    toExtraCount: 4,
    ccExtraCount: 4,
    bccExtraCount: 4
  });

  const [sendSettingFormData, setSendSettingFormData] = useState({
    mailName: 'NVD日班出勤報表-8點',
    status: true,
    templateName: '每日出勤報表-NVD-日班',
    templateCode: 'TMP001',
    groupName: 'NVD主管群',
    groupCode: 'GRP001'
  });

  // Handle open Send Setting Modal
  const handleOpenSendSettingModal = (item?: MailSendSettingRecord) => {
    if (item) {
      setEditingSendSetting(item);
      setSendSettingFormData({
        mailName: item.mailName,
        status: item.status,
        templateName: item.templateName,
        templateCode: item.templateCode,
        groupName: item.groupName,
        groupCode: item.groupCode
      });
    } else {
      setEditingSendSetting(null);
      const defaultTemplate = templateList[0];
      const defaultGroup = groupList[0];
      setSendSettingFormData({
        mailName: 'NVD日班出勤報表-8點',
        status: true,
        templateName: defaultTemplate ? defaultTemplate.name : '每日出勤報表-NVD-日班',
        templateCode: defaultTemplate ? defaultTemplate.code : 'TMP001',
        groupName: defaultGroup ? defaultGroup.groupName : 'NVD主管群',
        groupCode: defaultGroup ? defaultGroup.code : 'GRP001'
      });
    }
    setIsSendSettingModalOpen(true);
  };

  // Save Send Setting
  const handleSaveSendSetting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendSettingFormData.mailName) return;

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (editingSendSetting) {
      setSendSettingList((prev) =>
        prev.map((item) =>
          item.id === editingSendSetting.id
            ? {
                ...item,
                mailName: sendSettingFormData.mailName,
                status: sendSettingFormData.status,
                templateName: sendSettingFormData.templateName,
                templateCode: sendSettingFormData.templateCode,
                groupName: sendSettingFormData.groupName,
                groupCode: sendSettingFormData.groupCode,
                maintainer: 'IG123156/張三',
                maintainTime: nowStr
              }
            : item
        )
      );
    } else {
      const newItem: MailSendSettingRecord = {
        id: Math.max(...sendSettingList.map((s) => s.id), 0) + 1,
        mailName: sendSettingFormData.mailName,
        status: sendSettingFormData.status,
        templateName: sendSettingFormData.templateName,
        templateCode: sendSettingFormData.templateCode,
        groupName: sendSettingFormData.groupName,
        groupCode: sendSettingFormData.groupCode,
        maintainer: 'IG123156/張三',
        maintainTime: nowStr
      };
      setSendSettingList((prev) => [...prev, newItem]);
    }
    setIsSendSettingModalOpen(false);
  };

  // Delete Send Setting
  const handleDeleteSendSetting = (id: number) => {
    setSendSettingList((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle open Group Modal
  const handleOpenGroupModal = (item?: MailRecipientGroupRecord) => {
    if (item) {
      setEditingGroup(item);
      setGroupFormData({
        code: item.code,
        groupName: item.groupName,
        description: item.description || '',
        status: item.status,
        toRecipients: item.toRecipients && item.toRecipients.length > 0 ? item.toRecipients : ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
        ccRecipients: item.ccRecipients && item.ccRecipients.length > 0 ? item.ccRecipients : ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
        bccRecipients: item.bccRecipients && item.bccRecipients.length > 0 ? item.bccRecipients : ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
        toExtraCount: Math.max(0, item.toCount - 3),
        ccExtraCount: Math.max(0, item.ccCount - 3),
        bccExtraCount: Math.max(0, item.bccCount - 3)
      });
    } else {
      setEditingGroup(null);
      const newCode = `GRP${(groupList.length + 1).toString().padStart(3, '0')}`;
      setGroupFormData({
        code: newCode,
        groupName: '',
        description: '',
        status: true,
        toRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
        ccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
        bccRecipients: ['IG1234 吳曉明', 'IG1256 張三', 'IG2122 李四'],
        toExtraCount: 4,
        ccExtraCount: 4,
        bccExtraCount: 4
      });
    }
    setIsGroupModalOpen(true);
  };

  // Save Group
  const handleSaveGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupFormData.code || !groupFormData.groupName) return;

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const toTotal = groupFormData.toRecipients.length + groupFormData.toExtraCount;
    const ccTotal = groupFormData.ccRecipients.length + groupFormData.ccExtraCount;
    const bccTotal = groupFormData.bccRecipients.length + groupFormData.bccExtraCount;

    if (editingGroup) {
      setGroupList((prev) =>
        prev.map((item) =>
          item.id === editingGroup.id
            ? {
                ...item,
                code: groupFormData.code,
                groupName: groupFormData.groupName,
                description: groupFormData.description,
                status: groupFormData.status,
                toRecipients: groupFormData.toRecipients,
                ccRecipients: groupFormData.ccRecipients,
                bccRecipients: groupFormData.bccRecipients,
                toCount: toTotal,
                ccCount: ccTotal,
                bccCount: bccTotal,
                totalCount: toTotal + ccTotal + bccTotal,
                maintainer: 'IG123156/張三',
                maintainTime: nowStr
              }
            : item
        )
      );
    } else {
      const newItem: MailRecipientGroupRecord = {
        id: Math.max(...groupList.map((g) => g.id), 0) + 1,
        code: groupFormData.code,
        groupName: groupFormData.groupName,
        description: groupFormData.description,
        status: groupFormData.status,
        toRecipients: groupFormData.toRecipients,
        ccRecipients: groupFormData.ccRecipients,
        bccRecipients: groupFormData.bccRecipients,
        toCount: toTotal,
        ccCount: ccTotal,
        bccCount: bccTotal,
        totalCount: toTotal + ccTotal + bccTotal,
        maintainer: 'IG123156/張三',
        maintainTime: nowStr
      };
      setGroupList((prev) => [...prev, newItem]);
    }
    setIsGroupModalOpen(false);
  };

  // Delete Group
  const handleDeleteGroup = (id: number) => {
    setGroupList((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle open template modal
  const handleOpenTemplateModal = (item?: MailTemplateRecord) => {
    if (item) {
      setEditingTemplate(item);
      setTemplateFormData({
        code: item.code,
        name: item.name,
        reportName: item.reportName,
        bu: item.bu,
        shift: item.shift,
        subject: item.subject,
        content: defaultMailContent,
        attachExcel: true,
        attachPdf: false,
        status: item.status,
        maintainer: item.maintainer
      });
    } else {
      setEditingTemplate(null);
      setTemplateFormData({
        code: 'TMP001',
        name: '每日出勤報表-NVD-日班',
        reportName: '每日出勤報表',
        bu: 'NVD',
        shift: '日班',
        subject: '新竹光復北NVD日班員工每日出勤狀況彙總表 ${ReportDate}',
        content: defaultMailContent,
        attachExcel: true,
        attachPdf: false,
        status: true,
        maintainer: 'IG123156/張三'
      });
    }
    setIsTemplateModalOpen(true);
  };

  // Duplicate / Copy Template
  const handleCopyTemplate = (item: MailTemplateRecord) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newRecord: MailTemplateRecord = {
      ...item,
      id: Math.max(...templateList.map((t) => t.id), 0) + 1,
      code: `TMP${(templateList.length + 1).toString().padStart(3, '0')}`,
      name: `${item.name}-副本`,
      maintainTime: nowStr
    };
    setTemplateList((prev) => [...prev, newRecord]);
  };

  // Save Template
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateFormData.code || !templateFormData.name) return;

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (editingTemplate) {
      setTemplateList((prev) =>
        prev.map((item) =>
          item.id === editingTemplate.id
            ? {
                ...item,
                ...templateFormData,
                maintainTime: nowStr
              }
            : item
        )
      );
    } else {
      const newItem: MailTemplateRecord = {
        id: Math.max(...templateList.map((t) => t.id), 0) + 1,
        ...templateFormData,
        maintainTime: nowStr
      };
      setTemplateList((prev) => [...prev, newItem]);
    }
    setIsTemplateModalOpen(false);
  };

  // Delete Template
  const handleDeleteTemplate = (id: number) => {
    setTemplateList((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle status
  const handleToggleTemplateStatus = (id: number) => {
    setTemplateList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  // Insert Variable to Subject or Content
  const handleInsertVariable = (target: 'subject' | 'content', variable: string) => {
    if (target === 'subject') {
      setTemplateFormData((prev) => ({
        ...prev,
        subject: prev.subject + ` \${${variable}}`
      }));
      setShowSubjectVarDropdown(false);
    } else {
      setTemplateFormData((prev) => ({
        ...prev,
        content: prev.content + `\n\${${variable}}`
      }));
      setShowContentVarDropdown(false);
    }
  };

  // Filtered Templates
  const filteredTemplates = templateList.filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.code.toLowerCase().includes(term) ||
      item.name.toLowerCase().includes(term) ||
      item.subject.toLowerCase().includes(term) ||
      item.reportName.toLowerCase().includes(term)
    );
  });

  // Filtered Send Settings
  const filteredSendSettings = sendSettingList.filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.mailName.toLowerCase().includes(term) ||
      item.templateCode.toLowerCase().includes(term) ||
      item.templateName.toLowerCase().includes(term) ||
      item.groupCode.toLowerCase().includes(term) ||
      item.groupName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col flex-1 min-h-0">
      
      {/* Sub Tabs Navigation */}
      <div className="flex items-center space-x-6 border-b border-slate-200 pb-0.5 mb-4 shrink-0">
        <button
          onClick={() => {
            setActiveTab('郵件模板');
            setSearchTerm('');
          }}
          className={`text-sm tracking-wide cursor-pointer pb-2.5 transition-all ${
            activeTab === '郵件模板'
              ? 'border-b-2 border-[#2563eb] text-[#2563eb] font-bold'
              : 'text-slate-600 hover:text-slate-900 font-medium border-b-2 border-transparent'
          }`}
        >
          郵件模板
        </button>

        <button
          onClick={() => {
            setActiveTab('收件人群組');
            setSearchTerm('');
          }}
          className={`text-sm tracking-wide cursor-pointer pb-2.5 transition-all ${
            activeTab === '收件人群組'
              ? 'border-b-2 border-[#2563eb] text-[#2563eb] font-bold'
              : 'text-slate-600 hover:text-slate-900 font-medium border-b-2 border-transparent'
          }`}
        >
          收件人群組
        </button>

        <button
          onClick={() => {
            setActiveTab('郵件寄送設定');
            setSearchTerm('');
          }}
          className={`text-sm tracking-wide cursor-pointer pb-2.5 transition-all ${
            activeTab === '郵件寄送設定'
              ? 'border-b-2 border-[#2563eb] text-[#2563eb] font-bold'
              : 'text-slate-600 hover:text-slate-900 font-medium border-b-2 border-transparent'
          }`}
        >
          郵件寄送設定
        </button>
      </div>

      {/* Control / Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 shrink-0">
        {/* Left Search */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder={
                activeTab === '郵件模板'
                  ? '模板名稱'
                  : activeTab === '收件人群組'
                  ? '群組名稱'
                  : '寄送名稱'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          <button
            onClick={() => {}}
            className="px-4 py-1.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>搜尋</span>
          </button>
        </div>

        {/* Right Primary Add Action */}
        <button
          onClick={() => {
            if (activeTab === '郵件模板') {
              handleOpenTemplateModal();
            } else if (activeTab === '收件人群組') {
              handleOpenGroupModal();
            } else if (activeTab === '郵件寄送設定') {
              handleOpenSendSettingModal();
            }
          }}
          className="px-4 py-1.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-2xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>
            {activeTab === '郵件模板'
              ? '新增郵件模板'
              : activeTab === '收件人群組'
              ? '新增設定'
              : '新增設定'}
          </span>
        </button>
      </div>

      {/* Tab 1: 郵件模板 Content Table */}
      {activeTab === '郵件模板' && (
        <div className="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg">
          <table className="w-full text-[13px] text-left text-slate-700 border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 text-center w-14">序號</th>
                <th className="py-2.5 px-3 whitespace-nowrap">模板編碼</th>
                <th className="py-2.5 px-3 whitespace-nowrap">模板名稱</th>
                <th className="py-2.5 px-3 whitespace-nowrap">對應報表</th>
                <th className="py-2.5 px-3 whitespace-nowrap">BU</th>
                <th className="py-2.5 px-3 whitespace-nowrap">班別</th>
                <th className="py-2.5 px-3 whitespace-nowrap">主旨</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">狀態</th>
                <th className="py-2.5 px-3 whitespace-nowrap">最後修改人</th>
                <th className="py-2.5 px-3 whitespace-nowrap">最後修改時間</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTemplates.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center text-slate-500 font-medium">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-800 whitespace-nowrap">
                    {item.code}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {item.reportName}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {item.bu}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {item.shift}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-mono text-[12px] truncate max-w-xs">
                    {item.subject}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleToggleTemplateStatus(item.id)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                        item.status ? 'bg-[#2563eb]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                          item.status ? 'translate-x-4' : 'translate-x-0.5'
                        } my-0.5`}
                      />
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {item.maintainer}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[12px] whitespace-nowrap">
                    {item.maintainTime}
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleOpenTemplateModal(item)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                        title="編輯"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopyTemplate(item)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                        title="複製"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                        title="刪除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTemplates.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-400">
                    查無符合條件的郵件模板
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: 收件人群組 Content Table */}
      {activeTab === '收件人群組' && (
        <div className="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg">
          <table className="w-full text-[13px] text-left text-slate-700 border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3.5 whitespace-nowrap">群組編碼</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">群組名稱</th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">TO 人數</th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">CC 人數</th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">BCC 人數</th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">總人數</th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">狀態</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">最後修改人</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">最後修改時間</th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {groupList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3.5 font-mono font-medium text-slate-800 whitespace-nowrap">
                    {item.code}
                  </td>
                  <td className="py-3 px-3.5 font-medium text-slate-800 whitespace-nowrap">
                    {item.groupName}
                  </td>
                  <td className="py-3 px-3.5 text-center text-slate-700 whitespace-nowrap">
                    {item.toCount}
                  </td>
                  <td className="py-3 px-3.5 text-center text-slate-700 whitespace-nowrap">
                    {item.ccCount}
                  </td>
                  <td className="py-3 px-3.5 text-center text-slate-700 whitespace-nowrap">
                    {item.bccCount}
                  </td>
                  <td className="py-3 px-3.5 text-center text-slate-700 font-semibold whitespace-nowrap">
                    {item.totalCount}
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <button
                      onClick={() =>
                        setGroupList((prev) =>
                          prev.map((g) => (g.id === item.id ? { ...g, status: !g.status } : g))
                        )
                      }
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                        item.status ? 'bg-[#2563eb]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                          item.status ? 'translate-x-4' : 'translate-x-0.5'
                        } my-0.5`}
                      />
                    </button>
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">
                    {item.maintainer}
                  </td>
                  <td className="py-3 px-3.5 text-slate-500 font-mono text-[12px] whitespace-nowrap">
                    {item.maintainTime}
                  </td>
                  <td className="py-3 px-3.5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleOpenGroupModal(item)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                        title="編輯"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                        title="刪除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: 郵件寄送設定 Content Table */}
      {activeTab === '郵件寄送設定' && (
        <div className="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg">
          <table className="w-full text-[13px] text-left text-slate-700 border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3.5 whitespace-nowrap">郵件名稱</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">模板編碼</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">模板名稱</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">群組編碼</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">群組名稱</th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">狀態</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">最後修改人</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">最後修改時間</th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredSendSettings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3.5 font-medium text-slate-800 whitespace-nowrap">
                    {item.mailName}
                  </td>
                  <td className="py-3 px-3.5 font-mono font-medium text-slate-800 whitespace-nowrap">
                    {item.templateCode}
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">
                    {item.templateName}
                  </td>
                  <td className="py-3 px-3.5 font-mono font-medium text-slate-800 whitespace-nowrap">
                    {item.groupCode}
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">
                    {item.groupName}
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <button
                      onClick={() =>
                        setSendSettingList((prev) =>
                          prev.map((s) => (s.id === item.id ? { ...s, status: !s.status } : s))
                        )
                      }
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                        item.status ? 'bg-[#2563eb]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                          item.status ? 'translate-x-4' : 'translate-x-0.5'
                        } my-0.5`}
                      />
                    </button>
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">
                    {item.maintainer}
                  </td>
                  <td className="py-3 px-3.5 text-slate-500 font-mono text-[12px] whitespace-nowrap">
                    {item.maintainTime}
                  </td>
                  <td className="py-3 px-3.5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleOpenSendSettingModal(item)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                        title="編輯"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSendSetting(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                        title="刪除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSendSettings.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    查無符合條件的郵件寄送設定
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Template Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-[#2563eb] text-white px-5 py-3 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-white tracking-wide">
                {editingTemplate ? '編輯郵件模板' : '新增郵件模板'}
              </h3>
              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(false)}
                className="text-white/90 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveTemplate} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
                
                {/* Row 1: 對應報表 | BU | 班別 | 狀態 */}
                <div className="grid grid-cols-12 gap-4 items-end">
                  {/* 對應報表 */}
                  <div className="col-span-4">
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      <span className="text-red-500 mr-1">*</span>對應報表
                    </label>
                    <div className="relative">
                      <select
                        value={templateFormData.reportName}
                        onChange={(e) =>
                          setTemplateFormData({ ...templateFormData, reportName: e.target.value })
                        }
                        className="w-full pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 appearance-none focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="每日出勤報表">每日出勤報表</option>
                        <option value="每日出勤報表-製造">每日出勤報表-製造</option>
                        <option value="每日出勤報表-學生">每日出勤報表-學生</option>
                        <option value="在職員工明細">在職員工明細</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* BU */}
                  <div className="col-span-3">
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      <span className="text-red-500 mr-1">*</span>BU
                    </label>
                    <div className="relative">
                      <select
                        value={templateFormData.bu}
                        onChange={(e) =>
                          setTemplateFormData({ ...templateFormData, bu: e.target.value })
                        }
                        className="w-full pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 appearance-none focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="NVD">NVD</option>
                        <option value="BU1">BU1</option>
                        <option value="BU2">BU2</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* 班別 */}
                  <div className="col-span-3">
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      <span className="text-red-500 mr-1">*</span>班別
                    </label>
                    <div className="relative">
                      <select
                        value={templateFormData.shift}
                        onChange={(e) =>
                          setTemplateFormData({ ...templateFormData, shift: e.target.value })
                        }
                        className="w-full pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 appearance-none focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="日班">日班</option>
                        <option value="夜班">夜班</option>
                        <option value="全班">全班</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* 狀態 Switch */}
                  <div className="col-span-2 flex flex-col items-start pl-2">
                    <label className="block font-semibold text-slate-700 mb-2">
                      <span className="text-red-500 mr-1">*</span>狀態
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setTemplateFormData({
                          ...templateFormData,
                          status: !templateFormData.status
                        })
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        templateFormData.status ? 'bg-[#2563eb]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          templateFormData.status ? 'translate-x-5' : 'translate-x-0.5'
                        } my-0.5`}
                      />
                    </button>
                  </div>
                </div>

                {/* Row 2: 模板編碼 | 模板名稱 */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 模板編碼 */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      <span className="text-red-500 mr-1">*</span>模板編碼
                    </label>
                    <input
                      type="text"
                      required
                      value={templateFormData.code}
                      onChange={(e) =>
                        setTemplateFormData({ ...templateFormData, code: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* 模板名稱 */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      <span className="text-red-500 mr-1">*</span>模板名稱
                    </label>
                    <input
                      type="text"
                      required
                      value={templateFormData.name}
                      onChange={(e) =>
                        setTemplateFormData({ ...templateFormData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Row 3: 主旨 + 插入變數按鈕 */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>主旨
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      required
                      value={templateFormData.subject}
                      onChange={(e) =>
                        setTemplateFormData({ ...templateFormData, subject: e.target.value })
                      }
                      className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    {/* 插入變數 Button with Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowSubjectVarDropdown(!showSubjectVarDropdown)}
                        className="px-4 py-2 bg-[#2563eb] hover:bg-blue-700 text-white font-medium rounded-lg text-xs flex items-center space-x-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
                      >
                        <span>插入變數</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {showSubjectVarDropdown && (
                        <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 animate-fade-in">
                          {['ReportDate', 'ReportName', 'BU', 'Shift', 'UserName'].map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => handleInsertVariable('subject', v)}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-mono cursor-pointer transition-colors"
                            >
                              ${'{' + v + '}'}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 4: 模板內容 Rich Text Editor */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>模板內容
                  </label>

                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                    {/* Rich Editor Toolbar */}
                    <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
                      {/* Left formatting tools */}
                      <div className="flex items-center space-x-1 text-slate-500">
                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm cursor-pointer" title="復原">
                          <Undo2 className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm cursor-pointer" title="重做">
                          <Redo2 className="w-4 h-4" />
                        </button>

                        <div className="h-4 w-px bg-slate-200 mx-1" />

                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm font-bold text-slate-700 cursor-pointer" title="粗體">
                          <Bold className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 cursor-pointer" title="斜體">
                          <Italic className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 cursor-pointer" title="底線">
                          <Underline className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 cursor-pointer" title="刪除線">
                          <Strikethrough className="w-4 h-4" />
                        </button>

                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 cursor-pointer" title="文字顏色">
                          <Baseline className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 cursor-pointer" title="背景顏色">
                          <Highlighter className="w-4 h-4" />
                        </button>

                        <div className="h-4 w-px bg-slate-200 mx-1" />

                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 flex items-center cursor-pointer" title="對齊方式">
                          <AlignLeft className="w-4 h-4" />
                          <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
                        </button>

                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 flex items-center cursor-pointer" title="項目符號">
                          <List className="w-4 h-4" />
                          <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
                        </button>

                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 flex items-center cursor-pointer" title="編號列表">
                          <ListOrdered className="w-4 h-4" />
                          <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
                        </button>

                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 cursor-pointer" title="減少縮排">
                          <Outdent className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-100 rounded-sm text-slate-700 cursor-pointer" title="增加縮排">
                          <Indent className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Right 插入變數 button */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowContentVarDropdown(!showContentVarDropdown)}
                          className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-md text-xs flex items-center space-x-1 cursor-pointer transition-colors shadow-2xs"
                        >
                          <span>插入變數</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </button>

                        {showContentVarDropdown && (
                          <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 animate-fade-in">
                            {['ReportLink', 'ReportDate', 'UserName', 'DeptName', 'ReportSummary'].map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => handleInsertVariable('content', v)}
                                className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-mono cursor-pointer transition-colors"
                              >
                                ${'{' + v + '}'}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Textarea Area */}
                    <textarea
                      rows={12}
                      value={templateFormData.content}
                      onChange={(e) =>
                        setTemplateFormData({ ...templateFormData, content: e.target.value })
                      }
                      className="w-full p-4 text-xs leading-relaxed text-slate-800 bg-white focus:outline-hidden resize-y font-sans border-0"
                    />
                  </div>
                </div>

                {/* Row 5: 附件設定 */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    <span className="text-red-500 mr-1">*</span>附件設定
                  </label>
                  <div className="flex items-center space-x-6 text-xs">
                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={templateFormData.attachExcel}
                        onChange={(e) =>
                          setTemplateFormData({
                            ...templateFormData,
                            attachExcel: e.target.checked
                          })
                        }
                        className="w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500 cursor-pointer accent-[#2563eb]"
                      />
                      <span className={`font-semibold ${templateFormData.attachExcel ? 'text-[#2563eb]' : 'text-slate-700'}`}>
                        附 Excel 檔案
                      </span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={templateFormData.attachPdf}
                        onChange={(e) =>
                          setTemplateFormData({
                            ...templateFormData,
                            attachPdf: e.target.checked
                          })
                        }
                        className="w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500 cursor-pointer accent-[#2563eb]"
                      />
                      <span className="text-slate-600">
                        同時附上 PDF 版本
                      </span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-[#f8fafc] px-6 py-3.5 border-t border-slate-200 flex items-center justify-end space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer shadow-2xs transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Recipient Group Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#2563eb] text-white px-5 py-3.5 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-white tracking-wide">
                {editingGroup ? '編輯收件人設定' : '新增收件人設定'}
              </h3>
              <button
                type="button"
                onClick={() => setIsGroupModalOpen(false)}
                className="text-white/90 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveGroup} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
                
                {/* 群組編碼 */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>群組編碼
                  </label>
                  <input
                    type="text"
                    disabled
                    value={groupFormData.code}
                    className="w-full px-3.5 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-400 font-mono select-none cursor-not-allowed"
                  />
                </div>

                {/* 群組名稱 */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>群組名稱
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：NVD主管群"
                    value={groupFormData.groupName}
                    onChange={(e) =>
                      setGroupFormData({ ...groupFormData, groupName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* 描述 */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    描述
                  </label>
                  <input
                    type="text"
                    placeholder="例如：NVD廠區各部門主管"
                    value={groupFormData.description}
                    onChange={(e) =>
                      setGroupFormData({ ...groupFormData, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* 狀態 Switch */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    <span className="text-red-500 mr-1">*</span>狀態
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setGroupFormData({
                        ...groupFormData,
                        status: !groupFormData.status
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      groupFormData.status ? 'bg-[#2563eb]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                        groupFormData.status ? 'translate-x-5' : 'translate-x-0.5'
                      } my-0.5`}
                    />
                  </button>
                </div>

                {/* TO (收件人) */}
                <RecipientTagInput
                  label="TO（收件人）"
                  required
                  tags={groupFormData.toRecipients}
                  extraCount={groupFormData.toExtraCount}
                  onTagsChange={(newTags) =>
                    setGroupFormData({ ...groupFormData, toRecipients: newTags })
                  }
                />

                {/* CC (副本) */}
                <RecipientTagInput
                  label="CC（副本）"
                  tags={groupFormData.ccRecipients}
                  extraCount={groupFormData.ccExtraCount}
                  onTagsChange={(newTags) =>
                    setGroupFormData({ ...groupFormData, ccRecipients: newTags })
                  }
                />

                {/* BCC (密件副本) */}
                <RecipientTagInput
                  label="BCC（密件副本）"
                  tags={groupFormData.bccRecipients}
                  extraCount={groupFormData.bccExtraCount}
                  onTagsChange={(newTags) =>
                    setGroupFormData({ ...groupFormData, bccRecipients: newTags })
                  }
                />

              </div>

              {/* Modal Footer */}
              <div className="bg-[#f8fafc] px-6 py-3.5 border-t border-slate-100 flex items-center justify-end space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsGroupModalOpen(false)}
                  className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer shadow-2xs transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Send Setting Modal */}
      {isSendSettingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#2563eb] text-white px-5 py-3.5 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-white tracking-wide">
                {editingSendSetting ? '編輯設定' : '新增設定'}
              </h3>
              <button
                type="button"
                onClick={() => setIsSendSettingModalOpen(false)}
                className="text-white/90 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSendSetting} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
                
                {/* 郵件名稱 & 狀態 */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      <span className="text-red-500 mr-1">*</span>郵件名稱
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="例如：NVD日班出勤報表-8點"
                      value={sendSettingFormData.mailName}
                      onChange={(e) =>
                        setSendSettingFormData({ ...sendSettingFormData, mailName: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="shrink-0 flex flex-col items-end">
                    <label className="block font-semibold text-slate-700 mb-1.5 whitespace-nowrap">
                      <span className="text-red-500 mr-1">*</span>狀態
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setSendSettingFormData({
                          ...sendSettingFormData,
                          status: !sendSettingFormData.status
                        })
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        sendSettingFormData.status ? 'bg-[#2563eb]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          sendSettingFormData.status ? 'translate-x-5' : 'translate-x-0.5'
                        } my-0.5`}
                      />
                    </button>
                  </div>
                </div>

                {/* 模板名稱 (Select) */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>模板名稱
                  </label>
                  <div className="relative">
                    <select
                      value={sendSettingFormData.templateName}
                      onChange={(e) => {
                        const selectedName = e.target.value;
                        const matched = templateList.find((t) => t.name === selectedName);
                        setSendSettingFormData({
                          ...sendSettingFormData,
                          templateName: selectedName,
                          templateCode: matched ? matched.code : 'TMP001'
                        });
                      }}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 appearance-none pr-8 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {templateList.map((tmpl) => (
                        <option key={tmpl.id} value={tmpl.name}>
                          {tmpl.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* 模板編碼 (Readonly) */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>模板編碼
                  </label>
                  <input
                    type="text"
                    disabled
                    value={sendSettingFormData.templateCode}
                    className="w-full px-3.5 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-400 font-mono select-none cursor-not-allowed"
                  />
                </div>

                {/* 群組名稱 (Select) */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>群組名稱
                  </label>
                  <div className="relative">
                    <select
                      value={sendSettingFormData.groupName}
                      onChange={(e) => {
                        const selectedGroup = e.target.value;
                        const matched = groupList.find((g) => g.groupName === selectedGroup);
                        setSendSettingFormData({
                          ...sendSettingFormData,
                          groupName: selectedGroup,
                          groupCode: matched ? matched.code : 'GRP001'
                        });
                      }}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 appearance-none pr-8 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {groupList.map((grp) => (
                        <option key={grp.id} value={grp.groupName}>
                          {grp.groupName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* 群組編碼 (Readonly) */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>模板編碼
                  </label>
                  <input
                    type="text"
                    disabled
                    value={sendSettingFormData.groupCode}
                    className="w-full px-3.5 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-400 font-mono select-none cursor-not-allowed"
                  />
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-[#f8fafc] px-6 py-3.5 border-t border-slate-100 flex items-center justify-end space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSendSettingModalOpen(false)}
                  className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer shadow-2xs transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
