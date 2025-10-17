import React from 'react';
import Card from '../ui/Card';

interface RevenueWidgetProps {
    title: string;
    revenue: string;
    pending: string;
}

const RevenueWidget: React.FC<RevenueWidgetProps> = ({ title, revenue, pending }) => {
    return (
        <Card className="p-6">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-bold text-slate-800">{revenue}</p>
            </div>
            <p className="mt-1 text-sm text-slate-500">待處理款項: {pending}</p>
        </Card>
    );
};

export default RevenueWidget;
