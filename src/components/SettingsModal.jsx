import React from 'react';
import { X, Shield, Eye, Bell, Lock } from 'lucide-react';

const SettingsModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>การตั้งค่า WMail</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-content">
          <div className="settings-section">
            <div className="section-title"><Shield size={18} /> ความปลอดภัยในการปฏิบัติงาน</div>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">ทำลายข้อความอัตโนมัติ</div>
                <div className="setting-desc">ลบอีเมลลับโดยอัตโนมัติหลังจากอ่านจบ</div>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">โหมดซ่อนตัว (Stealth Mode)</div>
                <div className="setting-desc">ปิดการยืนยันการอ่านสำหรับหน่วยงานทั้งหมด</div>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
          <div className="settings-section">
            <div className="section-title"><Lock size={18} /> การเข้ารหัส</div>
            <div className="setting-item">
              <div className="setting-label">อัลกอริทึม</div>
              <select className="setting-select">
                <option>AES-256 (GCM)</option>
                <option>ChaCha20-Poly1305</option>
                <option>NSA Suite B</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>ยกเลิก</button>
          <button className="btn-primary" onClick={onClose}>นำโปรโตคอลไปใช้</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
