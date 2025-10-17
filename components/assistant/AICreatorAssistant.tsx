import React from 'react';
import TopicSuggestions from './TopicSuggestions';
import DraftGenerator from './DraftGenerator';

const AICreatorAssistant: React.FC = () => {
    return (
        <div>
            <div className="mb-10 text-center">
                 <h1 className="text-4xl font-extrabold text-slate-800">AI 創作夥伴</h1>
                <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
                    您的專屬創作助理。從靈感激發到草稿撰寫，讓 AI 賦能您的創作流程，減輕負擔，專注於傳遞最高品質的內容。
                </p>
            </div>

            <div className="space-y-12">
                <TopicSuggestions />
                <DraftGenerator />
            </div>
        </div>
    );
};

export default AICreatorAssistant;