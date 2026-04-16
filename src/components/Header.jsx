import React, { useState } from 'react';
import { Menu, Search, Settings, HelpCircle, LayoutGrid, X, Sparkles, ChevronDown, Check } from 'lucide-react';

const Header = ({ onSearch, onToggleProfile, onOpenSettings, onToggleSidebar, onGoToInbox, currentStatus, onStatusChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const statuses = [
    { label: 'ใช้งาน', color: '#34a853', type: 'active' },
    { label: 'ห้ามรบกวน', color: '#d93025', type: 'dnd' },
    { label: 'ไม่อยู่', color: '#fbbc05', type: 'away' },
  ];

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    onSearch(val);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="icon-btn" onClick={onToggleSidebar}>
          <Menu size={20} />
        </div>
        <div 
          className="logo" 
          style={{ color: '#1a73e8', fontWeight: 'bold', fontSize: '22px', cursor: 'pointer' }}
          onClick={onGoToInbox}
        >
          WMail
        </div>
      </div>
      
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          className="search-bar" 
          placeholder="ค้นหาในอีเมล" 
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue && (
          <X 
            className="clear-icon" 
            size={18} 
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#5f6368' }} 
            onClick={() => { setInputValue(''); onSearch(''); }}
          />
        )}
      </div>

      <div className="header-right" style={{ display: 'flex', gap: '4px', alignItems: 'center', marginLeft: 'auto' }}>
        <div className="status-container" style={{ position: 'relative' }}>
          <div className="status-btn" onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}>
            <span className="dot" style={{ backgroundColor: currentStatus.color }}></span>
            <span>{currentStatus.label}</span>
            <ChevronDown size={14} />
          </div>
          
          {isStatusMenuOpen && (
            <div className="status-dropdown-menu">
              {statuses.map((s) => (
                <div 
                  key={s.type} 
                  className="status-menu-item"
                  onClick={() => {
                    onStatusChange(s);
                    setIsStatusMenuOpen(false);
                  }}
                >
                  <span className="dot" style={{ backgroundColor: s.color }}></span>
                  <span>{s.label}</span>
                  {currentStatus.type === s.type && <Check size={14} style={{ marginLeft: 'auto' }} />}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="icon-btn" title="ช่วยเหลือ"><HelpCircle size={20} /></div>
        <div className="icon-btn" onClick={onOpenSettings} title="การตั้งค่า"><Settings size={20} /></div>
        <div className="icon-btn"><Sparkles size={20} /></div>
        <div className="icon-btn" title="แอป Google"><LayoutGrid size={20} /></div>
        
        <div 
          className="profile-avatar-container" 
          onClick={(e) => { e.stopPropagation(); onToggleProfile(); }}
        >
          <div className="letter-avatar-small">W</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
