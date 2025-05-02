import React from 'react';
import { Examination } from '../../types/ReportTypes';
import { SectionTitle } from '../SectionTitle';
import { FormField } from '../FormField';

interface ExaminationSectionProps {
  data: Examination;
  onChange: (field: string, value: string) => void;
}

export const ExaminationSection: React.FC<ExaminationSectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Examination</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Type"
          id="exam-type"
          value={data.type}
          onChange={(e) => onChange('type', e.target.value)}
          placeholder="e.g., Chest X-ray, CT Abdomen, MRI Brain"
          required
        />
        <FormField
          label="Modality"
          id="exam-modality"
          value={data.modality}
          onChange={(e) => onChange('modality', e.target.value)}
          placeholder="e.g., X-ray, CT, MRI, Ultrasound"
          required
        />
      </div>
    </div>
  );
};