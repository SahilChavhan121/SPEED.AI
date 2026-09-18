import React, { useEffect } from 'react';
import { EvidenceDocument } from '../../types';
import { X, FileText, CheckCircle2, ShieldCheck, Download, AlertTriangle } from 'lucide-react';

interface DocumentViewerModalProps {
  document: EvidenceDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document: doc,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !doc) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-modal-title"
    >
      <div className="w-full max-w-2xl bg-surface-container-low border border-outline-variant/40 rounded-sm shadow-2xl overflow-hidden font-body text-on-surface animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-primary-container border border-primary/40 flex items-center justify-center text-primary">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="doc-modal-title" className="text-sm font-bold text-on-surface font-headline uppercase tracking-wide">
                Document Inspection: {doc.code}
              </h2>
              <p className="text-[11px] text-on-surface-variant font-data-mono">
                {doc.sourceRegistry} // Verified e-Record
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-sm text-outline hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary"
            aria-label="Close document inspection"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-3.5 rounded-sm bg-surface-container border border-outline-variant/30 flex items-start justify-between">
            <div>
              <h3 className="text-xs font-bold text-on-surface mb-1">
                {doc.title}
              </h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                {doc.description}
              </p>
            </div>
            <span className={`shrink-0 px-2 py-0.5 rounded-xs font-data-mono font-bold text-[10px] uppercase ${
              doc.status === 'Verified'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : doc.status === 'Flagged'
                ? 'bg-error-container text-on-error-container border border-error/30'
                : 'bg-amber-950 text-amber-300 border border-amber-800'
            }`}>
              {doc.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-data-mono text-[11px]">
            <div className="p-2.5 rounded-xs bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-outline block text-[10px]">PREDICTED DELAY:</span>
              <span className="text-error font-bold text-xs">{doc.expectedDelayImpact}</span>
            </div>
            <div className="p-2.5 rounded-xs bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-outline block text-[10px]">AI CONFIDENCE:</span>
              <span className="text-tertiary font-bold text-xs">{doc.confidence}%</span>
            </div>
            <div className="p-2.5 rounded-xs bg-surface-container-lowest border border-outline-variant/20 col-span-2 sm:col-span-1">
              <span className="text-outline block text-[10px]">REGISTRY DATE:</span>
              <span className="text-on-surface font-medium">{doc.dateAdded}</span>
            </div>
          </div>

          {/* Legal Excerpt */}
          <div className="p-3.5 rounded-xs bg-surface-container-lowest border border-outline-variant/25 font-data-mono text-[11px] leading-relaxed text-on-surface-variant">
            <div className="text-[10px] uppercase font-bold text-outline mb-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-tertiary" /> Statutory Citation & Extract:
            </div>
            <p className="p-2 rounded bg-surface-container/60 text-on-surface border-l-2 border-tertiary">
              &ldquo;{doc.contentSummary}&rdquo;
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between">
          <span className="text-[10px] font-data-mono text-outline">
            DIGITAL HASH: SHA256-8F29A4D3B01...
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xs text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => alert(`Exporting signed official gazette copy for ${doc.code}...`)}
              className="px-3 py-1.5 rounded-xs text-xs font-bold font-data-mono bg-tertiary/20 text-tertiary hover:bg-tertiary/30 border border-tertiary/30 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Signed Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
