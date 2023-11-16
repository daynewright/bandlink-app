export type EventType =
  | "Practice"
  | "Concert"
  | "Parade"
  | "Performance"
  | "Reception";

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface BandEvent {
  id: number;
  imageUri?: string;
  title: string;
  description?: string;
  location: Location;
  date: string;
  startTime: string; // Use a more specific date/time type if possible
  endTime: string; // Use a more specific date/time type if possible
  eventType: EventType;
  organizerGroup?: string; // Assuming this is an optional field
  userId: number;
  pills: string[];
}
