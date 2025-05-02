import { ReportData } from '../types/ReportTypes';

export const generateMarkdown = (data: ReportData): string => {
  return `# Radiology Report

---

## Patient Information
- **Name**: ${data.patient.name || '[Patient Full Name]'}
- **ID**: ${data.patient.id || '[Patient ID/MRN]'}
- **Date of Birth**: ${data.patient.dob || '[DOB]'}
- **Gender**: ${data.patient.gender || '[Gender]'}
- **Referring Physician**: ${data.patient.referringPhysician || '[Physician Name]'}
- **Date of Examination**: ${data.patient.examinationDate || '[YYYY-MM-DD]'}
- **Report Date**: ${data.patient.reportDate || '[YYYY-MM-DD]'}

---

## Examination
- **Type**: ${data.examination.type || '[Type of Examination]'}
- **Modality**: ${data.examination.modality || '[Modality]'}

---

## Clinical History
- **Indication**: ${data.clinicalHistory.indication || '[Reason for exam]'}
${data.clinicalHistory.relevantHistory ? `- **Relevant Medical History**: ${data.clinicalHistory.relevantHistory}\n` : ''}
${data.clinicalHistory.clinicalQuestion ? `- **Clinical Question**: ${data.clinicalHistory.clinicalQuestion}\n` : ''}

---

## Technique
- **Procedure**: ${data.technique.procedure || '[Description]'}
${data.technique.contrast ? `- **Contrast**: ${data.technique.contrast}\n` : ''}
${data.technique.radiationDose ? `- **Radiation Dose**: ${data.technique.radiationDose}\n` : ''}
${data.technique.nonStandardElements ? `- **Non-Standard Elements**: ${data.technique.nonStandardElements}\n` : ''}
${data.technique.adverseReactions ? `- **Adverse Reactions**: ${data.technique.adverseReactions}\n` : ''}

---

${(data.comparison.priorStudies || data.comparison.findingsCompared) ? `
## Comparison
${data.comparison.priorStudies ? `- **Prior Studies**: ${data.comparison.priorStudies}\n` : ''}
${data.comparison.findingsCompared ? `- **Findings Compared**: ${data.comparison.findingsCompared}\n` : ''}

---
` : ''}

## Findings
${data.findings.systematicDescription ? `- **Systematic Description**: \n  ${data.findings.systematicDescription.replace(/\n/g, '\n  ')}\n` : ''}
${data.findings.abnormalities ? `- **Abnormalities**: \n  ${data.findings.abnormalities.replace(/\n/g, '\n  ')}\n` : ''}
${data.findings.measurements ? `- **Measurements**: ${data.findings.measurements}\n` : ''}
${data.findings.relevantNegatives ? `- **Relevant Negatives**: ${data.findings.relevantNegatives}\n` : ''}
${data.findings.incidentalFindings ? `- **Incidental Findings**: ${data.findings.incidentalFindings}\n` : ''}

---

## Impression
${data.impression.map((item, index) => `${index + 1}. ${item || `[Impression ${index + 1}]`}`).join('\n')}

---

## Recommendations
${data.recommendations.map(item => `- ${item || '[Recommendation]'}`).join('\n')}

---

## Radiologist
- **Name**: ${data.radiologist.name || '[Radiologist Full Name, MD]'}
${data.radiologist.contact ? `- **Contact**: ${data.radiologist.contact}\n` : ''}
- **Date Signed**: ${data.radiologist.dateSigned || '[YYYY-MM-DD]'}

---

${data.notes ? `**Notes**:  
${data.notes.replace(/\n/g, '  \n')}

---
` : ''}`;
};