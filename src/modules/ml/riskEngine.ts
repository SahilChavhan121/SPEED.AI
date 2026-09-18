/**
 * S.P.E.E.D. Modular ML Risk Engine Interface
 * 
 * DESIGNED FOR EASY DEVELOPER EXTENSION & MODEL REPLACEMENT:
 * This module defines the prediction contract (Input -> Features -> Inference -> SHAP Explanation).
 * Replace the heuristic mock implementation with your production XGBoost, Random Forest,
 * or FastAPI endpoint (e.g. POST /predictions/run) without altering frontend components.
 * 
 * References: SIH26017 Guidebook Page 6 (Machine Learning Engineering)
 */

import { ParcelRecord, SHAPFactor } from '../../types';

export interface MLPredictionInput {
  parcelId: string;
  parcelNo: string;
  acquisitionCorridor: string;
  districtCollectorate: string;
  approvalAgeDays: number;
  missingDocumentCount: number;
  litigationFlagsCount: number;
  environmentalProximityMeters?: number;
  historicalSectorDelayDays?: number;
}

export interface MLPredictionOutput {
  predictionId: string;
  parcelNo: string;
  riskScore: number; // 0 - 100
  riskClass: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'NOMINAL';
  expectedDelayDays: number;
  confidenceScore: number; // 0 - 1.0
  dataQualityScore: number; // 0 - 100
  modelVersion: string;
  shapFactors: SHAPFactor[];
  generatedAt: string;
}

/**
 * Pluggable Risk Predictor Service
 * To swap with your Python / FastAPI / Scikit-learn backend:
 * Update `predictDelayRisk` to fetch from `process.env.VITE_API_URL + '/predictions/run'`.
 */
export class RiskEngineService {
  private static instance: RiskEngineService;
  private currentModelVersion: string = 'v4.12-PROD';

  public static getInstance(): RiskEngineService {
    if (!RiskEngineService.instance) {
      RiskEngineService.instance = new RiskEngineService();
    }
    return RiskEngineService.instance;
  }

  public setModelVersion(version: string) {
    this.currentModelVersion = version;
  }

  public getModelVersion(): string {
    return this.currentModelVersion;
  }

  /**
   * Run inference on parcel feature snapshot
   */
  public async predictDelayRisk(input: MLPredictionInput): Promise<MLPredictionOutput> {
    // Modular mock pipeline simulating XGBoost additive feature tree evaluation
    const baseScore = Math.min(
      95,
      Math.max(
        15,
        input.approvalAgeDays * 0.4 +
        input.missingDocumentCount * 18 +
        input.litigationFlagsCount * 25
      )
    );

    const roundedScore = Math.round(baseScore);
    let riskClass: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'NOMINAL' = 'NOMINAL';
    if (roundedScore >= 75) riskClass = 'CRITICAL';
    else if (roundedScore >= 60) riskClass = 'HIGH';
    else if (roundedScore >= 35) riskClass = 'MODERATE';

    const delayDays = Math.round(roundedScore * 0.85);

    const shapFactors: SHAPFactor[] = [
      {
        factor: 'Title Encumbrance Dispute',
        impactPercent: Math.min(45, Math.round(roundedScore * 0.38)),
        colorCategory: 'error'
      },
      {
        factor: 'Environmental Clearance Hold',
        impactPercent: Math.min(30, Math.round(roundedScore * 0.25)),
        colorCategory: 'tertiary'
      },
      {
        factor: 'Boundary Overlap Signal',
        impactPercent: Math.min(20, Math.round(roundedScore * 0.16)),
        colorCategory: 'secondary'
      },
      {
        factor: 'Valuation Discrepancy',
        impactPercent: Math.min(15, Math.round(roundedScore * 0.12)),
        colorCategory: 'primary'
      }
    ];

    return {
      predictionId: `PRED-${Date.now().toString(36).toUpperCase()}`,
      parcelNo: input.parcelNo,
      riskScore: roundedScore,
      riskClass,
      expectedDelayDays: delayDays,
      confidenceScore: 0.948,
      dataQualityScore: 94.2,
      modelVersion: this.currentModelVersion,
      shapFactors,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Helper to compute composite score from parcel record
   */
  public async evaluateParcel(parcel: ParcelRecord): Promise<MLPredictionOutput> {
    return this.predictDelayRisk({
      parcelId: parcel.id,
      parcelNo: parcel.parcelNo,
      acquisitionCorridor: parcel.corridor,
      districtCollectorate: parcel.collectorate,
      approvalAgeDays: parcel.approvalAgeDays,
      missingDocumentCount: parcel.pendingDocuments.filter(d => d.status === 'MISSING').length,
      litigationFlagsCount: parcel.judicialStatus ? 1 : 0
    });
  }
}

export const riskEngine = RiskEngineService.getInstance();
