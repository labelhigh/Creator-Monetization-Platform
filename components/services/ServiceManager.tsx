import React, { useState, useContext } from 'react';
import { ServiceContext } from '../../App';
import { Service } from '../../types';
import Button from '../ui/Button';
import ServiceList from './ServiceList';
import ServiceEditModal from './ServiceEditModal';
import { v4 as uuidv4 } from 'uuid';

const ServiceManager: React.FC = () => {
    const serviceContext = useContext(ServiceContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    if (!serviceContext) {
        return <div>載入中...</div>;
    }

    const { services, setServices } = serviceContext;

    const handleAddNew = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleDelete = (serviceId: string) => {
        if (window.confirm('您確定要刪除這個服務項目嗎？')) {
            setServices(services.filter(s => s.id !== serviceId));
        }
    };

    const handleSave = (serviceToSave: Omit<Service, 'id' | 'bookingCount' | 'revenue'> & { id?: string }) => {
        if (serviceToSave.id) {
            // Update
            setServices(services.map(s => s.id === serviceToSave.id ? { ...s, ...serviceToSave } : s));
        } else {
            // Create
            const newService: Service = {
                ...serviceToSave,
                id: uuidv4(),
                bookingCount: 0,
                revenue: 0,
            };
            setServices([newService, ...services]);
        }
        setIsModalOpen(false);
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">服務與諮詢</h1>
                    <p className="text-slate-600 mt-2">管理您的一對一諮詢、客製化設計等可預約的專業服務。</p>
                </div>
                <Button variant="primary" onClick={handleAddNew}>
                    + 新增服務
                </Button>
            </div>
            
            <ServiceList services={services} onEdit={handleEdit} onDelete={handleDelete} />

            {isModalOpen && (
                <ServiceEditModal 
                    service={editingService}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ServiceManager;