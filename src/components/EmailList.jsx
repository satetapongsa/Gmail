import { Square, CheckSquare, Star, Archive, Trash2, RotateCcw, ShieldAlert, Paperclip, MoreVertical, ChevronDown, Mail, Clock, Inbox } from 'lucide-react';

const EmailList = ({ 
  emails, 
  onEmailClick, 
  activeTab, 
  selectedIds, 
  onToggleSelect, 
  onSelectAll,
  onMoveToTrash,
  onRestore,
  onToggleStar
}) => {
  const isAllSelected = emails.length > 0 && selectedIds.length === emails.length;
  const isAnySelected = selectedIds.length > 0;

  const tabNames = {
    Inbox: 'กล่องจดหมาย',
    Sent: 'ส่งแล้ว',
    Starred: 'ติดดาว',
    Drafts: 'ร่างจดหมาย',
    Spam: 'จดหมายขยะ',
    Trash: 'ถังขยะ'
  };

  return (
    <div className="email-list">
      {/* List Toolbar */}
      <div className="list-toolbar" style={{ 
        height: '48px', 
        borderBottom: '1px solid #f1f3f4', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 16px', 
        gap: '20px',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 2
      }}>
        <div onClick={onSelectAll} title="เลือกทั้งหมด" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: '16px' }}>
          {isAllSelected ? <CheckSquare size={18} color="#1a73e8" /> : <Square size={18} color="#5f6368" />}
          <ChevronDown size={14} style={{ marginLeft: '4px' }} />
        </div>
        
        {isAnySelected ? (
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div className="icon-btn-small" onClick={onMoveToTrash} title="ลบ">
              <Trash2 size={20} color="#5f6368" />
            </div>
            <div className="icon-btn-small" title="เก็บถาวร"><Archive size={20} color="#5f6368" /></div>
            <div className="icon-btn-small" title="ทำเป็นยังไม่ได้อ่าน"><Mail size={20} color="#5f6368" /></div>
            <div className="icon-btn-small" title="ปิดการแจ้งเตือนชั่วคราว"><Clock size={20} color="#5f6368" /></div>
            <div className="icon-divider" style={{ width: '1px', height: '20px', background: '#f1f3f4' }}></div>
            {activeTab === 'Trash' && (
              <div className="icon-btn-small" onClick={onRestore} title="กู้คืนไปยังกล่องจดหมาย">
                <RotateCcw size={20} color="#1a73e8" />
              </div>
            )}
            <MoreVertical size={20} color="#5f6368" />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div className="icon-btn-small" title="รีเฟรช"><RotateCcw size={20} color="#5f6368" /></div>
            <div className="icon-btn-small"><MoreVertical size={20} color="#5f6368" /></div>
          </div>
        )}

        <span style={{ fontSize: '13px', color: '#5f6368', marginLeft: 'auto' }}>
          {selectedIds.length > 0 ? `เลือกแล้ว ${selectedIds.length} รายการ` : `การสนทนา ${emails.length} รายการใน ${tabNames[activeTab] || activeTab}`}
        </span>
      </div>

      {emails.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#5f6368' }}>
          <div style={{ marginBottom: '16px' }}>
            {activeTab === 'Trash' ? <Trash2 size={48} color="#e0e0e0" /> : <Inbox size={48} color="#e0e0e0" />}
          </div>
          <h3>{tabNames[activeTab] || activeTab} ของคุณว่างเปล่า</h3>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>CIA Secure Node: ไม่พบข้อมูลลับในส่วนนี้</p>
        </div>
      ) : (
        emails.map((email) => (
          <div 
            key={email.id} 
            className={`email-item ${!email.read ? 'unread' : ''} ${selectedIds.includes(email.id) ? 'selected' : ''}`}
            style={{ backgroundColor: selectedIds.includes(email.id) ? '#c2e7ff' : 'transparent' }}
          >
            <div 
              style={{ padding: '0 8px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); onToggleSelect(email.id); }}
            >
              {selectedIds.includes(email.id) ? <CheckSquare size={18} color="#1a73e8" /> : <Square size={18} color="#dadce0" />}
            </div>

            <div 
              className="email-content-wrapper" 
              onClick={() => onEmailClick(email)}
              style={{ display: 'flex', flex: 1, alignItems: 'center', gap: '32px', overflow: 'hidden' }}
            >
              <div 
                onClick={(e) => { e.stopPropagation(); onToggleStar(email.id); }}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Star size={18} color={email.starred ? "#f4b400" : "#dadce0"} fill={email.starred ? "#f4b400" : "none"} />
              </div>
              
              <div className="email-sender">
                {email.sender}
              </div>
              
              <div className="email-body">
                <span className="email-subject">{email.subject}</span>
                <span className="email-snippet"> — {email.preview}</span>
              </div>

              <div className="email-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', minWidth: '100px', justifyContent: 'flex-end' }}>
                {email.attachments && email.attachments.length > 0 && (
                  <Paperclip size={14} color="#5f6368" />
                )}
                <div className="email-time" style={{ fontSize: '12px', fontWeight: email.read ? 400 : 700 }}>{email.time}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmailList;
