import React from 'react';
import { Home, ChevronDown, Bell, User } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
  activeSubMenu: string;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick, activeSubMenu }) => {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Brand Logo & Name */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={onHomeClick}>
        <svg width="36" height="34" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-8 w-auto">
          <g clipPath="url(#clip0_5093_1422)">
            <path d="M8.50378 31.4203C8.30195 31.0655 8.19042 30.6624 8.19042 30.2431V13.7569C8.19042 12.913 8.63656 12.1335 9.35889 11.7089L23.4655 3.46845C24.1879 3.0438 25.0802 3.0438 25.8025 3.46845L39.9091 11.7089C39.9091 11.7089 39.9569 11.7411 39.9782 11.7519C40.5571 10.9671 41.067 10.1984 41.4653 9.47273L25.8078 0.31849C25.0855 -0.106163 24.1932 -0.106163 23.4708 0.31849L6.6714 10.1339C5.94907 10.5585 5.50293 11.338 5.50293 12.1819V31.6945C5.66758 31.7052 5.83223 31.7106 6.00219 31.7106C6.81481 31.7106 7.66991 31.5869 8.50378 31.4149V31.4203ZM24.719 7.63973C22.4245 7.63973 20.5656 9.5211 20.5656 11.8433C20.5656 14.1654 22.4245 16.0468 24.719 16.0468C27.0134 16.0468 28.8724 14.1654 28.8724 11.8433C28.8724 9.5211 27.0134 7.63973 24.719 7.63973ZM31.9954 30.098V25.4913C30.4923 26.5126 28.8883 27.5178 27.1781 28.5122C25.7706 29.3239 22.8441 30.9527 19.3546 32.5169C20.6931 33.3662 22.5626 34.0489 24.6393 34.0489C28.7024 34.0489 32.0007 31.4096 32.0007 30.098H31.9954ZM24.6393 16.6865C20.5762 16.6865 17.2779 20.0192 17.2779 24.1367V28.4961C22.2068 26.3997 27.0294 23.6529 31.119 20.6105C29.8762 18.2776 27.4383 16.6918 24.634 16.6918L24.6393 16.6865ZM16.2954 11.295C14.7392 11.295 13.4751 12.5743 13.4751 14.1493C13.4751 15.7243 14.7392 17.0036 16.2954 17.0036C17.8516 17.0036 19.1156 15.7243 19.1156 14.1493C19.1156 12.5743 17.8516 11.295 16.2954 11.295ZM18.6907 18.084C17.9684 17.6701 17.1292 17.4336 16.2423 17.4336C13.4857 17.4336 11.2497 19.6967 11.2497 22.4865V26.5341C11.2497 27.3512 13.1458 28.9315 15.5996 29.1788C15.7961 29.0982 15.9979 29.0175 16.2051 28.9369V24.1313C16.2051 21.7715 17.1611 19.6322 18.696 18.084H18.6907ZM33.0895 11.295C31.5333 11.295 30.2692 12.5743 30.2692 14.1493C30.2692 15.7243 31.5333 17.0036 33.0895 17.0036C34.6457 17.0036 35.9098 15.7243 35.9098 14.1493C35.9098 12.5743 34.6457 11.295 33.0895 11.295ZM38.0289 26.5341V22.4865C38.0289 21.9651 37.9493 21.4652 37.8059 20.9975C36.3825 22.2607 34.805 23.5078 33.0736 24.7387V29.2164C35.8142 29.2003 38.0289 27.421 38.0289 26.5395V26.5341ZM30.5826 18.084C31.1296 18.6377 31.6023 19.2613 31.9848 19.9493C32.2503 19.745 32.5159 19.5354 32.7761 19.3258C33.3232 18.885 33.9552 18.3313 34.6298 17.697C34.1305 17.525 33.5941 17.4336 33.0364 17.4336C32.1441 17.4336 31.3102 17.6701 30.5879 18.084H30.5826ZM27.449 42.4667V39.5694L25.8025 40.5315C25.0802 40.9562 24.1879 40.9562 23.4655 40.5315L13.6026 34.7692C12.3863 35.1723 11.1594 35.5217 9.96437 35.7905L23.4655 43.6815C24.1879 44.1062 25.0802 44.1062 25.8025 43.6815L27.4702 42.7086C27.4543 42.6333 27.449 42.5527 27.449 42.4721V42.4667ZM41.0776 17.7293V30.2431C41.0776 30.7753 40.9023 31.2806 40.589 31.6891V35.0433L42.6019 33.8661C43.3242 33.4414 43.7704 32.662 43.7704 31.8181V14.2568C42.7453 15.7404 41.7149 16.9875 41.0776 17.7293Z" fill="url(#paint0_linear_5093_1422)"/>
            <path d="M30.554 35.2637H28.8331C28.5515 35.2637 28.3232 35.4947 28.3232 35.7797V42.4075C28.3232 42.6925 28.5515 42.9236 28.8331 42.9236H30.554C30.8356 42.9236 31.0638 42.6925 31.0638 42.4075V35.7797C31.0638 35.4947 30.8356 35.2637 30.554 35.2637Z" fill="url(#paint1_linear_5093_1422)"/>
            <path d="M34.9125 32.5701H33.1279C32.8639 32.5701 32.6499 32.7867 32.6499 33.0539V42.4392C32.6499 42.7064 32.8639 42.923 33.1279 42.923H34.9125C35.1765 42.923 35.3905 42.7064 35.3905 42.4392V33.0539C35.3905 32.7867 35.1765 32.5701 34.9125 32.5701Z" fill="url(#paint2_linear_5093_1422)"/>
            <path d="M39.2635 29.7642H37.4258C37.1765 29.7642 36.9744 29.9687 36.9744 30.2211V42.4661C36.9744 42.7185 37.1765 42.923 37.4258 42.923H39.2635C39.5128 42.923 39.715 42.7185 39.715 42.4661V30.2211C39.715 29.9687 39.5128 29.7642 39.2635 29.7642Z" fill="url(#paint3_linear_5093_1422)"/>
            <path d="M4.88943 24.2755C1.04941 27.3395 -3.27394 34.1071 3.71565 35.1499C10.1794 36.1121 21.0197 30.812 26.6336 27.5599C31.2278 24.8991 35.9867 21.5825 39.6462 17.7015C42.3974 14.7773 50.9219 3.77391 42.1053 3.04823C40.2516 2.89772 37.4951 3.36 36.0292 4.56946C38.4033 4.03192 43.7358 3.06436 43.449 7.02062C43.1728 10.8801 36.401 17.7982 33.4373 20.1849C28.5457 24.1143 22.5652 27.5222 16.7707 29.882C14.8692 30.6561 12.936 31.371 10.9549 31.9247C8.84099 32.516 6.39251 33.1287 4.20428 32.6073C0.109319 31.629 3.62005 26.1462 4.88412 24.2755H4.88943Z" fill="url(#paint4_linear_5093_1422)"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear_5093_1422" x1="16.3963" y1="6.60228" x2="32.7431" y2="38.0715" gradientUnits="userSpaceOnUse">
              <stop stopColor="#51A2FF"/>
              <stop offset="1" stopColor="#2B7FFF"/>
            </linearGradient>
            <linearGradient id="paint1_linear_5093_1422" x1="29.6935" y1="35.2637" x2="29.6935" y2="42.9236" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D492"/>
              <stop offset="1" stopColor="#A4F4CF"/>
            </linearGradient>
            <linearGradient id="paint2_linear_5093_1422" x1="34.0202" y1="32.5701" x2="34.0202" y2="42.923" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D492"/>
              <stop offset="1" stopColor="#A4F4CF"/>
            </linearGradient>
            <linearGradient id="paint3_linear_5093_1422" x1="38.3447" y1="29.7642" x2="38.3447" y2="42.923" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D492"/>
              <stop offset="1" stopColor="#A4F4CF"/>
            </linearGradient>
            <linearGradient id="paint4_linear_5093_1422" x1="57.5238" y1="-9.41185" x2="9.98974" y2="30.7751" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D0FAE5"/>
              <stop offset="1" stopColor="#00D492"/>
            </linearGradient>
            <clipPath id="clip0_5093_1422">
              <rect width="46" height="44" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div className="flex items-baseline space-x-1.5">
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#2B7FFF] to-[#00D492] bg-clip-text text-transparent">HR REPORTING</span>
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">AUTOMATION</span>
        </div>
      </div>

      {/* Navigation Breadcrumb & Profile */}
      <div className="flex items-center space-x-5 text-sm text-slate-600">
        <button 
          onClick={onHomeClick}
          className={`p-1.5 px-2.5 rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer ${
            activeSubMenu === '首頁' 
              ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-2xs' 
              : 'hover:bg-slate-100 text-slate-600 hover:text-blue-600'
          }`}
          title="回首頁"
        >
          <Home className="w-4 h-4" />
          <span className="text-xs font-semibold">首頁</span>
        </button>

        <span className="text-slate-300">|</span>

        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
          當前頁面: <strong className="text-slate-700 font-semibold">{activeSubMenu}</strong>
        </span>

        <div className="relative group flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors pl-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs shadow-2xs">
            <User className="w-4 h-4" />
          </div>
          <span className="font-medium text-slate-700 text-sm">王大明</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" />

          {/* User Profile Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 hidden group-hover:block z-50">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-800">王大明 (ABBY)</p>
              <p className="text-[11px] text-slate-400">人事考勤管理員</p>
            </div>
            <button className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600">
              個人資料設定
            </button>
            <button className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600">
              考勤審核權限
            </button>
            <div className="border-t border-slate-100 my-1"></div>
            <button className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50">
              登出系統
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
