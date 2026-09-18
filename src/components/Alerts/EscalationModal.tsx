import React, { useState, useEffect } from 'react';
import { AlertItem } from '../../types';
import { 
  AlertOctagon, 
  X, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  UserCheck,
  Building2
} from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  alert: AlertItem | null;
  onClose: () => void;
  onConfirmEscalation: (alertId: string, notes: string, targetPath: string) => void;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  alert,
  onClose,
  onConfirmEscalation
}) => {
  const [targetPath, setTargetPath] = useState('High Court Legal Cell');
  const [operatorNotes, setOperatorNotes] = useState('');
  const [isDispatching, setIsDispatching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (alert) {
      setTargetPath(alert.escalationPath || 'High Court Legal Cell');
      setOperatorNotes(
        `Immediate officer intervention requested for ${alert.parcelNo}. High risk delay signal detected (${alert.disputeSignal}). Dispatched via S.P.E.E.D. protocol.`
      );
      setIsSuccess(false);
      setIsDispatching(false);
    }
  }, [alert]);

  // Handle escape key to close modal for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !alert) return null;

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirmEscalation(alert.id, operatorNotes, targetPath);
        onClose();
      }, 1200);
    }, 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="escalation-modal-title"
    >
      <div 
        id="escalation-dialog"
        className="w-full max-w-xl bg-surface-container-low border border-outline-variant/40 rounded-sm shadow-2xl overflow-hidden font-body text-on-surface animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Tactical Header */}
        <div className="px-5 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-error-container/30 border border-error/40 flex items-center justify-center text-error">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 id="escalation-modal-title" className="text-sm font-bold font-headline uppercase tracking-wider text-on-surface flex items-center gap-2">
                Escalation Dispatch
                <span className="text-[10px] font-data-mono text-tertiary bg-tertiary/10 px-1.5 py-0.5 rounded">
                  PROTOCOL // SLAO-INTERVENE-04
                </span>
              </h2>
              <p className="text-[11px] text-on-surface-variant font-data-mono">
                AUTHORITY DISPATCH TRANSMISSION SYSTEM
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-sm text-outline hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary"
            aria-label="Close escalation dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Alert Dossier Preview Card */}
          <div className="p-3.5 rounded-sm bg-surface-container border border-outline-variant/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-data-mono font-bold text-tertiary text-xs">
                  {alert.alertId}
                </span>
                <span className="text-outline">/</span>
                <span className="font-data-mono font-bold text-on-surface">
                  {alert.parcelNo}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-xs font-data-mono font-bold text-[10px] bg-error-container text-on-error-container border border-error/30">
                {alert.severity}
              </span>
            </div>

            <div className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-error shrink-0" />
              <span>{alert.disputeSignal}</span>
            </div>

            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {alert.description}
            </p>

            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-data-mono text-outline">
              <span>Assigned: {alert.assignedRecipient.name} ({alert.assignedRecipient.role})</span>
              <span className="text-error">{alert.dueIn}</span>
            </div>
          </div>

          {/* Target Jurisdiction Path Selector */}
          <div>
            <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1.5 font-data-mono">
              Target Jurisdiction Escalation Route:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'High Court Legal Cell', sub: 'Judicial Stay Prevention' },
                { label: 'Special Land Acquisition Officer', sub: 'Direct Administrative Override' },
                { label: 'District Collector (Executive)', sub: 'Dispute Arbitration Hearing' },
                { label: 'NHAI Corridor Director', sub: 'Financial Compensation Escrow' }
              ].map(route => (
                <button
                  key={route.label}
                  type="button"
                  onClick={() => setTargetPath(route.label)}
                  className={`p-2 rounded-xs border text-left transition-all ${
                    targetPath === route.label
                      ? 'bg-primary-container border-primary text-on-surface shadow-xs font-semibold'
                      : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Building2 className="w-3 h-3 text-tertiary" />
                    <span>{route.label}</span>
                  </div>
                  <div className="text-[10px] text-outline mt-0.5">
                    {route.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Operator Directive / Remarks */}
          <div>
            <label htmlFor="escalation-remarks" className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1.5 font-data-mono">
              Officer Directive & Mitigation Remarks:
            </label>
            <textarea
              id="escalation-remarks"
              rows={3}
              value={operatorNotes}
              onChange={e => setOperatorNotes(e.target.value)}
              className="w-full p-2.5 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-tertiary font-body resize-none"
              placeholder="Input explicit statutory instructions for field officers..."
            />
          </div>

          {/* Protocol Compliance Notice */}
          <div className="p-2.5 rounded-xs bg-surface-container-lowest/80 border border-outline-variant/20 flex items-start gap-2 text-[11px] text-on-surface-variant font-data-mono">
            <FileText className="w-3.5 h-3.5 text-tertiary shrink-0 mt-0.5" />
            <div>
              <span>Notice: Automated legal summons packet #DISP-992 will be transmitted with cryptographically signed timestamp into State Revenue e-Registry.</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-5 py-3.5 border-t border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isDispatching || isSuccess}
            className="px-3 py-1.5 rounded-sm text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-outline"
          >
            Cancel
          </button>

          <button
            type="button"
            id="btn-confirm-escalate-dispatch"
            onClick={handleDispatch}
            disabled={isDispatching || isSuccess}
            className={`px-4 py-1.5 rounded-sm text-xs font-bold font-data-mono uppercase tracking-wider flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-error ${
              isSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-error-container text-on-error-container hover:bg-error hover:text-on-error border border-error/40'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DISPATCHED TO {targetPath.toUpperCase()}</span>
              </>
            ) : isDispatching ? (
              <>
                <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>TRANSMITTING...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>CONFIRM ESCALATION DISPATCH</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
