import { useQuery, useMutation } from 'urql';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { GET_HANDBOOKS } from '../graphql/queries';
import { DELETE_HANDBOOK } from '../graphql/mutations';
import type { Handbook } from '../types';

const columnHelper = createColumnHelper<Handbook>();

export function Handbooks() {
  const [result, reexecute] = useQuery({ query: GET_HANDBOOKS });
  const [, deleteHandbook] = useMutation(DELETE_HANDBOOK);

  const handbooks = result.data?.handbooks?.nodes ?? [];

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this handbook?')) return;
    await deleteHandbook({ id });
    reexecute({ requestPolicy: 'network-only' });
  };

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => (
        <Link to={`/handbooks/${info.row.original.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('schoolYear', { header: 'School Year' }),
    columnHelper.accessor('requiresAcknowledgment', {
      header: 'Requires Ack.',
      cell: (info) => <StatusBadge active={info.getValue()} activeText="Yes" inactiveText="No" />,
    }),
    columnHelper.accessor('isActive', {
      header: 'Status',
      cell: (info) => <StatusBadge active={info.getValue()} />,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex gap-2">
          <Link to={`/handbooks/${info.row.original.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
            Edit
          </Link>
          <button onClick={() => handleDelete(info.row.original.id)} className="text-sm text-red-600 hover:text-red-800">
            Delete
          </button>
        </div>
      ),
    }),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Handbooks</h1>
          <p className="text-sm text-gray-500 mt-1">Manage student handbooks and acknowledgment requirements</p>
        </div>
        <Link
          to="/handbooks/new"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
        >
          + New Handbook
        </Link>
      </div>

      {result.fetching ? (
        <div className="text-center py-12 text-gray-500">Loading handbooks...</div>
      ) : (
        <DataTable data={handbooks} columns={columns} searchPlaceholder="Search handbooks..." />
      )}
    </div>
  );
}
