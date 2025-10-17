import React from 'react';
import Card from '../ui/Card';

// Icons for different content types
const ProductIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const GalleryIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const LinkIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

export interface TopContentItem {
    type: '產品' | '畫廊' | '連結';
    name: string;
    metricLabel: string;
    metricValue: string | number;
}

const icons: { [key in TopContentItem['type']]: React.ReactElement } = {
    '產品': <ProductIcon />,
    '畫廊': <GalleryIcon />,
    '連結': <LinkIcon />,
};

const iconBgColors: { [key in TopContentItem['type']]: string } = {
    '產品': 'bg-indigo-100',
    '畫廊': 'bg-rose-100',
    '連結': 'bg-amber-100',
};


interface TopContentWidgetProps {
    items: TopContentItem[];
}

const TopContentWidget: React.FC<TopContentWidgetProps> = ({ items }) => {
    return (
        <Card>
            <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">熱門內容</h3>
                <p className="text-sm text-slate-500 mt-1">您最受歡迎的作品和連結。</p>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-slate-200">
                    {items.map((item, index) => (
                        <li key={index} className="py-3 px-6 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className={`flex-shrink-0 p-3 rounded-full ${iconBgColors[item.type]}`}>
                                    {icons[item.type]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                                    <p className="text-sm text-slate-500 truncate">{item.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-base font-semibold text-slate-900">{item.metricValue}</p>
                                    <p className="text-sm font-normal text-slate-500">{item.metricLabel}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
             <div className="p-4 text-center border-t border-slate-200 bg-slate-50">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    查看所有分析 →
                </a>
            </div>
        </Card>
    );
};

export default TopContentWidget;
