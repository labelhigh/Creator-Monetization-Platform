import React, { useState, useEffect } from 'react';
import { MembershipTier } from '../../types';
import Button from '../ui/Button';

interface TierEditModalProps {
    tier: MembershipTier | null;
    onSave: (tier: Omit<MembershipTier, 'id' | 'memberCount'> & { id?: string }) => void;
    onClose: () => void;
}

const TierEditModal: React.FC<TierEditModalProps> = ({ tier, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        perks: [''],
    });

    useEffect(() => {
        if (tier) {
            setFormData({
                name: tier.name,
                description: tier.description,
                price: tier.price,
                perks: tier.perks.length > 0 ? tier.perks : [''],
            });
        }
    }, [tier]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
    };
    
    const handlePerkChange = (index: number, value: string) => {
        const newPerks = [...formData.perks];
        newPerks[index] = value;
        setFormData(prev => ({ ...prev, perks: newPerks }));
    };

    const handleAddPerk = () => {
        setFormData(prev => ({ ...prev, perks: [...prev.perks, ''] }));
    };

    const handleRemovePerk = (index: number) => {
        if (formData.perks.length <= 1) return;
        const newPerks = formData.perks.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, perks: newPerks }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalPerks = formData.perks.map(p => p.trim()).filter(p => p !== '');
        onSave({ ...formData, perks: finalPerks, id: tier?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b sticky top-0 bg-white">
                        <h2 className="text-xl font-bold">{tier ? '編輯會員等級' : '新增會員等級'}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">等級名稱</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">等級描述</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-slate-700">價格 (NT$ / 月)</label>
                            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">專屬福利</label>
                            <div className="space-y-2">
                                {formData.perks.map((perk, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={perk}
                                            onChange={(e) => handlePerkChange(index, e.target.value)}
                                            placeholder={`福利 #${index + 1}`}
                                            className="flex-grow rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePerk(index)}
                                            disabled={formData.perks.length <= 1}
                                            className="p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <Button type="button" variant="secondary" size="sm" onClick={handleAddPerk} className="mt-2">
                                + 新增福利
                            </Button>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>取消</Button>
                        <Button type="submit" variant="primary">儲存變更</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TierEditModal;