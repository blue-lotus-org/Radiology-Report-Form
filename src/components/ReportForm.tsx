import React, { useState } from 'react';
import { PatientInfoSection } from './sections/PatientInfoSection';
import { ExaminationSection } from './sections/ExaminationSection';
import { ClinicalHistorySection } from './sections/ClinicalHistorySection';
import { TechniqueSection } from './sections/TechniqueSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { FindingsSection } from './sections/FindingsSection';
import { ImpressionSection } from './sections/ImpressionSection';
import { RecommendationsSection } from './sections/RecommendationsSection';
import { RadiologistSection } from './sections/RadiologistSection';
import { ReportPreview } from './ReportPreview';
import { ExportButtons } from './ExportButtons';
import { ReportData } from '../types/ReportTypes';
import { generateMarkdown } from '../utils/markdownExporter';
import { generatePDF } from '../utils/pdfExporter';

export const ReportForm = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [reportData, setReportData] = useState<ReportData>({
    patient: {
      name: '',
      id: '',
      dob: '',
      gender: '',
      referringPhysician: '',
      examinationDate: new Date().toISOString().split('T')[0],
      reportDate: new Date().toISOString().split('T')[0],
    },
    examination: {
      type: '',
      modality: '',
    },
    clinicalHistory: {
      indication: '',
      relevantHistory: '',
      clinicalQuestion: '',
    },
    technique: {
      procedure: '',
      contrast: '',
      radiationDose: '',
      nonStandardElements: '',
      adverseReactions: '',
    },
    comparison: {
      priorStudies: '',
      findingsCompared: '',
    },
    findings: {
      systematicDescription: '',
      abnormalities: '',
      measurements: '',
      relevantNegatives: '',
      incidentalFindings: '',
    },
    impression: [''],
    recommendations: [''],
    radiologist: {
      name: '',
      contact: '',
      dateSigned: new Date().toISOString().split('T')[0],
    },
    notes: '',
  });

  const handleInputChange = (
    section: keyof ReportData,
    field: string,
    value: string | string[]
  ) => {
    setReportData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof ReportData],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (
    section: 'impression' | 'recommendations',
    index: number,
    value: string
  ) => {
    const newArray = [...(reportData[section] as string[])];
    newArray[index] = value;
    setReportData((prev) => ({
      ...prev,
      [section]: newArray,
    }));
  };

  const handleAddArrayItem = (section: 'impression' | 'recommendations') => {
    setReportData((prev) => ({
      ...prev,
      [section]: [...(prev[section] as string[]), ''],
    }));
  };

  const handleRemoveArrayItem = (section: 'impression' | 'recommendations', index: number) => {
    if ((reportData[section] as string[]).length > 1) {
      const newArray = [...(reportData[section] as string[])];
      newArray.splice(index, 1);
      setReportData((prev) => ({
        ...prev,
        [section]: newArray,
      }));
    }
  };

  const handleExportMarkdown = () => {
    const markdown = generateMarkdown(reportData);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportData.patient.name || 'patient'}_radiology_report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    generatePDF(reportData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'form'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
            onClick={() => setActiveTab('form')}
          >
            Form
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'preview'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'form' ? (
          <div className="space-y-8">
            <PatientInfoSection
              data={reportData.patient}
              onChange={(field, value) => handleInputChange('patient', field, value)}
            />
            <ExaminationSection
              data={reportData.examination}
              onChange={(field, value) => handleInputChange('examination', field, value)}
            />
            <ClinicalHistorySection
              data={reportData.clinicalHistory}
              onChange={(field, value) => handleInputChange('clinicalHistory', field, value)}
            />
            <TechniqueSection
              data={reportData.technique}
              onChange={(field, value) => handleInputChange('technique', field, value)}
            />
            <ComparisonSection
              data={reportData.comparison}
              onChange={(field, value) => handleInputChange('comparison', field, value)}
            />
            <FindingsSection
              data={reportData.findings}
              onChange={(field, value) => handleInputChange('findings', field, value)}
            />
            <ImpressionSection
              items={reportData.impression}
              onChange={handleArrayChange}
              onAdd={handleAddArrayItem}
              onRemove={handleRemoveArrayItem}
            />
            <RecommendationsSection
              items={reportData.recommendations}
              onChange={handleArrayChange}
              onAdd={handleAddArrayItem}
              onRemove={handleRemoveArrayItem}
            />
            <RadiologistSection
              data={reportData.radiologist}
              onChange={(field, value) => handleInputChange('radiologist', field, value)}
            />
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Any additional notes about the report..."
                rows={3}
                value={reportData.notes as string}
                onChange={(e) => setReportData((prev) => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
        ) : (
          <ReportPreview data={reportData} />
        )}
      </div>

      <ExportButtons
        onExportMarkdown={handleExportMarkdown}
        onExportPDF={handleExportPDF}
      />
    </div>
  );
};