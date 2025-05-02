import React from 'react';
import { Radiologist } from '../../types/ReportTypes';
import { SectionTitle } from '../SectionTitle';
import { FormField } from '../FormField';

interface RadiologistSectionProps {
  data: Radiologist;
  onChange: (field: string, value: string) => void;
}

export const RadiologistSection: React.FC<RadiologistSectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Radiologist</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Name"
          id="radiologist-name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Radiologist Full Name, MD"
          required
        />
        <FormField
          label="Contact"
          id="radiologist-contact"
          value={data.contact}
          onChange={(e) => onChange('contact', e.target.value)}
          placeholder="e.g., Department Phone or Email"
        />
        <FormField
          label="Date Signed"
          id="date-signed"
          type="date"
          value={data.dateSigned}
          onChange={(e) => onChange('dateSigned', e.target.value)}
          required
        />
      </div>
    </div>
  );
};