import React from 'react';
import { ActiveNavigationTab } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  LineChart, 
  Map, 
  BrainCircuit, 
  AlertTriangle, 
  Settings, 
  BookOpen,
  Activity,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveNavigationTab;
  onTabChange: (tab: ActiveNavigationTab) => void;
  onOpenDeveloperGuide: () => void;
  pendingAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenDeveloperGuide,
  pendingAlertsCount
}) => {
  const { currentUser } = useAuth();

  const navItems = [
    {
      id: 'dashboard' as ActiveNavigationTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'telemetry' as ActiveNavigationTab,
      label: 'Telemetry & Corridor',
      icon: LineChart,
      badge: null
    },
    {
      id: 'gis' as ActiveNavigationTab,
      label: 'GIS Overlay',
      icon: Map,
      badge: 'LIVE'
    },
    {
      id: 'explainability' as ActiveNavigationTab,
      label: 'SHAP Review',
      icon: BrainCircuit,
      badge: null
    },
    {
      id: 'anomalies' as ActiveNavigationTab,
      label: 'Anomalies & Alerts',
      icon: AlertTriangle,
      badge: pendingAlertsCount > 0 ? `${pendingAlertsCount}` : null
    },
    {
      id: 'settings' as ActiveNavigationTab,
      label: 'Governance & Config',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside 
      id="sidebar-navigation"
      aria-label="Tactical Command Navigation"
      className="hidden md:flex flex-col w-64 shrink-0 bg-surface-container-low border-r border-outline-variant/30 select-none z-20 min-h-screen"
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-outline-variant/25">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-primary-container border border-primary/40 flex items-center justify-center text-primary font-bold shadow-sm">
            <span className="font-data-mono tracking-wider text-sm font-bold text-tertiary">SP</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-on-surface uppercase flex items-center gap-1.5 font-headline">
              S.P.E.E.D.
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" title="System Operational" />
            </h1>
            <p className="text-[10px] tracking-wider text-on-surface-variant font-data-mono uppercase">
              Predictive Delay System
            </p>
          </div>
        </div>

        {/* Tactical status strip */}
        <div className="mt-3 py-1 px-2 rounded bg-surface-container-lowest/80 border border-outline-variant/20 flex items-center justify-between text-[10px] font-data-mono">
          <span className="text-on-surface-variant flex items-center gap-1">
            <Activity className="w-3 h-3 text-tertiary" /> NODE-01
          </span>
          <span className="text-tertiary font-medium">ONLINE (12ms)</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto" aria-label="Main Navigation">
        <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-outline font-data-mono">
          Command Modules
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-medium transition-all group focus:outline-none focus:ring-2 focus:ring-tertiary/60 ${
                isActive
                  ? 'bg-surface-container-highest text-on-surface border-l-4 border-tertiary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-tertiary' : 'text-outline group-hover:text-on-surface'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-data-mono font-bold px-1.5 py-0.5 rounded-xs ${
                  item.badge === 'LIVE'
                    ? 'bg-tertiary/20 text-tertiary border border-tertiary/30'
                    : 'bg-error-container text-on-error-container border border-error/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Developer Guide Button */}
        <div className="pt-4 px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-outline font-data-mono">
          Architecture & Specs
        </div>
        <button
          id="btn-dev-guide"
          onClick={onOpenDeveloperGuide}
          className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs text-tertiary hover:bg-tertiary-container/30 border border-tertiary/20 transition-all group focus:outline-none focus:ring-2 focus:ring-tertiary"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-tertiary" />
            <span className="font-semibold">Developer Guide</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-tertiary/70 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </nav>

      {/* Operator Session Dossier */}
      <div className="p-3 border-t border-outline-variant/25 bg-surface-container-lowest/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-sm object-cover border border-tertiary/30"
              />
            ) : (
              <div className="w-9 h-9 rounded-sm bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs font-data-mono border border-outline-variant/40">
                {currentUser.initials}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-tertiary border-2 border-surface-container-low rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-on-surface truncate font-headline">
                {currentUser.name}
              </span>
              <span className="text-[9px] font-data-mono text-tertiary px-1 bg-tertiary/10 rounded">
                {currentUser.clearance.replace('SEC-', '')}
              </span>
            </div>
            <p className="text-[10px] text-on-surface-variant truncate">
              {currentUser.role}
            </p>
            <div className="flex items-center gap-1 text-[9px] text-outline font-data-mono mt-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-tertiary" />
              <span className="truncate">{currentUser.district}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
