import React from 'react';
import { Product } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
    
    if (products.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed border-slate-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <h3 className="mt-2 text-sm font-medium text-slate-900">尚無商品</h3>
                <p className="mt-1 text-sm text-slate-500">點擊「新增商品」來建立您的第一個數位產品。</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <Card key={product.id} className="flex flex-col">
                    <div className="p-5 flex-grow">
                        <h3 className="text-lg font-bold text-slate-800 truncate">{product.name}</h3>
                        <p className="text-indigo-600 font-bold text-xl mt-2">NT${product.price.toLocaleString()}</p>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-slate-500">銷量</p>
                                <p className="font-semibold text-slate-700">{product.sales}</p>
                            </div>
                            <div>
                                <p className="text-slate-500">總收入</p>
                                <p className="font-semibold text-slate-700">NT${product.revenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-3 flex justify-end gap-2 border-t">
                        <Button size="sm" variant="outline" onClick={() => onEdit(product)}>編輯</Button>
                        <Button size="sm" variant="outline" onClick={() => onDelete(product.id)} className="text-red-600 hover:bg-red-50">刪除</Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ProductList;