import React, { useState } from 'react';
import { ParcelRecord, ActiveNavigationTab } from '../../types';
import { GIS_MAP_IMAGE_PREVIEW } from '../../data/mockData';
import { 
  AlertTriangle, 
  Clock, 
  Database, 
  ShieldAlert, 
  MapPin, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ChevronRight, 
  Eye, 
  FileText, 
  Sparkles,
  Layers,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface DashboardViewProps {
  parcels: ParcelRecord[];
  onSelectParcel: (parcel: ParcelRecord) => void;
  onNavigateTab: (tab: ActiveNavigationTab) => void;
  onOpenEscalate: (parcelNo: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  parcels,
  onSelectParcel,
  onNavigateTab,
  onOpenEscalate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE' | 'NOMINAL'>('ALL');

  const filteredParcels = parcels.filter(p => {
    const matchesSearch = 
      p.parcelNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.corridor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.officer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || p.riskClass === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const criticalCount = parcels.filter(p => p.riskClass === 'CRITICAL').length;
  const highCount = parcels.filter(p => p.riskClass === 'HIGH').length;

  return (
    <div id="dashboard-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto font-body">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-headline text-on-surface uppercase tracking-tight">
              Command Center // Telemetry Overview
            </h1>
            <span className="px-2 py-0.5 rounded-xs font-data-mono text-[10px] font-bold bg-tertiary/10 text-tertiary border border-tertiary/25">
              CYCLE: 2026-Q1
            </span>
          </div>
          <p className="text-xs text-on-surface-variant font-data-mono mt-0.5">
            Predictive analysis of acquisition bottlenecks across national highway expansion corridors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-quick-gis"
            onClick={() => onNavigateTab('gis')}
            className="px-3 py-1.5 rounded-sm bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-xs font-medium text-on-surface flex items-center gap-1.5 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-tertiary" />
            <span>GIS Fullscreen</span>
          </button>
          <button
            id="btn-quick-anomalies"
            onClick={() => onNavigateTab('anomalies')}
            className="px-3 py-1.5 rounded-sm bg-error-container/30 hover:bg-error-container/50 border border-error/40 text-xs font-bold text-error font-data-mono flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Active Alerts ({criticalCount + highCount})</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 relative overflow-hidden group hover:border-error/40 transition-colors">
          <div className="flex items-center justify-between text-outline text-[11px] font-data-mono uppercase font-bold">
            <span>High Risk Parcels</span>
            <AlertTriangle className="w-4 h-4 text-error" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-headline text-error">
              {criticalCount + highCount}
            </span>
            <span className="text-[10px] font-data-mono text-error/90 font-semibold">
              +12% vs last cycle
            </span>
          </div>
          <div className="mt-2 text-[11px] text-on-surface-variant truncate">
            Imminent judicial stay or statutory notice lapse
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-outline text-[11px] font-data-mono uppercase font-bold">
            <span>Avg Predicted Delay</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-headline text-on-surface">
              48.2 <span className="text-xs font-normal text-outline">Days</span>
            </span>
            <span className="text-[10px] font-data-mono text-amber-400 font-semibold">
              +4.8d variance
            </span>
          </div>
          <div className="mt-2 text-[11px] text-on-surface-variant truncate">
            Baseline delta across active Section 3A awards
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 relative overflow-hidden group hover:border-tertiary/40 transition-colors">
          <div className="flex items-center justify-between text-outline text-[11px] font-data-mono uppercase font-bold">
            <span>Data Ingestion Health</span>
            <Database className="w-4 h-4 text-tertiary" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-headline text-tertiary">
              99.4%
            </span>
            <span className="text-[10px] font-data-mono text-emerald-400 font-semibold">
              NOMINAL
            </span>
          </div>
          <div className="mt-2 text-[11px] text-on-surface-variant truncate">
            State Land Registry &amp; Cadastral vector sync
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30 relative overflow-hidden group hover:border-secondary/40 transition-colors">
          <div className="flex items-center justify-between text-outline text-[11px] font-data-mono uppercase font-bold">
            <span>Pending Escalations</span>
            <ShieldAlert className="w-4 h-4 text-secondary" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-headline text-on-surface">
              18 <span className="text-xs font-normal text-outline">Cases</span>
            </span>
            <span className="text-[10px] font-data-mono text-secondary font-semibold">
              SLAO Active
            </span>
          </div>
          <div className="mt-2 text-[11px] text-on-surface-variant truncate">
            High Court legal cell &amp; Collectorate pipeline
          </div>
        </div>
      </div>

      {/* Middle Grid: GIS Corridor Preview + Anomalous Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left 7 Columns: GIS Corridor Preview */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-sm bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-tertiary" />
                <h2 className="text-xs sm:text-sm font-bold font-headline text-on-surface uppercase tracking-wider">
                  GIS Corridor Preview // Sector Ambala NH-44
                </h2>
              </div>
              <span className="text-[10px] font-data-mono text-tertiary bg-tertiary/10 px-1.5 py-0.5 rounded">
                LIVE TELEMETRY STREAM
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant font-data-mono mb-3">
              Corridor Vector 28.6139° N, 77.2090° E &bull; 150m Right-of-Way Buffer &bull; Vector Layer: High Friction
            </p>
          </div>

          {/* Interactive Satellite Imagery Preview */}
          <div className="relative w-full h-56 sm:h-64 rounded-sm overflow-hidden border border-outline-variant/40 bg-surface-container-lowest group">
            <img
              src={GIS_MAP_IMAGE_PREVIEW}
              alt="Satellite Telemetry Corridor Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

            {/* Target Reticle & Hotspot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-20 h-20 rounded-full border border-tertiary/60 animate-ping opacity-30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-error/80 border-2 border-white shadow-lg animate-pulse" />
            </div>

            {/* Bottom Floating Stats Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-xs bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 text-[10px] font-data-mono text-on-surface">
              <div>
                <span className="text-outline">TARGET: </span>
                <span className="font-bold text-tertiary">PARCEL NH-44-B (CLUSTER 4)</span>
              </div>
              <button
                onClick={() => onNavigateTab('gis')}
                className="px-2 py-1 rounded bg-tertiary text-on-tertiary font-bold hover:bg-tertiary/90 transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>Full GIS View</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Anomalous Risk Distribution */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-sm bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-tertiary" />
                <h2 className="text-xs sm:text-sm font-bold font-headline text-on-surface uppercase tracking-wider">
                  Anomalous Risk Distribution
                </h2>
              </div>
              <span className="text-[10px] font-data-mono text-outline">
                SHAP TENSOR EVAL
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant font-data-mono mb-4">
              Additive SHAP factor weights calculated by RiskEngine v4.12-PROD
            </p>

            {/* Factor Bar 1 */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-data-mono mb-1">
                  <span className="text-on-surface font-semibold">Title Encumbrance Dispute</span>
                  <span className="text-error font-bold">42% impact</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-error rounded-full transition-all duration-500" style={{ width: '42%' }} />
                </div>
              </div>

              {/* Factor Bar 2 */}
              <div>
                <div className="flex justify-between text-[11px] font-data-mono mb-1">
                  <span className="text-on-surface font-semibold">Environmental Clearance Hold</span>
                  <span className="text-tertiary font-bold">28% impact</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full transition-all duration-500" style={{ width: '28%' }} />
                </div>
              </div>

              {/* Factor Bar 3 */}
              <div>
                <div className="flex justify-between text-[11px] font-data-mono mb-1">
                  <span className="text-on-surface font-semibold">Boundary Overlap Signal</span>
                  <span className="text-secondary font-bold">18% impact</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: '18%' }} />
                </div>
              </div>

              {/* Factor Bar 4 */}
              <div>
                <div className="flex justify-between text-[11px] font-data-mono mb-1">
                  <span className="text-on-surface font-semibold">Valuation Discrepancy</span>
                  <span className="text-primary font-bold">12% impact</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '12%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 mt-4 flex items-center justify-between">
            <div className="text-[11px] font-data-mono text-outline">
              CONFIDENCE SCORE: <span className="text-tertiary font-bold">94.8%</span>
            </div>
            <button
              id="btn-inspect-shap-dashboard"
              onClick={() => onNavigateTab('explainability')}
              className="text-xs text-tertiary hover:underline font-bold flex items-center gap-1"
            >
              <span>Inspect SHAP Panel</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Operational Action Queue (Table matching Screenshot 1 & 7) */}
      <div className="p-4 sm:p-5 rounded-sm bg-surface-container border border-outline-variant/30 space-y-4">
        {/* Table Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-on-surface font-headline uppercase tracking-wider">
              Operational Action Queue // Monitored Parcels
            </h3>
            <p className="text-[11px] text-on-surface-variant font-data-mono">
              Live priority sorting based on predicted delay days and judicial friction vectors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search parcel, corridor, officer..."
                className="w-48 sm:w-64 p-1.5 pl-8 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary font-body"
              />
              <Search className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2" />
            </div>

            {/* Risk Class Filter */}
            <select
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value as any)}
              className="p-1.5 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary font-data-mono"
            >
              <option value="ALL">All Risk Classes</option>
              <option value="CRITICAL">Critical Only</option>
              <option value="HIGH">High Risk</option>
              <option value="MODERATE">Moderate</option>
              <option value="NOMINAL">Nominal / Clear</option>
            </select>
          </div>
        </div>

        {/* Parcels Table */}
        <div className="overflow-x-auto border border-outline-variant/30 rounded-xs">
          <table className="w-full text-left text-xs font-body border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/30 text-[10px] font-data-mono font-bold uppercase tracking-wider text-outline">
                <th className="p-3">Parcel ID</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3">Dominant Delay Vector</th>
                <th className="p-3 text-right">Predicted Delay</th>
                <th className="p-3">Corridor &amp; Sector</th>
                <th className="p-3">Competent Authority</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body">
              {filteredParcels.map(p => (
                <tr 
                  key={p.id}
                  className="hover:bg-surface-container-high/50 transition-colors group cursor-pointer"
                  onClick={() => onSelectParcel(p)}
                >
                  <td className="p-3 font-data-mono font-bold text-tertiary">
                    {p.parcelNo}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-xs font-data-mono font-bold text-[10px] ${
                      p.riskClass === 'CRITICAL'
                        ? 'bg-error-container text-on-error-container border border-error/30'
                        : p.riskClass === 'HIGH'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                        : p.riskClass === 'MODERATE'
                        ? 'bg-blue-950/80 text-blue-300 border border-blue-800/40'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                    }`}>
                      {p.riskClass}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface">
                    <div className="font-medium">{p.disputeSignal.replace('Dispute Signal: ', '')}</div>
                    <div className="text-[10px] text-outline font-data-mono truncate max-w-xs">
                      Confidence: {p.riskConfidence}% &bull; Age: {p.approvalAgeDays}d
                    </div>
                  </td>
                  <td className="p-3 text-right font-data-mono font-bold">
                    <span className={p.expectedDelayDays > 30 ? 'text-error' : p.expectedDelayDays > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                      {p.expectedDelayDays > 0 ? `+${p.expectedDelayDays} Days` : 'ON TRACK'}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface-variant">
                    <div className="truncate max-w-xs text-on-surface font-medium">{p.corridor}</div>
                    <div className="text-[10px] text-outline">{p.district}</div>
                  </td>
                  <td className="p-3 text-on-surface-variant font-data-mono text-[11px]">
                    {p.officer}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          onSelectParcel(p);
                          onNavigateTab('explainability');
                        }}
                        className="p-1 rounded bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-tertiary transition-colors"
                        title="View SHAP Explainability"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectParcel(p);
                          onNavigateTab('gis');
                        }}
                        className="p-1 rounded bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-secondary transition-colors"
                        title="View on GIS Overlay"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenEscalate(p.parcelNo)}
                        className="px-2 py-0.5 rounded bg-error-container/40 hover:bg-error-container border border-error/30 text-error text-[10px] font-data-mono font-bold transition-colors"
                      >
                        Escalate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
