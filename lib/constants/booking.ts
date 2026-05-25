/**
 * Booking-related constants
 */

export const ADDONS_PRICE = {
  breakfast: 50000,
  extrabed: 150000,
} as const;

export const ADDON_LIMITS = {
  min: 0,
  max: 5,
} as const;

export const GUEST_LIMITS = {
  adults: {
    min: 1,
    max: 6,
    options: [1, 2, 3, 4, 5, 6],
  },
  children: {
    min: 0,
    max: 4,
    options: [0, 1, 2, 3, 4],
  },
} as const;

export const BOOKING_FEES = {
  serviceFeePercentage: 5, // 5%
  tourismTaxPerNight: 30000, // 30k IDR per night
} as const;
