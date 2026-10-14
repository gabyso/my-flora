import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

export default function TabLayout() {
  const { t } = useTranslation();
  const { direction } = useLayoutDirection();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#315D42',
        tabBarInactiveTintColor: '#66766F',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: '#FFFEF9',
          borderTopColor: '#DDE4DC',
          direction,
          height: 76,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarAccessibilityLabel: t('navigation.home'),
          tabBarIcon: ({ color }) => (
            <Text accessibilityElementsHidden style={{ color, fontSize: 20 }}>
              ◇
            </Text>
          ),
          title: t('navigation.home'),
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          tabBarAccessibilityLabel: t('navigation.plants'),
          tabBarIcon: ({ color }) => (
            <Text accessibilityElementsHidden style={{ color, fontSize: 20 }}>
              ✦
            </Text>
          ),
          title: t('navigation.plants'),
        }}
      />
    </Tabs>
  );
}
