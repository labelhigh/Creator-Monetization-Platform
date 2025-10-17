import React, { useContext } from 'react';
import { CollaborationInvite } from '../../types';
import { CollaborationContext } from '../../App';
import Button from '../ui/Button';

interface InvitationCardProps {
    invite: CollaborationInvite;
}

const statusStyles = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: '待處理' },
    accepted: { bg: 'bg-green-100', text: 'text-green-800', label: '已接受' },
    declined: { bg: 'bg-red-100', text: 'text-red-800', label: '已婉拒' },
};

const InvitationCard: React.FC<InvitationCardProps> = ({ invite }) => {
    const context = useContext(CollaborationContext);

    const handleStatusChange = (newStatus: 'accepted' | 'declined') => {
        if (!context) return;
        context.setInvites(prevInvites => 
            prevInvites.map(i => i.id === invite.id ? { ...i, status: newStatus } : i)
        );
    };

    const style = statusStyles[invite.status];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <img src={invite.brandLogoUrl} alt={`${invite.brandName} logo`} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <h4 className="text-lg font-bold text-slate-800">{invite.brandName}</h4>
                            <p className="text-sm text-slate-500">{new Date(invite.dateReceived).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1 text-xs font-semibold rounded-full ${style.bg} ${style.text}`}>
                        {style.label}
                    </div>
                </div>
                
                <p className="text-slate-600 mt-4 text-sm bg-slate-50 p-3 rounded-md border">{invite.message}</p>
                
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-slate-500">合作報價</p>
                        <p className="text-xl font-bold text-indigo-600">NT${invite.offer.toLocaleString()}</p>
                    </div>
                     {invite.status === 'pending' && (
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleStatusChange('declined')} className="text-red-600 hover:bg-red-50">婉拒</Button>
                            <Button size="sm" variant="primary" onClick={() => handleStatusChange('accepted')}>接受</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvitationCard;