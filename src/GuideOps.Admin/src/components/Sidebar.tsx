import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '⊞' },
  { to: '/users', label: 'Users', icon: '⊡' },
  { to: '/guides', label: 'Guides', icon: '⊳' },
  { to: '/handbooks', label: 'Handbooks', icon: '⊟' },
  { to: '/acknowledgments', label: 'Acknowledgments', icon: '⊙' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">GuideOps</h1>
        <p className="text-xs text-gray-400 mt-1">Admin Console</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">Pendo Replacement PoC</p>
      </div>
    </aside>
  );
}
