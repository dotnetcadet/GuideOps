interface StatusBadgeProps {
  active: boolean;
  activeText?: string;
  inactiveText?: string;
}

export function StatusBadge({ active, activeText = 'Active', inactiveText = 'Inactive' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        active
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      {active ? activeText : inactiveText}
    </span>
  );
}
