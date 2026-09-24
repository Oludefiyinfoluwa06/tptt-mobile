import { useQuery } from '@tanstack/react-query';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { getNotifications, notificationKeys } from '@/api/notifications';
import { Colors } from '@/constants/theme';

export default function TabsLayout() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : (scheme ?? 'light')];

  const { data: notifications } = useQuery({
    queryKey: notificationKeys.mine,
    queryFn: getNotifications,
  });
  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.primaryMuted}
      iconColor={{ default: colors.textSecondary, selected: colors.primary }}
      labelStyle={{
        default: { color: colors.textSecondary },
        selected: { color: colors.primary, fontWeight: '600' },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="packages">
        <NativeTabs.Trigger.Label>Packages</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="airplane" md="flight" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="my-requests">
        <NativeTabs.Trigger.Label>My Requests</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'doc.text', selected: 'doc.text.fill' }}
          md="assignment"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="notifications">
        <NativeTabs.Trigger.Label>Notifications</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'bell', selected: 'bell.fill' }} md="notifications" />
        <NativeTabs.Trigger.Badge hidden={unreadCount === 0}>
          {String(unreadCount)}
        </NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
          md="person"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
