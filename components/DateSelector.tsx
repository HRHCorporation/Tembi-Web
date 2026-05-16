interface DateSelectorProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

export default function DateSelector({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange
}: DateSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Select Your Dates
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <span className="absolute top-2.5 left-3 text-tembi text-xs font-bold flex items-center gap-1">
            →] Check-in
          </span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="w-full pt-8 pb-2 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-tembi text-sm font-medium transition-colors"
          />
        </div>
        <div className="relative">
          <span className="absolute top-2.5 left-3 text-tembi text-xs font-bold flex items-center gap-1">
            [← Check-out
          </span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => onCheckOutChange(e.target.value)}
            className="w-full pt-8 pb-2 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-tembi text-sm font-medium transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
