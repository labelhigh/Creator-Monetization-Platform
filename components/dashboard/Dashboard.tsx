import React from 'react';
import AnalyticsWidget from './AnalyticsWidget';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { View } from '../../types';
import { HandDrawnPenIcon, HandDrawnLightbulbIcon } from '../../constants';
import RevenueBreakdownWidget from './RevenueBreakdownWidget';
import SupporterLeaderboardWidget from './SupporterLeaderboardWidget';

interface DashboardProps {
    setActiveView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800">財務中心</h1>
            <p className="text-slate-600 mt-2">清楚掌握財務狀況，並做出更明智的商業決策。</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <AnalyticsWidget title="本月總收入" value="NT$90,000" change="+15.2%" />
                <AnalyticsWidget title="月費循環收入 (MRR)" value="NT$45,000" change="+8.1%" />
                <AnalyticsWidget title="平均粉絲價值 (ARPU)" value="NT$185" change="+2.5%" />
                <AnalyticsWidget title="會員流失率" value="4.2%" change="-0.5%" changeDirection="down" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                <RevenueBreakdownWidget />
                <SupporterLeaderboardWidget />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                <Card className="p-6 flex flex-col items-center text-center">
                    <HandDrawnPenIcon />
                    <h2 className="text-xl font-bold mt-4">編輯您的網站</h2>
                    <p className="text-slate-500 mt-2 mb-4">隨時更新您的個人頁面，展示最新的創作與公告。</p>
                    <Button onClick={() => setActiveView('editor')} variant="primary">
                        前往編輯器
                    </Button>
                </Card>
                <Card className="p-6 flex flex-col items-center text-center">
                    <HandDrawnLightbulbIcon />
                    <h2 className="text-xl font-bold mt-4">獲取變現建議</h2>
                    <p className="text-slate-500 mt-2 mb-4">遇到瓶頸了嗎？讓我們的智慧指南協助您找到最適合的內容變現方式。</p>
                    <Button onClick={() => setActiveView('guidance')} variant="secondary">
                        開始引導
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;