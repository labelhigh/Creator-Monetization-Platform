import React, { useState, useCallback, useMemo } from 'react';
import { View, Block, Product, MembershipTier, Service, CollaborationInvite, CollaborationPreferences } from './types';
import { TEMPLATES } from './constants';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import WebsiteEditor from './components/editor/WebsiteEditor';
import TemplateGallery from './components/explore/TemplateGallery';
import GuidanceWizard from './components/guidance/GuidanceWizard';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs
import AICreatorAssistant from './components/assistant/AICreatorAssistant';
import ProductManager from './components/products/ProductManager';
import MembershipManager from './components/memberships/MembershipManager';
import ServiceManager from './components/services/ServiceManager';
import BrandCollaborationDashboard from './components/collaborations/BrandCollaborationDashboard';

interface CreatorContextType {
    blocks: Block[];
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
    applyTemplate: (templateId: string) => void;
}
export const CreatorContext = React.createContext<CreatorContextType | null>(null);

interface ProductContextType {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
export const ProductContext = React.createContext<ProductContextType | null>(null);

interface MembershipContextType {
    tiers: MembershipTier[];
    setTiers: React.Dispatch<React.SetStateAction<MembershipTier[]>>;
}
export const MembershipContext = React.createContext<MembershipContextType | null>(null);

interface ServiceContextType {
    services: Service[];
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}
export const ServiceContext = React.createContext<ServiceContextType | null>(null);

interface CollaborationContextType {
    preferences: CollaborationPreferences;
    setPreferences: React.Dispatch<React.SetStateAction<CollaborationPreferences>>;
    invites: CollaborationInvite[];
    setInvites: React.Dispatch<React.SetStateAction<CollaborationInvite[]>>;
}
export const CollaborationContext = React.createContext<CollaborationContextType | null>(null);


const MOCK_PRODUCTS: Product[] = [
    { id: uuidv4(), name: '數位時代的寫作者', description: '一本專為現代內容創作者設計的電子書。', price: 599, fileName: 'ebook-writer-era.pdf', sales: 120, revenue: 71880 },
    { id: uuidv4(), name: 'Procreate 筆刷大全', description: '超過 50 種精心製作的 Procreate 筆刷，適用於各種插畫風格。', price: 299, fileName: 'procreate-brushes-vol1.zip', sales: 350, revenue: 104650 },
    { id: uuidv4(), name: '網頁開發全攻略', description: '從零到一，學習現代網頁開發所需的一切技能。', price: 3000, fileName: 'web-dev-course.zip', sales: 45, revenue: 135000 },
    { id: uuidv4(), name: 'Podcast Intro 音樂包', description: '10 首專業製作的免版稅 Podcast 片頭音樂。', price: 799, fileName: 'podcast-intro-pack.zip', sales: 85, revenue: 67915 },
    { id: uuidv4(), name: '電影感 Lightroom 濾鏡', description: '一鍵套用，讓您的照片擁有電影般的質感與氛圍。', price: 450, fileName: 'cinematic-lightroom-presets.zip', sales: 210, revenue: 94500 },
    { id: uuidv4(), name: 'Notion 個人理財模板', description: '一個全面的 Notion 模板，幫助您輕鬆追蹤收入、支出與投資。', price: 199, fileName: 'notion-finance-tracker.zip', sales: 420, revenue: 83580 },
    { id: uuidv4(), name: 'Final Cut Pro X 影片調色 LUTs', description: '專業調色師設計的 LUTs，快速提升您的影片視覺效果。', price: 650, fileName: 'fcpx-luts-pack.zip', sales: 150, revenue: 97500 },
    { id: uuidv4(), name: '社群媒體內容行事曆', description: '預先規劃的 30 天社群貼文點子與模板，解決您的內容荒。', price: 250, fileName: 'social-media-calendar.pdf', sales: 300, revenue: 75000 },
];

const MOCK_TIERS: MembershipTier[] = [
    { id: uuidv4(), name: '粉絲', price: 99, description: '支持我的創作，並獲得一些基礎福利。', perks: ['觀看所有付費內容', '專屬貼文'], memberCount: 152 },
    { id: uuidv4(), name: '超級粉絲', price: 299, description: '獲得更多獨家內容與互動機會。', perks: ['包含「粉絲」所有福利', '幕後花絮影片', '原始檔案下載'], memberCount: 48 },
    { id: uuidv4(), name: '榮譽製作人', price: 999, description: '成為我最緊密的合作夥伴，獲得最頂級的回饋。', perks: ['包含「超級粉絲」所有福利', '參與月度線上聚會', '名字出現在作品感謝名單'], memberCount: 7 },
];

const MOCK_SERVICES: Service[] = [
    { id: uuidv4(), name: '一對一作品集評鑑', description: '針對您的作品集提供專業、深入的回饋與指導，助您更上一層樓。', price: 2500, duration: 60, bookingCount: 12, revenue: 30000 },
    { id: uuidv4(), name: '品牌識別設計諮詢', description: '協助您定義品牌的核心價值，並轉化為引人注目的視覺識別系統。', price: 8000, duration: 120, bookingCount: 5, revenue: 40000 },
    { id: uuidv4(), name: 'Podcast 節目健檢', description: '全面分析您的 Podcast 節目，從內容結構、音質到推廣策略，提供具體的優化建議。', price: 3000, duration: 90, bookingCount: 8, revenue: 24000 },
    { id: uuidv4(), name: '影片腳本寫作工作坊', description: '為期 4 小時的線上工作坊，教您如何寫出引人入勝、轉換率高的影片腳本。', price: 4500, duration: 240, bookingCount: 15, revenue: 67500 },
    { id: uuidv4(), name: '個人品牌定位一對一教練課', description: '協助您找到獨特的市場定位，釐清目標受眾，並建立具有影響力的個人品牌形象。', price: 6000, duration: 90, bookingCount: 10, revenue: 60000 },
];

const MOCK_PREFERENCES: CollaborationPreferences = {
    openToCollaboration: true,
    minRate: 15000,
    preferredTypes: ['業配圖文', '開箱影片', '直播整合'],
};

const MOCK_INVITES: CollaborationInvite[] = [
    { id: uuidv4(), brandName: 'TechStyle Co.', brandLogoUrl: 'https://picsum.photos/seed/brand1/100/100', message: '您好，我們非常欣賞您的科技評測內容，希望邀請您為我們即將上市的無線耳機進行開箱評測。', offer: 25000, status: 'pending', dateReceived: '2023-10-26T10:00:00Z' },
    { id: uuidv4(), brandName: 'Gourmet Box', brandLogoUrl: 'https://picsum.photos/seed/brand2/100/100', message: '嗨！我們是個美食訂閱盒服務，看到您對美食的熱情，想邀請您進行一期業配圖文合作。', offer: 12000, status: 'accepted', dateReceived: '2023-10-24T15:30:00Z' },
    { id: uuidv4(), brandName: 'Wanderlust Gear', brandLogoUrl: 'https://picsum.photos/seed/brand3/100/100', message: '我們正在尋找旅遊領域的創作者，合作推廣我們的旅行背包，不知您是否有興趣？', offer: 8000, status: 'declined', dateReceived: '2023-10-22T09:00:00Z' },
];


const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [blocks, setBlocks] = useState<Block[]>(() => {
        try {
            const savedBlocks = localStorage.getItem('creator-website-blocks');
            if (savedBlocks) {
                return JSON.parse(savedBlocks);
            }
        } catch (error) {
            console.error("從 localStorage 讀取 blocks 時發生錯誤:", error);
        }
        return TEMPLATES[0].blocks.map(b => ({ ...b, id: uuidv4() }));
    });
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [tiers, setTiers] = useState<MembershipTier[]>(MOCK_TIERS);
    const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
    const [preferences, setPreferences] = useState<CollaborationPreferences>(MOCK_PREFERENCES);
    const [invites, setInvites] = useState<CollaborationInvite[]>(MOCK_INVITES);


