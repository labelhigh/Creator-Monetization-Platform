import React from 'react';
import { Block } from '../../../types';

interface PreviewProps {
    block: Block;
    onUpdate: (newContent: { [key: string]: any }) => void;
    isSelected: boolean;
}

const AboutPreview: React.FC<PreviewProps> = ({ block, onUpdate, isSelected }) => {
    const { title, text } = block.content;

    const handleBlur = (field: string, e: React.FocusEvent<HTMLElement>) => {
        onUpdate({ [field]: e.currentTarget.textContent || '' });
    };
    
    const editableClass = isSelected ? 'outline-dashed outline-1 outline-indigo-400 focus:outline-solid focus:outline-2 focus:bg-indigo-50/50' : '';

    return (
        <div className="py-16 text-center">
            <h2 
                className={`text-3xl font-bold text-slate-800 transition-colors duration-200 ${editableClass}`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('title', e)}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <p 
                className={`max-w-2xl mx-auto text-slate-600 mt-4 whitespace-pre-wrap transition-colors duration-200 ${editableClass}`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('text', e)}
                dangerouslySetInnerHTML={{ __html: text }}
            />
        </div>
    );
};

export default AboutPreview;
