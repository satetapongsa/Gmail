import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import ProfileDropdown from './components/ProfileDropdown';
import SettingsModal from './components/SettingsModal';
import { emailsData as initialData } from './emailsData';
import './App.css';

const App = () => {
  const [emails, setEmails] = useState(initialData);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [activeTab, setActiveTab] = useState('Inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // UI Overlays & States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Status State
  const [status, setStatus] = useState({ label: 'ใช้งาน', color: '#34a853', type: 'active' });

  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      if (activeTab === 'Trash') {
        if (!email.isDeleted) return false;
      } else {
        if (email.isDeleted) return false;
      }

      let folderMatch = false;
      if (activeTab === 'Inbox') folderMatch = (email.folder === 'Inbox');
      else if (activeTab === 'Sent') folderMatch = (email.folder === 'Sent');
      else if (activeTab === 'Drafts') folderMatch = (email.folder === 'Drafts');
      else if (activeTab === 'Spam') folderMatch = (email.folder === 'Spam');
      else if (activeTab === 'Starred') folderMatch = email.starred;
      else folderMatch = true;

      const searchLower = searchTerm.toLowerCase();
      const contentMatch = 
        email.subject.toLowerCase().includes(searchLower) ||
        email.sender.toLowerCase().includes(searchLower) ||
        email.body.toLowerCase().includes(searchLower);

      return folderMatch && contentMatch;
    });
  }, [activeTab, searchTerm, emails]);

  const selectedEmail = useMemo(() => 
    emails.find(e => e.id === selectedEmailId), 
    [selectedEmailId, emails]
  );

  const handleEmailClick = (email) => {
    setEmails(prev => prev.map(e => e.id === email.id ? { ...e, read: true } : e));
    setSelectedEmailId(email.id);
  };

  const handleMenuClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedEmailId(null);
    setSelectedIds([]);
  };

  const toggleStar = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, starred: !e.starred } : e));
  };

  const handleMoveToTrash = (ids) => {
    setEmails(prev => prev.map(e => ids.includes(e.id) ? { ...e, isDeleted: true } : e));
    setSelectedIds([]);
    if (ids.includes(selectedEmailId)) setSelectedEmailId(null);
  };

  const handleRestoreFromTrash = (ids) => {
    setEmails(prev => prev.map(e => ids.includes(e.id) ? { ...e, isDeleted: false, folder: 'Inbox' } : e));
    setSelectedIds([]);
    if (ids.includes(selectedEmailId)) setSelectedEmailId(null);
  };

  const goToInbox = () => {
    setActiveTab('Inbox');
    setSelectedEmailId(null);
    setSearchTerm('');
  };

  return (
    <div className={`app-container ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`} onClick={() => {
      isProfileOpen && setIsProfileOpen(false);
    }}>
      <Header 
        onSearch={setSearchTerm} 
        onToggleProfile={() => setIsProfileOpen(!isProfileOpen)} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onGoToInbox={goToInbox}
        currentStatus={status}
        onStatusChange={setStatus}
      />
      
      {isProfileOpen && <ProfileDropdown onClose={() => setIsProfileOpen(false)} />}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}

      <div className="main-layout">
        <Sidebar 
          isOpen={isSidebarOpen}
          activeTab={activeTab} 
          setActiveTab={handleMenuClick} 
          counts={{
            Inbox: emails.filter(e => e.folder === 'Inbox' && !e.read && !e.isDeleted).length,
            Drafts: emails.filter(e => e.folder === 'Drafts' && !e.isDeleted).length
          }}
        />
        <main className="content-area">
          {selectedEmail ? (
            <EmailDetail 
              email={selectedEmail} 
              onBack={() => setSelectedEmailId(null)} 
              onDelete={() => handleMoveToTrash([selectedEmail.id])}
              onRestore={() => handleRestoreFromTrash([selectedEmail.id])}
              onToggleStar={() => toggleStar(selectedEmail.id)}
            />
          ) : (
            <EmailList 
              emails={filteredEmails} 
              onEmailClick={handleEmailClick} 
              activeTab={activeTab}
              selectedIds={selectedIds}
              onToggleSelect={(id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
              onSelectAll={() => setSelectedIds(selectedIds.length === filteredEmails.length ? [] : filteredEmails.map(e => e.id))}
              onMoveToTrash={() => handleMoveToTrash(selectedIds)}
              onRestore={() => handleRestoreFromTrash(selectedIds)}
              onToggleStar={toggleStar}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
