import React, { useContext } from 'react';
import { CollaborationContext } from '../../App';
import InvitationCard from './InvitationCard';
import Card from '../ui/Card';

const InvitationList: React.FC = () => {
    const context = useContext(CollaborationContext);

    if (!context) {
        return <Card className="p-5">載入中...</Card>;
    }

    const { invites } = context;

    const pendingInvites = invites.filter(i => i.status === 'pending');
    const otherInvites = invites.filter(i => i.status !== 'pending').sort((a, b) => new Date(b.dateReceived).getTime() - new Date(a.dateReceived).getTime());

    if (invites.length === 0) {
        return (
             <Card className="p-5">
                <div className="text-center py-12">
                     <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <h3 className="mt-2 text-sm font-medium text-slate-900">沒有合作邀約</h3>
                    <p className="mt-1 text-sm text-slate-500">當有新的品牌合作機會時，會顯示在這裡。</p>
                </div>
             </Card>
        );
    }
    
    return (
        <Card>
            <div className="p-5 border-b">
                <h3 className="text-lg font-bold">合作邀約 ({pendingInvites.length} 則待處理)</h3>
            </div>
            <div className="p-5 bg-slate-50/50">
                 <div className="space-y-4">
                    {pendingInvites.map(invite => <InvitationCard key={invite.id} invite={invite} />)}
                    {otherInvites.map(invite => <InvitationCard key={invite.id} invite={invite} />)}
                </div>
            </div>
        </Card>
    );
};

export default InvitationList;