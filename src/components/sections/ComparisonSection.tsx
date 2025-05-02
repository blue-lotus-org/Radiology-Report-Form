import React from 'react';
import { Comparison } from '../../types/ReportTypes';
import { SectionTitle } from '../SectionTitle';
import { FormField } from '../FormField';

interface ComparisonSectionProps {
  data: Comparison;
  onChange: (field: string, value: string) => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Comparison</SectionTitle>
      <div className="grid grid-cols-1 gap-4">
        <FormField
          label="Prior Studies"
          id="prior-studies"
          value={data.priorStudies}
          onChange={(e) => onChange('priorStudies', e.target.value)}
          placeholder="e.g., Chest X-ray dated YYYY-MM-DD, or None available"
        />
        <FormField
          label="Findings Compared"
          id="findings-compared"
          as="textarea"
          value={data.findingsCompared}
          onChange={(e) => onChange('findingsCompared', e.target.value)}
          placeholder="Brief note on relevance of prior studies"
          rows={3}
        />
      </div>
    </div>
  );
};