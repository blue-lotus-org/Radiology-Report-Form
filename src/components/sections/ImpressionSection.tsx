import React from 'react';
import { SectionTitle } from '../SectionTitle';
import { Plus, Trash2 } from 'lucide-react';

interface ImpressionSectionProps {
  items: string[];
  onChange: (section: 'impression', index: number, value: string) => void;
  onAdd: (section: 'impression') => void;
  onRemove: (section: 'impression', index: number) => void;
}

export const ImpressionSection: React.FC<ImpressionSectionProps> = ({
  items,
  onChange,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Impression</SectionTitle>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-2 mt-2 text-gray-500">{index + 1}.</div>
            <textarea
              className="flex-grow px-3 py-2 border rounded-md"
              placeholder="Primary diagnosis or key finding"
              rows={2}
              value={item}
              onChange={(e) => onChange('impression', index, e.target.value)}
            />
            <button
              type="button"
              className="ml-2 p-2 text-red-500 hover:text-red-700 transition-colors"
              onClick={() => onRemove('impression', index)}
              disabled={items.length === 1}
              title="Remove impression"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => onAdd('impression')}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add impression
        </button>
      </div>
    </div>
  );
};