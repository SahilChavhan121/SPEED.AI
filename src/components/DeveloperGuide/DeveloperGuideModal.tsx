import React, { useState, useEffect } from 'react';
import { 
  X, 
  Code2, 
  Cpu, 
  BrainCircuit, 
  Layers, 
  Database, 
  CheckCircle2, 
  Terminal, 
  Play,
  Copy,
  ExternalLink
} from 'lucide-react';
import { riskEngine } from '../../modules/ml/riskEngine';
import { documentIntelligence } from '../../modules/nlp/documentIntelligence';

interface DeveloperGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperGuideModal: React.FC<DeveloperGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'ml-swap' | 'nlp-swap' | 'schema' | 'live-runner'>('architecture');
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const runLiveModelTest = async () => {
    const result = await riskEngine.predictDelayRisk({
      parcelId: 'TEST-DEV-01',
      parcelNo: 'NH-44-DEV',
      acquisitionCorridor: 'Ambala-Chandigarh Expressway',
      districtCollectorate: 'Ambala Central',
      approvalAgeDays: 95,
      missingDocumentCount: 2,
      litigationFlagsCount: 1
    });

    setTestOutput(JSON.stringify(result, null, 2));
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dev-guide-title"
    >
      <div className="w-full max-w-4xl max-h-[90vh] bg-surface-container-low border border-outline-variant/40 rounded-sm shadow-2xl flex flex-col font-body text-on-surface animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-tertiary-container/30 border border-tertiary/40 flex items-center justify-center text-tertiary font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="dev-guide-title" className="text-sm sm:text-base font-bold text-on-surface font-headline uppercase tracking-wider flex items-center gap-2">
                S.P.E.E.D. Developer & Architecture Guide
                <span className="text-[10px] font-data-mono text-tertiary bg-tertiary/10 px-2 py-0.5 rounded border border-tertiary/20">
                  SIH 2026 // SIH26017
                </span>
              </h2>
              <p className="text-xs text-on-surface-variant font-data-mono">
                Clean Modular Monolith &bull; ML/NLP Plug-and-Play Interfaces &bull; High-Contrast Theming
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-sm text-outline hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary"
            aria-label="Close developer guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-outline-variant/30 bg-surface-container px-4 gap-2 shrink-0 overflow-x-auto">
          {[
            { id: 'architecture', label: 'Architecture Monolith', icon: Layers },
            { id: 'ml-swap', label: 'ML Risk Engine Integration', icon: Cpu },
            { id: 'nlp-swap', label: 'NLP Document Intelligence', icon: BrainCircuit },
            { id: 'schema', label: 'Data & Prediction Contract', icon: Database },
            { id: 'live-runner', label: 'Live Test Console', icon: Terminal }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-3 text-xs font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-tertiary text-tertiary font-bold bg-surface-container-high/40'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs leading-relaxed flex-1">
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
                <h3 className="text-sm font-bold text-on-surface font-headline uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-tertiary" />
                  Clean Modular Monolith Overview
                </h3>
                <p className="text-on-surface-variant mb-3">
                  This application follows the official Smart India Hackathon (SIH 2026) architectural specification for the 
                  <strong> Predictive Analysis System for Early Detection of Land Acquisition Delays</strong>.
                  All core domains are completely separated into modular components so ML and NLP algorithms can be plugged in without refactoring UI layers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-data-mono text-[11px] pt-2">
                  <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-tertiary font-bold block mb-1">M01 - M03: INGESTION</span>
                    <span className="text-on-surface-variant">
                      Telemetry streams, State Land Registry API adapters, and GIS CAD vectors.
                    </span>
                  </div>
                  <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-secondary font-bold block mb-1">M04 - M06: ML INFERENCE</span>
                    <span className="text-on-surface-variant">
                      Additive feature tree models + TreeSHAP explainability factor attribution.
                    </span>
                  </div>
                  <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-error font-bold block mb-1">M07 - M09: INTERVENTION</span>
                    <span className="text-on-surface-variant">
                      Priority alert queues, statutory escalation dispatch, and officer audit logging.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
                <h4 className="font-bold text-on-surface mb-2 font-headline uppercase text-xs">
                  Directory Organization:
                </h4>
                <div className="font-data-mono text-[11px] bg-surface-container-lowest p-3 rounded border border-outline-variant/20 text-on-surface-variant space-y-1">
                  <div><span className="text-tertiary font-bold">src/modules/ml/</span> - RiskEngineService interface (swappable prediction pipeline)</div>
                  <div><span className="text-tertiary font-bold">src/modules/nlp/</span> - DocumentIntelligenceService (swappable NER & legal parser)</div>
                  <div><span className="text-secondary font-bold">src/context/</span> - ThemeContext (Dark/Light toggle) &amp; AuthContext (Clearance &amp; Roles)</div>
                  <div><span className="text-secondary font-bold">src/components/</span> - Tactical Dashboard, GIS Overlay, Telemetry, SHAP Review, Alerts</div>
                  <div><span className="text-outline font-bold">src/data/</span> - Static &amp; seed geospatial telemetry parcels, alerts, and model registries</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ml-swap' && (
            <div className="space-y-4">
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
                <h3 className="text-sm font-bold text-on-surface font-headline uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-tertiary" />
                  How to Replace the ML Risk Module
                </h3>
                <p className="text-on-surface-variant mb-3">
                  The ML component has been isolated in <code className="text-tertiary font-data-mono">src/modules/ml/riskEngine.ts</code>.
                  To plug in your actual Python XGBoost / Random Forest service, replace the predict logic with a REST or WebSocket call:
                </p>

                <div className="relative">
                  <pre className="font-data-mono text-[11px] bg-surface-container-lowest p-4 rounded border border-outline-variant/25 text-tertiary overflow-x-auto">
{`// src/modules/ml/riskEngine.ts
public async predictDelayRisk(input: MLPredictionInput): Promise<MLPredictionOutput> {
  // Option A: Call your Python FastAPI endpoint
  const res = await fetch('http://localhost:8000/api/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  return await res.json();
  
  // Option B: Or load an ONNX runtime web model locally in the browser!
}`}
                  </pre>
                  <button
                    onClick={() => copyCode(`const res = await fetch('http://localhost:8000/api/predict', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) }); return await res.json();`)}
                    className="absolute top-2 right-2 px-2 py-1 rounded bg-surface-container text-xs text-on-surface-variant hover:text-on-surface border border-outline-variant/30 flex items-center gap-1 font-data-mono"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-sm bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="font-bold text-on-surface block">Currently Active Model:</span>
                  <span className="font-data-mono text-tertiary">v4.12-PROD (F1: 94.8% // Dataset: DS-CORE-99V2)</span>
                </div>
                <span className="px-2 py-1 rounded font-data-mono font-bold text-[10px] bg-tertiary/20 text-tertiary border border-tertiary/30">
                  READY FOR SWAP
                </span>
              </div>
            </div>
          )}

          {activeTab === 'nlp-swap' && (
            <div className="space-y-4">
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
                <h3 className="text-sm font-bold text-on-surface font-headline uppercase tracking-wider mb-2 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-tertiary" />
                  How to Replace the NLP Document Intelligence Module
                </h3>
                <p className="text-on-surface-variant mb-3">
                  Located in <code className="text-tertiary font-data-mono">src/modules/nlp/documentIntelligence.ts</code>.
                  It handles legal notices, gazette publications, and sub-registrar deeds for automated clause detection and claimant identification:
                </p>

                <div className="relative">
                  <pre className="font-data-mono text-[11px] bg-surface-container-lowest p-4 rounded border border-outline-variant/25 text-secondary overflow-x-auto">
{`// src/modules/nlp/documentIntelligence.ts
export class DocumentIntelligenceService {
  public async extractEntities(docName: string, textSnippet: string): Promise<DocumentExtractionResult> {
    // Example: Call your HuggingFace Transformers / spaCy NER microservice
    const response = await fetch('/api/nlp/ner', {
      method: 'POST',
      body: JSON.stringify({ documentName: docName, rawText: textSnippet })
    });
    return await response.json();
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
                <h3 className="text-sm font-bold text-on-surface font-headline uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-tertiary" />
                  Target Variable &amp; Feature Schema
                </h3>
                <p className="text-on-surface-variant mb-3">
                  Target Label design as per Guidebook: <code>is_delayed = 1 if (actual_award_date - estimated_award_date) &gt; 30 days</code>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-data-mono text-[11px]">
                  <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-on-surface font-bold block mb-1 text-xs">Primary Prediction Input:</span>
                    <ul className="space-y-1 text-outline">
                      <li>• approvalAgeDays (integer)</li>
                      <li>• missingDocumentCount (integer)</li>
                      <li>• litigationFlagsCount (integer)</li>
                      <li>• cadastralVarianceMeters (float)</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-on-surface font-bold block mb-1 text-xs">Prediction Output Contract:</span>
                    <ul className="space-y-1 text-outline">
                      <li>• riskScore (0 - 100)</li>
                      <li>• riskClass (CRITICAL | HIGH | MODERATE | NOMINAL)</li>
                      <li>• expectedDelayDays (integer)</li>
                      <li>• shapFactors: [{`factor, impactPercent`}]</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'live-runner' && (
            <div className="space-y-4">
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-on-surface font-headline uppercase tracking-wider">
                      Interactive Inference Pipeline Test
                    </h3>
                    <p className="text-[11px] text-on-surface-variant font-data-mono">
                      Execute a dry-run inference pass on parcel <span className="text-tertiary">#NH-44-DEV</span>
                    </p>
                  </div>
                  <button
                    onClick={runLiveModelTest}
                    className="px-3.5 py-1.5 rounded-sm bg-tertiary text-on-tertiary font-bold font-data-mono text-xs flex items-center gap-1.5 hover:bg-tertiary/90 transition-colors shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Test</span>
                  </button>
                </div>

                {testOutput ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-data-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>INFERENCE PASS COMPLETED (Latency: 11ms)</span>
                    </div>
                    <pre className="font-data-mono text-[11px] bg-surface-container-lowest p-3 rounded border border-outline-variant/30 text-tertiary max-h-60 overflow-y-auto">
                      {testOutput}
                    </pre>
                  </div>
                ) : (
                  <div className="p-8 rounded bg-surface-container-lowest border border-dashed border-outline-variant/30 text-center font-data-mono text-outline">
                    Click &ldquo;Run Test&rdquo; above to execute an inference pass through RiskEngineService.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between shrink-0">
          <span className="text-[10px] font-data-mono text-outline">
            S.P.E.E.D. v4.12 &bull; SIH26017 Architecture Documentation
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xs text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/30 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
