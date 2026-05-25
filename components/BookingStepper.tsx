export default function BookingStepper() {
  return (
    <div className="flex items-center justify-center w-full max-w-lg mx-auto mb-8 font-sans text-xs md:text-sm relative z-10">
      <div className="flex items-center text-tembi">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-tembi text-white font-bold text-xs">
          1
        </div>
        <span className="ml-2 font-semibold">Booking Details</span>
      </div>
      <div className="w-12 border-t border-gray-300 mx-2"></div>
      <div className="flex items-center text-gray-400">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 font-bold text-xs">
          2
        </div>
        <span className="ml-2">Payment</span>
      </div>
      <div className="w-12 border-t border-gray-300 mx-2"></div>
      <div className="flex items-center text-gray-400">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 font-bold text-xs">
          3
        </div>
        <span className="ml-2">Confirmation</span>
      </div>
    </div>
  );
}
