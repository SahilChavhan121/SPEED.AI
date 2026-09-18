import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole, ClearanceLevel } from '../../types';
import { Shield, KeyRound, Lock, UserCheck, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, availableUsers, switchUser, login } = useAuth();
  const [selectedUser, setSelectedUser] = useState(currentUser.id);
  const [authMode, setAuthMode] = useState<'quick' | 'credentials'>('quick');
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<UserRole>('Senior Land Acquisition Officer');
  const [customClearance, setCustomClearance] = useState<ClearanceLevel>('SEC-LEVEL-5');
  const [passcode, setPasscode] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuickSwitch = (userId: string) => {
    setSelectedUser(userId);
    switchUser(userId);
    setFeedbackMsg({ type: 'success', text: `Switched clearance context to ${userId}` });
    setTimeout(() => {
      setFeedbackMsg(null);
      onClose();
    }, 800);
  };

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setFeedbackMsg({ type: 'error', text: 'Security authentication passcode is required.' });
      return;
    }

    await login(customName || 'Authorized Officer', customRole, customClearance);
    setFeedbackMsg({ type: 'success', text: 'Authentication successful. Clearance token issued.' });
    setTimeout(() => {
      setFeedbackMsg(null);
      onClose();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="w-full max-w-lg bg-surface-container-low border border-outline-variant/40 rounded-sm shadow-2xl overflow-hidden font-body text-on-surface animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-primary-container border border-primary/40 flex items-center justify-center text-primary">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-sm font-bold text-on-surface font-headline uppercase tracking-wider">
                Security &amp; Authentication Control
              </h2>
              <p className="text-[11px] text-on-surface-variant font-data-mono">
                CLEARANCE VERIFICATION // ROLE-BASED ACCESS CONTROL (RBAC)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-sm text-outline hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary"
            aria-label="Close security modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-outline-variant/30 bg-surface-container px-4">
          <button
            onClick={() => setAuthMode('quick')}
            className={`py-2 px-3 text-xs font-medium border-b-2 transition-colors ${
              authMode === 'quick'
                ? 'border-tertiary text-tertiary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Quick Profile Switch
          </button>
          <button
            onClick={() => setAuthMode('credentials')}
            className={`py-2 px-3 text-xs font-medium border-b-2 transition-colors ${
              authMode === 'credentials'
                ? 'border-tertiary text-tertiary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Custom Role Login
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {feedbackMsg && (
            <div className={`p-2.5 rounded-xs flex items-center gap-2 font-data-mono text-[11px] ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                : 'bg-error-container text-on-error-container border border-error/30'
            }`}>
              {feedbackMsg.type === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
          )}

          {authMode === 'quick' ? (
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-outline font-data-mono mb-1">
                Select Active Personnel Profile:
              </label>
              <div className="space-y-2">
                {availableUsers.map(user => {
                  const isCurrent = currentUser.id === user.id;
                  return (
                    <button
                      key={user.id}
                      onClick={() => handleQuickSwitch(user.id)}
                      className={`w-full p-3 rounded-xs border text-left flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-primary-container border-primary text-on-surface'
                          : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container-lowest flex items-center justify-center font-bold text-xs font-data-mono border border-outline-variant/30 text-tertiary">
                          {user.initials}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                            {user.name} ({user.id})
                            {isCurrent && <UserCheck className="w-3.5 h-3.5 text-tertiary" />}
                          </div>
                          <div className="text-[11px] text-on-surface-variant">
                            {user.role} &bull; {user.district}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-data-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-tertiary border border-outline-variant/20 block mb-0.5">
                          {user.clearance}
                        </span>
                        <span className="text-[10px] text-outline font-data-mono">{user.status}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCredentialLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1 font-data-mono">
                  Officer Full Name:
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  placeholder="e.g. Dr. R. K. Vashisht"
                  className="w-full p-2.5 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-tertiary font-body"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1 font-data-mono">
                    Jurisdiction Role:
                  </label>
                  <select
                    value={customRole}
                    onChange={e => setCustomRole(e.target.value as UserRole)}
                    className="w-full p-2 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-tertiary"
                  >
                    <option value="Senior Land Acquisition Officer">Senior Land Acquisition Officer</option>
                    <option value="Chief GIS Analyst">Chief GIS Analyst</option>
                    <option value="System Administrator">System Administrator</option>
                    <option value="Field Revenue Officer">Field Revenue Officer</option>
                    <option value="High Court Legal Liaison">High Court Legal Liaison</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1 font-data-mono">
                    Clearance Tier:
                  </label>
                  <select
                    value={customClearance}
                    onChange={e => setCustomClearance(e.target.value as ClearanceLevel)}
                    className="w-full p-2 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-tertiary"
                  >
                    <option value="SEC-LEVEL-5">SEC-LEVEL-5 (Root / Dispatch)</option>
                    <option value="SEC-LEVEL-4">SEC-LEVEL-4 (Analytics / Override)</option>
                    <option value="SEC-LEVEL-3">SEC-LEVEL-3 (Operator / Audit)</option>
                    <option value="SEC-LEVEL-2">SEC-LEVEL-2 (Field Telemetry)</option>
                    <option value="SEC-LEVEL-1">SEC-LEVEL-1 (Read Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1 font-data-mono">
                  Authentication PIN / Key:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={e => setPasscode(e.target.value)}
                    placeholder="Enter clearance pin (e.g. 8821)"
                    className="w-full p-2.5 pl-8 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-tertiary font-data-mono"
                  />
                  <KeyRound className="w-3.5 h-3.5 text-outline absolute left-2.5 top-3" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xs bg-tertiary text-on-tertiary font-bold font-data-mono text-xs flex items-center justify-center gap-1.5 hover:bg-tertiary/90 transition-colors shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate Clearance Session</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between">
          <span className="text-[10px] font-data-mono text-outline">
            CURRENT: {currentUser.name} ({currentUser.clearance})
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-xs text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
