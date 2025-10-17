import React from 'react';
import Card from '../ui/Card';

const SUGGESTIONS = [
    { title: '深度解析：為什麼短影音是下一波內容趨勢？', category: '市場分析', color: 'blue' },
    { title: '教學：5 個技巧讓你的影片剪輯功力大增', category: '技能提升', color: 'green' },
    { title: '訪談：與一位成功的全職創作者對談', category: '人物故事', color: 'purple' },
    { title: '開箱：最新款的麥克風值得入手嗎？', category: '產品評測', color: 'red' },
];

const colorClasses = {
    blue: { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-500' },
    green: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-500' },
    purple: { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-500' },
    red: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-500' },
}

const SuggestionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;


const TopicSuggestions: React.FC = () => {
    return (
        <Card>
            <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 text-white bg-amber-500 p-2 rounded-lg">
                        <SuggestionIcon />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">主題趨勢分析</h2>
                        <p className="text-sm text-slate-500">AI 為您分析的熱門創作靈感。</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {SUGGESTIONS.map((s, index) => {
                    const colors = colorClasses[s.color as keyof typeof colorClasses] || colorClasses.blue;
                    return (
                        <div key={index} className={`border-l-4 ${colors.border} ${colors.bg} p-4 rounded-r-md`}>
                            <p className={`text-xs font-bold ${colors.text}`}>{s.category}</p>
                            <h3 className="font-semibold text-slate-800 mt-1">{s.title}</h3>
                        </div>
                    )
                })}
            </div>
        </Card>
    );
};

export default TopicSuggestions;