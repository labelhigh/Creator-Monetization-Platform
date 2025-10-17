import React from 'react';
import CollaborationPreferencesWidget from './CollaborationPreferencesWidget';
import InvitationList from './InvitationList';
import CollaborationResourcesWidget from './CollaborationResourcesWidget';

const BrandCollaborationDashboard: React.FC = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">品牌合作儀表板</h1>
                <p className="text-slate-600 mt-2">在這裡管理您的商業合作機會、設定偏好，並尋找實用資源。</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <InvitationList />
                </div>
                <div className="space-y-8">
                    <CollaborationPreferencesWidget />
                    <CollaborationResourcesWidget />
                </div>
            </div>
        </div>
    );
};

export default BrandCollaborationDashboard;