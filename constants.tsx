import React from 'react';
import { Block, BlockType, Template, View } from './types';

export const Logo = ({ isCollapsed }: { isCollapsed?: boolean }) => (
    <div className="flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {!isCollapsed && <span className="text-xl font-bold text-slate-800 whitespace-nowrap">CreatorMP</span>}
    </div>
);

// Hand-drawn style icons
export const HandDrawnLightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-400" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
        <line x1="9.7" y1="17" x2="14.3" y2="17" />
        <path d="M12 3l0 2" />
        <path d="M6.899 5.9l1.414 1.414" />
        <path d="M17.1 5.9l-1.414 1.414" />
    </svg>
);
export const HandDrawnRocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-rose-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
        <path d="M7 14a6 6 0 0 0 -3 6h6a6 6 0 0 0 -3 -6" />
        <path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
);
export const HandDrawnPenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-sky-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
    </svg>
);

// Fix: Cannot find namespace 'JSX'. Use React.ReactElement instead.
export const NAV_ITEMS: { id: View; name: string; icon: React.ReactElement }[] = [
    { id: 'dashboard', name: '財務中心', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { id: 'editor', name: '網站編輯器', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
    { id: 'products', name: '商品管理', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
    { id: 'memberships', name: '會員管理', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { id: 'services', name: '服務管理', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
    { id: 'collaborations', name: '品牌合作', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg> },
    { id: 'explore', name: '探索模板', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { id: 'guidance', name: '智慧變現引導', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> },
    { id: 'assistant', name: 'AI 創作夥伴', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zM6.343 6.343a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414L6.05 7.464a1 1 0 0 0 0-1.121zM17.657 6.343a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0zM4 14a1 1 0 0 0-1-1H2a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1zm16 0a1 1 0 0 0-1-1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1zm-7 5a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zM9 13.062C9 14.132 9.895 15 11 15h2c1.105 0 2-.868 2-1.938V12.5A2.5 2.5 0 0 0 12.5 10h-1A2.5 2.5 0 0 0 9 12.5v.562z" /><path d="M12 18a6 6 0 0 1-6-6h12a6 6 0 0 1-6 6z" /></svg> },
];

const WRITER_BLOCKS: Block[] = [
    { id: '1', type: BlockType.Hero, content: { title: "文字塑造世界", subtitle: "歡迎來到我的個人部落格與作品集。", buttonText: "閱讀我的作品" } },
    { id: '2', type: BlockType.About, content: { title: "關於作者", text: "我是一位熱情的作家，探索科技、文化與人類經驗的交集。憑藉十多年的經驗，我創作能引起共鳴並激發靈感的故事。" } },
    { id: '3', type: BlockType.Products, content: { title: "我的最新電子書", products: [{ name: "數位時代的寫作者", price: "NT$599" }, { name: "未來敘事", price: "NT$749" }] } },
    { id: '4', type: BlockType.Links, content: { title: "追蹤我的旅程", links: [{ text: "Twitter", url: "#" }, { text: "Medium", url: "#" }] } },
];

const ILLUSTRATOR_BLOCKS: Block[] = [
    { id: '1', type: BlockType.Hero, content: { title: "會說故事的藝術", subtitle: "從我的素描本到您的螢幕的視覺敘事。", buttonText: "查看作品集" } },
    { id: '2', type: BlockType.Gallery, content: { title: "作品集", images: [ "https://picsum.photos/seed/illustrator1/600/400", "https://picsum.photos/seed/illustrator2/600/400", "https://picsum.photos/seed/illustrator3/600/400" ] } },
    { id: '3', type: BlockType.About, content: { title: "畫布之後", text: "作為一名插畫家，我用色彩、形式和想像力將想法變為現實。我的作品靈感來自於大自然和日常生活中異想天開的時刻。" } },
    { id: '4', type: BlockType.Testimonials, content: { title: "客戶怎麼說", testimonials: [{ text: "一位非常棒的合作藝術家！", author: "創意股份有限公司" }] } },
];

const PODCASTER_BLOCKS: Block[] = [
    { id: '1', type: BlockType.Hero, content: { title: "洞見之聲", subtitle: "收聽我關於創意創業的每週播客。", buttonText: "立即收聽" } },
    { id: '2', type: BlockType.Links, content: { title: "收聽平台", links: [{ text: "Spotify", url: "#" }, { text: "Apple Podcasts", url: "#" }, { text: "Patreon", url: "#" }] } },
    { id: '3', type: BlockType.About, content: { title: "認識主持人", text: "我致力於與業界最聰明的人進行有意義的對話。加入我，一同揭開成功的秘密。" } },
    { id: '4', type: BlockType.Products, content: { title: "獨家內容", products: [{ name: "Patreon 訂閱", price: "NT$150/月" }, { name: "周邊商品店", price: "前往商店" }] } },
];

const VIDEO_CREATOR_BLOCKS: Block[] = [
    { id: '1', type: BlockType.Hero, content: { title: "歡迎來到我的頻道", subtitle: "在這裡，我們探索最新的科技與遊戲。", buttonText: "最新影片" } },
    { id: '2', type: BlockType.Links, content: { title: "訂閱與追蹤", links: [{ text: "YouTube", url: "#" }, { text: "Twitch", url: "#" }, { text: "Patreon", url: "#" }] } },
    { id: '3', type: BlockType.Gallery, content: { title: "幕後花絮", images: [ "https://picsum.photos/seed/video1/600/400", "https://picsum.photos/seed/video2/600/400", "https://picsum.photos/seed/video3/600/400" ] } },
    { id: '4', type: BlockType.Products, content: { title: "我的周邊", products: [{ name: "限量版 T-Shirt", price: "NT$899" }, { name: "簽名海報", price: "NT$499" }] } },
];

const PHOTOGRAPHER_BLOCKS: Block[] = [
    { id: '1', type: BlockType.Hero, content: { title: "透過鏡頭捕捉瞬間", subtitle: "專注於人像與風景攝影。", buttonText: "預約拍攝" } },
    { id: '2', type: BlockType.Gallery, content: { title: "精選作品", images: [ "https://picsum.photos/seed/photo1/600/400", "https://picsum.photos/seed/photo2/600/400", "https://picsum.photos/seed/photo3/600/400", "https://picsum.photos/seed/photo4/600/400" ] } },
    { id: '3', type: BlockType.Testimonials, content: { title: "客戶的評價", testimonials: [{ text: "他的作品完美捕捉了我們婚禮當天的情感。", author: "張先生與張太太" }] } },
    { id: '4', type: BlockType.About, content: { title: "關於攝影師", text: "我是一位充滿熱情的攝影師，我相信每張照片背後都有一個故事。讓我來為您講述您的故事。" } },
];

const EDUCATOR_BLOCKS: Block[] = [
    { id: '1', type: BlockType.Hero, content: { title: "精通您的技能", subtitle: "加入我的線上課程，將您的知識提升到新層次。", buttonText: "查看所有課程" } },
    { id: '2', type: BlockType.Products, content: { title: "特色課程", products: [{ name: "網頁開發全攻略", price: "NT$3,000" }, { name: "React 深度解析", price: "NT$4,500" }] } },
    { id: '3', type: BlockType.Testimonials, content: { title: "學員怎麼說", testimonials: [{ text: "這是我上過最棒的線上課程！內容清晰易懂。", author: "學員 A" }] } },
    { id: '4', type: BlockType.About, content: { title: "關於講師", text: "我擁有超過十年的業界經驗，致力於將複雜的觀念變得簡單易學。" } },
];

export const TEMPLATES: Template[] = [
    { id: 'writer', name: '作家書房', description: '一個乾淨、內容優先的模板，非常適合作家與部落客。', creatorType: '寫作', monetizationModel: '電子書銷售', thumbnailUrl: 'https://picsum.photos/seed/writer/500/300', blocks: WRITER_BLOCKS },
    { id: 'illustrator', name: '藝術家工作室', description: '一個視覺豐富的模板，用於展示您令人驚豔的藝術作品集。', creatorType: '插畫', monetizationModel: '委託案', thumbnailUrl: 'https://picsum.photos/seed/illustrator/500/300', blocks: ILLUSTRATOR_BLOCKS },
    { id: 'podcaster', name: '播客錄音間', description: '一個以音訊為中心的模板，旨在擴大您的聽眾群。', creatorType: '播客', monetizationModel: '訂閱制', thumbnailUrl: 'https://picsum.photos/seed/podcaster/500/300', blocks: PODCASTER_BLOCKS },
    { id: 'video-creator', name: '影音創作者', description: '專為 YouTuber 或實況主設計，整合社群連結與商品。', creatorType: '影音', monetizationModel: '周邊商品與贊助', thumbnailUrl: 'https://picsum.photos/seed/videocreator/500/300', blocks: VIDEO_CREATOR_BLOCKS },
    { id: 'photographer', name: '攝影師', description: '極簡且以視覺為中心的設計，完美呈現您的攝影作品。', creatorType: '攝影', monetizationModel: '作品銷售與預約', thumbnailUrl: 'https://picsum.photos/seed/photographer/500/300', blocks: PHOTOGRAPHER_BLOCKS },
    { id: 'educator', name: '線上課程講師', description: '專業且值得信賴的版面，專為銷售線上課程而設計。', creatorType: '教育', monetizationModel: '課程銷售', thumbnailUrl: 'https://picsum.photos/seed/educator/500/300', blocks: EDUCATOR_BLOCKS },
];