import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';
import { StepEditor } from '../components/StepEditor';
import { SchoolYearPicker } from '../components/SchoolYearPicker';
import { GET_GUIDE_BY_ID } from '../graphql/queries';
import { CREATE_GUIDE, UPDATE_GUIDE, SET_GUIDE_STEPS, CREATE_GUIDE_ASSIGNMENT, DELETE_GUIDE_ASSIGNMENT } from '../graphql/mutations';
import type { GuideStep } from '../types';

export function GuideEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const { data: guideData, loading: guideLoading }: any = useQuery(GET_GUIDE_BY_ID, {
    variables: { id: Number(id) },
    skip: isNew,
  });
  const [createGuide] = useMutation(CREATE_GUIDE);
  const [updateGuide] = useMutation(UPDATE_GUIDE);
  const [setGuideSteps] = useMutation(SET_GUIDE_STEPS);
  const [createGuideAssignment] = useMutation(CREATE_GUIDE_ASSIGNMENT);
  const [deleteGuideAssignment] = useMutation(DELETE_GUIDE_ASSIGNMENT);

  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'Walkthrough',
    schoolYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    priority: 0,
    isActive: true,
  });

  const [steps, setSteps] = useState<Omit<GuideStep, 'id' | 'guideId'>[]>([]);
  const [assignToRole, setAssignToRole] = useState('All');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (guideData?.guideById) {
      const g = guideData.guideById;
      setForm({
        title: g.title,
        description: g.description,
        type: g.type,
        schoolYear: g.schoolYear,
        priority: g.priority,
        isActive: g.isActive,
      });
      setSteps(g.steps.map((s: GuideStep) => ({
        stepOrder: s.stepOrder,
        elementSelector: s.elementSelector,
        title: s.title,
        description: s.description,
        side: s.side,
        pageUrl: s.pageUrl,
      })));
      if (g.assignments?.length > 0) {
        setAssignToRole(g.assignments[0].assignToRole);
      }
    }
  }, [guideData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let guideId: number;

      if (isNew) {
        const { data } = await createGuide({ variables: { input: { ...form, createdBy: 'admin' } } }) as any;
        guideId = data.createGuide.id;
      } else {
        guideId = Number(id);
        await updateGuide({ variables: { id: guideId, input: form } });
      }

      // Save steps
      if (steps.length > 0) {
        await setGuideSteps({
          variables: {
            guideId,
            steps: steps.map((s) => ({
              elementSelector: s.elementSelector,
              title: s.title,
              description: s.description,
              side: s.side,
              pageUrl: s.pageUrl,
            })),
          },
        });
      }

      // Handle assignment
      if (!isNew && guideData?.guideById?.assignments?.length > 0) {
        for (const a of guideData.guideById.assignments) {
          await deleteGuideAssignment({ variables: { id: a.id } });
        }
      }
      await createGuideAssignment({
        variables: {
          input: {
            guideId,
            assignToRole,
            schoolYear: form.schoolYear,
          },
        },
      });

      navigate('/guides');
    } finally {
      setSaving(false);
    }
  };

  if (!isNew && guideLoading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isNew ? 'Create Guide' : 'Edit Guide'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="Walkthrough">Walkthrough</option>
                <option value="Announcement">Announcement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Year</label>
              <SchoolYearPicker value={form.schoolYear} onChange={(v) => setForm({ ...form, schoolYear: v })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <input
                type="number"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) || 0 })}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
              <select
                value={assignToRole}
                onChange={(e) => setAssignToRole(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="All">All Users</option>
                <option value="Student">Students Only</option>
                <option value="Teacher">Teachers Only</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="rounded border-gray-300 text-indigo-600"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <StepEditor steps={steps} onChange={setSteps} />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : isNew ? 'Create Guide' : 'Update Guide'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/guides')}
            className="px-6 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
