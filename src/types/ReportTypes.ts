export interface PatientInfo {
  name: string;
  id: string;
  dob: string;
  gender: string;
  referringPhysician: string;
  examinationDate: string;
  reportDate: string;
}

export interface Examination {
  type: string;
  modality: string;
}

export interface ClinicalHistory {
  indication: string;
  relevantHistory: string;
  clinicalQuestion: string;
}

export interface Technique {
  procedure: string;
  contrast: string;
  radiationDose: string;
  nonStandardElements: string;
  adverseReactions: string;
}

export interface Comparison {
  priorStudies: string;
  findingsCompared: string;
}

export interface Findings {
  systematicDescription: string;
  abnormalities: string;
  measurements: string;
  relevantNegatives: string;
  incidentalFindings: string;
}

export interface Radiologist {
  name: string;
  contact: string;
  dateSigned: string;
}

export interface ReportData {
  patient: PatientInfo;
  examination: Examination;
  clinicalHistory: ClinicalHistory;
  technique: Technique;
  comparison: Comparison;
  findings: Findings;
  impression: string[];
  recommendations: string[];
  radiologist: Radiologist;
  notes: string;
}