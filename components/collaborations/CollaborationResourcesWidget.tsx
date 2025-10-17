import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const CollaborationResourcesWidget: React.FC = () => {
    
    const handleViewTemplate = () => {
        alert("（示意功能）\n\n合作合約範本\n\n- 合作範圍與交付項目\n- 合作時程\n- 費用與支付方式\n- 內容所有權\n- ...等條款");
    };

    const handleGetSuggestion = () => {
        alert("（示意功能）\n\nAI 報價建議：\n\n根據您的粉絲數、互動率與市場行情，建議本次合作報價區間為：\nNT$ 22,000 - NT$ 28,000");
    };

    return (
        <Card>
            <div className="p-5 border-b">
                <h3 className="text-lg font-bold">資源中心</h3>
            </div>
            <div className="p-5 space-y-3">
                <p className="text-sm text-slate-600 mb-4">善用工具，讓您的合作更順利。</p>
                <Button onClick={handleViewTemplate} variant="secondary" className="w-full">
                    查看合約範本
                </Button>
                <Button onClick={handleGetSuggestion} variant="secondary" className="w-full">
                    取得 AI 報價建議
                </Button>
            </div>
        </Card>
    );
};

export default CollaborationResourcesWidget;