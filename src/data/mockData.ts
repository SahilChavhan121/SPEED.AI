import {
  ParcelRecord,
  AlertItem,
  UserProfile,
  MLModelVersion,
  TelemetryFeedChannel,
  EvidenceDocument,
  AuditLogEntry,
  SystemThresholds
} from '../types';

export const GIS_MAP_IMAGE_PREVIEW = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmftOE5g9cp5mVnTF3pkHbbgvfI8vHKd4GgEEAgIfKj5P4uQ-W01yKRWy2J8mLa6TBeCwcdEDwFmitaYYBm-xPY6JYb37C66_CcSxzLJD5tpij3C-PMuojcaG-B9Vn_CMYeaD7b4dWpHMliN0nSUM4KR_2_PSEzYnULWrCesH6f3ESHmPKbKlt2ub__yYpqVG1lN3B-0rRxeUx-klQp30FGNaCr74R9TXKQAs_jYeeMmxvpkYbRAor';

export const GIS_MAP_IMAGE_DETAILED = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7mjfttfjEp9n0gQUXOe0l6cLZfTE5ZHOEsWnRFpWdO7WdvdXNtn7AytY1ZF20ZRd7yWLkB-krzNAk4ZD-s_1mMOmowDA4NLgxnLKRG4yHrzqtWlhYHCFtz3d-WcQNmeD80alCwGp38SbZfb8yM_EX5pDCGNTX0CY_SN9ypNeDLCnBmT3v-HdoxvNUdAMX_hbsgu6NdQRB3_9R8_AAZ0WggSfZ3gxlOMp_dc4k56jsazuyGWdPpvuj';

export const OPERATOR_AVATAR_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjEBiAiISx8Xb0rWQte1F0R_jzZG3p9Av8lZC7cXMdmDd5pX_Jl3cFonVpjuLyN3EjSpN3bECyVTSytx6H8Kfi9wv51eUM2zYelOhHlvQRUggMtYsJMJ1WRVaVbASJFweKPVbl5VqyvWhQUG5Zqk60skH1DMCiWYDUyRprAg3QWXB9myaKmujsOtzH1U47rKuFaxNUv7O4BrR2oCrtRIxsPxUvfgg2wXlTzj_tSTjRHr_xojnSt-GL';

