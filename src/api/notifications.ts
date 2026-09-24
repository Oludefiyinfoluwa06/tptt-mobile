import { apiClient } from '@/api/client';

export type Notification = {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export const notificationKeys = {
  mine: ['notifications', 'mine'] as const,
};

export async function getNotifications(): Promise<Notification[]> {
  const { data } = await apiClient.get<{ notifications: Notification[] }>('/notifications');
  return data.notifications;
}

export async function markNotificationAsRead(id: string): Promise<Notification> {
  const { data } = await apiClient.patch<{ notification: Notification }>(`/notifications/${id}/read`);
  return data.notification;
}
