import React from 'react';
import { SectionTitle } from '../SectionTitle';
import { Plus, Trash2 } from 'lucide-react';

interface RecommendationsSectionProps {
  items: string[];
  onChange: (section: 'recommendations', index: number, value: string) => void;
  onAdd: (section: 'recommendations') => void;
  onRemove: (section: 'recommendations', index: number) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  items,
  onChange,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <SectionTitle>Recommendations</SectionTitle>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-2 mt-2">•</div>
            <textarea
              className="flex-grow px-3 py-2 border rounded-md"
              placeholder="Recommendation"
              rows={2}
              value={item}
              onChange={(e) => onChange('recommendations', index, e.target.value)}
            />
            <button
              type="button"
              className="ml-2 p-2 text-red-500 hover:text-red-700 transition-colors"
              onClick={() => onRemove('recommendations', index)}
              disabled={items.length === 1}
              title="Remove recommendation"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => onAdd('recommendations')}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add recommendation
        </button>
      </div>
    </div>
  );
};