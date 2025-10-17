import React, { useState } from 'react';
import { TEMPLATES } from '../../constants';
import TemplateCard from './TemplateCard';
import Card from '../ui/Card';

const TemplateGallery: React.FC = () => {
    const [filter, setFilter] = useState('全部');
    const creatorTypes = ['全部', ...new Set(TEMPLATES.map(t => t.creatorType))];

    const filteredTemplates = filter === '全部' ? TEMPLATES : TEMPLATES.filter(t => t.creatorType === filter);

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800">探索模板</h1>
            <p className="text-slate-600 mt-2 mb-6">找到一個符合您風格的起點。您可以匯入模板的架構，並填入您自己的內容。</p>
            
            <Card className="p-4 mb-8">
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-slate-700">依創作者類型篩選：</span>
                    {creatorTypes.map(type => (
                        <button 
                            key={type} 
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === type ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemplates.map(template => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>
        </div>
    );
};

export default TemplateGallery;