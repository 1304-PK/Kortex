import React, { useState } from 'react';
import { 
  AiOutlinePlusCircle, 
  AiOutlineLogout 
} from 'react-icons/ai';
import { 
  MdWorkOutline, 
  MdChevronRight, 
  MdChevronLeft 
} from 'react-icons/md';
import { FiUser } from 'react-icons/fi';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: AiOutlinePlusCircle, label: 'Generate New Course', onClick: () => console.log('Generate New Course') },
    { icon: MdWorkOutline, label: 'My Workspace', onClick: () => console.log('My Workspace') },
    { icon: FiUser, label: 'My Profile', onClick: () => console.log('My Profile') },
    { icon: AiOutlineLogout, label: 'Logout', onClick: () => console.log('Logout') },
  ];

  return (
    <div className="relative w-20">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-black border-r border-gray-800 transition-all duration-300 ease-in-out z-50 flex flex-col ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-gray-800">
          <div className={`${isExpanded ? 'w-12 h-12' : 'w-10 h-10'} bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center transition-all duration-300`}>
            <span className="text-white font-bold text-xl">L</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-200 group"
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                <span
                  className={`whitespace-nowrap transition-all duration-300 ${
                    isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Collapse/Expand Button */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-200"
          >
            {isExpanded ? (
              <MdChevronLeft className="w-6 h-6 flex-shrink-0" />
            ) : (
              <MdChevronRight className="w-6 h-6 flex-shrink-0" />
            )}
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0'
              }`}
            >
              Collapse
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;