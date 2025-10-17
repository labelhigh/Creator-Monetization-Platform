
import React from 'react';
import { BlockType } from '../../types';

// --- Icons for each block type ---
const HeroIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const GalleryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ProductsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const LinksIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const TestimonialsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const PollIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;


export interface BlockConfig {
    type: BlockType;
    name: string;
    icon: React.ReactElement;
    fields: {
        name: string;
        label: string;
        type: 'text' | 'textarea' | 'repeater';
        of?: {
            name: string;
            label: string;
            type: 'text' | 'textarea';
        }[];
    }[];
    defaultContent: { [key: string]: any };
}

type BlockConfigMap = {
    [key in BlockType]: BlockConfig;
}

export const BLOCK_CONFIG: BlockConfigMap = {
    [BlockType.Hero]: {
        type: BlockType.Hero,
        name: '英雄區塊',
        icon: <HeroIcon />,
        fields: [
            { name: 'title', label: '主標題', type: 'text' },
            { name: 'subtitle', label: '副標題', type: 'textarea' },
            { name: 'buttonText', label: '按鈕文字', type: 'text' },
        ],
        defaultContent: { title: "新標題", subtitle: "這是一個很棒的副標題。", buttonText: "了解更多" },
    },
    [BlockType.About]: {
        type: BlockType.About,
        name: '關於我',
        icon: <AboutIcon />,
        fields: [
            { name: 'title', label: '標題', type: 'text' },
            { name: 'text', label: '內文', type: 'textarea' },
        ],
        defaultContent: { title: "關於我", text: "在這裡介紹您自己..." },
    },
    [BlockType.Gallery]: {
        type: BlockType.Gallery,
        name: '畫廊',
        icon: <GalleryIcon />,
        fields: [
            { name: 'title', label: '標題', type: 'text' },
        ],
        defaultContent: { title: "我的作品集", images: [ "https://picsum.photos/seed/new1/600/400", "https://picsum.photos/seed/new2/600/400", "https://picsum.photos/seed/new3/600/400" ] },
    },
    [BlockType.Products]: {
        type: BlockType.Products,
        name: '產品',
        icon: <ProductsIcon />,
        fields: [
            { name: 'title', label: '標題', type: 'text' },
            { 
                name: 'products', 
                label: '產品列表', 
                type: 'repeater',
                of: [
                    { name: 'name', label: '產品名稱', type: 'text' },
                    { name: 'price', label: '價格', type: 'text' },
                ],
            },
        ],
        defaultContent: { title: "我的產品", products: [{ name: "新產品", price: "NT$100" }] },
    },
    [BlockType.Links]: {
        type: BlockType.Links,
        name: '連結',
        icon: <LinksIcon />,
        fields: [
            { name: 'title', label: '標題', type: 'text' },
            { 
                name: 'links', 
                label: '連結列表', 
                type: 'repeater',
                of: [
                    { name: 'text', label: '連結文字', type: 'text' },
                    { name: 'url', label: 'URL', type: 'text' },
                ]
            },
        ],
        defaultContent: { title: "我的連結", links: [{ text: "我的網站", url: "#" }] },
    },
    [BlockType.Testimonials]: {
        type: BlockType.Testimonials,
        name: '推薦語',
        icon: <TestimonialsIcon />,
        fields: [
            { name: 'title', label: '標題', type: 'text' },
            { 
                name: 'testimonials', 
                label: '推薦語列表', 
                type: 'repeater',
                of: [
                    { name: 'text', label: '內容', type: 'textarea' },
                    { name: 'author', label: '作者', type: 'text' },
                ]
            },
        ],
        defaultContent: { title: "客戶怎麼說", testimonials: [{ text: "超棒的體驗！", author: "滿意的客戶" }] },
    },
    [BlockType.Poll]: {
        type: BlockType.Poll,
        name: '互動投票',
        icon: <PollIcon />,
        fields: [
            { name: 'question', label: '問題', type: 'text' },
            {
                name: 'options',
                label: '選項',
                type: 'repeater',
                of: [
                    { name: 'text', label: '選項文字', type: 'text' },
                ]
            }
        ],
        defaultContent: {
            question: '您最想看哪一類型的內容？',
            options: [
                { text: '深度教學' },
                { text: '幕後花絮' },
                { text: '直播問答' },
            ]
        }
    }
};