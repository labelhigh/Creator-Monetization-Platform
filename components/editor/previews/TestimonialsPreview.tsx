import React from 'react';
import { Block } from '../../../types';

interface PreviewProps {
    block: Block;
}

const TestimonialsPreview: React.FC<PreviewProps> = ({ block }) => {
    const { title, testimonials } = block.content;
    return (
        <div className="py-16 bg-slate-100 rounded-lg">
             <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
             <div className="text-center max-w-xl mx-auto">
                {testimonials?.map((t: any, i: number) => 
                <blockquote key={i}>
                    <p className="text-xl italic text-slate-700">"{t.text}"</p>
                    <footer className="mt-4 font-semibold text-slate-500">- {t.author}</footer>
                </blockquote>
                )}
             </div>
        </div>
    );
};

export default TestimonialsPreview;