export const INITIAL_PARCELS: ParcelRecord[] = [
  {
    id: 'PAR-NH-44-B',
    parcelNo: 'NH-44-B',
    projectCode: 'EXP-NH44-AMB',
    corridor: 'Ambala-Chandigarh Expressway Expansion',
    district: 'Ambala North Sector',
    collectorate: 'Ambala Collectorate',
    officer: 'Sh. R. K. Varma, IAS',
    officerTitle: 'Land Acquisition Officer',
    riskScore: 88,
    riskClass: 'CRITICAL',
    expectedDelayDays: 45,
    dataQualityScore: 94.2,
    riskConfidence: 94.8,
    disputeSignal: 'Dispute Signal: Title Encumbrance',
    approvalAgeDays: 114,
    lastUpdated: '2026-03-30 14:22 UTC',
    lat: 28.6139,
    lon: 77.2090,
    zoom: '14.2x',
    status: 'Land Acquisition In Progress',
    contributingFactors: [
      {
        name: 'Title Encumbrance Dispute',
        weight: 45,
        description: 'Multiple overlapping ownership claims filed under Section 4(1) land acquisition notices by claimant faction B across sub-plot 44-B-2.',
        severity: 'HIGH'
      },
      {
        name: 'Environmental Clearance Hold',
        weight: 30,
        description: 'Pending clearance from State Wetland Authority due to proximity to drainage basin buffer zone in Sector 14 micro-watershed.',
        severity: 'MED'
      },
      {
        name: 'Boundary Overlap Signal',
        weight: 14,
        description: 'Satellite vector drift flags 1.8m variance with cadastral map boundary pillar #12.',
        severity: 'MED'
      },
      {
        name: 'Valuation Discrepancy',
        weight: 10,
        description: 'Appraised commercial value exceeds circle rate guidance by 22%.',
        severity: 'LOW'
      }
    ],
    timeline: {
      initialNotification: '2024-01-15',
      objectionWindowClose: '2024-03-30',
      awardDeclarationEst: '2025-12-15 (Delayed)',
      awardStatus: 'Delayed'
    },
    pendingDocuments: [
      {
        name: 'Encumbrance Certificate Form 16',
        type: 'Registry / Legal',
        status: 'MISSING',
        code: 'DOC-ENC-16'
      },
      {
        name: 'Gram Sabha Resolution NOC',
        type: 'Local Governance',
        status: 'UNDER REVIEW',
        code: 'DOC-GS-NOC'
      }
    ],
    judicialStatus: {
      caseNo: 'WP-14829-2023',
      status: 'HEARING PENDING',
      details: 'High Court interim stay active on commercial structure demolition within 50m radius.'
    }
  },
  {
    id: 'PAR-GJ-8A-09',
    parcelNo: 'GJ-8A-09',
    projectCode: 'EXP-GJ8A-KDL',
    corridor: 'Kandla Port Industrial Corridor',
    district: 'Kutch Coastline Sector',
    collectorate: 'Gandhidham Collectorate',
    officer: 'Smt. P. Mehta, GAS',
    officerTitle: 'Special Land Acquisition Officer',
    riskScore: 68,
    riskClass: 'HIGH',
    expectedDelayDays: 32,
    dataQualityScore: 91.5,
    riskConfidence: 92.1,
    disputeSignal: 'Dispute Signal: Valuation Mismatch',
    approvalAgeDays: 76,
    lastUpdated: '2026-03-30 11:05 UTC',
    lat: 23.0135,
    lon: 70.2185,
    zoom: '13.8x',
    status: 'Clearance Pending',
    contributingFactors: [
      {
        name: 'Valuation Discrepancy Appraisals',
        weight: 52,
        description: 'Commercial salt-pan valuation disputed by local cooperative union.',
        severity: 'HIGH'
      },
      {
        name: 'Title Registry Synchronization',
        weight: 24,
        description: 'Sub-registry index II deed records unverified partition certificate.',
        severity: 'MED'
      }
    ],
    timeline: {
      initialNotification: '2024-04-10',
      objectionWindowClose: '2024-06-15',
      awardDeclarationEst: '2025-09-30 (Pending)',
      awardStatus: 'Pending'
    },
    pendingDocuments: [
      {
        name: 'Valuation Audit Report 2024',
        type: 'Financial Appraisal',
        status: 'UNDER REVIEW',
        code: 'DOC-VAL-88'
      }
    ]
  },
  {
    id: 'PAR-UP-91-X',
    parcelNo: 'UP-91-X',
    projectCode: 'EXP-UP91-LKO',
    corridor: 'Lucknow-Kanpur Express Connector',
    district: 'Unnao Central Bypass',
    collectorate: 'Unnao Collectorate',
    officer: 'Dr. S. K. Awasthi, PCS',
    officerTitle: 'Land Acquisition Collector',
    riskScore: 16,
    riskClass: 'NOMINAL',
    expectedDelayDays: 0,
    dataQualityScore: 98.4,
    riskConfidence: 97.9,
    disputeSignal: 'Dispute Signal: Clear Baseline',
    approvalAgeDays: 14,
    lastUpdated: '2026-03-29 18:40 UTC',
    lat: 26.5412,
    lon: 80.4891,
    zoom: '14.5x',
    status: 'Award Declared',
    contributingFactors: [
      {
        name: 'Consent Agreement Coverage',
        weight: 85,
        description: '92% direct consent obtained under Section 23A voluntary agreement.',
        severity: 'LOW'
      }
    ],
    timeline: {
      initialNotification: '2024-07-01',
      objectionWindowClose: '2024-08-15',
      awardDeclarationEst: '2025-04-10',
      awardStatus: 'On Track'
    },
    pendingDocuments: [
      {
        name: 'Final Award Gazette Notification',
        type: 'Statutory Publication',
        status: 'VERIFIED',
        code: 'DOC-GZT-91'
      }
    ]
  },
  {
    id: 'PAR-KR-12-C',
    parcelNo: 'KR-12-C',
    projectCode: 'EXP-KR12-KCH',
    corridor: 'NH-66 Coastal Highway Expansion',
    district: 'Ernakulam North Sub-District',
    collectorate: 'Kochi Collectorate',
    officer: 'Sh. C. V. Mathew, IAS',
    officerTitle: 'Competent Authority Land Acquisition',
    riskScore: 82,
    riskClass: 'CRITICAL',
    expectedDelayDays: 41,
    dataQualityScore: 89.0,
    riskConfidence: 93.7,
    disputeSignal: 'Dispute Signal: Missing Gazette Notification',
    approvalAgeDays: 98,
    lastUpdated: '2026-03-29 09:15 UTC',
    lat: 10.0159,
    lon: 76.3419,
    zoom: '15.1x',
    status: 'Clearance Pending',
    contributingFactors: [
      {
        name: 'Statutory Gazette Publication Lapsed',
        weight: 48,
        description: 'Section 3A notification lapsed prior to sub-collectorate survey verification.',
        severity: 'HIGH'
      },
      {
        name: 'Coastal Regulation Zone Buffer',
        weight: 34,
        description: 'Tidal influx buffer requires clearance from State Coastal Zone Authority.',
        severity: 'HIGH'
      }
    ],
    timeline: {
      initialNotification: '2024-02-20',
      objectionWindowClose: '2024-04-30',
      awardDeclarationEst: '2025-11-20 (Delayed)',
      awardStatus: 'Delayed'
    },
    pendingDocuments: [
      {
        name: 'CRZ Compliance Certificate',
        type: 'Environmental',
        status: 'MISSING',
        code: 'DOC-CRZ-12'
      }
    ]
  },
  {
    id: 'PAR-MH-03-F',
    parcelNo: 'MH-03-F',
    projectCode: 'EXP-MH03-PUN',
    corridor: 'Pune Ring Expressway South Arc',
    district: 'Haveli Taluka East',
    collectorate: 'Pune Collectorate',
    officer: 'Smt. A. Deshmukh, IAS',
    officerTitle: 'Additional District Collector',
    riskScore: 61,
    riskClass: 'MODERATE',
    expectedDelayDays: 24,
    dataQualityScore: 92.8,
    riskConfidence: 91.0,
    disputeSignal: 'Dispute Signal: Boundary Overlap Alert',
    approvalAgeDays: 45,
    lastUpdated: '2026-03-28 16:50 UTC',
    lat: 18.5204,
    lon: 73.8567,
    zoom: '14.0x',
    status: 'Land Acquisition In Progress',
    contributingFactors: [
      {
        name: 'Forest Boundary Overlap',
        weight: 42,
        description: 'Joint measurement survey revealed 0.4 hectare overlap with notified social forestry parcel.',
        severity: 'MED'
      },
      {
        name: 'Tribal Land Transfer NOC',
        weight: 30,
        description: 'Awaiting clearance under Maharashtra Land Revenue Code Section 36A.',
        severity: 'MED'
      }
    ],
    timeline: {
      initialNotification: '2024-05-18',
      objectionWindowClose: '2024-07-20',
      awardDeclarationEst: '2025-08-30 (Pending)',
      awardStatus: 'Pending'
    },
    pendingDocuments: [
      {
        name: 'Divisional Forest Officer NOC',
        type: 'Forestry',
        status: 'UNDER REVIEW',
        code: 'DOC-DFO-03'
      }
    ]
  },
  {
    id: 'PAR-EW-701-A',
    parcelNo: 'EW-701-A',
    projectCode: 'EXP-EW701-PAN',
    corridor: 'Panipat Central Bypass',
    district: 'Panipat Central',
    collectorate: 'Panipat Collectorate',
    officer: 'Amitabh Sen, HCS',
    officerTitle: 'Sub-Divisional Magistrate',
    riskScore: 18,
    riskClass: 'NOMINAL',
    expectedDelayDays: 0,
    dataQualityScore: 96.5,
    riskConfidence: 98.2,
    disputeSignal: 'Clear Baseline: No Liens',
    approvalAgeDays: 22,
    lastUpdated: '2026-03-27 18:40 UTC',
    lat: 29.3909,
    lon: 76.9635,
    zoom: '14.0x',
    status: 'Land Acquisition In Progress',
    contributingFactors: [],
    timeline: {
      initialNotification: '2024-06-01',
      objectionWindowClose: '2024-07-15',
      awardDeclarationEst: '2025-05-30',
      awardStatus: 'On Track'
    },
    pendingDocuments: []
  },
  {
    id: 'PAR-GG-12-X',
    parcelNo: 'GG-12-X',
    projectCode: 'EXP-GG12-GUR',
    corridor: 'Gurugram Peripheral Southern Ring',
    district: 'Gurugram Expressway Ring',
    collectorate: 'Gurugram HQ',
    officer: 'Meenakshi Anand, IAS',
    officerTitle: 'Chief Land Administrator',
    riskScore: 76,
    riskClass: 'HIGH',
    expectedDelayDays: 28,
    dataQualityScore: 93.1,
    riskConfidence: 95.0,
    disputeSignal: 'High Friction: Commercial Encroachment',
    approvalAgeDays: 64,
    lastUpdated: '2026-03-27 09:15 UTC',
    lat: 28.4595,
    lon: 77.0266,
    zoom: '14.8x',
    status: 'Under Judicial Stay',
    contributingFactors: [
      {
        name: 'Commercial Structure Valuation Appeal',
        weight: 60,
        description: 'Structure owners contesting arbitration tribunal compensation assessment.',
        severity: 'HIGH'
      }
    ],
    timeline: {
      initialNotification: '2024-03-12',
      objectionWindowClose: '2024-05-15',
      awardDeclarationEst: '2025-10-15 (Delayed)',
      awardStatus: 'Delayed'
    },
    pendingDocuments: [
      {
        name: 'Arbitration Valuation Assessment',
        type: 'Legal',
        status: 'UNDER REVIEW',
        code: 'DOC-ARB-12'
      }
    ]
  },
  {
    id: 'PAR-NH-44-A',
    parcelNo: 'NH-44-A',
    projectCode: 'EXP-NH44-AMB',
    corridor: 'Ambala-Chandigarh Expressway Expansion',
    district: 'Ambala North Sector',
    collectorate: 'Ambala Collectorate',
    officer: 'Dr. R. K. Vashisht, IAS',
    officerTitle: 'Deputy Commissioner',
    riskScore: 22,
    riskClass: 'NOMINAL',
    expectedDelayDays: 0,
    dataQualityScore: 97.8,
    riskConfidence: 99.1,
    disputeSignal: 'Surveyed: Clear Title',
    approvalAgeDays: 18,
    lastUpdated: '2026-03-26 16:50 UTC',
    lat: 28.6190,
    lon: 77.2150,
    zoom: '14.2x',
    status: 'Award Declared',
    contributingFactors: [],
    timeline: {
      initialNotification: '2024-01-10',
      objectionWindowClose: '2024-02-28',
      awardDeclarationEst: '2024-11-20',
      awardStatus: 'On Track'
    },
    pendingDocuments: []
  },
  {
    id: 'PAR-NH-44-C',
    parcelNo: 'NH-44-C',
    projectCode: 'EXP-NH44-AMB',
    corridor: 'Ambala-Chandigarh Expressway Expansion',
    district: 'Ambala North Sector',
    collectorate: 'Ambala Collectorate',
    officer: 'Dr. R. K. Vashisht, IAS',
    officerTitle: 'Deputy Commissioner',
    riskScore: 45,
    riskClass: 'MODERATE',
    expectedDelayDays: 12,
    dataQualityScore: 93.4,
    riskConfidence: 94.0,
    disputeSignal: 'Dispute Signal: Minor Boundary Variance',
    approvalAgeDays: 52,
    lastUpdated: '2026-03-26 11:05 UTC',
    lat: 28.6080,
    lon: 77.2020,
    zoom: '14.2x',
    status: 'Land Acquisition In Progress',
    contributingFactors: [
      {
        name: 'Irrigation Canal Setback Line',
        weight: 35,
        description: 'Irrigation Department buffer requires 12m easement setback confirmation.',
        severity: 'MED'
      }
    ],
    timeline: {
      initialNotification: '2024-01-15',
      objectionWindowClose: '2024-03-30',
      awardDeclarationEst: '2025-06-15',
      awardStatus: 'Pending'
    },
    pendingDocuments: [
      {
        name: 'Irrigation Dept Easement NOC',
        type: 'State Utility',
        status: 'UNDER REVIEW',
        code: 'DOC-IRR-44'
      }
    ]
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-1',
    alertId: 'ALT-9021',
    parcelNo: 'PAR-883-A',
    severity: 'CRITICAL',
    disputeSignal: 'Boundary Encroachment Detected',
    description: 'Unauthorized heavy machinery movement across sector 4 sector marker detected via satellite telemetry overlay.',
    assignedRecipient: {
      name: 'M. Kumar',
      initials: 'MK',
      role: 'SLAO-North'
    },
    status: 'Pending',
    escalationPath: 'Special Land Acquisition Officer',
    age: '24m ago',
    dueIn: 'Due in 2h',
    timestamp: '2026-03-30 14:18 UTC'
  },
  {
    id: 'ALT-2',
    alertId: 'ALT-9018',
    parcelNo: 'PAR-412-C',
    severity: 'HIGH',
    disputeSignal: 'Title Deed Discrepancy',
    description: 'Ownership mismatch recorded between registry folio and drone survey telemetry point clouds.',
    assignedRecipient: {
      name: 'S. Patel',
      initials: 'SP',
      role: 'DC-Legal'
    },
    status: 'Acknowledged',
    escalationPath: 'District Collector',
    age: '3h ago',
    dueIn: 'Due in 18h',
    timestamp: '2026-03-30 11:30 UTC'
  },
  {
    id: 'ALT-3',
    alertId: 'ALT-8994',
    parcelNo: 'PAR-109-F',
    severity: 'ESCALATED',
    disputeSignal: 'Stay Order Injunction Filed',
    description: 'High Court legal cell issued temporary injunction on plot clearance within 50m highway boundary.',
    assignedRecipient: {
      name: 'R. Joshi',
      initials: 'RJ',
      role: 'HC-Cell'
    },
    status: 'Escalated',
    escalationPath: 'High Court Legal Cell',
    age: '1d ago',
    dueIn: 'Overdue',
    timestamp: '2026-03-29 10:15 UTC'
  },
  {
    id: 'ALT-4',
    alertId: 'ALT-8972',
    parcelNo: 'PAR-554-B',
    severity: 'MEDIUM',
    disputeSignal: 'Compensation Payout Delay',
    description: 'Disbursal pending bank verification for landowner group 12 under direct benefit transfer registry.',
    assignedRecipient: {
      name: 'A. Nair',
      initials: 'AN',
      role: 'Treasury'
    },
    status: 'Acknowledged',
    escalationPath: 'District Collector',
    age: '2d ago',
    dueIn: 'Due in 3d',
    timestamp: '2026-03-28 15:45 UTC'
  },
  {
    id: 'ALT-5',
    alertId: 'ALT-8950',
    parcelNo: 'PAR-201-X',
    severity: 'LOW',
    disputeSignal: 'Minor Survey Marker Shift',
    description: 'GPS pillar 14 minor positional variance (4.2cm) noted during quarterly GIS sweep.',
    assignedRecipient: {
      name: 'T. Khan',
      initials: 'TK',
      role: 'Survey-Ops'
    },
    status: 'Resolved',
    escalationPath: 'Special Land Acquisition Officer',
    age: '4d ago',
    dueIn: 'Closed',
    timestamp: '2026-03-26 09:00 UTC'
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'OP-8821',
    name: 'V. Vance',
    role: 'Senior Land Acquisition Officer',
    clearance: 'SEC-LEVEL-5',
    district: 'Sector Alpha-North',
    initials: 'VV',
    status: 'Active',
    idleTime: '0m idle',
    permissions: ['ROOT', 'OVERRIDE', 'EXEC', 'ESCALATE', 'POLICY_WRITE']
  },
  {
    id: 'OP-4029',
    name: 'K. Roxburgh',
    role: 'Chief GIS Analyst',
    clearance: 'SEC-LEVEL-4',
    district: 'Sector Central-Grid',
    initials: 'KR',
    status: 'Active',
    idleTime: '12m idle',
    permissions: ['ANALYTICS', 'WRITE', 'GIS_OVERLAY', 'VECTOR_SYNC']
  },
  {
    id: 'OP-1102',
    name: 'M. Sterling',
    role: 'System Administrator',
    clearance: 'SEC-LEVEL-3',
    district: 'Perimeter Sub-Station 4',
    avatarUrl: OPERATOR_AVATAR_IMAGE,
    initials: 'MS',
    status: 'Standby',
    permissions: ['READ-ONLY', 'AUDIT_VIEW', 'CONFIG_EXPORT']
  },
  {
    id: 'OP-404',
    name: 'Operator 404',
    role: 'Field Revenue Officer',
    clearance: 'SEC-LEVEL-5',
    district: 'Ambala North Sector',
    initials: 'OP',
    status: 'Active',
    idleTime: '2m idle',
    permissions: ['FIELD_VERIFY', 'GROUND_TRUTH_WRITE', 'SHAP_INPUT']
  }
];

