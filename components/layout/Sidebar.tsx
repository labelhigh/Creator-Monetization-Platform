import React from 'react';
import { View } from '../../types';
import { Logo, NAV_ITEMS } from '../../constants';

// Icons for collapse/expand button
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;

interface SidebarProps {
    activeView: View;
    setActiveView: (view: View) => void;
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isSidebarCollapsed, setIsSidebarCollapsed }) => {
    return (
        <aside className={`bg-white shadow-lg flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-center h-20 border-b flex-shrink-0">
                <Logo isCollapsed={isSidebarCollapsed} />
            </div>
            <div className="flex-grow flex flex-col justify-between overflow-y-auto overflow-x-hidden">
                <nav className="mt-6">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.id}
                            className={`flex items-center py-3 my-1 text-slate-600 transition-colors duration-200 transform hover:bg-indigo-50 hover:text-indigo-700 ${isSidebarCollapsed ? 'justify-center' : 'px-6'} ${activeView === item.id ? 'bg-indigo-50 text-indigo-700' + (!isSidebarCollapsed ? ' border-r-4 border-indigo-500' : '') : ''}`}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveView(item.id);
                            }}
                            title={isSidebarCollapsed ? item.name : ''}
                        >
                            {item.icon}
                            <span className={`whitespace-nowrap transition-all duration-200 ${isSidebarCollapsed ? 'w-0 opacity-0 ml-0' : 'mx-4 font-medium'}`}>{item.name}</span>
                        </a>
                    ))}
                </nav>
                <div className="p-4 mt-4">
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="w-full flex items-center justify-center p-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label={isSidebarCollapsed ? '展開側邊欄' : '收合側邊欄'}
                    >
                        {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        <span className={`whitespace-nowrap transition-all duration-200 ${isSidebarCollapsed ? 'w-0 opacity-0 ml-0' : 'ml-2 font-medium text-sm'}`}>收合</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
