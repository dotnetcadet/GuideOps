import { useQuery, useMutation } from '@apollo/client/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { GET_GUIDES } from '../graphql/queries';
import { DELETE_GUIDE } from '../graphql/mutations';
import type { Guide } from '../types';

const columnHelper = createColumnHelper<Guide>();

export function Guides() {
  const { data, loading, refetch }: any = useQuery(GET_GUIDES);
  const [deleteGuide] = useMutation(DELETE_GUIDE);

  const guides = data?.guides?.nodes ?? [];

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this guide?')) return;
    await deleteGuide({ variables: { id } });
    refetch();
  };

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => (
        <Link to={`/guides/${info.row.original.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('type', { header: 'Type' }),
    columnHelper.accessor('schoolYear', { header: 'School Year' }),
    columnHelper.accessor('priority', { header: 'Priority' }),
    columnHelper.accessor((row) => row.steps?.length ?? 0, { id: 'stepCount', header: 'Steps' }),
    columnHelper.accessor('isActive', {
      header: 'Status',
      cell: (info) => <StatusBadge active={info.getValue()} />,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex gap-2">
          <Link
            to={`/guides/${info.row.original.id}`}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(info.row.original.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
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
          <h1 className="text-2xl font-bold text-gray-900">Guides</h1>
          <p className="text-sm text-gray-500 mt-1">Manage in-app guides and walkthroughs</p>
        </div>
        <Link
          to="/guides/new"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
        >
          + New Guide
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading guides...</div>
      ) : (
        <DataTable data={guides} columns={columns} searchPlaceholder="Search guides..." />
      )}
    </div>
  );
}
