/**
 * S.P.E.E.D. Command Center
 * Predictive Analysis System for Early Detection of Land Acquisition Delays
 * Built for SIH 2026 (Problem Statement SIH26017)
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ActiveNavigationTab, ParcelRecord, AlertItem, EvidenceDocument } from './types';
import { INITIAL_PARCELS, INITIAL_ALERTS } from './data/mockData';

// Navigation Components
import { Sidebar } from './components/Navigation/Sidebar';
import { TopAppBar } from './components/Navigation/TopAppBar';
import { MobileNav } from './components/Navigation/MobileNav';

// View Components
import { DashboardView } from './components/Dashboard/DashboardView';
import { GisTelemetryView } from './components/GIS/GisTelemetryView';
import { ProjectListView } from './components/Telemetry/ProjectListView';
import { CaseReviewView } from './components/Explainability/CaseReviewView';
import { AlertsWorkflowView } from './components/Alerts/AlertsWorkflowView';
import { AdministrationView } from './components/Settings/AdministrationView';

// Modals
import { EscalationModal } from './components/Alerts/EscalationModal';
import { DocumentViewerModal } from './components/Common/DocumentViewerModal';
import { DeveloperGuideModal } from './components/DeveloperGuide/DeveloperGuideModal';
import { AuthModal } from './components/Auth/AuthModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveNavigationTab>('dashboard');
  const [parcels, setParcels] = useState<ParcelRecord[]>(INITIAL_PARCELS);
  const [selectedParcel, setSelectedParcel] = useState<ParcelRecord>(INITIAL_PARCELS[0]);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  // Modal States
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [alertToEscalate, setAlertToEscalate] = useState<AlertItem | null>(null);

  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<EvidenceDocument | null>(null);

  const [isDevGuideOpen, setIsDevGuideOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Alert Handlers
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a =>
        a.id === alertId ? { ...a, status: 'Acknowledged' as const } : a
      )
    );
    showToast(`Alert ${alertId} acknowledged by SLAO.`);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a =>
        a.id === alertId ? { ...a, status: 'Resolved' as const, dueIn: 'Closed' } : a
      )
    );
    showToast(`Alert ${alertId} marked as Resolved.`);
  };

  const handleOpenEscalateForParcel = (parcelNo: string) => {
    // Find or synthesize an alert item for this parcel
    const existing = alerts.find(a => a.parcelNo === parcelNo);
    if (existing) {
      setAlertToEscalate(existing);
    } else {
      const syntheticAlert: AlertItem = {
        id: `ALT-SYNTH-${Date.now()}`,
        alertId: `ALT-EXP-${parcelNo}`,
        parcelNo,
        severity: 'CRITICAL',
        disputeSignal: 'Officer Escalation Dispatch Requested',
        description: `Manual statutory escalation initiated for parcel ${parcelNo}. Immediate notice required under Land Acquisition Act.`,
        assignedRecipient: {
          name: 'Special Land Acquisition Officer',
          initials: 'SLAO',
          role: 'HQ-Division'
        },
        status: 'Pending',
        escalationPath: 'High Court Legal Cell',
        age: 'Just now',
        dueIn: 'Due in 2h',
        timestamp: new Date().toISOString()
      };
      setAlertToEscalate(syntheticAlert);
    }
    setIsEscalateModalOpen(true);
  };

  const handleOpenEscalateForAlert = (alert: AlertItem) => {
    setAlertToEscalate(alert);
    setIsEscalateModalOpen(true);
  };

  const handleConfirmEscalation = (alertId: string, notes: string, targetPath: string) => {
    setAlerts(prev =>
      prev.map(a =>
        a.id === alertId
          ? {
              ...a,
              status: 'Escalated' as const,
              escalationPath: targetPath,
              dueIn: 'Overdue / Priority Dispatch'
            }
          : a
      )
    );
    showToast(`Dispatched escalation summons to ${targetPath}!`);
  };

  const handleOpenDocument = (doc: EvidenceDocument) => {
    setSelectedDoc(doc);
    setIsDocModalOpen(true);
  };

  const pendingAlertsCount = alerts.filter(a => a.status === 'Pending').length;

  return (
    <div className="flex h-screen w-full bg-background text-on-background overflow-hidden selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 px-3 py-2 bg-tertiary text-on-tertiary rounded font-data-mono text-xs font-bold shadow-lg"
      >
        Skip to main tactical content
      </a>

      {/* Desktop Tactical Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={tab => {
          setActiveTab(tab);
          setIsMobileDrawerOpen(false);
        }}
        onOpenDeveloperGuide={() => setIsDevGuideOpen(true)}
        pendingAlertsCount={pendingAlertsCount}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Tactical Top App Bar */}
        <TopAppBar
          onOpenMobileMenu={() => setIsMobileDrawerOpen(prev => !prev)}
          onOpenDeveloperGuide={() => setIsDevGuideOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          pendingAlertsCount={pendingAlertsCount}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 right-4 z-50 p-3 rounded bg-surface-container-highest border border-tertiary/60 text-tertiary text-xs font-data-mono font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Mobile Slide-out Menu Drawer */}
        {isMobileDrawerOpen && (
          <div 
            className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileDrawerOpen(false)}
          >
            <div 
              className="w-64 h-full bg-surface-container-low border-r border-outline-variant/30 p-4 space-y-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-xs font-bold font-headline uppercase text-on-surface">
                Command Navigation
              </div>
              <div className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'telemetry', label: 'Telemetry' },
                  { id: 'gis', label: 'GIS View' },
                  { id: 'explainability', label: 'SHAP Review' },
                  { id: 'anomalies', label: `Anomalies (${pendingAlertsCount})` },
                  { id: 'settings', label: 'Governance & Config' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as ActiveNavigationTab);
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xs text-xs font-medium ${
                      activeTab === item.id
                        ? 'bg-surface-container-highest text-tertiary font-bold border-l-2 border-tertiary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-outline-variant/30 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    setIsDevGuideOpen(true);
                  }}
                  className="w-full text-left p-2 rounded-xs text-xs font-bold text-tertiary bg-tertiary/10"
                >
                  Open Developer Guide
                </button>
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full text-left p-2 rounded-xs text-xs font-bold text-on-surface bg-surface-container"
                >
                  Security Clearance
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Main Application Body */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto pb-20 md:pb-6 focus:outline-none"
        >
          {activeTab === 'dashboard' && (
            <DashboardView
              parcels={parcels}
              onSelectParcel={p => setSelectedParcel(p)}
              onNavigateTab={tab => setActiveTab(tab)}
              onOpenEscalate={handleOpenEscalateForParcel}
            />
          )}

          {activeTab === 'telemetry' && (
            <ProjectListView
              parcels={parcels}
              selectedParcel={selectedParcel}
              onSelectParcel={p => setSelectedParcel(p)}
              onNavigateTab={tab => setActiveTab(tab)}
              onOpenEscalate={handleOpenEscalateForParcel}
            />
          )}

          {activeTab === 'gis' && (
            <GisTelemetryView
              parcels={parcels}
              selectedParcel={selectedParcel}
              onSelectParcel={p => setSelectedParcel(p)}
              onNavigateTab={tab => setActiveTab(tab)}
              onOpenEscalate={handleOpenEscalateForParcel}
            />
          )}

          {activeTab === 'explainability' && (
            <CaseReviewView
              parcel={selectedParcel}
              onOpenDocument={handleOpenDocument}
              onOpenEscalate={handleOpenEscalateForParcel}
            />
          )}

          {activeTab === 'anomalies' && (
            <AlertsWorkflowView
              alerts={alerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onOpenEscalateModal={handleOpenEscalateForAlert}
              onResolveAlert={handleResolveAlert}
            />
          )}

          {activeTab === 'settings' && (
            <AdministrationView
              onOpenDeveloperGuide={() => setIsDevGuideOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Screenshot 11) */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={tab => setActiveTab(tab)}
        pendingAlertsCount={pendingAlertsCount}
      />

      {/* Modals */}
      <EscalationModal
        isOpen={isEscalateModalOpen}
        alert={alertToEscalate}
        onClose={() => setIsEscalateModalOpen(false)}
        onConfirmEscalation={handleConfirmEscalation}
      />

      <DocumentViewerModal
        document={selectedDoc}
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
      />

      <DeveloperGuideModal
        isOpen={isDevGuideOpen}
        onClose={() => setIsDevGuideOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
