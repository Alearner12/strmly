import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  AiOutlineHome, 
  AiFillHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlinePlus
} from 'react-icons/ai';
import { BiVideo } from 'react-icons/bi';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: AiOutlineHome,
      activeIcon: AiFillHome
    },
    {
      id: 'shorts',
      label: 'Shorts',
      path: '/shorts',
      icon: BiVideo,
      activeIcon: BiVideo
    },
    {
      id: 'create',
      label: 'Add',
      path: '/create',
      icon: AiOutlinePlus,
      activeIcon: AiOutlinePlus,
      isSpecial: true
    },
    {
      id: 'search',
      label: 'Search',
      path: '/search',
      icon: AiOutlineSearch,
      activeIcon: AiOutlineSearch
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: AiOutlineUser,
      activeIcon: AiOutlineUser
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800">
      <div className="flex items-center justify-around py-2 px-4 max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = isActive ? item.activeIcon : item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center justify-center py-2 px-3 rounded-lg
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
                }
                ${item.isSpecial 
                  ? 'bg-red-500 hover:bg-red-600 text-white rounded-full p-3 scale-110' 
                  : 'hover:bg-gray-800'
                }
                active:scale-95
              `}
            >
              {item.isSpecial ? (
                <IconComponent size={24} />
              ) : (
                <>
                  <IconComponent size={22} />
                  <span className="text-xs mt-1 font-medium">
                    {item.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area for iOS devices */}
      <div className="pb-safe"></div>
    </div>
  );
};

export default BottomNav; 