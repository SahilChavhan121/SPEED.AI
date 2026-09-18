import React, { useState } from 'react';
import { ParcelRecord, EvidenceDocument, AuditLogEntry } from '../../types';
import { INITIAL_EVIDENCE_DOCS, INITIAL_AUDIT_LOGS } from '../../data/mockData';
import { 
  BrainCircuit, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  ShieldAlert, 
  Sliders, 
  Eye, 
  Sparkles,
  History,
  RotateCcw,
  Scale
} from 'lucide-react';

interface CaseReviewViewProps {
  parcel: ParcelRecord;
  onOpenDocument: (doc: EvidenceDocument) => void;
  onOpenEscalate: (parcelNo: string) => void;
}

export const CaseReviewView: React.FC<CaseReviewViewProps> = ({
  parcel,
  onOpenDocument,
  onOpenEscalate
}) => {
  const [evidenceDocs] = useState<EvidenceDocument[]>(INITIAL_EVIDENCE_DOCS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [officerNote, setOfficerNote] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [recalculating, setRecalculating] = useState(false);

  const handleAppendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerNote.trim()) return;

    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      operator: 'Current Officer',
      action: 'Officer Ground-Truth Annotation',
      details: officerNote,
      type: 'primary'
    };

    setAuditLogs(prev => [newLog, ...prev]);
    setOfficerNote('');
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 2500);
  };

  const handleRecompute = () => {
    setRecalculating(true);
    setTimeout(() => {
      setRecalculating(false);
      const newLog: AuditLogEntry = {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString() + ' UTC',
        operator: 'System AI Engine',
        action: 'Inference Recalculation',
        details: 'TreeSHAP tensor refreshed with latest registry packet.',
        type: 'primary'
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }, 800);
  };

  return (
    <div id="explainability-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto font-body">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-tertiary" />
            <h1 className="text-xl font-bold font-headline text-on-surface uppercase tracking-wider">
              SHAP Case Review // Explainability &amp; Evidence Panel
            </h1>
          </div>
          <p className="text-xs text-on-surface-variant font-data-mono mt-0.5">
            Model: <span className="text-secondary font-bold">v4.12-PROD</span> &bull; 
            Algorithm: <span className="text-on-surface">TreeSHAP Additive Factor Attribution</span> &bull; 
            Target: <span className="text-tertiary font-bold">{parcel.parcelNo}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRecompute}
            disabled={recalculating}
            className="px-3 py-1.5 rounded-sm bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-medium text-on-surface flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-tertiary ${recalculating ? 'animate-spin' : ''}`} />
            <span>{recalculating ? 'Recomputing...' : 'Re-run Inference'}</span>
          </button>
          <button
            onClick={() => onOpenEscalate(parcel.parcelNo)}
            className="px-3 py-1.5 rounded-sm bg-error-container text-on-error-container hover:bg-error hover:text-on-error border border-error/40 text-xs font-bold font-data-mono flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Escalate Case</span>
          </button>
        </div>
      </div>

      {/* Target Parcel Summary Banner */}
      <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-headline text-on-surface">
              PARCEL {parcel.parcelNo}
            </span>
            <span className="px-2 py-0.5 rounded-xs font-data-mono text-[10px] font-bold bg-error-container text-on-error-container border border-error/40">
              {parcel.riskClass} ({parcel.riskScore}/100)
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            {parcel.corridor} &bull; {parcel.district} &bull; Officer: {parcel.officer}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-data-mono">
          <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
            <span className="text-outline text-[10px] block">PREDICTED DELAY</span>
            <span className="text-error font-bold text-base">+{parcel.expectedDelayDays} Days</span>
          </div>
          <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
            <span className="text-outline text-[10px] block">MODEL CONFIDENCE</span>
            <span className="text-tertiary font-bold text-base">{parcel.riskConfidence}%</span>
          </div>
          <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
            <span className="text-outline text-[10px] block">DATA QUALITY</span>
            <span className="text-emerald-400 font-bold text-base">{parcel.dataQualityScore}%</span>
          </div>
        </div>
      </div>

      {/* 3-Column Tactical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 4 Columns: SHAP Attribution Decomposition */}
        <div className="lg:col-span-4 rounded-sm bg-surface-container border border-outline-variant/30 p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h2 className="text-xs font-bold font-headline uppercase tracking-wider text-on-surface flex items-center gap-2">
                <Scale className="w-4 h-4 text-tertiary" />
                SHAP Factor Breakdown
              </h2>
              <span className="text-[10px] font-data-mono text-outline">
                CONTRIBUTING TENSORS
              </span>
            </div>

            <p className="text-[11px] text-on-surface-variant leading-relaxed my-3 font-data-mono">
              Positive values push the model toward higher predicted delay days beyond the statutory baseline of 30 days.
            </p>

            {/* Factor Weights */}
            <div className="space-y-4">
              {parcel.contributingFactors.map(factor => (
                <div key={factor.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-on-surface">
                    <span className="truncate max-w-[200px]">{factor.name}</span>
                    <span className="font-data-mono font-bold text-error">+{factor.weight}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        factor.severity === 'HIGH'
                          ? 'bg-error'
                          : factor.severity === 'MED'
                          ? 'bg-amber-400'
                          : 'bg-tertiary'
                      }`}
                      style={{ width: `${factor.weight}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-body">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant/20 text-[11px] font-data-mono text-outline">
            Baseline expected delay: <span className="text-on-surface font-semibold">14 Days</span> &bull; 
            Additive delta: <span className="text-error font-bold">+{parcel.expectedDelayDays - 14} Days</span>
          </div>
        </div>

        {/* Middle 4 Columns: Evidence Documents Panel */}
        <div className="lg:col-span-4 rounded-sm bg-surface-container border border-outline-variant/30 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
            <h2 className="text-xs font-bold font-headline uppercase tracking-wider text-on-surface flex items-center gap-2">
              <FileText className="w-4 h-4 text-tertiary" />
              Evidence &amp; Artifacts
            </h2>
            <span className="text-[10px] font-data-mono text-outline">
              VERIFIED E-RECORDS
            </span>
          </div>

          <p className="text-[11px] text-on-surface-variant font-data-mono">
            Grounding documents ingested via NLP Document Intelligence module (M08).
          </p>

          <div className="space-y-3">
            {evidenceDocs.map(doc => (
              <div 
                key={doc.id}
                className="p-3.5 rounded-sm bg-surface-container-lowest border border-outline-variant/30 space-y-2 hover:border-tertiary/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-on-surface">
                      {doc.title}
                    </h3>
                    <span className="text-[10px] font-data-mono text-tertiary">
                      {doc.code}
                    </span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded-xs font-data-mono font-bold text-[9px] uppercase ${
                    doc.status === 'Verified'
                      ? 'bg-emerald-950 text-emerald-300'
                      : doc.status === 'Flagged'
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-amber-950 text-amber-300'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {doc.description}
                </p>

                <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-data-mono">
                  <span className="text-error font-semibold">Impact: {doc.expectedDelayImpact}</span>
                  <button
                    onClick={() => onOpenDocument(doc)}
                    className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-tertiary border border-outline-variant/30 flex items-center gap-1 transition-colors font-bold text-[10px]"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Inspect Doc</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Columns: Officer Intervention & Ground-Truth Logging */}
        <div className="lg:col-span-4 rounded-sm bg-surface-container border border-outline-variant/30 p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h2 className="text-xs font-bold font-headline uppercase tracking-wider text-on-surface flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-tertiary" />
                Officer Intervention
              </h2>
              <span className="text-[10px] font-data-mono text-outline">
                CLEARANCE: SEC-5
              </span>
            </div>

            {/* Ground Truth Feedback Form */}
            <form onSubmit={handleAppendFeedback} className="space-y-2.5 my-3">
              <label htmlFor="officer-feedback" className="block text-[11px] font-bold text-on-surface uppercase tracking-wider font-data-mono">
                Log Ground-Truth Field Finding:
              </label>
              <textarea
                id="officer-feedback"
                rows={3}
                value={officerNote}
                onChange={e => setOfficerNote(e.target.value)}
                placeholder="Append verified ground-truth (e.g. 'Dispute resolved via arbitration tribunal on 2026-03-30')..."
                className="w-full p-2.5 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-tertiary font-body resize-none"
              />
              <div className="flex items-center justify-between">
                {feedbackSuccess ? (
                  <span className="text-emerald-400 text-[11px] font-data-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Remark logged to registry
                  </span>
                ) : (
                  <span className="text-[10px] text-outline font-data-mono">Feeds retraining loop</span>
                )}
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xs bg-tertiary text-on-tertiary font-bold font-data-mono text-xs flex items-center gap-1 hover:bg-tertiary/90 transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Log Remark</span>
                </button>
              </div>
            </form>

            {/* Audit Trail Log */}
            <div className="pt-3 border-t border-outline-variant/30">
              <span className="text-[10px] font-data-mono text-outline uppercase font-bold block mb-2 flex items-center gap-1">
                <History className="w-3 h-3 text-outline" />
                Dossier Audit Trail &amp; Ledger:
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20 text-[11px] font-data-mono space-y-0.5">
                    <div className="flex items-center justify-between text-outline text-[10px]">
                      <span>{log.timestamp}</span>
                      <span className="text-tertiary font-semibold">{log.operator}</span>
                    </div>
                    <div className="font-semibold text-on-surface">{log.action}</div>
                    <div className="text-on-surface-variant text-[10px] truncate">{log.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenEscalate(parcel.parcelNo)}
            className="w-full py-2 rounded-xs bg-error-container text-on-error-container hover:bg-error hover:text-on-error font-bold font-data-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-error/40 shadow-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Escalate Summons Protocol</span>
          </button>
        </div>
      </div>
    </div>
  );
};
