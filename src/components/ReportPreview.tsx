import React from 'react';
import { ReportData } from '../types/ReportTypes';

interface ReportPreviewProps {
  data: ReportData;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ data }) => {
  return (
    <div className="prose max-w-none">
      <h1 className="text-2xl font-bold text-center mb-6">Radiology Report</h1>
      <hr className="my-4" />

      <section>
        <h2 className="text-xl font-semibold">Patient Information</h2>
        <ul className="list-none pl-0 grid grid-cols-1 md:grid-cols-2 gap-2">
          <li><strong>Name:</strong> {data.patient.name || '[Patient Full Name]'}</li>
          <li><strong>ID:</strong> {data.patient.id || '[Patient ID/MRN]'}</li>
          <li><strong>Date of Birth:</strong> {data.patient.dob || '[DOB]'}</li>
          <li><strong>Gender:</strong> {data.patient.gender || '[Gender]'}</li>
          <li><strong>Referring Physician:</strong> {data.patient.referringPhysician || '[Physician Name]'}</li>
          <li><strong>Date of Examination:</strong> {data.patient.examinationDate || '[Examination Date]'}</li>
          <li><strong>Report Date:</strong> {data.patient.reportDate || '[Report Date]'}</li>
        </ul>
      </section>
      <hr className="my-4" />

      <section>
        <h2 className="text-xl font-semibold">Examination</h2>
        <ul className="list-none pl-0">
          <li><strong>Type:</strong> {data.examination.type || '[Type of Examination]'}</li>
          <li><strong>Modality:</strong> {data.examination.modality || '[Modality]'}</li>
        </ul>
      </section>
      <hr className="my-4" />

      <section>
        <h2 className="text-xl font-semibold">Clinical History</h2>
        <ul className="list-none pl-0">
          <li><strong>Indication:</strong> {data.clinicalHistory.indication || '[Indication]'}</li>
          {data.clinicalHistory.relevantHistory && (
            <li><strong>Relevant Medical History:</strong> {data.clinicalHistory.relevantHistory}</li>
          )}
          {data.clinicalHistory.clinicalQuestion && (
            <li><strong>Clinical Question:</strong> {data.clinicalHistory.clinicalQuestion}</li>
          )}
        </ul>
      </section>
      <hr className="my-4" />

      <section>
        <h2 className="text-xl font-semibold">Technique</h2>
        <ul className="list-none pl-0">
          <li><strong>Procedure:</strong> {data.technique.procedure || '[Procedure Description]'}</li>
          {data.technique.contrast && <li><strong>Contrast:</strong> {data.technique.contrast}</li>}
          {data.technique.radiationDose && <li><strong>Radiation Dose:</strong> {data.technique.radiationDose}</li>}
          {data.technique.nonStandardElements && <li><strong>Non-Standard Elements:</strong> {data.technique.nonStandardElements}</li>}
          {data.technique.adverseReactions && <li><strong>Adverse Reactions:</strong> {data.technique.adverseReactions}</li>}
        </ul>
      </section>
      <hr className="my-4" />

      {(data.comparison.priorStudies || data.comparison.findingsCompared) && (
        <>
          <section>
            <h2 className="text-xl font-semibold">Comparison</h2>
            <ul className="list-none pl-0">
              {data.comparison.priorStudies && <li><strong>Prior Studies:</strong> {data.comparison.priorStudies}</li>}
              {data.comparison.findingsCompared && <li><strong>Findings Compared:</strong> {data.comparison.findingsCompared}</li>}
            </ul>
          </section>
          <hr className="my-4" />
        </>
      )}

      <section>
        <h2 className="text-xl font-semibold">Findings</h2>
        <ul className="list-none pl-0">
          {data.findings.systematicDescription && (
            <li><strong>Systematic Description:</strong>
              <p className="pl-4 whitespace-pre-line">{data.findings.systematicDescription}</p>
            </li>
          )}
          {data.findings.abnormalities && (
            <li><strong>Abnormalities:</strong>
              <p className="pl-4">{data.findings.abnormalities}</p>
            </li>
          )}
          {data.findings.measurements && <li><strong>Measurements:</strong> {data.findings.measurements}</li>}
          {data.findings.relevantNegatives && <li><strong>Relevant Negatives:</strong> {data.findings.relevantNegatives}</li>}
          {data.findings.incidentalFindings && <li><strong>Incidental Findings:</strong> {data.findings.incidentalFindings}</li>}
        </ul>
      </section>
      <hr className="my-4" />

      <section>
        <h2 className="text-xl font-semibold">Impression</h2>
        <ol className="pl-4">
          {data.impression.map((item, index) => (
            <li key={index}>{item || `[Impression ${index + 1}]`}</li>
          ))}
        </ol>
      </section>
      <hr className="my-4" />

      <section>
        <h2 className="text-xl font-semibold">Recommendations</h2>
        <ul className="list-disc pl-5">
          {data.recommendations.map((item, index) => (
            <li key={index}>{item || `[Recommendation ${index + 1}]`}</li>
          ))}
        </ul>
      </section>
      <hr className="my-4" />

      <section>
        <h2 className="text-xl font-semibold">Radiologist</h2>
        <ul className="list-none pl-0">
          <li><strong>Name:</strong> {data.radiologist.name || '[Radiologist Name, MD]'}</li>
          {data.radiologist.contact && <li><strong>Contact:</strong> {data.radiologist.contact}</li>}
          <li><strong>Date Signed:</strong> {data.radiologist.dateSigned || '[Date Signed]'}</li>
        </ul>
      </section>
      <hr className="my-4" />

      {data.notes && (
        <section>
          <h2 className="text-xl font-semibold">Notes</h2>
          <p className="whitespace-pre-line">{data.notes}</p>
        </section>
      )}
    </div>
  );
};