import { BedDouble, Coffee, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/format-currency';
import { ADDONS_PRICE, ADDON_LIMITS } from '@/lib/constants/booking';

interface AddonsSectionProps {
  breakfast: number;
  extrabed: number;
  onUpdate: (type: 'breakfast' | 'extrabed', change: number) => void;
}

export default function AddonsSection({ breakfast, extrabed, onUpdate }: AddonsSectionProps) {
  return (
    <div className="mb-10">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Additional Services (Optional)
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kolom Extra Bed */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-50 rounded-lg text-tembi">
                <BedDouble size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">Extra Bed</p>
                <p className="text-xs text-gray-500">
                  {formatCurrency(ADDONS_PRICE.extrabed)} /bed
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => onUpdate('extrabed', -1)}
              disabled={extrabed <= ADDON_LIMITS.min}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="font-bold text-sm text-gray-800">{extrabed}</span>
            <button
              onClick={() => onUpdate('extrabed', 1)}
              disabled={extrabed >= ADDON_LIMITS.max}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm border border-gray-200 text-tembi disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Kolom Breakfast */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                <Coffee size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">Breakfast</p>
                <p className="text-xs text-gray-500">
                  {formatCurrency(ADDONS_PRICE.breakfast)} /pax
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => onUpdate('breakfast', -1)}
              disabled={breakfast <= ADDON_LIMITS.min}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="font-bold text-sm text-gray-800">{breakfast}</span>
            <button
              onClick={() => onUpdate('breakfast', 1)}
              disabled={breakfast >= ADDON_LIMITS.max}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm border border-gray-200 text-tembi disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
