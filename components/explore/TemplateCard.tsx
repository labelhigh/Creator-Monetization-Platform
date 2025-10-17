import React, { useContext } from 'react';
import { CreatorContext } from '../../App';
import { Template } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface TemplateCardProps {
    template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
    const creatorContext = useContext(CreatorContext);
    
    const handleImport = () => {
        if (creatorContext) {
            creatorContext.applyTemplate(template.id);
            alert(`模板「${template.name}」已匯入！請至網站編輯器中查看。`);
        }
    };

    return (
        <Card>
            <img className="w-full h-48 object-cover" src={template.thumbnailUrl} alt={template.name} />
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-800">{template.name}</h3>
                    <div className="flex gap-2">
                        <span className="text-xs font-semibold bg-sky-100 text-sky-800 px-2 py-1 rounded-full">{template.creatorType}</span>
                    </div>
                </div>
                <p className="text-slate-600 mt-2 text-sm">{template.description}</p>
                <div className="mt-6 flex justify-end">
                    <Button onClick={handleImport} variant="secondary" size="sm">
                        匯入架構
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default TemplateCard;