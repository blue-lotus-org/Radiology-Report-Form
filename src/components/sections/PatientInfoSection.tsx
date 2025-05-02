import React from 'react';
import { PatientInfo } from '../../types/ReportTypes';
import { SectionTitle } from '../SectionTitle';
import { FormField } from '../FormField';

interface PatientInfoSectionProps {
  data: PatientInfo;
  onChange: (field: string, value: string) => void;
}

export const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Patient Information</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Name"
          id="patient-name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Patient Full Name"
          required
        />
        <FormField
          label="ID/MRN"
          id="patient-id"
          value={data.id}
          onChange={(e) => onChange('id', e.target.value)}
          placeholder="Patient ID/MRN"
          required
        />
        <FormField
          label="Date of Birth"
          id="patient-dob"
          type="date"
          value={data.dob}
          onChange={(e) => onChange('dob', e.target.value)}
          required
        />
        <FormField
          label="Gender"
          id="patient-gender"
          as="select"
          value={data.gender}
          onChange={(e) => onChange('gender', e.target.value)}
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </FormField>
        <FormField
          label="Referring Physician"
          id="referring-physician"
          value={data.referringPhysician}
          onChange={(e) => onChange('referringPhysician', e.target.value)}
          placeholder="Physician Name"
          required
        />
        <FormField
          label="Date of Examination"
          id="examination-date"
          type="date"
          value={data.examinationDate}
          onChange={(e) => onChange('examinationDate', e.target.value)}
          required
        />
        <FormField
          label="Report Date"
          id="report-date"
          type="date"
          value={data.reportDate}
          onChange={(e) => onChange('reportDate', e.target.value)}
          required
        />
      </div>
    </div>
  );
};