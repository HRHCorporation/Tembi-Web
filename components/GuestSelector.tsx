import { User } from 'lucide-react';

interface GuestSelectorProps {
  adults: number;
  children: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
}

export default function GuestSelector({
  adults,
  children,
  onAdultsChange,
  onChildrenChange
}: GuestSelectorProps) {
  return (
    <div className="mb-10">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Guest Information
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 flex flex-col">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-1">
            <User size={12} /> Adults
          </label>
          <select
            value={adults}
            onChange={(e) => onAdultsChange(Number(e.target.value))}
            className="bg-transparent w-full text-sm font-medium focus:outline-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} Adult{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 flex flex-col">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-1">
            <User size={12} /> Children
          </label>
          <select
            value={children}
            onChange={(e) => onChildrenChange(Number(e.target.value))}
            className="bg-transparent w-full text-sm font-medium focus:outline-none cursor-pointer"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} Children
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
