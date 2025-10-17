import React, { useState, useContext } from 'react';
import { MembershipContext } from '../../App';
import { MembershipTier } from '../../types';
import Button from '../ui/Button';
import TierCard from './TierCard';
import TierEditModal from './TierEditModal';
import { v4 as uuidv4 } from 'uuid';

const MembershipManager: React.FC = () => {
    const membershipContext = useContext(MembershipContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTier, setEditingTier] = useState<MembershipTier | null>(null);

    if (!membershipContext) {
        return <div>載入中...</div>;
    }

    const { tiers, setTiers } = membershipContext;

    const handleAddNew = () => {
        setEditingTier(null);
        setIsModalOpen(true);
    };

    const handleEdit = (tier: MembershipTier) => {
        setEditingTier(tier);
        setIsModalOpen(true);
    };

    const handleDelete = (tierId: string) => {
        if (window.confirm('您確定要刪除這個會員等級嗎？')) {
            setTiers(tiers.filter(t => t.id !== tierId));
        }
    };

    const handleSave = (tierToSave: Omit<MembershipTier, 'id' | 'memberCount'> & { id?: string }) => {
        if (tierToSave.id) {
            // Update
            setTiers(tiers.map(t => t.id === tierToSave.id ? { ...t, ...tierToSave } : t));
        } else {
            // Create
            const newTier: MembershipTier = {
                ...tierToSave,
                id: uuidv4(),
                memberCount: 0,
            };
            setTiers([...tiers, newTier]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">分級訂閱制</h1>
                    <p className="text-slate-600 mt-2">設計您的會員方案，為粉絲提供獨家價值，建立穩定的收入來源。</p>
                </div>
                <Button variant="primary" onClick={handleAddNew}>
                    + 新增會員等級
                </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {tiers.sort((a, b) => a.price - b.price).map(tier => (
                    <TierCard key={tier.id} tier={tier} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>

            {isModalOpen && (
                <TierEditModal 
                    tier={editingTier}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default MembershipManager;