    const applyTemplate = useCallback((templateId: string) => {
        const template = TEMPLATES.find(t => t.id === templateId);
        if (template) {
            const newBlocks = template.blocks.map(b => ({ ...b, id: uuidv4() }));
            setBlocks(newBlocks);
            setActiveView('editor');
        }
    }, []);
    
    const creatorContextValue = useMemo(() => ({
        blocks,
        setBlocks,
        applyTemplate
    }), [blocks, applyTemplate]);

    const productContextValue = useMemo(() => ({
        products,
        setProducts
    }), [products]);

    const membershipContextValue = useMemo(() => ({
        tiers,
        setTiers
    }), [tiers]);

    const serviceContextValue = useMemo(() => ({
        services,
        setServices
    }), [services]);

    const collaborationContextValue = useMemo(() => ({
        preferences,
        setPreferences,
        invites,
        setInvites,
    }), [preferences, invites]);

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard setActiveView={setActiveView} />;
            case 'editor':
                return <WebsiteEditor />;
            case 'products':
                return <ProductManager />;
            case 'memberships':
                return <MembershipManager />;
            case 'services':
                return <ServiceManager />;
            case 'collaborations':
                return <BrandCollaborationDashboard />;
            case 'explore':
                return <TemplateGallery />;
            case 'guidance':
                return <GuidanceWizard />;
            case 'assistant':
                return <AICreatorAssistant />;
            default:
                return <Dashboard setActiveView={setActiveView} />;
        }
    };

    return (
        <CreatorContext.Provider value={creatorContextValue}>
            <ProductContext.Provider value={productContextValue}>
                <MembershipContext.Provider value={membershipContextValue}>
                    <ServiceContext.Provider value={serviceContextValue}>
                        <CollaborationContext.Provider value={collaborationContextValue}>
                            <div className="flex h-screen bg-slate-50 font-sans">
                                <Sidebar
                                    activeView={activeView}
                                    setActiveView={setActiveView}
                                    isSidebarCollapsed={isSidebarCollapsed}
                                    setIsSidebarCollapsed={setIsSidebarCollapsed}
                                />
                                <div className="flex-1 flex flex-col overflow-hidden">
                                    <Header />
                                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
                                        <div className="container mx-auto px-6 py-8">
                                            {renderView()}
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </CollaborationContext.Provider>
                    </ServiceContext.Provider>
                </MembershipContext.Provider>
            </ProductContext.Provider>
        </CreatorContext.Provider>
    );
};

export default App;