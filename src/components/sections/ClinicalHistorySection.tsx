import React from 'react';
import { ClinicalHistory } from '../../types/ReportTypes';
import { SectionTitle } from '../SectionTitle';
import { FormField } from '../FormField';

interface ClinicalHistorySectionProps {
  data: ClinicalHistory;
  onChange: (field: string, value: string) => void;
}

export const ClinicalHistorySection: React.FC<ClinicalHistorySectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Clinical History</SectionTitle>
      <div className="grid grid-cols-1 gap-4">
        <FormField
          label="Indication"
          id="history-indication"
          value={data.indication}
          onChange={(e) => onChange('indication', e.target.value)}
          placeholder="Reason for exam, e.g., Shortness of breath, abdominal pain"
          required
        />
        <FormField
          label="Relevant Medical History"
          id="relevant-history"
          as="textarea"
          value={data.relevantHistory}
          onChange={(e) => onChange('relevantHistory', e.target.value)}
          placeholder="e.g., Hypertension, prior surgeries, known conditions"
          rows={3}
        />
        <FormField
          label="Clinical Question"
          id="clinical-question"
          value={data.clinicalQuestion}
          onChange={(e) => onChange('clinicalQuestion', e.target.value)}
          placeholder="Specific question to be addressed, e.g., Rule out pneumonia"
        />
      </div>
    </div>
  );
};