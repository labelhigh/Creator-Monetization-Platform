import React from 'react';
import { Block } from '../../../types';
import Button from '../../ui/Button';

interface PreviewProps {
    block: Block;
    onUpdate: (newContent: { [key: string]: any }) => void;
    isSelected: boolean;
}

const HeroPreview: React.FC<PreviewProps> = ({ block, onUpdate, isSelected }) => {
    const { title, subtitle, buttonText } = block.content;

    const handleBlur = (field: string, e: React.FocusEvent<HTMLElement>) => {
        onUpdate({ [field]: e.currentTarget.textContent || '' });
    };

    const editableClass = isSelected ? 'outline-dashed outline-1 outline-indigo-400 focus:outline-solid focus:outline-2 focus:bg-indigo-50/50' : '';

    return (
        <div className="text-center py-20 bg-indigo-50 rounded-lg">
            <h1
                className={`text-5xl font-bold text-slate-800 transition-colors duration-200 ${editableClass}`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('title', e)}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
                className={`text-xl text-slate-600 mt-4 transition-colors duration-200 ${editableClass}`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('subtitle', e)}
                dangerouslySetInnerHTML={{ __html: subtitle }}
            />
            {buttonText && (
                <Button className="mt-8" size="lg">
                     <span
                        className={`transition-colors duration-200 ${editableClass}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur('buttonText', e)}
                        dangerouslySetInnerHTML={{ __html: buttonText }}
                    />
                </Button>
            )}
        </div>
    );
};

export default HeroPreview;
