import React from 'react';
import { MembershipTier } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface TierCardProps {
    tier: MembershipTier;
    onEdit: (tier: MembershipTier) => void;
    onDelete: (tierId: string) => void;
}

const TierBadgeIcon: React.FC<{ price: number }> = ({ price }) => {
    if (price >= 800) {
        // Gold Tier - Trophy
        return (
            <div className="text-amber-400" title="頂級方案">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1.086A7.002 7.002 0 004.586 8.5H4a1 1 0 00-1 1v2.586A7.002 7.002 0 008.5 15.414V16a1 1 0 102 0v-.586A7.002 7.002 0 0015.414 12.5H16a1 1 0 001-1V8.5A7.002 7.002 0 0011.414 4.086V3z" />
                    <path d="M6 18a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                </svg>
            </div>
        );
    }
    if (price >= 200) {
        // Silver Tier - Badge
        return (
            <div className="text-slate-400" title="中階方案">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
        );
    }
    // Bronze Tier - Star
    return (
        <div className="text-amber-600" title="基礎方案">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </div>
    );
};

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const UserGroupIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
);

const TierCard: React.FC<TierCardProps> = ({ tier, onEdit, onDelete }) => {
    return (
        <Card className="flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6 border-b">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-slate-800">{tier.name}</h3>
                    <TierBadgeIcon price={tier.price} />
                </div>
                <p className="text-slate-500 text-sm mt-1">{tier.description}</p>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-indigo-600">NT${tier.price}</span>
                    <span className="ml-1 text-slate-500 font-medium">/ 月</span>
                </div>
            </div>
            <div className="p-6 flex-grow">
                <h4 className="font-semibold text-slate-700 mb-3">福利內容：</h4>
                <ul className="space-y-2">
                    {tier.perks.map((perk, index) => (
                        <li key={index} className="flex items-start">
                            <CheckIcon />
                            <span className="ml-2 text-sm text-slate-600">{perk}</span>
                        </li>
                    ))}
                </ul>
            </div>
             <div className="p-4 bg-slate-50 border-t flex items-center justify-between">
                <div className="flex items-center text-sm font-semibold text-slate-600">
                    <UserGroupIcon />
                    <span>{tier.memberCount} 位會員</span>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(tier)}>編輯</Button>
                    <Button size="sm" variant="outline" onClick={() => onDelete(tier.id)} className="text-red-600 hover:bg-red-50">刪除</Button>
                </div>
            </div>
        </Card>
    );
};

export default TierCard;