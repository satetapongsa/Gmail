import React from 'react';
import { ArrowLeft, MoreVertical, Star, Reply, Printer, ExternalLink, Paperclip, ShieldAlert, RotateCcw, Trash2, FileText, Download, ChevronDown } from 'lucide-react';

const EmailDetail = ({ email, onBack, onDelete, onRestore, onToggleStar }) => {
  return (
    <div className="email-detail" style={{ overflowY: 'auto' }}>
      <div className="detail-header-actions" style={{ 
        display: 'flex', 
        gap: '24px', 
        marginBottom: '16px',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        padding: '12px 0',
        zIndex: 2,
        borderBottom: '1px solid #f1f3f4'
      }}>
        <div className="icon-btn back-btn" onClick={onBack} title="ย้อนกลับ">
          <ArrowLeft size={20} />
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {email.isDeleted ? (
            <div className="icon-btn" onClick={onRestore} title="กู้คืนไปยังกล่องจดหมาย">
              <RotateCcw size={20} color="#1a73e8" />
            </div>
          ) : (
            <div className="icon-btn" onClick={onDelete} title="ลบ">
              <Trash2 size={20} color="#5f6368" />
            </div>
          )}
          <div className="icon-btn" title="ตอบกลับ"><Reply size={20} color="#5f6368" /></div>
        </div>

        <div style={{ flex: 1 }}></div>
        <div className="icon-btn" title="พิมพ์ทั้งหมด"><Printer size={20} /></div>
        <div className="icon-btn" title="ในหน้าต่างใหม่"><ExternalLink size={20} /></div>
      </div>

      <div className="detail-content" style={{ padding: '0 16px' }}>
        <div className="detail-subject-line">
          <div className="detail-subject-text">
            {email.subject}
            {email.isSecret && (
              <span className="security-tag" style={{ border: '1px solid #d93025' }}>ลับสุดยอด // CIA-INTERNAL</span>
            )}
          </div>
          <div className="detail-subject-icons" style={{ display: 'flex', gap: '16px' }}>
            <div className="icon-btn-small" title="พิมพ์ทั้งหมด"><Printer size={18} /></div>
            <div className="icon-btn-small" title="ในหน้าต่างใหม่"><ExternalLink size={18} /></div>
          </div>
        </div>

        <div className="sender-info">
          <div className="avatar" style={{ background: '#202124', flexShrink: 0 }}>
            {email.sender.charAt(0)}
          </div>
          <div className="sender-details">
            <div className="sender-line">
              <span className="sender-name">{email.sender}</span>
              <span className="sender-email">&lt;{email.senderEmail}&gt;</span>
            </div>
            <div className="recipient-line">
              ถึง ฉัน <ChevronDown size={12} style={{ marginLeft: '4px' }} />
            </div>
          </div>
          <div className="detail-time-info">
            <div className="time-text">{email.fullDate}</div>
            <div className="action-icons">
              <div onClick={onToggleStar} style={{ cursor: 'pointer' }}>
                <Star size={18} color={email.starred ? "#f4b400" : "#dadce0"} fill={email.starred ? "#f4b400" : "none"} />
              </div>
              <Reply size={18} color="#5f6368" title="ตอบกลับ" />
              <MoreVertical size={18} color="#5f6368" />
            </div>
          </div>
        </div>

        <div className="detail-body-container">
          <div className="detail-body-content">
            {email.body}
          </div>
          
          <div className="spy-signature">
            <div className="sig-line">--- การสื่อสารที่เป็นความลับ ---</div>
            <div className="sig-details">
              <strong>แหล่งข้อมูล:</strong> {email.sender}<br/>
              <strong>ลำดับความสำคัญ:</strong> เร่งด่วน // ทันท่วงที<br/>
              <strong>รหัสติดตาม:</strong> {Math.random().toString(36).substring(7).toUpperCase()}-NODE
            </div>
          </div>
        </div>

        {email.attachments && email.attachments.length > 0 && (
          <div className="attachments-section" style={{ borderTop: '1px solid #f1f3f4', paddingTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: '#5f6368', fontWeight: 600 }}>
              <Paperclip size={18} />
              <span>{email.attachments.length} ไฟล์ข้อมูลลับ</span>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {email.attachments.map((att) => (
                <div key={att.id} className="attachment-card" style={{ 
                  width: '200px', 
                  border: '1px solid #dadce0', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s'
                }}>
                  {att.isImage ? (
                    <div style={{ height: '120px', backgroundImage: `url(${att.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  ) : (
                    <div style={{ height: '120px', backgroundColor: '#e8eaed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={48} color="#5f6368" />
                    </div>
                  )}
                  <div style={{ padding: '12px', backgroundColor: 'white' }}>
                    <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{att.name}</div>
                    <div style={{ color: '#5f6368', fontSize: '11px', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span>{att.size}</span>
                      <Download size={14} title="ดาวน์โหลด" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="reply-footer" style={{ marginTop: '60px', padding: '24px', borderTop: '1px solid #f1f3f4', display: 'flex', gap: '16px' }}>
        <button style={{ 
          padding: '10px 24px', 
          borderRadius: '24px', 
          border: '1px solid #dadce0', 
          backgroundColor: 'white',
          fontWeight: 500,
          cursor: 'pointer'
        }}>ตอบกลับ</button>
        <button style={{ 
          padding: '10px 24px', 
          borderRadius: '24px', 
          border: '1px solid #dadce0', 
          backgroundColor: 'white',
          fontWeight: 500,
          cursor: 'pointer'
        }}>ส่งต่อ</button>
      </div>
    </div>
  );
};

export default EmailDetail;
