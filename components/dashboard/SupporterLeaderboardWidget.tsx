import React from 'react';
import Card from '../ui/Card';

const SUPPORTERS_DATA = [
    { name: 'Celia H.', avatarSeed: 'supporter1', amount: 5200 },
    { name: 'Ben L.', avatarSeed: 'supporter2', amount: 4800 },
    { name: 'Marcus T.', avatarSeed: 'supporter3', amount: 3500 },
    { name: 'Eva C.', avatarSeed: 'supporter4', amount: 2100 },
    { name: 'Leo W.', avatarSeed: 'supporter5', amount: 1500 },
];

const TrophyIcon = ({ rank }: { rank: number }) => {
    const colors: { [key: number]: string } = {
        1: 'text-amber-400',
        2: 'text-slate-400',
        3: 'text-amber-600',
    };
    return (
         <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors[rank] || 'text-transparent'}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 10-2 0v1.086A7.002 7.002 0 004.586 8.5H4a1 1 0 00-1 1v2.586A7.002 7.002 0 008.5 15.414V16a1 1 0 102 0v-.586A7.002 7.002 0 0015.414 12.5H16a1 1 0 001-1V8.5A7.002 7.002 0 0011.414 4.086V3z" />
            <path d="M6 18a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
        </svg>
    );
};

const SupporterLeaderboardWidget: React.FC = () => {
    return (
        <Card className="col-span-1 lg:col-span-2">
            <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">粉絲貢獻排行榜</h3>
                <p className="text-sm text-slate-500 mt-1">本月核心支持者。</p>
            </div>
            <ul role="list" className="divide-y divide-slate-200">
                {SUPPORTERS_DATA.map((supporter, index) => (
                    <li key={supporter.name} className="py-3 px-6 flex items-center justify-between hover:bg-slate-50">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-slate-400 w-4 text-center">{index + 1}</span>
                             <img className="h-10 w-10 rounded-full object-cover" src={`https://picsum.photos/seed/${supporter.avatarSeed}/100/100`} alt={supporter.name} />
                             <div>
                                <p className="text-sm font-medium text-slate-900">{supporter.name}</p>
                                <p className="text-sm text-indigo-600 font-semibold">NT${supporter.amount.toLocaleString()}</p>
                            </div>
                        </div>
                        <TrophyIcon rank={index + 1} />
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default SupporterLeaderboardWidget;