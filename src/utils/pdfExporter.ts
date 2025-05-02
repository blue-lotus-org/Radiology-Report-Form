import { jsPDF } from 'jspdf';
import { ReportData } from '../types/ReportTypes';

export const generatePDF = (data: ReportData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Set font sizes
  const titleFontSize = 16;
  const sectionTitleFontSize = 12;
  const normalFontSize = 10;
  const smallFontSize = 8;
  
  // Margins
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPos = margin;
  
  // Helper functions
  const addTitle = (text: string) => {
    doc.setFontSize(titleFontSize);
    doc.setFont('helvetica', 'bold');
    const textWidth = doc.getTextDimensions(text).w;
    doc.text(text, (pageWidth - textWidth) / 2, yPos);
    yPos += 10;
  };
  
  const addSectionTitle = (text: string) => {
    checkPageBreak(10);
    doc.setFontSize(sectionTitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, yPos);
    yPos += 6;
  };
  
  const addField = (label: string, value: string, indent = 0) => {
    checkPageBreak(6);
    doc.setFontSize(normalFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(label + ':', margin + indent, yPos);
    doc.setFont('helvetica', 'normal');
    
    // Handle multiline text
    const maxWidth = contentWidth - doc.getTextDimensions(label + ': ').w - indent;
    if (value) {
      const splitText = doc.splitTextToSize(value, maxWidth);
      doc.text(splitText, margin + indent + doc.getTextDimensions(label + ': ').w, yPos);
      yPos += (splitText.length - 1) * 5 + 6;
    } else {
      yPos += 6;
    }
  };
  
  const addLine = () => {
    checkPageBreak(4);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos - 2, pageWidth - margin, yPos - 2);
    yPos += 4;
  };
  
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      yPos = margin;
    }
  };
  
  // Start creating the PDF
  addTitle('Radiology Report');
  addLine();
  
  // Patient Information
  addSectionTitle('Patient Information');
  addField('Name', data.patient.name || '[Patient Full Name]');
  addField('ID', data.patient.id || '[Patient ID/MRN]');
  addField('Date of Birth', data.patient.dob || '[DOB]');
  addField('Gender', data.patient.gender || '[Gender]');
  addField('Referring Physician', data.patient.referringPhysician || '[Physician Name]');
  addField('Date of Examination', data.patient.examinationDate || '[Examination Date]');
  addField('Report Date', data.patient.reportDate || '[Report Date]');
  addLine();
  
  // Examination
  addSectionTitle('Examination');
  addField('Type', data.examination.type || '[Type of Examination]');
  addField('Modality', data.examination.modality || '[Modality]');
  addLine();
  
  // Clinical History
  addSectionTitle('Clinical History');
  addField('Indication', data.clinicalHistory.indication || '[Reason for exam]');
  if (data.clinicalHistory.relevantHistory) {
    addField('Relevant Medical History', data.clinicalHistory.relevantHistory);
  }
  if (data.clinicalHistory.clinicalQuestion) {
    addField('Clinical Question', data.clinicalHistory.clinicalQuestion);
  }
  addLine();
  
  // Technique
  addSectionTitle('Technique');
  addField('Procedure', data.technique.procedure || '[Description]');
  if (data.technique.contrast) {
    addField('Contrast', data.technique.contrast);
  }
  if (data.technique.radiationDose) {
    addField('Radiation Dose', data.technique.radiationDose);
  }
  if (data.technique.nonStandardElements) {
    addField('Non-Standard Elements', data.technique.nonStandardElements);
  }
  if (data.technique.adverseReactions) {
    addField('Adverse Reactions', data.technique.adverseReactions);
  }
  addLine();
  
  // Comparison
  if (data.comparison.priorStudies || data.comparison.findingsCompared) {
    addSectionTitle('Comparison');
    if (data.comparison.priorStudies) {
      addField('Prior Studies', data.comparison.priorStudies);
    }
    if (data.comparison.findingsCompared) {
      addField('Findings Compared', data.comparison.findingsCompared);
    }
    addLine();
  }
  
  // Findings
  addSectionTitle('Findings');
  if (data.findings.systematicDescription) {
    addField('Systematic Description', data.findings.systematicDescription);
  }
  if (data.findings.abnormalities) {
    addField('Abnormalities', data.findings.abnormalities);
  }
  if (data.findings.measurements) {
    addField('Measurements', data.findings.measurements);
  }
  if (data.findings.relevantNegatives) {
    addField('Relevant Negatives', data.findings.relevantNegatives);
  }
  if (data.findings.incidentalFindings) {
    addField('Incidental Findings', data.findings.incidentalFindings);
  }
  addLine();
  
  // Impression
  addSectionTitle('Impression');
  data.impression.forEach((item, index) => {
    checkPageBreak(6);
    doc.setFontSize(normalFontSize);
    doc.text(`${index + 1}.`, margin, yPos);
    const splitText = doc.splitTextToSize(item || `[Impression ${index + 1}]`, contentWidth - 10);
    doc.text(splitText, margin + 10, yPos);
    yPos += (splitText.length - 1) * 5 + 6;
  });
  addLine();
  
  // Recommendations
  addSectionTitle('Recommendations');
  data.recommendations.forEach((item) => {
    checkPageBreak(6);
    doc.setFontSize(normalFontSize);
    doc.text('•', margin, yPos);
    const splitText = doc.splitTextToSize(item || '[Recommendation]', contentWidth - 10);
    doc.text(splitText, margin + 5, yPos);
    yPos += (splitText.length - 1) * 5 + 6;
  });
  addLine();
  
  // Radiologist
  addSectionTitle('Radiologist');
  addField('Name', data.radiologist.name || '[Radiologist Full Name, MD]');
  if (data.radiologist.contact) {
    addField('Contact', data.radiologist.contact);
  }
  addField('Date Signed', data.radiologist.dateSigned || '[YYYY-MM-DD]');
  addLine();
  
  // Notes (if any)
  if (data.notes) {
    addSectionTitle('Notes');
    doc.setFontSize(smallFontSize);
    const splitNotes = doc.splitTextToSize(data.notes, contentWidth);
    doc.text(splitNotes, margin, yPos);
    yPos += splitNotes.length * 5;
  }
  
  // Save the PDF
  doc.save(`${data.patient.name || 'patient'}_radiology_report.pdf`);
};