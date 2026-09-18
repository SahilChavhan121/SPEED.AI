/**
 * S.P.E.E.D. Command Center - Type Definitions
 * Predictive Analysis System for Early Detection of Land Acquisition Delays
 * Built for SIH 2026 (Problem Statement SIH26017)
 */

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'ON TRACK' | 'ESCALATED';

export type ClearanceLevel = 'SEC-LEVEL-1' | 'SEC-LEVEL-2' | 'SEC-LEVEL-3' | 'SEC-LEVEL-4' | 'SEC-LEVEL-5';

export type UserRole = 
  | 'Senior Land Acquisition Officer'
  | 'Chief GIS Analyst'
  | 'System Administrator'
  | 'Field Revenue Officer'
  | 'High Court Legal Liaison';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  clearance: ClearanceLevel;
  district: string;
  avatarUrl?: string;
  initials: string;
  status: 'Active' | 'Standby' | 'Offline';
  idleTime?: string;
  permissions: string[];
}

export interface ParcelRecord {
  id: string;
  parcelNo: string;
  projectCode: string;
  corridor: string;
  district: string;
  collectorate: string;
  officer: string;
  officerTitle: string;
  riskScore: number; // 0 - 100
  riskClass: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'NOMINAL';
  expectedDelayDays: number;
  dataQualityScore: number; // percentage, e.g. 94.2
  riskConfidence: number; // percentage, e.g. 94.8
  disputeSignal: string;
  approvalAgeDays: number;
  lastUpdated: string;
  lat: number;
  lon: number;
  zoom: string;
  status: 'Land Acquisition In Progress' | 'Clearance Pending' | 'Award Declared' | 'Under Judicial Stay';
  contributingFactors: {
    name: string;
    weight: number;
    description: string;
    severity: 'HIGH' | 'MED' | 'LOW';
  }[];
  timeline: {
    initialNotification: string;
    objectionWindowClose: string;
    awardDeclarationEst: string;
    awardStatus: 'Delayed' | 'On Track' | 'Pending';
  };
  pendingDocuments: {
    name: string;
    type: string;
    status: 'MISSING' | 'UNDER REVIEW' | 'VERIFIED';
    code: string;
  }[];
  judicialStatus?: {
    caseNo: string;
    status: string;
    details: string;
  };
}

export interface AlertItem {
  id: string;
  alertId: string;
  parcelNo: string;
  severity: SeverityLevel;
  disputeSignal: string;
  description: string;
  assignedRecipient: {
    name: string;
    initials: string;
    role: string;
  };
  status: 'Pending' | 'Acknowledged' | 'Escalated' | 'Resolved';
  escalationPath: string;
  age: string;
  dueIn: string;
  timestamp: string;
}

export interface SHAPFactor {
  factor: string;
  impactPercent: number; // positive weight
  colorCategory: 'error' | 'tertiary' | 'secondary' | 'primary';
}

export interface EvidenceDocument {
  id: string;
  title: string;
  code: string;
  description: string;
  expectedDelayImpact: string;
  confidence: number;
  documentType: string;
  status: 'Verified' | 'Under Review' | 'Flagged';
  sourceRegistry: string;
  dateAdded: string;
  contentSummary: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  details: string;
  type: 'critical' | 'primary' | 'outline';
}

export interface MLModelVersion {
  id: string;
  name: string;
  tag: 'ACTIVE PROD' | 'STABLE' | 'STAGING';
  description: string;
  f1Accuracy: number;
  dataset: string;
  latencyMs: number;
  status: 'active' | 'stable' | 'staging';
}

export interface TelemetryFeedChannel {
  id: string;
  name: string;
  endpoint: string;
  syncFrequency: string;
  lastPacketTime: string;
  status: 'SYNCED' | 'RE-TRYING' | 'OFFLINE';
  icon: string;
}

export interface SystemThresholds {
  criticalRiskThreshold: number; // default 75
  escalationDelayDays: number; // default 3.5
  titleEncumbranceWeight: number; // default 40
  positionalVarianceCm: number; // default 15
  rules: {
    lidarCrossVerification: boolean;
    gisPerimeterLock: boolean;
    autonomousOverride: boolean;
    highCourtEscalationTrigger: boolean;
  };
}

export type ActiveNavigationTab = 'dashboard' | 'telemetry' | 'gis' | 'explainability' | 'anomalies' | 'settings';
