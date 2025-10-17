import React from 'react';
import { Block } from '../../../types';

interface PreviewProps {
    block: Block;
}

const GalleryPreview: React.FC<PreviewProps> = ({ block }) => {
    const { title, images } = block.content;

    return (
        <div className="py-16">
            <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {images?.map((src: string, i: number) => <img key={i} src={src} className="rounded-lg object-cover w-full h-64" alt={`Gallery item ${i+1}`} />)}
            </div>
        </div>
    );
};

export default GalleryPreview;
