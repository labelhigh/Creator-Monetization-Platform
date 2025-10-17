import React from 'react';
import Card from '../ui/Card';

const REVENUE_DATA = [
    { name: '分級訂閱', value: 45000, color: '#4f46e5' },
    { name: '數位商品', value: 25000, color: '#7c3aed' },
    { name: '單次贊助', value: 8000, color: '#0ea5e9' },
    { name: '服務諮詢', value: 12000, color: '#14b8a6' },
];

const DonutChart: React.FC<{ data: typeof REVENUE_DATA }> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulative = 0;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {data.map((item, index) => {
                    const dashoffset = circumference * (1 - cumulative / total);
                    const dasharray = (circumference * item.value) / total;
                    cumulative += item.value;
                    return (
                        <circle
                            key={index}
                            r={radius}
                            cx="100"
                            cy="100"
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth="24"
                            strokeDasharray={`${dasharray} ${circumference}`}
                            strokeDashoffset={dashoffset}
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-bold text-slate-800">
                    {`NT$${(total / 1000).toFixed(0)}k`}
                </span>
                <span className="text-sm text-slate-500">總收入</span>
            </div>
        </div>
    );
};

const RevenueBreakdownWidget: React.FC = () => {
    return (
        <Card className="p-6 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-800">收入來源分析</h3>
             <div className="mt-4 flex flex-col md:flex-row items-center gap-6">
                <DonutChart data={REVENUE_DATA} />
                <div className="w-full">
                    <ul className="space-y-3">
                        {REVENUE_DATA.map(item => (
                            <li key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                    <span className="text-slate-600">{item.name}</span>
                                </div>
                                <span className="font-semibold text-slate-800">NT${item.value.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
};

export default RevenueBreakdownWidget;