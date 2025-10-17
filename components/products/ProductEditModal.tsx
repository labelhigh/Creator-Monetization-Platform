import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import Button from '../ui/Button';

interface ProductEditModalProps {
    product: Product | null;
    onSave: (product: Omit<Product, 'id' | 'sales' | 'revenue'> & { id?: string }) => void;
    onClose: () => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        fileName: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                fileName: product.fileName,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: product?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">{product ? '編輯商品' : '新增商品'}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">商品名稱</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">商品描述</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-slate-700">價格 (NT$)</label>
                            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">商品檔案</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <div className="flex text-sm text-slate-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>上傳檔案</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">或拖曳到此處</p>
                                    </div>
                                    <p className="text-xs text-slate-500">PDF, ZIP, MP4, PNG, JPG (功能為示意)</p>
                                    {formData.fileName && <p className="text-sm text-green-600 mt-2">已選擇檔案: {formData.fileName}</p>}
                                </div>
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

export default ProductEditModal;