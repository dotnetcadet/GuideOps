import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../components/DataTable';
import { SchoolYearPicker } from '../components/SchoolYearPicker';
import { GET_ACKNOWLEDGMENTS, GET_HANDBOOKS, GET_ACKNOWLEDGMENT_STATS } from '../graphql/queries';
import type { Acknowledgment, Handbook } from '../types';

const columnHelper = createColumnHelper<Acknowledgment>();

const columns = [
  columnHelper.accessor((row) => row.user?.displayName ?? '', { id: 'userName', header: 'User' }),
  columnHelper.accessor((row) => row.user?.email ?? '', { id: 'userEmail', header: 'Email' }),
  columnHelper.accessor((row) => row.user?.role ?? '', { id: 'userRole', header: 'Role' }),
  columnHelper.accessor((row) => row.handbook?.title ?? '', { id: 'handbookTitle', header: 'Handbook' }),
  columnHelper.accessor('schoolYear', { header: 'School Year' }),
  columnHelper.accessor('acknowledgedAt', {
    header: 'Acknowledged At',
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
  columnHelper.accessor('ipAddress', { header: 'IP Address' }),
];

export function Acknowledgments() {
  const currentYear = new Date().getFullYear();
  const [schoolYear, setSchoolYear] = useState(`${currentYear}-${currentYear + 1}`);
  const [selectedHandbookId, setSelectedHandbookId] = useState<number | null>(null);

  const { data: ackData, loading: ackLoading }: any = useQuery(GET_ACKNOWLEDGMENTS);
  const { data: handbooksData }: any = useQuery(GET_HANDBOOKS);
  const { data: statsData }: any = useQuery(GET_ACKNOWLEDGMENT_STATS, {
    variables: { schoolYear, handbookId: selectedHandbookId! },
    skip: !selectedHandbookId,
  });

  const acknowledgments = (ackData?.acknowledgments?.edges?.map((e: any) => e.node) ?? []).filter((a: Acknowledgment) => {
    if (schoolYear && a.schoolYear !== schoolYear) return false;
    if (selectedHandbookId && a.handbookId !== selectedHandbookId) return false;
    return true;
  });

  const handbooks = handbooksData?.handbooks?.edges?.map((e: any) => e.node) ?? [];
  const stats = statsData?.acknowledgmentStats;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Acknowledgment Tracking</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <SchoolYearPicker value={schoolYear} onChange={setSchoolYear} />
        <select
          value={selectedHandbookId ?? ''}
          onChange={(e) => setSelectedHandbookId(e.target.value ? Number(e.target.value) : null)}
          className="block rounded-md bg-white px-3 py-2 text-sm border border-gray-300 shadow-sm"
        >
          <option value="">All Handbooks</option>
          {handbooks.map((h: Handbook) => (
            <option key={h.id} value={h.id}>{h.title}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      {stats && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stats.totalAssigned}</p>
              <p className="text-sm text-gray-500">Total Assigned</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.acknowledgedCount}</p>
              <p className="text-sm text-gray-500">Acknowledged</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">{stats.pendingCount}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
          {stats.totalAssigned > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${(stats.acknowledgedCount / stats.totalAssigned) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1 text-center">
                {Math.round((stats.acknowledgedCount / stats.totalAssigned) * 100)}% complete
              </p>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      {ackLoading ? (
        <div className="text-center py-12 text-gray-500">Loading acknowledgments...</div>
      ) : (
        <DataTable data={acknowledgments} columns={columns} searchPlaceholder="Search acknowledgments..." />
      )}
    </div>
  );
}
