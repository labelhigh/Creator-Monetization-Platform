import React from 'react';
import { Block } from '../../../types';
import Button from '../../ui/Button';

interface PreviewProps {
    block: Block;
}

const LinksPreview: React.FC<PreviewProps> = ({ block }) => {
    const { title, links } = block.content;
    
    return (
        <div className="py-16 text-center">
            <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
            <div className="flex justify-center gap-4">
                {links?.map((link: any, i: number) => <Button key={i} variant="outline">{link.text}</Button>)}
            </div>
        </div>
    );
};

export default LinksPreview;
