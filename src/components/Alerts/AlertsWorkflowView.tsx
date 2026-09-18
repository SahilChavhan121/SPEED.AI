import React, { useState } from 'react';
import { AlertItem, SeverityLevel } from '../../types';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Send, 
  FileWarning, 
  UserCheck,
  AlertOctagon,
  Check
} from 'lucide-react';

interface AlertsWorkflowViewProps {
  alerts: AlertItem[];
  onAcknowledgeAlert: (alertId: string) => void;
  onOpenEscalateModal: (alert: AlertItem) => void;
  onResolveAlert: (alertId: string) => void;
}

export const AlertsWorkflowView: React.FC<AlertsWorkflowViewProps> = ({
  alerts,
  onAcknowledgeAlert,
  onOpenEscalateModal,
  onResolveAlert
}) => {
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const filteredAlerts = alerts.filter(a => {
    const matchesSeverity = severityFilter === 'ALL' || a.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesSearch = 
      a.alertId.toLowerCase().includes(search.toLowerCase()) ||
      a.parcelNo.toLowerCase().includes(search.toLowerCase()) ||
      a.disputeSignal.toLowerCase().includes(search.toLowerCase()) ||
      a.assignedRecipient.name.toLowerCase().includes(search.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const pendingCount = alerts.filter(a => a.status === 'Pending').length;
  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL' || a.severity === 'ESCALATED').length;

  return (
    <div id="alerts-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-error" />
            <h1 className="text-xl font-bold font-headline text-on-surface uppercase tracking-wider">
              Alerts &amp; Workflow Management // Anomaly Dispatch
            </h1>
          </div>
          <p className="text-xs text-on-surface-variant font-data-mono mt-0.5">
            Automated anomaly triage, compliance escalation, and SLA tracking for land acquisition officers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-data-mono">
          <span className="px-2.5 py-1 rounded bg-error-container/30 border border-error/40 text-error font-bold">
            {pendingCount} PENDING ACTION
          </span>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-body">
        <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
          <span className="text-[11px] font-data-mono text-outline uppercase font-bold block">
            Open Anomalies
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-error">{alerts.length}</span>
            <span className="text-[10px] font-data-mono text-error font-semibold">{criticalCount} Critical</span>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
          <span className="text-[11px] font-data-mono text-outline uppercase font-bold block">
            SLA Breach Risk
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-amber-400">4 Cases</span>
            <span className="text-[10px] font-data-mono text-amber-400 font-semibold">&lt; 4h remaining</span>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
          <span className="text-[11px] font-data-mono text-outline uppercase font-bold block">
            Avg Acknowledge Time
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-tertiary">1.4h</span>
            <span className="text-[10px] font-data-mono text-emerald-400 font-semibold">Target: &lt;2h</span>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/30">
          <span className="text-[11px] font-data-mono text-outline uppercase font-bold block">
            Escalation Rate
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-secondary">8.2%</span>
            <span className="text-[10px] font-data-mono text-secondary font-semibold">Stabilized</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3.5 rounded-sm bg-surface-container border border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter alerts, parcels, personnel..."
              className="w-48 sm:w-64 p-1.5 pl-8 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary font-body"
            />
            <Search className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2" />
          </div>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value)}
            className="p-1.5 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary font-data-mono"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="ESCALATED">Escalated</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="p-1.5 rounded-xs bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary font-data-mono"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Escalated">Escalated</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <span className="text-[11px] font-data-mono text-outline">
          Showing {filteredAlerts.length} alerts
        </span>
      </div>

      {/* Alerts Table */}
      <div className="rounded-sm bg-surface-container border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/30 text-[10px] font-data-mono font-bold uppercase tracking-wider text-outline">
                <th className="p-3">Alert ID</th>
                <th className="p-3">Affected Parcel</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Dispute Signal &amp; Finding</th>
                <th className="p-3">Assigned SLAO</th>
                <th className="p-3">Status</th>
                <th className="p-3">Due In</th>
                <th className="p-3 text-right">Workflow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredAlerts.map(alert => (
                <tr key={alert.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="p-3 font-data-mono font-bold text-tertiary">
                    {alert.alertId}
                  </td>
                  <td className="p-3 font-data-mono font-bold text-on-surface">
                    {alert.parcelNo}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-xs font-data-mono font-bold text-[10px] ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-error-container text-on-error-container border border-error/40'
                        : alert.severity === 'HIGH'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                        : alert.severity === 'ESCALATED'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800/40'
                        : 'bg-blue-950 text-blue-300 border border-blue-800/40'
                    }`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface max-w-sm">
                    <div className="font-semibold flex items-center gap-1">
                      {alert.disputeSignal}
                    </div>
                    <div className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-1">
                      {alert.description}
                    </div>
                  </td>
                  <td className="p-3 text-on-surface-variant font-data-mono text-[11px]">
                    <div>{alert.assignedRecipient.name}</div>
                    <div className="text-[10px] text-outline">{alert.assignedRecipient.role}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-1.5 py-0.5 rounded-xs font-data-mono text-[10px] font-bold ${
                      alert.status === 'Pending'
                        ? 'bg-amber-950 text-amber-300'
                        : alert.status === 'Escalated'
                        ? 'bg-error-container text-on-error-container'
                        : alert.status === 'Resolved'
                        ? 'bg-emerald-950 text-emerald-300'
                        : 'bg-surface-container-lowest text-on-surface'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="p-3 font-data-mono text-[11px]">
                    <span className={alert.dueIn.includes('Overdue') ? 'text-error font-bold' : 'text-on-surface'}>
                      {alert.dueIn}
                    </span>
                    <div className="text-[10px] text-outline">{alert.age}</div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {alert.status === 'Pending' && (
                        <button
                          onClick={() => onAcknowledgeAlert(alert.id)}
                          className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface text-[10px] font-data-mono font-bold transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-tertiary" />
                          <span>Ack</span>
                        </button>
                      )}

                      {alert.status !== 'Escalated' && alert.status !== 'Resolved' && (
                        <button
                          onClick={() => onOpenEscalateModal(alert)}
                          className="px-2 py-1 rounded bg-error-container/40 hover:bg-error-container border border-error/30 text-error text-[10px] font-data-mono font-bold transition-colors flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Escalate</span>
                        </button>
                      )}

                      {alert.status !== 'Resolved' && (
                        <button
                          onClick={() => onResolveAlert(alert.id)}
                          className="px-2 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/40 text-emerald-300 text-[10px] font-data-mono font-bold transition-colors"
                        >
                          Resolve
                        </button>
                      )}

                      {alert.status === 'Resolved' && (
                        <span className="text-emerald-400 text-[11px] font-data-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Closed
                        </span>
                      )}
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
