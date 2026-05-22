/**
 * Booking-related TypeScript interfaces
 */

export interface BookingAddons {
  breakfast: number;
  extrabed: number;
}

export type AddonType = 'breakfast' | 'extrabed';

export interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  selectedRoomId: number | null | undefined;
  specialRequests: string;
  addons: BookingAddons;
}

export interface BookingCalculation {
  basePrice: number;
  serviceFee: number;
  tourismTax: number;
  addonsTotal: number;
  totalPrice: number;
  numberOfNights: number;
}
