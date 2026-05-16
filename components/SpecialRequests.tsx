interface SpecialRequestsProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SpecialRequests({ value, onChange }: SpecialRequestsProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-tembi text-xs">●</span>
        <h4 className="font-bold text-gray-800 text-sm">Special Requests</h4>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Let us know about any special requirements, dietary restrictions, or cultural experiences you'd like to arrange..."
        className="w-full p-4 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-tembi focus:ring-1 focus:ring-tembi h-32 resize-none bg-gray-50 focus:bg-white transition-colors"
      ></textarea>
    </div>
  );
}
