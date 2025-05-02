import React from 'react';
import { Findings } from '../../types/ReportTypes';
import { SectionTitle } from '../SectionTitle';
import { FormField } from '../FormField';

interface FindingsSectionProps {
  data: Findings;
  onChange: (field: string, value: string) => void;
}

export const FindingsSection: React.FC<FindingsSectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Findings</SectionTitle>
      <div className="grid grid-cols-1 gap-4">
        <FormField
          label="Systematic Description"
          id="systematic-description"
          as="textarea"
          value={data.systematicDescription}
          onChange={(e) => onChange('systematicDescription', e.target.value)}
          placeholder="e.g., Lungs: Clear, no focal consolidation or pneumothorax"
          rows={4}
          required
        />
        <FormField
          label="Abnormalities"
          id="abnormalities"
          as="textarea"
          value={data.abnormalities}
          onChange={(e) => onChange('abnormalities', e.target.value)}
          placeholder="e.g., 2.5 cm nodule in right upper lobe, precise location and characteristics"
          rows={3}
        />
        <FormField
          label="Measurements"
          id="measurements"
          value={data.measurements}
          onChange={(e) => onChange('measurements', e.target.value)}
          placeholder="e.g., Size in cm, volume if applicable"
        />
        <FormField
          label="Relevant Negatives"
          id="relevant-negatives"
          value={data.relevantNegatives}
          onChange={(e) => onChange('relevantNegatives', e.target.value)}
          placeholder="e.g., No pleural effusion or mediastinal widening"
        />
        <FormField
          label="Incidental Findings"
          id="incidental-findings"
          value={data.incidentalFindings}
          onChange={(e) => onChange('incidentalFindings', e.target.value)}
          placeholder="e.g., Small renal cyst, 1.2 cm, left kidney"
        />
      </div>
    </div>
  );
};