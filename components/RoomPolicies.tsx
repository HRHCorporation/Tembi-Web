import Image from 'next/image';

interface PolicyTranslations {
  title: string;
  id: string;
  cancelPolicy: string;
  cancel: string;
  refund: string;
  sameday: string;
}

interface HouseRulesTranslations {
  title: string;
  smokingtrue: string;
  smokingfalse: string;
  petstrue: string;
  petsfalse: string;
  quiet: string;
}

interface RoomPoliciesProps {
  checkIn: string;
  checkOut: string;
  smoking: boolean;
  pets: boolean;
  policyTexts: PolicyTranslations;
  houseRulesTexts: HouseRulesTranslations;
}

export default function RoomPolicies({
  checkIn,
  checkOut,
  smoking,
  pets,
  policyTexts,
  houseRulesTexts
}: RoomPoliciesProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 font-serif">
        {policyTexts.title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">

        {/* Column 1: Check-in & Check-out */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4 text-sm">Check-in & Check-out</h4>
          <ul className="space-y-4 text-gray-600 text-sm">
            <li className="flex items-center gap-3">
              <div className="relative w-4 h-4 opacity-70">
                <Image src="/images/icons/clock-green.png" alt="clock" fill className="object-contain" />
              </div>
              <span>Check-in: {checkIn}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="relative w-4 h-4 opacity-70">
                <Image src="/images/icons/clock-green.png" alt="clock" fill className="object-contain" />
              </div>
              <span>Check-out: {checkOut}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="relative w-4 h-4 opacity-70">
                <Image src="/images/icons/id-green.png" alt="id" fill className="object-contain" />
              </div>
              <span>{policyTexts.id}</span>
            </li>
          </ul>
        </div>

        {/* Column 2: Cancellation Policy */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4 text-sm">{policyTexts.cancelPolicy}</h4>
          <ul className="space-y-4 text-gray-600 text-sm">
            <li className="flex items-center gap-3">
              <div className="relative w-4 h-4">
                <Image src="/images/icons/check.png" alt="check" fill className="object-contain" />
              </div>
              <span>{policyTexts.cancel}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="relative w-4 h-4">
                <Image src="/images/icons/info.png" alt="info" fill className="object-contain" />
              </div>
              <span>{policyTexts.refund}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="relative w-4 h-4">
                <Image src="/images/icons/warning.png" alt="warning" fill className="object-contain" />
              </div>
              <span>{policyTexts.sameday}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-gray-100 mb-8" />

      {/* Bottom Row: House Rules */}
      <div>
        <h4 className="font-bold text-gray-800 mb-4 text-sm">{houseRulesTexts.title}</h4>
        <div className="flex flex-wrap gap-8 text-gray-600 text-sm">

          {/* Rule 1: Smoking */}
          <div className="flex items-center gap-3">
            <div className="relative w-4 h-4 opacity-60">
              <Image src="/images/icons/no-smoking.png" alt="smoking" fill className="object-contain" />
            </div>
            <span>{smoking ? houseRulesTexts.smokingtrue : houseRulesTexts.smokingfalse}</span>
          </div>

          {/* Rule 2: Pets */}
          <div className="flex items-center gap-3">
            <div className="relative w-4 h-4 opacity-60">
              <Image src="/images/icons/pet-green.png" alt="pets" fill className="object-contain" />
            </div>
            <span>{pets ? houseRulesTexts.petstrue : houseRulesTexts.petsfalse}</span>
          </div>

          {/* Rule 3: Quiet Hours */}
          <div className="flex items-center gap-3">
            <div className="relative w-4 h-4 opacity-60">
              <Image src="/images/icons/sound-green.png" alt="quiet" fill className="object-contain" />
            </div>
            <span>{houseRulesTexts.quiet}</span>
          </div>

        </div>
      </div>
    </section>
  );
}
