import React, { useState } from 'react';

function validateIndianMobile(input) {
  // Accepts: 9876543210, +91 9876543210, 91 9876543210
  let num = input.replace(/\D/g, '');
  if (num.length === 12 && num.startsWith('91')) num = num.slice(2);
  if (num.length === 13 && num.startsWith('91')) num = num.slice(2);
  if (num.length === 10 && /^[6-9]\d{9}$/.test(num)) return num;
  return null;
}

const MobileCollectionModal = ({
  open,
  onSubmit,
  onSkip,
  loading,
  error,
}) => {
  const [mobile, setMobile] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validMobile = validateIndianMobile(mobile);
    if (!validMobile) {
      setLocalError('Please enter a valid Indian mobile number (10 digits, starts with 6-9)');
      return;
    }
    setLocalError('');
    await onSubmit(validMobile);
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', padding: 32, borderRadius: 8, minWidth: 320, maxWidth: 400, boxShadow: '0 2px 16px #0003'
      }}>
        <h2>Mobile Number Required</h2>
        <p>
          To continue, please enter your Indian mobile number.<br />
          <small>Format: 9876543210, +91 9876543210, or 91 9876543210</small>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            style={{ width: '100%', padding: 8, fontSize: 16, marginBottom: 8 }}
            disabled={loading}
            autoFocus
          />
          {(localError || error) && (
            <div style={{ color: 'red', marginBottom: 8 }}>
              {localError || error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%', padding: 10, fontSize: 16, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, marginBottom: 8
            }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <button
          type="button"
          style={{
            width: '100%', padding: 10, fontSize: 16, background: '#eee', color: '#333', border: 'none', borderRadius: 4
          }}
          onClick={onSkip}
          disabled={loading}
        >
          Skip (I will provide later)
        </button>
        <div style={{ marginTop: 8, color: '#b71c1c', fontSize: 13 }}>
          <strong>Warning:</strong> Skipping may limit access to some features.
        </div>
      </div>
    </div>
  );
};

export default MobileCollectionModal;
