import React from 'react';
import { Block } from '../../../types';

interface PreviewProps {
    block: Block;
}

const ProductsPreview: React.FC<PreviewProps> = ({ block }) => {
    const { title, products } = block.content;

    return (
        <div className="py-16">
            <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products?.map((p: any, i: number) => 
                    <div key={i} className="border rounded-lg p-6 text-center bg-white">
                        <h3 className="text-lg font-semibold">{p.name}</h3>
                        <p className="text-indigo-600 font-bold mt-2">{p.price}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPreview;
