
import React, { useState } from 'react';
import { GuidanceReportData } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface GuidanceReportProps {
    report: GuidanceReportData;
    onReset: () => void;
}

// --- Icons ---
const ProductIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const PricingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4a2 2 0 00-2-2H8a2 2 0 00-2 2h4v1M12 18V9" /></svg>;
const MarketingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.358 1.84 18.668 1.5 19 1.5v12.553a4.002 4.002 0 01-3.283 3.942M11 18a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const SuccessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-6.219-8.56" /><path d="M21 3v5h-5" /></svg>;


const ReportSection: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => (
    <section className="mb-10">
        <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3 mb-6">
            <div className="flex-shrink-0 text-indigo-600 bg-indigo-100 p-2 rounded-lg">
                {icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        </div>
        {children}
    </section>
);

const GuidanceReport: React.FC<GuidanceReportProps> = ({ report, onReset }) => {
    const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

    const handleCopy = (template: string) => {
        if (!navigator.clipboard) {
            alert("您的瀏覽器不支援複製功能。");
            return;
        }
        navigator.clipboard.writeText(template).then(() => {
            setCopiedTemplate(template);
            setTimeout(() => setCopiedTemplate(null), 2500);
        }).catch(err => {
            console.error("無法複製文字: ", err);
            alert("複製失敗！");
        });
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-slate-800">您的個人化變現指南</h1>
                <p className="text-slate-600 mt-2">這裡有一些專為您量身打造、可立即執行的策略。</p>
            </div>
            
            <Card className="p-6 sm:p-10">
                <ReportSection title="產品建議" icon={<ProductIcon />}>
                    <div className="space-y-4">
                        {report.productSuggestions.map((item, index) => (
                            <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <h3 className="font-bold text-indigo-700">{item.name}</h3>
                                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                                <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200"><strong>適合原因：</strong> {item.rationale}</p>
                            </div>
                        ))}
                    </div>
                </ReportSection>

                <ReportSection title="定價策略" icon={<PricingIcon />}>
                     <div className="space-y-4">
                        {report.pricingStrategies.map((item, index) => (
                             <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <h3 className="font-bold text-indigo-700">{item.name}</h3>
                                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                                <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200"><strong>最適合：</strong> {item.suitability}</p>
                            </div>
                        ))}
                    </div>
                </ReportSection>
                
                <ReportSection title="行銷文案模板" icon={<MarketingIcon />}>
                    <div className="space-y-4">
                        {report.marketingCopyTemplates.map((item, index) => (
                            <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative">
                                <h3 className="font-bold text-indigo-700 pr-20">用於 {item.platform}</h3>
                                <p className="text-sm text-slate-600 mt-2 bg-slate-200 p-3 rounded font-mono whitespace-pre-wrap">"{item.template}"</p>
                                <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleCopy(item.template)}
                                    className="absolute top-4 right-4"
                                >
                                    {copiedTemplate === item.template ? 
                                        <><CheckIcon /><span className="ml-2">已複製</span></> : 
                                        <><CopyIcon /><span className="ml-2">複製</span></>
                                    }
                                </Button>
                            </div>
                        ))}
                    </div>
                </ReportSection>

                 <ReportSection title="成功案例" icon={<SuccessIcon />}>
                     <div className="space-y-4">
                        {report.successStories.map((item, index) => (
                             <div key={index} className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
                                <h3 className="font-bold text-indigo-700">{item.creatorType} 的故事</h3>
                                <p className="text-sm text-slate-700 mt-1 italic">"{item.story}"</p>
                            </div>
                        ))}
                    </div>
                </ReportSection>
            </Card>

            <div className="text-center mt-8">
                <Button onClick={onReset} variant="outline">
                    <RefreshIcon />
                    <span className="ml-2">開始新的分析</span>
                </Button>
            </div>
        </div>
    );
};

export default GuidanceReport;
