
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm z-10">
            <div className="container mx-auto px-6 py-4 flex justify-end items-center">
                <div className="flex items-center">
                    <span className="text-slate-700 text-sm font-medium mr-3">Alex Doe</span>
                    <img className="h-9 w-9 rounded-full object-cover" src="https://picsum.photos/seed/user/100/100" alt="User avatar" />
                </div>
            </div>
        </header>
    );
};

export default Header;
