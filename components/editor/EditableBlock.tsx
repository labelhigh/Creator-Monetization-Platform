import React from 'react';
import { Block, BlockType } from '../../types';
import HeroPreview from './previews/HeroPreview';
import AboutPreview from './previews/AboutPreview';
import ProductsPreview from './previews/ProductsPreview';
import GalleryPreview from './previews/GalleryPreview';
import LinksPreview from './previews/LinksPreview';
import TestimonialsPreview from './previews/TestimonialsPreview';
import PollPreview from './previews/PollPreview';

// --- Icons ---
const MoveUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
const MoveDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v2H7a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a2 2 0 00-2-2zm-1 4V4a1 1 0 011-1h.01a1 1 0 011 1v2H9z" clipRule="evenodd" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;


// --- Main EditableBlock Component ---
interface EditableBlockProps {
    block: Block;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
    onMove: (id: string, direction: 'up' | 'down') => void;
    onUpdateBlock: (id: string, newContent: { [key: string]: any }) => void;
    isFirst: boolean;
    isLast: boolean;
}

const EditableBlock: React.FC<EditableBlockProps> = ({ block, isSelected, onSelect, onDelete, onMove, onUpdateBlock, isFirst, isLast }) => {
    const isScheduled = block.publishDate && new Date(block.publishDate) > new Date();
    const isMembersOnly = block.accessLevel === 'members_only';

    const handleContentUpdate = (newContent: { [key: string]: any }) => {
        onUpdateBlock(block.id, newContent);
    };

    const renderBlockPreview = () => {
        const props = { block, onUpdate: handleContentUpdate, isSelected };
        switch (block.type) {
            case BlockType.Hero: return <HeroPreview {...props} />;
            case BlockType.About: return <AboutPreview {...props} />;
            case BlockType.Products: return <ProductsPreview {...props} />;
            case BlockType.Gallery: return <GalleryPreview {...props} />;
            case BlockType.Links: return <LinksPreview {...props} />;
            case BlockType.Testimonials: return <TestimonialsPreview {...props} />;
            case BlockType.Poll: return <PollPreview {...props} />;
            default:
                return <div className="p-4 border my-2">未知的區塊類型</div>;
        }
    };
    

    return (
        <div 
            className={`relative my-4 rounded-lg transition-all duration-200 group ${isSelected ? 'ring-2 ring-offset-2 ring-indigo-500' : 'hover:ring-2 hover:ring-indigo-300'}`}
            onClick={onSelect}
        >
            {/* Action Toolbar */}
            <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-white shadow-lg rounded-full p-1">
                <button disabled={isFirst} onClick={(e) => { e.stopPropagation(); onMove(block.id, 'up'); }} className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed">
                    <MoveUpIcon />
                </button>
                <button disabled={isLast} onClick={(e) => { e.stopPropagation(); onMove(block.id, 'down'); }} className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed">
                    <MoveDownIcon />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2 rounded-full text-red-500 hover:bg-red-50">
                    <DeleteIcon />
                </button>
            </div>
            
            {/* Status Indicators */}
            <div className="absolute top-2 left-2 z-20 flex items-center gap-2 pointer-events-none">
                {isMembersOnly && (
                    <div className="flex items-center gap-1.5 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                        <LockIcon />
                        <span>僅限會員</span>
                    </div>
                )}
                {isScheduled && (
                    <div className="flex items-center gap-1.5 bg-sky-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                        <ClockIcon />
                        <span>已排程</span>
                    </div>
                )}
            </div>

            {renderBlockPreview()}
        </div>
    );
};


export default EditableBlock;
