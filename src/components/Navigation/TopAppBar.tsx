import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Sun, 
  Moon, 
  Shield, 
  Bell, 
  Code2, 
  UserCheck, 
  LogOut, 
  Menu, 
  Radio,
  Clock,
  ExternalLink
} from 'lucide-react';

interface TopAppBarProps {
  onOpenMobileMenu: () => void;
  onOpenDeveloperGuide: () => void;
  onOpenAuthModal: () => void;
  pendingAlertsCount: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onOpenMobileMenu,
  onOpenDeveloperGuide,
  onOpenAuthModal,
  pendingAlertsCount
}) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, availableUsers, switchUser, sessionExpiresIn, extendSession, logout } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Format seconds to mm:ss
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header 
      id="top-app-bar" 
      aria-label="Tactical Top Bar"
      className="h-14 bg-surface-container-low border-b border-outline-variant/30 px-3 md:px-5 flex items-center justify-between z-10 shrink-0 select-none"
    >
      {/* Left: Mobile hamburger + System Status Beacon */}
      <div className="flex items-center gap-3">
        <button
          id="btn-mobile-menu"
          onClick={onOpenMobileMenu}
          className="p-1.5 md:hidden text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-sm focus:outline-none focus:ring-2 focus:ring-tertiary"
          aria-label="Open tactical menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* System Beacon */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant/20 text-xs font-data-mono">
            <Radio className="w-3.5 h-3.5 text-tertiary animate-pulse" />
            <span className="text-on-surface font-semibold tracking-wider text-[11px]">S.P.E.E.D. COMMAND</span>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <span className="hidden sm:inline text-tertiary text-[10px] font-bold">STREAM: ACTIVE</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container border border-outline-variant/15 text-[10px] font-data-mono text-on-surface-variant">
            <span>MODEL:</span>
            <span className="text-secondary font-bold">v4.12-PROD (F1 94.8%)</span>
          </div>
        </div>
      </div>

      {/* Right: Actions & User Security Center */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Session Security Expiry Clock */}
        <button
          id="btn-session-timer"
          onClick={extendSession}
          title="Click to extend active security session (+60m)"
          className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-lowest/80 border border-outline-variant/20 text-[10px] font-data-mono text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <Clock className="w-3 h-3 text-secondary" />
          <span>SESSION:</span>
          <span className={`font-bold ${sessionExpiresIn < 300 ? 'text-error animate-pulse' : 'text-on-surface'}`}>
            {formatTime(sessionExpiresIn)}
          </span>
        </button>

        {/* Developer Architecture & Guide */}
        <button
          id="btn-open-dev-guide-top"
          onClick={onOpenDeveloperGuide}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-tertiary-container/30 hover:bg-tertiary-container/50 border border-tertiary/40 text-tertiary text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-tertiary"
          title="Open Architecture & Developer Guidebook (SIH 2026)"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px] font-semibold tracking-wide">Dev Guide</span>
        </button>

        {/* Theme Toggle (Dark / Light) */}
        <button
          id="btn-theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          className="p-1.5 rounded-sm bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-on-surface transition-all focus:outline-none focus:ring-2 focus:ring-tertiary"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-slate-800" />
          )}
        </button>

        {/* Quick Role & Clearance Switcher */}
        <div className="relative">
          <button
            id="btn-role-menu"
            onClick={() => setShowRoleDropdown(prev => !prev)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-medium text-on-surface transition-all focus:outline-none focus:ring-2 focus:ring-tertiary"
            aria-haspopup="true"
            aria-expanded={showRoleDropdown}
          >
            <Shield className="w-3.5 h-3.5 text-tertiary" />
            <span className="hidden sm:inline font-data-mono text-[11px] font-bold">
              {currentUser.clearance.replace('SEC-', '')}
            </span>
            <span className="text-[11px] text-on-surface-variant truncate max-w-[100px] hidden md:inline">
              {currentUser.role.split(' ')[0]}
            </span>
          </button>

          {/* Role selector dropdown */}
          {showRoleDropdown && (
            <div 
              className="absolute right-0 mt-1.5 w-72 bg-surface-container-high border border-outline-variant/40 rounded-sm shadow-xl z-50 p-2 font-body text-xs"
              role="menu"
            >
              <div className="px-2 py-1.5 border-b border-outline-variant/30 mb-1.5">
                <div className="text-[10px] font-data-mono text-outline uppercase font-bold">
                  Simulated Clearance Switcher
                </div>
                <div className="text-[11px] text-on-surface font-semibold">
                  Test Multi-User Authentication Flows
                </div>
              </div>

              <div className="space-y-1">
                {availableUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left p-2 rounded-xs flex items-center justify-between transition-colors ${
                      currentUser.id === user.id
                        ? 'bg-primary-container text-on-surface border border-primary/40'
                        : 'hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs text-on-surface flex items-center gap-1.5">
                        {user.name}
                        {currentUser.id === user.id && (
                          <UserCheck className="w-3 h-3 text-tertiary" />
                        )}
                      </div>
                      <div className="text-[10px] text-on-surface-variant">
                        {user.role}
                      </div>
                    </div>
                    <span className="text-[9px] font-data-mono px-1.5 py-0.5 rounded bg-surface-container-lowest text-tertiary border border-outline-variant/20">
                      {user.clearance.replace('SEC-', '')}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                <button
                  onClick={() => {
                    setShowRoleDropdown(false);
                    onOpenAuthModal();
                  }}
                  className="text-[11px] text-tertiary hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> Security Auth Modal
                </button>
                <button
                  onClick={() => {
                    setShowRoleDropdown(false);
                    logout();
                    onOpenAuthModal();
                  }}
                  className="text-[11px] text-error hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
