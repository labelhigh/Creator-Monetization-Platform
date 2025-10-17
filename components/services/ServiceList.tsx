import React from 'react';
import { Service } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ServiceListProps {
    services: Service[];
    onEdit: (service: Service) => void;
    onDelete: (serviceId: string) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onEdit, onDelete }) => {
    
    if (services.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed border-slate-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h3 className="mt-2 text-sm font-medium text-slate-900">尚無服務</h3>
                <p className="mt-1 text-sm text-slate-500">點擊「新增服務」來建立您的第一個專業服務項目。</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
                <Card key={service.id} className="flex flex-col">
                    <div className="p-5 flex-grow">
                        <h3 className="text-lg font-bold text-slate-800 truncate">{service.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">{service.duration} 分鐘</p>
                        <p className="text-indigo-600 font-bold text-xl mt-2">NT${service.price.toLocaleString()}</p>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-slate-500">預約數</p>
                                <p className="font-semibold text-slate-700">{service.bookingCount}</p>
                            </div>
                            <div>
                                <p className="text-slate-500">總收入</p>
                                <p className="font-semibold text-slate-700">NT${service.revenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-3 flex justify-end gap-2 border-t">
                        <Button size="sm" variant="outline" onClick={() => onEdit(service)}>編輯</Button>
                        <Button size="sm" variant="outline" onClick={() => onDelete(service.id)} className="text-red-600 hover:bg-red-50">刪除</Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ServiceList;