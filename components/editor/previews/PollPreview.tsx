import React from 'react';
import { Block } from '../../../types';

interface PreviewProps {
    block: Block;
}

const PollPreview: React.FC<PreviewProps> = ({ block }) => {
    const { question, options } = block.content;
    const pollPercentages = [48, 35, 17, 9, 5]; // Dummy data for preview

    return (
        <div className="py-16">
            <h2 className="text-3xl font-bold text-center mb-8">{question}</h2>
            <div className="max-w-xl mx-auto space-y-3">
                {options?.map((opt: any, i: number) => (
                    <div key={i} className="relative border rounded-lg p-4 text-slate-700 font-medium overflow-hidden bg-slate-50">
                        <div 
                            className="absolute top-0 left-0 h-full bg-indigo-100 z-0" 
                            style={{ width: `${pollPercentages[i % pollPercentages.length]}%` }}
                        ></div>
                        <div className="relative z-10 flex justify-between">
                            <span>{opt.text}</span>
                            <span className="font-semibold">{pollPercentages[i % pollPercentages.length]}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PollPreview;
