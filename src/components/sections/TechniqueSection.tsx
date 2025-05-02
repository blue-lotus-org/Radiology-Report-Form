import React from 'react';
import { Technique } from '../../types/ReportTypes';
import { SectionTitle } from '../SectionTitle';
import { FormField } from '../FormField';

interface TechniqueSectionProps {
  data: Technique;
  onChange: (field: string, value: string) => void;
}

export const TechniqueSection: React.FC<TechniqueSectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Technique</SectionTitle>
      <div className="grid grid-cols-1 gap-4">
        <FormField
          label="Procedure"
          id="procedure"
          value={data.procedure}
          onChange={(e) => onChange('procedure', e.target.value)}
          placeholder="Description, e.g., Posteroanterior and lateral chest X-ray"
          required
        />
        <FormField
          label="Contrast"
          id="contrast"
          value={data.contrast}
          onChange={(e) => onChange('contrast', e.target.value)}
          placeholder="e.g., None, or specify type/dose/route if used"
        />
        <FormField
          label="Radiation Dose"
          id="radiation-dose"
          value={data.radiationDose}
          onChange={(e) => onChange('radiationDose', e.target.value)}
          placeholder="If applicable, e.g., DLP 500 mGy·cm"
        />
        <FormField
          label="Non-Standard Elements"
          id="non-standard-elements"
          value={data.nonStandardElements}
          onChange={(e) => onChange('nonStandardElements', e.target.value)}
          placeholder="e.g., Additional views, specific sequences"
        />
        <FormField
          label="Adverse Reactions"
          id="adverse-reactions"
          value={data.adverseReactions}
          onChange={(e) => onChange('adverseReactions', e.target.value)}
          placeholder="e.g., None, or describe if occurred"
        />
      </div>
    </div>
  );
};