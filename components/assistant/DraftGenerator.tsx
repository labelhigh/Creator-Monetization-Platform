import React, { useState } from 'react';
import { AIDraft } from '../../types';
import { generateDraft } from '../../services/geminiService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const DraftGenerator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [draft, setDraft] = useState<AIDraft | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            setError('請輸入一個主題或想法。');
            return;
        }
        setIsLoading(true);
        setError(null);
        setDraft(null);
        try {
            const result = await generateDraft(topic);
            setDraft(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : '生成草稿時發生錯誤。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (!draft?.body) return;
        navigator.clipboard.writeText(draft.body).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    
    // Icons
    const WriteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
    const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
    const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;


    return (
        <Card>
            <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                     <div className="flex-shrink-0 text-white bg-indigo-600 p-2 rounded-lg">
                        <WriteIcon />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">草稿生成器</h2>
                        <p className="text-sm text-slate-500">輸入一個想法，讓 AI 為您開啟第一步。</p>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => { setTopic(e.target.value); setError(null); }}
                        placeholder="例如：如何開始您的第一個 Podcast"
                        className="flex-grow rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                        disabled={isLoading}
                    />
                    <Button type="submit" variant="primary" size="lg" disabled={isLoading} className="w-full sm:w-auto">
                        {isLoading ? <Spinner size="sm" /> : '生成草稿'}
                    </Button>
                </form>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            {isLoading && (
                 <div className="p-6 text-center border-t border-slate-200">
                    <Spinner />
                    <p className="text-slate-600 mt-3 font-medium">AI 正在為您撰寫中，請稍候...</p>
                </div>
            )}
            
            {draft && (
                <div className="p-6 border-t border-slate-200 animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-slate-800">{draft.title}</h3>
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                             {copied ? <CheckIcon /> : <CopyIcon />}
                            <span className="ml-2">{copied ? '已複製' : '複製內文'}</span>
                        </Button>
                    </div>
                    <div className="prose prose-slate max-w-none p-4 bg-slate-50 rounded-md border">
                        {draft.body.split('\n').map((line, i) => {
                            if (line.startsWith('### ')) {
                                return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
                            }
                            if (line.startsWith('- ')) {
                                return <p key={i} className="ml-4">{line}</p>;
                            }
                            return <br key={i}/>
                        })}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default DraftGenerator;