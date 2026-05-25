import { Home } from 'lucide-react';
import { formatCurrency } from '@/lib/format-currency';
import type { Room } from '@/types/room';

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoomId: number | null | undefined;
  onRoomSelect: (roomId: number) => void;
}

export default function RoomSelector({ rooms, selectedRoomId, onRoomSelect }: RoomSelectorProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Home className="w-4 h-4 text-tembi" />
        <h4 className="font-bold text-gray-800">Choose Your Cultural Room</h4>
      </div>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onRoomSelect(room.id)}
            className={`relative flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-xl border cursor-pointer transition-all duration-200
                    ${
                      selectedRoomId === room.id
                        ? 'border-tembi bg-green-50/30 shadow-sm ring-1 ring-tembi'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
          >
            <div className="mb-2 md:mb-0">
              <h5 className="font-bold text-gray-900 text-base">{room.name}</h5>
              <p className="text-sm text-gray-500 mt-1">{room.tagline}</p>
            </div>
            <div className="text-left md:text-right w-full md:w-auto mt-2 md:mt-0 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end">
              <div>
                <p className="font-bold text-tembi text-lg">
                  {formatCurrency(room.price)}
                </p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider text-right hidden md:block">
                  /night
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
