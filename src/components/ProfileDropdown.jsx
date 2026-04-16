import React from 'react';
import { Camera, X } from 'lucide-react';

const ProfileDropdown = ({ onClose }) => {
  return (
    <div className="profile-dropdown-gmail" onClick={(e) => e.stopPropagation()}>
      <div className="dropdown-header">
        <span style={{ color: '#bdc1c6' }}>me@secure.node</span>
        <button className="close-dropdown" onClick={onClose} title="ปิด">
          <X size={20} />
        </button>
      </div>

      <div className="dropdown-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div className="avatar-main-container">
          <div className="avatar-main">
            <div className="letter-avatar-large">W</div>
            <div className="camera-overlay" title="เปลี่ยนรูปโปรไฟล์">
              <Camera size={20} color="white" />
            </div>
          </div>
        </div>

        <div className="greeting-text">
          สวัสดี คุณ Operator 01
        </div>

        <button className="manage-account-btn">
          จัดการบัญชี Google
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
