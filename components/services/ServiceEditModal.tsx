import React, { useState, useEffect } from 'react';
import { Service } from '../../types';
import Button from '../ui/Button';

interface ServiceEditModalProps {
    service: Service | null;
    onSave: (service: Omit<Service, 'id' | 'bookingCount' | 'revenue'> & { id?: string }) => void;
    onClose: () => void;
}

const ServiceEditModal: React.FC<ServiceEditModalProps> = ({ service, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        duration: 30,
    });

    useEffect(() => {
        if (service) {
            setFormData({
                name: service.name,
                description: service.description,
                price: service.price,
                duration: service.duration,
            });
        }
    }, [service]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: service?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">{service ? '編輯服務' : '新增服務'}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">服務名稱</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">服務描述</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-slate-700">價格 (NT$)</label>
                                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                            </div>
                            <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-slate-700">時長 (分鐘)</label>
                                <input type="number" name="duration" id="duration" value={formData.duration} onChange={handleChange} required min="1" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>取消</Button>
                        <Button type="submit" variant="primary">儲存變更</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceEditModal;