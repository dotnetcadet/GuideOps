import { useQuery, useMutation } from '@apollo/client/react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { GET_USERS } from '../graphql/queries';
import { SYNC_USERS } from '../graphql/mutations';
import type { User } from '../types';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('displayName', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        info.getValue() === 'Admin' ? 'bg-purple-100 text-purple-800' :
        info.getValue() === 'Teacher' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('isActive', {
    header: 'Status',
    cell: (info) => <StatusBadge active={info.getValue()} />,
  }),
  columnHelper.accessor('lastSyncedAt', {
    header: 'Last Synced',
    cell: (info) => info.getValue() ? new Date(info.getValue()!).toLocaleDateString() : 'Never',
  }),
];

export function Users() {
  const { data, loading, refetch }: any = useQuery(GET_USERS);
  const [syncUsers, { data: syncData, loading: syncing }]: any = useMutation(SYNC_USERS);

  const users = data?.users?.edges?.map((e: any) => e.node) ?? [];

  const handleSync = async () => {
    await syncUsers();
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage provisioned users synced from Azure AD
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {syncing ? 'Syncing...' : 'Sync from Azure AD'}
        </button>
      </div>

      {syncData && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
          Sync complete: {syncData.syncUsersFromAzureAd.created} created,{' '}
          {syncData.syncUsersFromAzureAd.updated} updated,{' '}
          {syncData.syncUsersFromAzureAd.deactivated} deactivated
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading users...</div>
      ) : (
        <DataTable data={users} columns={columns} searchPlaceholder="Search users..." />
      )}
    </div>
  );
}
