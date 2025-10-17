import React, { useContext, useState, useCallback } from 'react';
import { CreatorContext } from '../../App';
import { Block, BlockType } from '../../types';
import Button from '../ui/Button';
import EditorSidebar from './EditorSidebar';
import EditableBlock from './EditableBlock';
import { v4 as uuidv4 } from 'uuid';
import { BLOCK_CONFIG } from './blockConfig';


const WebsiteEditor: React.FC = () => {
    const creatorContext = useContext(CreatorContext);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

    const handlePublish = useCallback(() => {
        if (!creatorContext) return;
        try {
            localStorage.setItem('creator-website-blocks', JSON.stringify(creatorContext.blocks));
            alert('變更已成功發布！');
        } catch (error) {
            console.error("無法儲存變更到 localStorage:", error);
            alert('儲存變更時發生錯誤。');
        }
    }, [creatorContext]);

    if (!creatorContext) {
        return <div>編輯器載入中...</div>;
    }

    const { blocks, setBlocks } = creatorContext;

    const handleSelectBlock = (id: string) => {
        setSelectedBlockId(id);
    };

    const handleUpdateBlock = (id: string, newContent: { [key: string]: any }) => {
        setBlocks(prevBlocks =>
            prevBlocks.map(b => (b.id === id ? { ...b, content: { ...b.content, ...newContent } } : b))
        );
    };

    const handleUpdateBlockSettings = (id: string, settings: { publishDate?: string | null; accessLevel?: 'public' | 'members_only' }) => {
        setBlocks(prevBlocks => 
            prevBlocks.map(b => b.id === id ? { ...b, ...settings } : b)
        );
    };

    const handleAddBlock = (type: BlockType) => {
        const newBlock: Block = {
            id: uuidv4(),
            type: type,
            content: BLOCK_CONFIG[type].defaultContent,
            accessLevel: 'public',
            publishDate: null,
        };
        const selectedIndex = blocks.findIndex(b => b.id === selectedBlockId);
        const newBlocks = [...blocks];
        if (selectedIndex > -1) {
            newBlocks.splice(selectedIndex + 1, 0, newBlock);
        } else {
            newBlocks.push(newBlock);
        }
        setBlocks(newBlocks);
        setSelectedBlockId(newBlock.id);
    };

    const handleDeleteBlock = (id: string) => {
        if (confirm('您確定要刪除這個區塊嗎？')) {
            setBlocks(blocks.filter(b => b.id !== id));
            if (selectedBlockId === id) {
                setSelectedBlockId(null);
            }
        }
    };

    const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
        const index = blocks.findIndex(b => b.id === id);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= blocks.length) return;
        
        const newBlocks = [...blocks];
        const [movedBlock] = newBlocks.splice(index, 1);
        newBlocks.splice(newIndex, 0, movedBlock);
        setBlocks(newBlocks);
    };

    const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">網站編輯器</h1>
                <Button variant="primary" onClick={handlePublish}>發布變更</Button>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-start">
                {/* Main Canvas Area */}
                <main className="flex-1 w-full">
                     <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
                        {blocks.map((block, index) => (
                            <EditableBlock
                                key={block.id}
                                block={block}
                                isSelected={block.id === selectedBlockId}
                                onSelect={() => handleSelectBlock(block.id)}
                                onDelete={() => handleDeleteBlock(block.id)}
                                onMove={handleMoveBlock}
                                onUpdateBlock={handleUpdateBlock}
                                isFirst={index === 0}
                                isLast={index === blocks.length - 1}
                            />
                        ))}
                    </div>
                </main>
                
                {/* Right Sidebar */}
                <aside className="w-full xl:w-1/3 xl:max-w-md sticky top-6">
                    <EditorSidebar 
                        selectedBlock={selectedBlock}
                        onUpdateBlock={handleUpdateBlock}
                        onUpdateBlockSettings={handleUpdateBlockSettings}
                        onAddBlock={handleAddBlock}
                    />
                </aside>
            </div>
        </div>
    );
};

export default WebsiteEditor;