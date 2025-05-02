import React from 'react';
import { FileText, Download } from 'lucide-react';

interface ExportButtonsProps {
  onExportMarkdown: () => void;
  onExportPDF: () => void;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  onExportMarkdown,
  onExportPDF,
}) => {
  return (
    <div className="flex justify-end p-4 border-t bg-gray-50">
      <div className="flex space-x-3">
        <button
          className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          onClick={onExportMarkdown}
        >
          <FileText className="h-4 w-4 mr-2" />
          Export MD
        </button>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={onExportPDF}
        >
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </button>
      </div>
    </div>
  );
};