
import React from 'react';
import { Block, BlockType } from '../../types';
import Card from '../ui/Card';
import { BLOCK_CONFIG, BlockConfig } from './blockConfig';

interface EditorSidebarProps {
    selectedBlock: Block | null;
    onUpdateBlock: (id: string, newContent: { [key: string]: any }) => void;
    onUpdateBlockSettings: (id: string, settings: { publishDate?: string | null; accessLevel?: 'public' | 'members_only' }) => void;
    onAddBlock: (type: BlockType) => void;
}

const FieldEditor: React.FC<{
    field: BlockConfig['fields'][0];
    value: any;
    onChange: (fieldName: string, value: any) => void;
}> = ({ field, value, onChange }) => {
    switch (field.type) {
        case 'text':
            return (
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
            );
        case 'textarea':
             return (
                <textarea
                    rows={4}
                    value={value || ''}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
            );
        case 'repeater':
            const items = Array.isArray(value) ? value : [];

            const handleItemChange = (index: number, subFieldName: string, subFieldValue: any) => {
                const newItems = [...items];
                newItems[index] = { ...newItems[index], [subFieldName]: subFieldValue };
                onChange(field.name, newItems);
            };

            const handleDeleteItem = (index: number) => {
                const newItems = items.filter((_, i) => i !== index);
                onChange(field.name, newItems);
            };

            const handleAddItem = () => {
                const newItem = field.of?.reduce((acc, subField) => {
                    acc[subField.name] = '';
                    return acc;
                }, {} as { [key: string]: any });
                
                if (newItem) {
                    onChange(field.name, [...items, newItem]);
                }
            };
            
            return (
                <div className="space-y-2 mt-1">
                    {items.map((item, index) => (
                        <div key={index} className="p-3 border rounded-md bg-slate-50 relative space-y-2">
                            <button 
                                onClick={() => handleDeleteItem(index)} 
                                className="absolute top-1 right-1 p-1 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                aria-label="刪除項目"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            {field.of?.map(subField => (
                                <div key={subField.name}>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">{subField.label}</label>
                                    {subField.type === 'textarea' ? (
                                        <textarea
                                            rows={3}
                                            value={item[subField.name] || ''}
                                            onChange={(e) => handleItemChange(index, subField.name, e.target.value)}
                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={item[subField.name] || ''}
                                            onChange={(e) => handleItemChange(index, subField.name, e.target.value)}
                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        onClick={handleAddItem}
                        className="w-full text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-md transition-colors"
                    >
                        + 新增項目
                    </button>
                </div>
            );
        default:
            return null;
    }
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ selectedBlock, onUpdateBlock, onUpdateBlockSettings, onAddBlock }) => {
    
    const handleFieldChange = (fieldName: string, value: any) => {
        if (!selectedBlock) return;
        const newContent = { ...selectedBlock.content, [fieldName]: value };
        onUpdateBlock(selectedBlock.id, newContent);
    };

    const handleSettingChange = (settingName: 'accessLevel' | 'publishDate', value: any) => {
        if (!selectedBlock) return;
        onUpdateBlockSettings(selectedBlock.id, { [settingName]: value });
    };
    
    const renderBlockSettings = () => {
        if (!selectedBlock) {
            return (
                <div className="text-center text-slate-500">
                    <p>請在右側預覽中選擇一個區塊進行編輯。</p>
                </div>
            );
        }

        const config = BLOCK_CONFIG[selectedBlock.type];

        return (
            <div className="space-y-4">
                {config.fields.map(field => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                        <FieldEditor 
                            field={field}
                            value={selectedBlock.content[field.name]}
                            onChange={handleFieldChange}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6 sticky top-8">
            <Card>
                <div className="p-5 border-b">
                    <h3 className="text-lg font-bold">元件設定</h3>
                </div>
                <div className="p-5">
                    {renderBlockSettings()}
                </div>
            </Card>

            {selectedBlock && (
                <Card>
                    <div className="p-5 border-b">
                        <h3 className="text-lg font-bold">發布設定</h3>
                    </div>
                    <div className="p-5 space-y-4">
                        <div>
                            <label htmlFor="accessLevel" className="block text-sm font-medium text-slate-700">存取權限</label>
                            <select
                                id="accessLevel"
                                value={selectedBlock.accessLevel || 'public'}
                                onChange={(e) => handleSettingChange('accessLevel', e.target.value as 'public' | 'members_only')}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="public">公開 (任何人)</option>
                                <option value="members_only">僅限會員</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="publishDate" className="block text-sm font-medium text-slate-700">排程發布</label>
                            <input
                                id="publishDate"
                                type="datetime-local"
                                value={selectedBlock.publishDate ? selectedBlock.publishDate.slice(0, 16) : ''}
                                onChange={(e) => handleSettingChange('publishDate', e.target.value ? new Date(e.target.value).toISOString() : null)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            />
                             <p className="text-xs text-slate-500 mt-1">留空則為立即發布。</p>
                        </div>
                    </div>
                </Card>
            )}

            <Card>
                <div className="p-5 border-b">
                    <h3 className="text-lg font-bold">新增元件</h3>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-2 gap-2">
                        {Object.values(BLOCK_CONFIG).map(config => (
                             <button
                                key={config.type}
                                onClick={() => onAddBlock(config.type)}
                                className="flex flex-col items-center justify-center p-3 text-center rounded-md bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                            >
                                <div className="text-indigo-600">{config.icon}</div>
                                <span className="text-xs font-semibold mt-2">{config.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EditorSidebar;