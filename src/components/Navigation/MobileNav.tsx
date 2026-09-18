import React from 'react';
import { ActiveNavigationTab } from '../../types';
import { LayoutDashboard, AlertTriangle, Map, Settings, LineChart, BrainCircuit } from 'lucide-react';

interface MobileNavProps {
  activeTab: ActiveNavigationTab;
  onTabChange: (tab: ActiveNavigationTab) => void;
  pendingAlertsCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  pendingAlertsCount
}) => {
  const tabs = [
    {
      id: 'dashboard' as ActiveNavigationTab,
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'telemetry' as ActiveNavigationTab,
      label: 'Telemetry',
      icon: LineChart
    },
    {
      id: 'gis' as ActiveNavigationTab,
      label: 'GIS Map',
      icon: Map
    },
    {
      id: 'explainability' as ActiveNavigationTab,
      label: 'SHAP',
      icon: BrainCircuit
    },
    {
      id: 'anomalies' as ActiveNavigationTab,
      label: 'Alerts',
      icon: AlertTriangle,
      badge: pendingAlertsCount > 0 ? `${pendingAlertsCount}` : null
    },
    {
      id: 'settings' as ActiveNavigationTab,
      label: 'Admin',
      icon: Settings
    }
  ];

  return (
    <nav 
      id="mobile-bottom-nav"
      aria-label="Mobile Tactical Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-around px-1 z-30 shadow-2xl backdrop-blur-md"
    >
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`mobile-nav-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[48px] py-1 transition-colors relative ${
              isActive
                ? 'text-tertiary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 bg-error text-on-error font-data-mono text-[9px] font-bold px-1 rounded-full animate-pulse">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 font-body truncate">
              {tab.label}
            </span>
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-tertiary rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
