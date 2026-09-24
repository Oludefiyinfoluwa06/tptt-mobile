import { apiClient } from '@/api/client';

export type BookingStatus = 'pending' | 'approved' | 'rejected';

export type Booking = {
  _id: string;
  packageId: {
    _id: string;
    title: string;
    destination: string;
    image?: string;
  };
  travelers: number;
  travelDate: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
};

export type CreateBookingPayload = {
  packageId: string;
  travelers: number;
  travelDate: string;
  notes?: string;
};

export const bookingKeys = {
  mine: ['bookings', 'mine'] as const,
};

export async function createBooking(payload: CreateBookingPayload): Promise<Booking> {
  const { data } = await apiClient.post<{ booking: Booking }>('/bookings', payload);
  return data.booking;
}

export async function getMyBookings(): Promise<Booking[]> {
  const { data } = await apiClient.get<{ bookings: Booking[] }>('/bookings/my-bookings');
  return data.bookings;
}
