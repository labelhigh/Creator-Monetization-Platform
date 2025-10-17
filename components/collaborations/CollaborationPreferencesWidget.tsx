import React, { useContext, useState } from 'react';
import { CollaborationContext } from '../../App';
import Card from '../ui/Card';
import Button from '../ui/Button';

const CollaborationPreferencesWidget: React.FC = () => {
    const context = useContext(CollaborationContext);
    const [isEditing, setIsEditing] = useState(false);
    
    // We'll use a temporary state for editing to avoid updating the context on every keystroke
    const [tempPreferences, setTempPreferences] = useState(context?.preferences);

    if (!context || !tempPreferences) {
        return <Card className="p-5">載入中...</Card>;
    }

    const { preferences, setPreferences } = context;

    const handleSave = () => {
        setPreferences(tempPreferences);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempPreferences(preferences);
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setTempPreferences(prev => ({
            ...prev!,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) || 0 : value)
        }));
    };
    
    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(',').map(tag => tag.trim());
        setTempPreferences(prev => ({ ...prev!, preferredTypes: tags }));
    };

    return (
        <Card>
            <div className="p-5 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold">合作偏好設定</h3>
                {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>編輯</Button>
                )}
            </div>
            <div className="p-5 space-y-4">
                {isEditing ? (
                    <>
                        <div className="flex items-center justify-between">
                            <label htmlFor="openToCollaboration" className="font-medium text-slate-700">開放合作機會</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="openToCollaboration" name="openToCollaboration" checked={tempPreferences.openToCollaboration} onChange={handleInputChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="minRate" className="block text-sm font-medium text-slate-700 mb-1">最低報價 (NT$)</label>
                            <input type="number" id="minRate" name="minRate" value={tempPreferences.minRate} onChange={handleInputChange} className="w-full rounded-md border-slate-300 shadow-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="preferredTypes" className="block text-sm font-medium text-slate-700 mb-1">偏好合作類型 (以逗號分隔)</label>
                            <input type="text" id="preferredTypes" name="preferredTypes" value={tempPreferences.preferredTypes.join(', ')} onChange={handleTagsChange} className="w-full rounded-md border-slate-300 shadow-sm p-2" />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" size="sm" onClick={handleCancel}>取消</Button>
                            <Button variant="primary" size="sm" onClick={handleSave}>儲存</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">狀態</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${preferences.openToCollaboration ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {preferences.openToCollaboration ? '開放合作' : '暫不合作'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">最低報價</span>
                            <span className="font-semibold text-slate-800">NT${preferences.minRate.toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="font-medium text-slate-700">偏好類型</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {preferences.preferredTypes.map(type => (
                                    <span key={type} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">{type}</span>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};

export default CollaborationPreferencesWidget;