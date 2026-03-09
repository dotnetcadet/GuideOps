import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'urql';
import { SchoolYearPicker } from '../components/SchoolYearPicker';
import { GET_HANDBOOK_BY_ID } from '../graphql/queries';
import { CREATE_HANDBOOK, UPDATE_HANDBOOK, CREATE_ASSIGNMENT, DELETE_ASSIGNMENT } from '../graphql/mutations';

export function HandbookEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [result] = useQuery({ query: GET_HANDBOOK_BY_ID, variables: { id: Number(id) }, pause: isNew });
  const [, createHandbook] = useMutation(CREATE_HANDBOOK);
  const [, updateHandbook] = useMutation(UPDATE_HANDBOOK);
  const [, createAssignment] = useMutation(CREATE_ASSIGNMENT);
  const [, deleteAssignment] = useMutation(DELETE_ASSIGNMENT);

  const [form, setForm] = useState({
    title: '',
    contentUrl: '',
    contentHtml: '',
    schoolYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    isActive: true,
    requiresAcknowledgment: true,
  });

  const [assignToRole, setAssignToRole] = useState('All');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (result.data?.handbookById) {
      const h = result.data.handbookById;
      setForm({
        title: h.title,
        contentUrl: h.contentUrl || '',
        contentHtml: h.contentHtml || '',
        schoolYear: h.schoolYear,
        isActive: h.isActive,
        requiresAcknowledgment: h.requiresAcknowledgment,
      });
      if (h.assignments?.length > 0) {
        setAssignToRole(h.assignments[0].assignToRole);
      }
    }
  }, [result.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const input = {
        title: form.title,
        contentUrl: form.contentUrl || null,
        contentHtml: form.contentHtml || null,
        schoolYear: form.schoolYear,
        isActive: form.isActive,
        requiresAcknowledgment: form.requiresAcknowledgment,
      };

      let handbookId: number;

      if (isNew) {
        const res = await createHandbook({ input });
        if (res.error) throw res.error;
        handbookId = res.data.createHandbook.id;
      } else {
        handbookId = Number(id);
        const res = await updateHandbook({ id: handbookId, input });
        if (res.error) throw res.error;
      }

      // Handle assignment
      if (!isNew && result.data?.handbookById?.assignments?.length > 0) {
        for (const a of result.data.handbookById.assignments) {
          await deleteAssignment({ id: a.id });
        }
      }
      await createAssignment({
        input: {
          targetType: 'Handbook',
          targetId: handbookId,
          assignToRole,
          schoolYear: form.schoolYear,
        },
      });

      navigate('/handbooks');
    } finally {
      setSaving(false);
    }
  };

  if (!isNew && result.fetching) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isNew ? 'Create Handbook' : 'Edit Handbook'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="Student Handbook 2025-2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content URL (PDF or webpage)</label>
            <input
              type="url"
              value={form.contentUrl}
              onChange={(e) => setForm({ ...form, contentUrl: e.target.value })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="https://example.com/handbook.pdf"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content HTML (alternative to URL)
            </label>
            <textarea
              value={form.contentHtml}
              onChange={(e) => setForm({ ...form, contentHtml: e.target.value })}
              rows={6}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono"
              placeholder="<h1>Student Handbook</h1><p>...</p>"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Year</label>
              <SchoolYearPicker value={form.schoolYear} onChange={(v) => setForm({ ...form, schoolYear: v })} />
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

          <div className="flex gap-6">
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="requiresAck"
                checked={form.requiresAcknowledgment}
                onChange={(e) => setForm({ ...form, requiresAcknowledgment: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600"
              />
              <label htmlFor="requiresAck" className="text-sm text-gray-700">Requires Acknowledgment</label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : isNew ? 'Create Handbook' : 'Update Handbook'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/handbooks')}
            className="px-6 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
