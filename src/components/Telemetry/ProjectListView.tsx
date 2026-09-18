import React, { useState } from 'react';
import { ParcelRecord, ActiveNavigationTab } from '../../types';
import { 
  LineChart, 
  Search, 
  Filter, 
  MapPin, 
  FileText, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface ProjectListViewProps {
  parcels: ParcelRecord[];
  selectedParcel: ParcelRecord;
  onSelectParcel: (parcel: ParcelRecord) => void;
  onNavigateTab: (tab: ActiveNavigationTab) => void;
  onOpenEscalate: (parcelNo: string) => void;
}

export const ProjectListView: React.FC<ProjectListViewProps> = ({
  parcels,
  selectedParcel,
  onSelectParcel,
  onNavigateTab,
  onOpenEscalate
}) => {
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const districts = ['ALL', ...Array.from(new Set(parcels.map(p => p.district)))];

  const filtered = parcels.filter(p => {
    const matchesDistrict = districtFilter === 'ALL' || p.district === districtFilter;
    const matchesRisk = riskFilter === 'ALL' || p.riskClass === riskFilter;
    const matchesSearch = 
      p.parcelNo.toLowerCase().includes(search.toLowerCase()) ||
      p.corridor.toLowerCase().includes(search.toLowerCase()) ||
      p.officer.toLowerCase().includes(search.toLowerCase());
    return matchesDistrict && matchesRisk && matchesSearch;
  });

  return (
    <div id="telemetry-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-tertiary" />
            <h1 className="text-xl font-bold font-headline text-on-surface uppercase tracking-wider">
              Project Telemetry // Land Acquisition Corridor Registry
            </h1>
          </div>
          <p className="text-xs text-on-surface-variant font-data-mono mt-0.5">
            Cadastral status tracking, delay predictions, and jurisdictional SLA compliance.
          </p>
        </div>

        <div className="text-xs font-data-mono text-outline">
          MONITORING <span className="text-tertiary font-bold">{parcels.length}</span> ACTIVE CORRIDOR PARCELS
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3.5 rounded-sm bg-surface-container border border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by parcel, corridor, officer..."
              className="w-52 sm:w-64 p-1.5 pl-8 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary font-body"
            />
            <Search className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2" />
          </div>

          {/* District Filter */}
          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="p-1.5 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary font-data-mono"
          >
            <option value="ALL">All Collectorate Sectors</option>
            {districts.filter(d => d !== 'ALL').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
            className="p-1.5 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary font-data-mono"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="CRITICAL">Critical (&gt;75)</option>
            <option value="HIGH">High (60-74)</option>
            <option value="MODERATE">Moderate (35-59)</option>
            <option value="NOMINAL">Nominal (&lt;35)</option>
          </select>
        </div>

        <span className="text-[11px] font-data-mono text-outline">
          Showing {filtered.length} of {parcels.length}
        </span>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 7 Columns: Parcels Table */}
        <div className="lg:col-span-7 rounded-sm bg-surface-container border border-outline-variant/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant/30 text-[10px] font-data-mono font-bold uppercase tracking-wider text-outline">
                  <th className="p-3">Parcel</th>
                  <th className="p-3">Risk Class</th>
                  <th className="p-3">Predicted Delay</th>
                  <th className="p-3">District &amp; Sector</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body">
                {filtered.map(p => {
                  const isSelected = p.id === selectedParcel.id;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => onSelectParcel(p)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-primary-container/40 border-l-4 border-tertiary'
                          : 'hover:bg-surface-container-high/40'
                      }`}
                    >
                      <td className="p-3 font-data-mono font-bold text-tertiary">
                        {p.parcelNo}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-xs font-data-mono font-bold text-[10px] ${
                          p.riskClass === 'CRITICAL'
                            ? 'bg-error-container text-on-error-container border border-error/30'
                            : p.riskClass === 'HIGH'
                            ? 'bg-amber-950 text-amber-300'
                            : p.riskClass === 'MODERATE'
                            ? 'bg-blue-950 text-blue-300'
                            : 'bg-emerald-950 text-emerald-300'
                        }`}>
                          {p.riskClass} ({p.riskScore})
                        </span>
                      </td>
                      <td className="p-3 font-data-mono font-semibold">
                        <span className={p.expectedDelayDays > 30 ? 'text-error' : p.expectedDelayDays > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                          {p.expectedDelayDays > 0 ? `+${p.expectedDelayDays} Days` : 'ON TRACK'}
                        </span>
                      </td>
                      <td className="p-3 text-on-surface-variant">
                        <div className="font-medium text-on-surface truncate max-w-[180px]">{p.district}</div>
                        <div className="text-[10px] text-outline truncate max-w-[180px]">{p.corridor}</div>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectParcel(p);
                            onNavigateTab('explainability');
                          }}
                          className="px-2 py-1 rounded bg-surface-container-lowest hover:bg-surface-container-highest border border-outline-variant/30 text-tertiary text-[10px] font-data-mono font-bold transition-colors"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 5 Columns: Selected Parcel Dossier */}
        <div className="lg:col-span-5 rounded-sm bg-surface-container border border-outline-variant/30 p-5 space-y-4">
          <div className="flex items-start justify-between border-b border-outline-variant/30 pb-3">
            <div>
              <span className="text-[10px] font-data-mono text-outline uppercase font-bold">
                TELEMETRY INSPECTION PROFILE
              </span>
              <h2 className="text-base font-bold font-headline text-on-surface">
                {selectedParcel.parcelNo} &bull; {selectedParcel.projectCode}
              </h2>
              <p className="text-[11px] text-on-surface-variant font-data-mono">
                {selectedParcel.corridor}
              </p>
            </div>
            <div className="text-right font-data-mono">
              <span className="text-[10px] text-outline block">COMPOSITE RISK</span>
              <span className={`text-2xl font-bold ${selectedParcel.riskScore > 75 ? 'text-error' : 'text-amber-400'}`}>
                {selectedParcel.riskScore}/100
              </span>
            </div>
          </div>

          {/* Key Indicators */}
          <div className="grid grid-cols-2 gap-2 text-xs font-data-mono">
            <div className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-outline text-[10px] block">PREDICTED DELAY:</span>
              <span className="text-error font-bold text-sm">
                {selectedParcel.expectedDelayDays > 0 ? `+${selectedParcel.expectedDelayDays} Days` : '0 Days'}
              </span>
            </div>
            <div className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-outline text-[10px] block">APPROVAL AGE:</span>
              <span className="text-on-surface font-bold text-sm">{selectedParcel.approvalAgeDays} Days</span>
            </div>
          </div>

          {/* Competent Authority Card */}
          <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant/20 text-xs">
            <span className="text-[10px] font-data-mono text-outline uppercase font-bold block mb-1">
              COMPETENT LAND ACQUISITION OFFICER
            </span>
            <div className="font-bold text-on-surface text-sm">{selectedParcel.officer}</div>
            <div className="text-[11px] text-on-surface-variant">{selectedParcel.officerTitle} &bull; {selectedParcel.collectorate}</div>
          </div>

          {/* Judicial Case if any */}
          {selectedParcel.judicialStatus && (
            <div className="p-3 rounded bg-error-container/20 border border-error/40 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-error font-bold font-data-mono text-[11px]">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>JUDICIAL PROCEEDING: {selectedParcel.judicialStatus.caseNo}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                {selectedParcel.judicialStatus.details}
              </p>
            </div>
          )}

          {/* Pending Documents Verification Checklist */}
          <div>
            <span className="text-[10px] font-data-mono text-outline uppercase font-bold block mb-1.5">
              MANDATORY STATUTORY DOCUMENTS
            </span>
            {selectedParcel.pendingDocuments.length > 0 ? (
              <div className="space-y-1.5">
                {selectedParcel.pendingDocuments.map(doc => (
                  <div key={doc.code} className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-outline" />
                      <div>
                        <div className="font-semibold text-on-surface text-[11px]">{doc.name}</div>
                        <div className="text-[10px] font-data-mono text-outline">{doc.code} &bull; {doc.type}</div>
                      </div>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded-xs font-data-mono font-bold text-[9px] ${
                      doc.status === 'MISSING'
                        ? 'bg-error-container text-on-error-container'
                        : doc.status === 'VERIFIED'
                        ? 'bg-emerald-950 text-emerald-300'
                        : 'bg-amber-950 text-amber-300'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2 rounded bg-surface-container-lowest text-xs text-outline font-data-mono">
                No outstanding statutory document blocks.
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-outline-variant/30 flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('gis')}
              className="flex-1 py-2 rounded-xs bg-surface-container-highest hover:bg-surface-bright border border-outline-variant/30 text-xs font-semibold text-on-surface transition-colors flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>GIS Vector</span>
            </button>
            <button
              onClick={() => onNavigateTab('explainability')}
              className="flex-1 py-2 rounded-xs bg-tertiary text-on-tertiary hover:bg-tertiary/90 text-xs font-bold font-data-mono transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Explain Risk</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
