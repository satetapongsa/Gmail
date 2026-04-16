import React, { useState } from 'react';
import { Pencil, Inbox, Star, Clock, Send, File, ChevronDown, ChevronUp, Trash2, AlertCircle, Info, Tag } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, counts, isOpen }) => {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);

  const primaryItems = [
    { id: 'Inbox', name: 'กล่องจดหมาย', icon: <Inbox size={20} />, count: counts.Inbox },
    { id: 'Starred', name: 'ติดดาว', icon: <Star size={20} /> },
    { id: 'Snoozed', name: 'เลื่อนการแจ้งเตือนแล้ว', icon: <Clock size={20} /> },
    { id: 'Sent', name: 'ส่งแล้ว', icon: <Send size={20} /> },
    { id: 'Drafts', name: 'ร่างจดหมาย', icon: <File size={20} />, count: counts.Drafts },
  ];

  const secondaryItems = [
    { id: 'Spam', name: 'จดหมายขยะ', icon: <AlertCircle size={20} /> },
    { id: 'Trash', name: 'ถังขยะ', icon: <Trash2 size={20} /> },
    { id: 'Important', name: 'สำคัญ', icon: <Info size={20} /> },
    { id: 'Categories', name: 'หมวดหมู่', icon: <Tag size={20} /> },
  ];

  if (!isOpen) {
    return (
      <aside className="sidebar mini-rail">
        <div className="compose-container">
          <div className="compose-btn-mini" title="เขียน">
            <Pencil size={24} />
          </div>
        </div>
        <nav className="nav-list">
          {primaryItems.map((item) => (
            <div 
              key={item.id}
              className={`nav-item-mini ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              title={item.name}
            >
              {item.icon}
            </div>
          ))}
          <div className="nav-item-mini" onClick={() => setActiveTab('Trash')} title="เพิ่มเติม">
            <ChevronDown size={20} />
          </div>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="compose-container">
        <button className="compose-btn">
          <Pencil size={24} />
          <span>เขียน</span>
        </button>
      </div>

      <nav className="nav-list">
        {primaryItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text" style={{ flex: 1 }}>{item.name}</span>
            {item.count > 0 && <span className="nav-count">{item.count}</span>}
          </div>
        ))}

        <div 
          className="nav-item" 
          onClick={() => setIsMoreExpanded(!isMoreExpanded)}
        >
          <span className="nav-icon">{isMoreExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
          <span className="nav-text" style={{ flex: 1 }}>{isMoreExpanded ? 'น้อยลง' : 'เพิ่มเติม'}</span>
        </div>

        {isMoreExpanded && secondaryItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            style={{ paddingLeft: '24px' }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text" style={{ flex: 1 }}>{item.name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
