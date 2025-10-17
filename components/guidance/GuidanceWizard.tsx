import React, { useState } from 'react';
import { GuidanceAnswers, GuidanceReportData } from '../../types';
import { generateMonetizationGuide } from '../../services/geminiService';
import GuidanceReport from './GuidanceReport';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Card from '../ui/Card';
import { HandDrawnRocketIcon } from '../../constants';

// --- Step Components ---

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

interface IntroStepProps {
    onStart: () => void;
}
const IntroStep: React.FC<IntroStepProps> = ({ onStart }) => (
    <Card className="p-8 text-center flex flex-col items-center">
        <HandDrawnRocketIcon />
        <h1 className="text-3xl font-bold text-slate-800 mt-4">AI 智慧變現導航</h1>
        <p className="text-slate-600 mt-4 max-w-xl">
            準備好將您的熱情轉化為收入了嗎？回答三個關鍵問題，我們的 AI 將運用
            <span className="font-semibold text-indigo-600"> Why-How 分析框架 </span>
            為您打造一份個人化的變現藍圖。
        </p>
        <button
            onClick={onStart}
            className="mt-8 group inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-full transition-all duration-300 ease-in-out shadow-lg shadow-indigo-500/50 transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-95"
        >
            <span>開始分析</span>
            <ArrowRightIcon />
        </button>
    </Card>
);

interface QuestionStepProps {
    answers: GuidanceAnswers;
    onAnswersChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    error: string | null;
}
const QuestionStep: React.FC<QuestionStepProps> = ({ answers, onAnswersChange, onSubmit, error }) => (
    <Card className="p-8">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Why-How 分析</h2>
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label htmlFor="monetizationGoal" className="block text-sm font-medium text-slate-700">
                    <span className="font-bold text-indigo-600">Why (為何)？</span> 您想變現的主要目標是什麼？
                </label>
                <input type="text" name="monetizationGoal" id="monetizationGoal" value={answers.monetizationGoal} onChange={onAnswersChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" placeholder="例如：增加副業收入、轉為全職工作" required />
                <p className="text-xs text-slate-500 mt-1">這能幫助 AI 了解您的核心動機，並客製化最符合您抱負的策略。</p>
            </div>
            <div>
                <label htmlFor="coreContent" className="block text-sm font-medium text-slate-700">
                    <span className="font-bold text-indigo-600">How (如何 - 第 1 部分)？</span> 請簡要描述您的核心內容。
                </label>
                <textarea name="coreContent" id="coreContent" value={answers.coreContent} onChange={onAnswersChange} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" placeholder="例如：每週的科技 podcast、水彩插畫" required />
                <p className="text-xs text-slate-500 mt-1">AI 將根據您的內容類型，建議最相關的產品與服務。</p>
            </div>
            <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-700">
                    <span className="font-bold text-indigo-600">How (如何 - 第 2 部分)？</span> 您的目標受眾是誰？
                </label>
                <input type="text" name="targetAudience" id="targetAudience" value={answers.targetAudience} onChange={onAnswersChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" placeholder="例如：年輕專業人士、有抱負的藝術家" required />
                <p className="text-xs text-slate-500 mt-1">了解您的受眾有助於 AI 推薦最有效的定價與行銷方式。</p>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex justify-end">
                <Button type="submit" variant="primary">生成我的指南</Button>
            </div>
        </form>
    </Card>
);

const LoadingStep: React.FC = () => (
    <Card className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
        <h2 className="text-2xl font-bold text-slate-800 mt-6">正在為您制定策略...</h2>
        <p className="text-slate-500 mt-2">我們的 AI 正在分析您的目標，並準備個人化報告。</p>
    </Card>
);

// --- Main Wizard Component ---

const GuidanceWizard: React.FC = () => {
    const [step, setStep] = useState(0); // 0: intro, 1: questions, 2: loading, 3: report
    const [answers, setAnswers] = useState<GuidanceAnswers>({
        monetizationGoal: '',
        coreContent: '',
        targetAudience: '',
    });
    const [report, setReport] = useState<GuidanceReportData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setStep(2); // show loading
        try {
            // 現在呼叫的是模擬函式，不再需要傳遞 answers
            const result = await generateMonetizationGuide();
            setReport(result);
            setStep(3); // show report
        } catch (err) {
            setError(err instanceof Error ? err.message : '發生未知錯誤。');
            setStep(1); // go back to questions
        }
    };

    switch(step) {
        case 0: return <IntroStep onStart={() => setStep(1)} />;
        case 1: return <QuestionStep answers={answers} onAnswersChange={handleInputChange} onSubmit={handleSubmit} error={error} />;
        case 2: return <LoadingStep />;
        case 3: return report ? <GuidanceReport report={report} onReset={() => setStep(0)} /> : <div>錯誤</div>;
        default: return <IntroStep onStart={() => setStep(1)} />;
    }
};

export default GuidanceWizard;