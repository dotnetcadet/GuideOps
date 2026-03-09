import { useQuery } from '@apollo/client/react';
import { GET_USERS, GET_GUIDES, GET_HANDBOOKS, GET_ACKNOWLEDGMENTS } from '../graphql/queries';

export function Dashboard() {
  const { data: usersData }: any = useQuery(GET_USERS);
  const { data: guidesData }: any = useQuery(GET_GUIDES);
  const { data: handbooksData }: any = useQuery(GET_HANDBOOKS);
  const { data: ackData }: any = useQuery(GET_ACKNOWLEDGMENTS);

  const users = usersData?.users?.nodes ?? [];
  const guides = guidesData?.guides?.nodes ?? [];
  const handbooks = handbooksData?.handbooks?.nodes ?? [];
  const acknowledgments = ackData?.acknowledgments?.nodes ?? [];

  const stats = [
    { label: 'Total Users', value: users.length, color: 'bg-blue-500' },
    { label: 'Active Guides', value: guides.filter((g: { isActive: boolean }) => g.isActive).length, color: 'bg-green-500' },
    { label: 'Active Handbooks', value: handbooks.filter((h: { isActive: boolean }) => h.isActive).length, color: 'bg-purple-500' },
    { label: 'Acknowledgments', value: acknowledgments.length, color: 'bg-amber-500' },
  ];

  const roleBreakdown = ['Student', 'Teacher', 'Admin'].map(role => ({
    role,
    count: users.filter((u: { role: string }) => u.role === role).length,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-xl font-bold">{stat.value}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Users by Role</h2>
          <div className="space-y-3">
            {roleBreakdown.map(({ role, count }) => (
              <div key={role} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{role}s</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${users.length > 0 ? (count / users.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Acknowledgments</h2>
          {acknowledgments.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No acknowledgments recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {acknowledgments.slice(0, 5).map((ack: { id: number; user?: { displayName: string }; handbook?: { title: string }; acknowledgedAt: string }) => (
                <div key={ack.id} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium text-gray-900">{ack.user?.displayName}</span>
                    <span className="text-gray-500"> acknowledged </span>
                    <span className="font-medium text-gray-900">{ack.handbook?.title}</span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {new Date(ack.acknowledgedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
