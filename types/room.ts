/**
 * Room-related TypeScript interfaces
 */

export interface Room {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  imageUrl: string;
  price: number;
  layoutType?: string;
  details?: {
    bed: string;
    guests: string | number;
    size: string;
  };
  amenities?: string[];
  longDescription?: string[];
  galleryImages?: string[];
  policies?: RoomPolicies;
  houseRules?: HouseRules;
}

export interface RoomPolicies {
  checkIn: string;
  checkOut: string;
}

export interface HouseRules {
  smoking: boolean;
  pets: boolean;
  quietHours?: string;
}

export interface RoomDetails {
  bed: string;
  guests: string | number;
  size: string;
}
