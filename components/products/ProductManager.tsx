import React, { useState, useContext } from 'react';
import { ProductContext } from '../../App';
import { Product } from '../../types';
import Button from '../ui/Button';
import ProductList from './ProductList';
import ProductEditModal from './ProductEditModal';
import { v4 as uuidv4 } from 'uuid';

const ProductManager: React.FC = () => {
    const productContext = useContext(ProductContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    if (!productContext) {
        return <div>載入中...</div>;
    }

    const { products, setProducts } = productContext;

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = (productId: string) => {
        if (window.confirm('您確定要刪除這個商品嗎？此操作無法復原。')) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    const handleSave = (productToSave: Omit<Product, 'id' | 'sales' | 'revenue'> & { id?: string }) => {
        if (productToSave.id) {
            // Update
            setProducts(products.map(p => p.id === productToSave.id ? { ...p, ...productToSave } : p));
        } else {
            // Create
            const newProduct: Product = {
                ...productToSave,
                id: uuidv4(),
                sales: 0,
                revenue: 0,
            };
            setProducts([newProduct, ...products]);
        }
        setIsModalOpen(false);
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">數位商品商店</h1>
                    <p className="text-slate-600 mt-2">在這裡管理您的所有數位商品，例如電子書、課程或設計模板。</p>
                </div>
                <Button variant="primary" onClick={handleAddNew}>
                    + 新增商品
                </Button>
            </div>
            
            <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />

            {isModalOpen && (
                <ProductEditModal 
                    product={editingProduct}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ProductManager;