export const INITIAL_EVIDENCE_DOCS: EvidenceDocument[] = [
  {
    id: 'DOC-1',
    title: 'Encumbrance Certificate Form 16',
    code: 'REG-8839-C',
    description: 'Disputed title claim registered under sub-district registry folio #8839-C with multi-claimant partition litigation.',
    expectedDelayImpact: '+45 Days',
    confidence: 96.2,
    documentType: 'State Revenue & Registration',
    status: 'Flagged',
    sourceRegistry: 'Sub-Registrar Office, Ambala North',
    dateAdded: '2024-02-14',
    contentSummary: 'Property Schedule Plot 44-B shows active Lis Pendens notice regarding Civil Suit No. 248/2023 in Senior Civil Judge Court.'
  },
  {
    id: 'DOC-2',
    title: 'Gazette Notification Vol-IV (Sec 3D Declaration)',
    code: 'GZT-SEC3D-99',
    description: 'Environmental clearance hold enforced near protected wetland drainage buffer zone along Sector NH-44.',
    expectedDelayImpact: '+29 Days',
    confidence: 93.4,
    documentType: 'Statutory Publication',
    status: 'Under Review',
    sourceRegistry: 'The Gazette of India: Extraordinary',
    dateAdded: '2024-03-01',
    contentSummary: 'Declaration under Section 3D of National Highways Act 1956 specifying acquisition limits subject to Eco-Sensitive Zone clearance.'
  },
  {
    id: 'DOC-3',
    title: 'Gram Sabha Resolution NOC & Joint Measurement',
    code: 'GS-RES-04',
    description: 'Joint measurement sheet approved by village revenue patwari with reservation on common grazing passage boundary.',
    expectedDelayImpact: '+12 Days',
    confidence: 88.5,
    documentType: 'Local Governance NOC',
    status: 'Verified',
    sourceRegistry: 'Gram Panchayat Revenue Cell',
    dateAdded: '2024-01-20',
    contentSummary: 'Signatures of 42 village landholders recorded; alternative 6-meter livestock passage stipulated in Section 7.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-1',
    timestamp: '14:42:01 UTC',
    operator: 'Operator 404',
    action: 'Feedback logged by Op-404',
    details: 'Remark appended to SHAP tensor registry: Verified boundary overlap with survey pillar #12.',
    type: 'primary'
  },
  {
    id: 'LOG-2',
    timestamp: '14:30:18 UTC',
    operator: 'System AI Engine',
    action: 'Risk Flag Escalated: CRITICAL',
    details: 'Automated trigger from Form 16 mismatch. Risk score recalculated to 88/100.',
    type: 'critical'
  },
  {
    id: 'LOG-3',
    timestamp: '12:15:00 UTC',
    operator: 'GIS Telemetry Node',
    action: 'Initial Telemetry Ingestion',
    details: 'Parcel NH-44-B synchronized with geospatial vector node at 12.4 GB/s.',
    type: 'outline'
  },
  {
    id: 'LOG-4',
    timestamp: '10:04:12 UTC',
    operator: 'Operator Alpha-9',
    action: 'Document Verification Scheduled',
    details: 'Form 16 flagged for secondary field inspection by Special Land Acquisition Officer.',
    type: 'primary'
  }
];

