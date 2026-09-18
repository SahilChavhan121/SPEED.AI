/**
 * S.P.E.E.D. Modular NLP Document Intelligence Interface
 * 
 * DESIGNED FOR EASY DEVELOPER EXTENSION & MODEL REPLACEMENT:
 * This module abstracts legal, gazette, and encumbrance document parsing.
 * Developers can replace this placeholder with spaCy, Hugging Face Transformers,
 * or OCR APIs (e.g. AWS Textract, Tesseract, or Indian Legal NER models)
 * without breaking the document verification and explainability UI.
 * 
 * References: SIH26017 Guidebook Page 4 & 5 (M08 • Document Intelligence)
 */

export interface DocumentExtractionResult {
  documentId: string;
  filename: string;
  detectedType: 'Gazette Notification' | 'Encumbrance Certificate' | 'Gram Sabha NOC' | 'Valuation Report';
  extractedEntities: {
    entityType: 'CLAIMANT' | 'SURVEY_PILLAR' | 'COURT_CASE_NO' | 'PLOT_SUBDIVISION' | 'VALUATION_AMOUNT';
    text: string;
    confidence: number;
  }[];
  summary: string;
  disputeSignalTriggered?: string;
  verificationRecommended: boolean;
}

export class DocumentIntelligenceService {
  private static instance: DocumentIntelligenceService;

  public static getInstance(): DocumentIntelligenceService {
    if (!DocumentIntelligenceService.instance) {
      DocumentIntelligenceService.instance = new DocumentIntelligenceService();
    }
    return DocumentIntelligenceService.instance;
  }

  /**
   * Mock document extraction pipeline
   * Replace this with your backend Python endpoint (e.g. POST /nlp/extract-entities)
   */
  public async extractEntities(docName: string, textSnippet: string): Promise<DocumentExtractionResult> {
    return {
      documentId: `DOC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      filename: docName,
      detectedType: docName.toLowerCase().includes('gazette')
        ? 'Gazette Notification'
        : 'Encumbrance Certificate',
      extractedEntities: [
        {
          entityType: 'CLAIMANT',
          text: 'Faction B Heir Apparents',
          confidence: 0.962
        },
        {
          entityType: 'COURT_CASE_NO',
          text: 'WP-14829-2023',
          confidence: 0.985
        },
        {
          entityType: 'SURVEY_PILLAR',
          text: 'Pillar #12 (Ambala North)',
          confidence: 0.934
        }
      ],
      summary: textSnippet || 'Extracted legal encumbrances indicate unresolved ancestral partition claims under Section 4(1).',
      disputeSignalTriggered: 'Title Encumbrance Dispute',
      verificationRecommended: true
    };
  }
}

export const documentIntelligence = DocumentIntelligenceService.getInstance();
