export type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: number | null;
  authSource: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
  address: string | null;
  lastNotificationReadAt: string;
  totalUnreadNotifications: number;
};