export const INITIAL_ML_MODELS: MLModelVersion[] = [
  {
    id: 'MOD-1',
    name: 'v4.12-PROD',
    tag: 'ACTIVE PROD',
    description: 'Primary predictive model tuned for high-density urban seismic and structural telemetry streams.',
    f1Accuracy: 94.8,
    dataset: 'DS-CORE-99V2',
    latencyMs: 12,
    status: 'active'
  },
  {
    id: 'MOD-2',
    name: 'v4.11-STABLE',
    tag: 'STABLE',
    description: 'Previous fallback baseline model verified for extreme fault tolerance and low false-positive rates.',
    f1Accuracy: 92.1,
    dataset: 'DS-CORE-98V1',
    latencyMs: 9,
    status: 'stable'
  },
  {
    id: 'MOD-3',
    name: 'v5.0-BETA',
    tag: 'STAGING',
    description: 'Experimental neural network iteration incorporating real-time LiDAR elevation clustering.',
    f1Accuracy: 96.5,
    dataset: 'DS-BETA-01X',
    latencyMs: 24,
    status: 'staging'
  }
];

export const INITIAL_FEEDS: TelemetryFeedChannel[] = [
  {
    id: 'FEED-1',
    name: 'State Land Registry API',
    endpoint: 'https://registry.gov.internal/v2/stream',
    syncFrequency: 'Every 60s',
    lastPacketTime: '2026-03-30 14:42:01 UTC',
    status: 'SYNCED',
    icon: 'database'
  },
  {
    id: 'FEED-2',
    name: 'GIS Corridor Feeds',
    endpoint: 'https://gis-grid.secure.infra/nodes',
    syncFrequency: 'Real-time (Websocket)',
    lastPacketTime: 'Just now',
    status: 'SYNCED',
    icon: 'map'
  },
  {
    id: 'FEED-3',
    name: 'LiDAR Elevation Nodes',
    endpoint: 'https://lidar.nodes.internal/stream_v4',
    syncFrequency: 'Every 300s',
    lastPacketTime: '2026-03-30 14:38:12 UTC',
    status: 'RE-TRYING',
    icon: 'terrain'
  }
];

export const INITIAL_THRESHOLDS: SystemThresholds = {
  criticalRiskThreshold: 75,
  escalationDelayDays: 3.5,
  titleEncumbranceWeight: 40,
  positionalVarianceCm: 15,
  rules: {
    lidarCrossVerification: true,
    gisPerimeterLock: true,
    autonomousOverride: false,
    highCourtEscalationTrigger: true
  }
};
