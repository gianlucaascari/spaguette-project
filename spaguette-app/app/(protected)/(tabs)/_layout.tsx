import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Button from '@/components/general/Button';
import { useAuthService } from '@/services/auth/auth-service';

export const unstable_settings = {
  initialRouteName: 'plan-page',
}

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const authService = useAuthService()

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerRight: () => <Button text='Log out' style='tertiary' onPress={authService.logOut} />,
      }}
      initialRouteName='plan-page'
      >
      <Tabs.Screen
        name="recipe-page"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ingredients-page"
        options={{
          title: 'Ingredients',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /><Tabs.Screen
      name="plan-page"
      options={{
        title: 'Plan',
        tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
      }}
    />
    </Tabs>
  );
}
