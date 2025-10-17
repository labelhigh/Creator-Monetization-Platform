import React from 'react';
import Card from '../ui/Card';

interface AnalyticsWidgetProps {
    title: string;
    value: string;
    change: string;
    changeDirection?: 'up' | 'down'; // 'up' means positive change is good, 'down' means positive change is bad
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ title, value, change, changeDirection = 'up' }) => {
    const hasChange = change && change.length > 0;
    let isGood = false;
    if(hasChange) {
        const isPositive = change.startsWith('+');
        isGood = (changeDirection === 'up' && isPositive) || (changeDirection === 'down' && !isPositive);
    }
    
    return (
        <Card className="p-6">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-bold text-slate-800">{value}</p>
            </div>
            {hasChange && (
                <p className={`mt-1 text-sm ${isGood ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
            )}
        </Card>
    );
};

export default AnalyticsWidget;