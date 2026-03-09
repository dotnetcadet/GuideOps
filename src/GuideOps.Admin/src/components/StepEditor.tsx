import type { GuideStep } from '../types';

interface StepEditorProps {
  steps: Omit<GuideStep, 'id' | 'guideId'>[];
  onChange: (steps: Omit<GuideStep, 'id' | 'guideId'>[]) => void;
}

const emptyStep: Omit<GuideStep, 'id' | 'guideId'> = {
  stepOrder: 0,
  elementSelector: '',
  title: '',
  description: '',
  side: 'bottom',
  pageUrl: null,
};

export function StepEditor({ steps, onChange }: StepEditorProps) {
  const addStep = () => {
    onChange([...steps, { ...emptyStep, stepOrder: steps.length + 1 }]);
  };

  const removeStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, stepOrder: i + 1 }));
    onChange(updated);
  };

  const updateStep = (index: number, field: string, value: string | null) => {
    const updated = steps.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    onChange(updated);
  };

  const moveStep = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= steps.length) return;
    const updated = [...steps];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated.map((s, i) => ({ ...s, stepOrder: i + 1 })));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Guide Steps</h3>
        <button
          type="button"
          onClick={addStep}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          + Add Step
        </button>
      </div>

      {steps.length === 0 && (
        <p className="text-sm text-gray-500 italic py-4 text-center">
          No steps added yet. Click "Add Step" to get started.
        </p>
      )}

      {steps.map((step, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Step {index + 1}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => moveStep(index, -1)}
                disabled={index === 0}
                className="px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveStep(index, 1)}
                disabled={index === steps.length - 1}
                className="px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Element Selector</label>
              <input
                type="text"
                value={step.elementSelector}
                onChange={(e) => updateStep(index, 'elementSelector', e.target.value)}
                placeholder="#my-element or .my-class"
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input
                type="text"
                value={step.title}
                onChange={(e) => updateStep(index, 'title', e.target.value)}
                placeholder="Step title"
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea
                value={step.description}
                onChange={(e) => updateStep(index, 'description', e.target.value)}
                placeholder="Step description (HTML supported)"
                rows={2}
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Side</label>
              <select
                value={step.side}
                onChange={(e) => updateStep(index, 'side', e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Page URL (optional)</label>
              <input
                type="text"
                value={step.pageUrl || ''}
                onChange={(e) => updateStep(index, 'pageUrl', e.target.value || null)}
                placeholder="/path/to/page"
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
