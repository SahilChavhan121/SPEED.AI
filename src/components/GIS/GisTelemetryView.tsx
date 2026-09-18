import React, { useState } from 'react';
import { ParcelRecord, ActiveNavigationTab } from '../../types';
import { GIS_MAP_IMAGE_DETAILED } from '../../data/mockData';
import { 
  Layers, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  ArrowRight,
  Maximize2,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

interface GisTelemetryViewProps {
  parcels: ParcelRecord[];
  selectedParcel: ParcelRecord;
  onSelectParcel: (parcel: ParcelRecord) => void;
  onNavigateTab: (tab: ActiveNavigationTab) => void;
  onOpenEscalate: (parcelNo: string) => void;
}

export const GisTelemetryView: React.FC<GisTelemetryViewProps> = ({
  parcels,
  selectedParcel,
  onSelectParcel,
  onNavigateTab,
  onOpenEscalate
}) => {
  const [activeLayers, setActiveLayers] = useState({
    parcels: true,
    riskOverlays: true,
    frictionZones: false,
    rowVectors: true
  });

  const [zoomLevel, setZoomLevel] = useState(14.2);

  const toggleLayer = (key: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="gis-view" className="p-3 sm:p-5 space-y-4 max-w-7xl mx-auto font-body">
      {/* Top Telemetry Header Bar */}
      <div className="p-3.5 rounded-sm bg-surface-container border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold font-headline text-on-surface uppercase tracking-wider flex items-center gap-2">
              GIS Corridor Overlay // Telemetry Node
            </h1>
            <span className="px-2 py-0.5 rounded-xs font-data-mono text-[10px] font-bold bg-tertiary/10 text-tertiary border border-tertiary/25">
              STREAM: ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant font-data-mono mt-0.5">
            CORRIDOR: {selectedParcel.projectCode} // {selectedParcel.corridor}
          </p>
        </div>

        {/* GPS Coordinates & Layer Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-data-mono">
          <div className="px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant/25 text-outline text-[11px]">
            LAT: <span className="text-on-surface font-semibold">{selectedParcel.lat.toFixed(4)}° N</span> &bull; 
            LON: <span className="text-on-surface font-semibold ml-1">{selectedParcel.lon.toFixed(4)}° E</span> &bull;
            ZOOM: <span className="text-tertiary font-bold ml-1">{zoomLevel.toFixed(1)}x</span>
          </div>

          {/* Layer Checkbox Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleLayer('parcels')}
              className={`px-2 py-1 rounded-xs border text-[10px] transition-colors ${
                activeLayers.parcels
                  ? 'bg-primary-container border-primary text-on-surface font-bold'
                  : 'bg-surface-container-lowest border-outline-variant/30 text-outline'
              }`}
            >
              Parcels
            </button>
            <button
              onClick={() => toggleLayer('riskOverlays')}
              className={`px-2 py-1 rounded-xs border text-[10px] transition-colors ${
                activeLayers.riskOverlays
                  ? 'bg-error-container border-error/40 text-on-error-container font-bold'
                  : 'bg-surface-container-lowest border-outline-variant/30 text-outline'
              }`}
            >
              Risk Heatmap
            </button>
            <button
              onClick={() => toggleLayer('rowVectors')}
              className={`px-2 py-1 rounded-xs border text-[10px] transition-colors ${
                activeLayers.rowVectors
                  ? 'bg-tertiary/20 border-tertiary/40 text-tertiary font-bold'
                  : 'bg-surface-container-lowest border-outline-variant/30 text-outline'
              }`}
            >
              150m RoW
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left GIS Interactive Canvas + Right Case Telemetry Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 8 Columns: GIS Interactive Canvas */}
        <div className="lg:col-span-8 rounded-sm bg-surface-container border border-outline-variant/30 overflow-hidden relative flex flex-col min-h-[500px] lg:min-h-[600px]">
          {/* Detailed GIS Satellite Base with Hotlinks */}
          <div className="relative flex-1 w-full h-full overflow-hidden select-none bg-surface-container-lowest">
            <img
              src={GIS_MAP_IMAGE_DETAILED}
              alt="Detailed GIS Telemetry Satellite Corridor"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel / 14.0})` }}
            />

            {/* Vector Overlay: CAD Cadastral Boundary Lines & Friction Buffer */}
            {activeLayers.rowVectors && (
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 1000 700" 
                preserveAspectRatio="none"
              >
                {/* 150m Corridor Highway Centerline */}
                <path
                  d="M 50 120 Q 400 350 950 580"
                  fill="none"
                  stroke="#93ccff"
                  strokeWidth="6"
                  strokeDasharray="8,6"
                  className="opacity-80"
                />
                {/* RoW Buffer Zone Polygon */}
                <path
                  d="M 40 80 Q 400 310 940 540 L 960 620 Q 400 390 60 160 Z"
                  fill="#93ccff"
                  fillOpacity="0.08"
                  stroke="#93ccff"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
              </svg>
            )}

            {/* Interactive Parcel Pin Markers on Map */}
            {activeLayers.parcels && (
              <div className="absolute inset-0 pointer-events-none">
                {parcels.map((parcel, idx) => {
                  const isSelected = parcel.id === selectedParcel.id;
                  // Deterministic layout offsets along the corridor
                  const lefts = [52, 68, 32, 78, 42, 22, 60, 48, 55];
                  const tops = [48, 58, 30, 68, 40, 20, 52, 45, 50];
                  const left = lefts[idx % lefts.length];
                  const top = tops[idx % tops.length];

                  return (
                    <div
                      key={parcel.id}
                      style={{ left: `${left}%`, top: `${top}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    >
                      <button
                        onClick={() => onSelectParcel(parcel)}
                        className={`group relative flex items-center transition-transform hover:scale-110 focus:outline-none ${
                          isSelected ? 'scale-125 z-30' : 'z-10'
                        }`}
                        aria-label={`Select parcel ${parcel.parcelNo}`}
                      >
                        {/* Glow halo */}
                        {parcel.riskClass === 'CRITICAL' && (
                          <div className="absolute -inset-2 bg-error/30 rounded-full animate-ping pointer-events-none" />
                        )}
                        <div className={`px-2 py-1 rounded-xs shadow-lg font-data-mono font-bold text-[10px] flex items-center gap-1 border ${
                          isSelected
                            ? 'bg-primary text-on-primary border-white ring-2 ring-tertiary'
                            : parcel.riskClass === 'CRITICAL'
                            ? 'bg-error text-on-error border-error-container'
                            : parcel.riskClass === 'HIGH'
                            ? 'bg-amber-500 text-black border-amber-300'
                            : 'bg-surface-container-highest text-on-surface border-outline-variant/40'
                        }`}>
                          <MapPin className="w-3 h-3" />
                          <span>{parcel.parcelNo}</span>
                          {parcel.riskClass === 'CRITICAL' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Map Canvas Floating Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5 bg-surface-container-lowest/80 backdrop-blur-md p-1.5 rounded-sm border border-outline-variant/30 shadow-lg">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 1, 20))}
                className="p-1.5 rounded-xs text-on-surface hover:bg-surface-container transition-colors"
                title="Zoom in"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 1, 10))}
                className="p-1.5 rounded-xs text-on-surface hover:bg-surface-container transition-colors"
                title="Zoom out"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(14.2)}
                className="p-1.5 rounded-xs text-on-surface hover:bg-surface-container transition-colors"
                title="Reset zoom to 14.2x"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Compass / Orientation indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 text-[10px] font-data-mono text-outline">
              <Compass className="w-3.5 h-3.5 text-tertiary animate-spin-slow" />
              <span>N 0.00° TRUE</span>
            </div>

            {/* Bottom Floating Legend */}
            <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-3 p-2 rounded-xs bg-surface-container-lowest/85 backdrop-blur-md border border-outline-variant/30 text-[10px] font-data-mono text-on-surface">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-error rounded-xs" />
                <span>Critical Risk (&gt;75)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-xs" />
                <span>High Risk (60-74)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs" />
                <span>Nominal / Clear</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Case Telemetry Dossier */}
        <div className="lg:col-span-4 rounded-sm bg-surface-container border border-outline-variant/30 p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div>
            {/* Dossier Header */}
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <span className="text-[10px] font-data-mono text-outline uppercase font-bold">
                  CASE TELEMETRY DOSSIER
                </span>
                <h2 className="text-base font-bold font-headline text-on-surface flex items-center gap-2">
                  PARCEL #{selectedParcel.parcelNo}
                  <span className={`px-1.5 py-0.5 rounded-xs font-data-mono text-[9px] font-bold ${
                    selectedParcel.riskClass === 'CRITICAL'
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-amber-950 text-amber-300'
                  }`}>
                    {selectedParcel.riskClass}
                  </span>
                </h2>
              </div>
              <div className="text-right font-data-mono">
                <span className="text-[10px] text-outline block">COMPOSITE RISK</span>
                <span className={`text-xl font-bold ${selectedParcel.riskScore > 75 ? 'text-error' : 'text-amber-400'}`}>
                  {selectedParcel.riskScore}<span className="text-xs font-normal text-outline">/100</span>
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 my-3 font-data-mono text-[11px]">
              <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
                <span className="text-outline text-[10px] block">EXPECTED DELAY:</span>
                <span className="text-error font-bold text-xs">
                  {selectedParcel.expectedDelayDays > 0 ? `+${selectedParcel.expectedDelayDays} Days` : '0 Days'}
                </span>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
                <span className="text-outline text-[10px] block">DATA INTEGRITY:</span>
                <span className="text-tertiary font-bold text-xs">{selectedParcel.dataQualityScore}%</span>
              </div>
            </div>

            {/* Contributing Factor Breakdown */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-data-mono text-outline uppercase font-bold block">
                PRIMARY RISK DRIVERS (SHAP)
              </span>

              {selectedParcel.contributingFactors.map(factor => (
                <div key={factor.name} className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-on-surface">
                    <span>{factor.name}</span>
                    <span className="font-data-mono text-tertiary font-bold">{factor.weight}%</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Statutory Stage */}
            <div className="mt-3 p-2.5 rounded bg-surface-container-lowest/60 border border-outline-variant/20 text-[11px] font-data-mono space-y-1">
              <div className="text-outline text-[10px] uppercase font-bold">Statutory Milestone Status:</div>
              <div className="text-on-surface font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                <span>Award Declaration: {selectedParcel.timeline.awardDeclarationEst}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-outline-variant/30 space-y-2">
            <button
              onClick={() => onNavigateTab('explainability')}
              className="w-full py-2 px-3 rounded-xs bg-surface-container-highest hover:bg-surface-bright text-on-surface text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-outline-variant/30"
            >
              <span>Inspect Full SHAP Explanation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenEscalate(selectedParcel.parcelNo)}
              className="w-full py-2 px-3 rounded-xs bg-error-container text-on-error-container hover:bg-error hover:text-on-error text-xs font-bold font-data-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-error/40 shadow-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Dispatch Escalation Notice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
