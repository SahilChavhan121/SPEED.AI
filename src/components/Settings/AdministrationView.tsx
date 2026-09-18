import React, { useState } from 'react';
import { 
  UserProfile, 
  MLModelVersion, 
  TelemetryFeedChannel, 
  SystemThresholds 
} from '../../types';
import { 
  INITIAL_USERS, 
  INITIAL_ML_MODELS, 
  INITIAL_FEEDS, 
  INITIAL_THRESHOLDS 
} from '../../data/mockData';
import { riskEngine } from '../../modules/ml/riskEngine';
import { 
  Settings, 
  Users, 
  Sliders, 
  Cpu, 
  RefreshCw, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Radio, 
  Lock, 
  UserPlus
} from 'lucide-react';

interface AdministrationViewProps {
  onOpenDeveloperGuide: () => void;
}

export const AdministrationView: React.FC<AdministrationViewProps> = ({
  onOpenDeveloperGuide
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'thresholds' | 'models' | 'feeds'>('thresholds');
  const [thresholds, setThresholds] = useState<SystemThresholds>(INITIAL_THRESHOLDS);
  const [models, setModels] = useState<MLModelVersion[]>(INITIAL_ML_MODELS);
  const [feeds, setFeeds] = useState<TelemetryFeedChannel[]>(INITIAL_FEEDS);
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveThresholds = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleSwitchModel = (modelName: string) => {
    riskEngine.setModelVersion(modelName);
    setModels(prev =>
      prev.map(m => ({
        ...m,
        status: m.name === modelName ? 'active' : m.status === 'active' ? 'stable' : m.status,
        tag: m.name === modelName ? 'ACTIVE PROD' : m.tag === 'ACTIVE PROD' ? 'STABLE' : m.tag
      }))
    );
  };

  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setFeeds(prev =>
        prev.map(f => ({
          ...f,
          status: 'SYNCED',
          lastPacketTime: 'Just now (Forced Sync)'
        }))
      );
    }, 1200);
  };

  return (
    <div id="settings-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-tertiary" />
            <h1 className="text-xl font-bold font-headline text-on-surface uppercase tracking-wider">
              System Administration &amp; Governance
            </h1>
          </div>
          <p className="text-xs text-on-surface-variant font-data-mono mt-0.5">
            Operational tolerances, RBAC user matrices, model iteration rollouts, and telemetry feeds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveToast && (
            <span className="text-emerald-400 font-data-mono text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Policies Applied
            </span>
          )}
          <button
            onClick={handleSaveThresholds}
            className="px-3.5 py-1.5 rounded-sm bg-tertiary text-on-tertiary font-bold font-data-mono text-xs flex items-center gap-1.5 hover:bg-tertiary/90 transition-colors shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-outline-variant/30 bg-surface-container px-3 gap-2 overflow-x-auto rounded-t-sm">
        {[
          { id: 'thresholds', label: 'System Thresholds & Risk Triggers', icon: Sliders },
          { id: 'users', label: 'Master Data & Personnel Roles', icon: Users },
          { id: 'models', label: 'Model Iterations & ML Pipeline', icon: Cpu },
          { id: 'feeds', label: 'Data Feeds & Telemetry Sync', icon: Database }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 text-xs font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-tertiary text-tertiary font-bold bg-surface-container-high/40'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: System Thresholds & Risk Triggers */}
      {activeTab === 'thresholds' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sliders Card */}
            <div className="p-5 rounded-sm bg-surface-container border border-outline-variant/30 space-y-5">
              <h2 className="text-xs font-bold font-headline uppercase tracking-wider text-on-surface flex items-center gap-2">
                <Sliders className="w-4 h-4 text-tertiary" />
                Analytical Triggers &amp; Tolerances
              </h2>

              {/* Slider 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-data-mono">
                  <span className="text-on-surface font-semibold">Critical Delay Risk Cutoff:</span>
                  <span className="text-error font-bold">{thresholds.criticalRiskThreshold}/100</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={95}
                  value={thresholds.criticalRiskThreshold}
                  onChange={e => setThresholds({ ...thresholds, criticalRiskThreshold: Number(e.target.value) })}
                  className="w-full accent-tertiary cursor-pointer"
                />
                <span className="text-[10px] text-outline block">
                  Parcels scoring above this value are automatically prioritized for High Court escalation summons.
                </span>
              </div>

              {/* Slider 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-data-mono">
                  <span className="text-on-surface font-semibold">Escalation Hold-off Time:</span>
                  <span className="text-amber-400 font-bold">{thresholds.escalationDelayDays} Days</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={14}
                  step={0.5}
                  value={thresholds.escalationDelayDays}
                  onChange={e => setThresholds({ ...thresholds, escalationDelayDays: Number(e.target.value) })}
                  className="w-full accent-tertiary cursor-pointer"
                />
                <span className="text-[10px] text-outline block">
                  Grace period allowed before automated alert dispatch to District Collectorate.
                </span>
              </div>

              {/* Slider 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-data-mono">
                  <span className="text-on-surface font-semibold">Title Encumbrance Penalty Weight:</span>
                  <span className="text-secondary font-bold">{thresholds.titleEncumbranceWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={70}
                  value={thresholds.titleEncumbranceWeight}
                  onChange={e => setThresholds({ ...thresholds, titleEncumbranceWeight: Number(e.target.value) })}
                  className="w-full accent-tertiary cursor-pointer"
                />
                <span className="text-[10px] text-outline block">
                  Relative weight multiplier when Form 16 reflects unresolved partition litigation.
                </span>
              </div>

              {/* Slider 4 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-data-mono">
                  <span className="text-on-surface font-semibold">Cadastral Variance Marker Sensitivity:</span>
                  <span className="text-tertiary font-bold">{thresholds.positionalVarianceCm} cm</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={50}
                  value={thresholds.positionalVarianceCm}
                  onChange={e => setThresholds({ ...thresholds, positionalVarianceCm: Number(e.target.value) })}
                  className="w-full accent-tertiary cursor-pointer"
                />
                <span className="text-[10px] text-outline block">
                  LiDAR drone survey offset tolerance relative to colonial revenue settlement maps.
                </span>
              </div>
            </div>

            {/* Governance Rules Card */}
            <div className="p-5 rounded-sm bg-surface-container border border-outline-variant/30 space-y-4">
              <h2 className="text-xs font-bold font-headline uppercase tracking-wider text-on-surface flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-tertiary" />
                Statutory Enforcement Rules
              </h2>

              <div className="space-y-3 font-body text-xs">
                {[
                  {
                    key: 'lidarCrossVerification' as const,
                    title: 'LiDAR Cross-Verification Enforced',
                    desc: 'Mandates secondary drone point cloud match before declaring statutory Section 3D award.'
                  },
                  {
                    key: 'gisPerimeterLock' as const,
                    title: 'GIS Perimeter Auto-Lock',
                    desc: 'Freezes right-of-way coordinate buffer when legal stay order is detected in High Court ledger.'
                  },
                  {
                    key: 'autonomousOverride' as const,
                    title: 'Autonomous Protocol Override',
                    desc: 'Permits AI engine to flag immediate notice invalidation without human SLAO countersignature.'
                  },
                  {
                    key: 'highCourtEscalationTrigger' as const,
                    title: 'High Court Legal Cell Auto-Dispatch',
                    desc: 'Direct dispatch of caveat petition drafts upon recognition of repeated stay orders.'
                  }
                ].map(rule => (
                  <label 
                    key={rule.key}
                    className="p-3 rounded-xs bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-3 cursor-pointer hover:border-tertiary/40 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={thresholds.rules[rule.key]}
                      onChange={e =>
                        setThresholds({
                          ...thresholds,
                          rules: { ...thresholds.rules, [rule.key]: e.target.checked }
                        })
                      }
                      className="mt-0.5 accent-tertiary w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-on-surface block">{rule.title}</span>
                      <span className="text-[11px] text-on-surface-variant leading-relaxed block mt-0.5">
                        {rule.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Master Data & Personnel Roles */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold font-headline uppercase tracking-wider text-on-surface">
                Personnel Clearance Matrix &bull; RBAC Directory
              </h2>
              <p className="text-[11px] text-on-surface-variant font-data-mono">
                Jurisdiction clearance profiles controlling dispatch overrides and ML ground-truth feedback.
              </p>
            </div>
            <button
              onClick={() => alert('Add Personnel dialog initiated')}
              className="px-3 py-1.5 rounded-sm bg-surface-container-highest hover:bg-surface-bright text-xs font-semibold text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5 text-tertiary" />
              <span>Register Officer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map(user => (
              <div 
                key={user.id} 
                className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center font-bold font-data-mono text-tertiary text-sm">
                      {user.initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-on-surface flex items-center gap-2">
                        {user.name}
                        <span className="text-[10px] font-data-mono text-tertiary bg-tertiary/10 px-1.5 py-0.5 rounded">
                          {user.id}
                        </span>
                      </div>
                      <div className="text-xs text-on-surface-variant">{user.role}</div>
                    </div>
                  </div>

                  <span className="font-data-mono text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container-lowest text-tertiary border border-outline-variant/30">
                    {user.clearance}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-data-mono pt-2 border-t border-outline-variant/20 text-outline">
                  <span>District: {user.district}</span>
                  <span className="text-emerald-400 font-semibold">{user.status} ({user.idleTime || 'Online'})</span>
                </div>

                {/* Permissions pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {user.permissions.map(perm => (
                    <span 
                      key={perm}
                      className="px-1.5 py-0.5 rounded-xs bg-surface-container-lowest text-on-surface text-[9px] font-data-mono border border-outline-variant/20"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Model Iterations & ML Pipeline */}
      {activeTab === 'models' && (
        <div className="space-y-4">
          <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold font-headline uppercase tracking-wider text-on-surface flex items-center gap-2">
                <Cpu className="w-4 h-4 text-tertiary" />
                Model Iteration Rollouts &amp; Registry
              </h2>
              <p className="text-[11px] text-on-surface-variant font-data-mono">
                Predictive Risk Engine versions trained on historical corridor delays (SIH 2026).
              </p>
            </div>
            <button
              onClick={onOpenDeveloperGuide}
              className="px-3 py-1.5 rounded-sm bg-tertiary/20 text-tertiary hover:bg-tertiary/30 border border-tertiary/30 text-xs font-bold font-data-mono transition-colors"
            >
              Inspect ML Contract
            </button>
          </div>

          <div className="space-y-3">
            {models.map(model => (
              <div 
                key={model.id}
                className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm font-data-mono text-on-surface">
                      {model.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded-xs font-data-mono text-[10px] font-bold ${
                      model.tag === 'ACTIVE PROD'
                        ? 'bg-tertiary text-on-tertiary'
                        : model.tag === 'STAGING'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800'
                        : 'bg-surface-container-lowest text-outline'
                    }`}>
                      {model.tag}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    {model.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-data-mono">
                  <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20 text-center min-w-[70px]">
                    <span className="text-outline text-[10px] block">F1 SCORE</span>
                    <span className="text-tertiary font-bold text-sm">{model.f1Accuracy}%</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20 text-center min-w-[70px]">
                    <span className="text-outline text-[10px] block">LATENCY</span>
                    <span className="text-on-surface font-bold text-sm">{model.latencyMs}ms</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20 text-center min-w-[90px]">
                    <span className="text-outline text-[10px] block">DATASET</span>
                    <span className="text-secondary font-bold text-xs">{model.dataset}</span>
                  </div>

                  {model.tag !== 'ACTIVE PROD' ? (
                    <button
                      onClick={() => handleSwitchModel(model.name)}
                      className="px-3 py-1.5 rounded-xs bg-surface-container-highest hover:bg-surface-bright text-xs font-bold font-data-mono text-on-surface border border-outline-variant/30 transition-colors"
                    >
                      Promote to Prod
                    </button>
                  ) : (
                    <span className="text-emerald-400 font-data-mono text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Serving
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Telemetry Feeds & Data Sync */}
      {activeTab === 'feeds' && (
        <div className="space-y-4">
          <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold font-headline uppercase tracking-wider text-on-surface flex items-center gap-2">
                <Database className="w-4 h-4 text-tertiary" />
                Data Feeds &amp; Telemetry Synchronization
              </h2>
              <p className="text-[11px] text-on-surface-variant font-data-mono">
                External State Land Registry (Bhoomi / Bhulekh) APIs and Cadastral Vector Pipes.
              </p>
            </div>
            <button
              onClick={handleForceSync}
              disabled={isSyncing}
              className="px-3.5 py-1.5 rounded-sm bg-tertiary text-on-tertiary hover:bg-tertiary/90 text-xs font-bold font-data-mono flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing...' : 'Force Full Sync'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {feeds.map(feed => (
              <div 
                key={feed.id}
                className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-tertiary" />
                    <span className="font-bold text-sm text-on-surface font-headline">
                      {feed.name}
                    </span>
                  </div>
                  <div className="font-data-mono text-xs text-on-surface-variant truncate">
                    Endpoint: {feed.endpoint} &bull; Sync: {feed.syncFrequency}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-data-mono">
                  <div className="text-right">
                    <span className="text-outline text-[10px] block">LAST PACKET</span>
                    <span className="text-on-surface font-medium">{feed.lastPacketTime}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-xs font-data-mono font-bold text-[10px] ${
                    feed.status === 'SYNCED'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                  }`}>
                    {feed.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
