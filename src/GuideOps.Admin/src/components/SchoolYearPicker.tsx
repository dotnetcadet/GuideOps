interface SchoolYearPickerProps {
  value: string;
  onChange: (value: string) => void;
}

function generateSchoolYears(): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let y = currentYear - 2; y <= currentYear + 2; y++) {
    years.push(`${y}-${y + 1}`);
  }
  return years;
}

export function SchoolYearPicker({ value, onChange }: SchoolYearPickerProps) {
  const years = generateSchoolYears();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block rounded-md bg-white px-3 py-2 text-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option value="">All School Years</option>
      {years.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  );
}
