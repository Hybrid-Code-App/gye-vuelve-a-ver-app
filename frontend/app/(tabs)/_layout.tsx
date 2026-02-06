import React from 'react';
import { Platform, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

const PRIMARY = '#2DA9DF';
const TAB_BAR_HEIGHT = 64;

type MenuItem = {
  route: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const MENU_ITEMS: MenuItem[] = [
  { route: 'index', label: 'Dashboard', icon: 'grid-outline' },
  { route: 'nuevo-paciente', label: 'Nuevo paciente', icon: 'person-add-outline' },
  { route: 'historial-clinico', label: 'Historial clínico', icon: 'document-text-outline' },
  { route: 'convocatoria', label: 'Convocatoria', icon: 'megaphone-outline' },
];

export default function TabsLayout() {
  const isWeb = Platform.OS === 'web';

  if (isWeb) {
    return (
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'permanent',
          drawerStyle: styles.drawerStyle,
          drawerActiveTintColor: '#FFFFFF',
          drawerInactiveTintColor: 'rgba(255,255,255,0.9)',
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        {MENU_ITEMS.map((item) => (
          <Drawer.Screen key={item.route} name={item.route} />
        ))}
      </Drawer>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: styles.tabBar,
      }}
    >
      {MENU_ITEMS.map((item) => (
        <Tabs.Screen
          key={item.route}
          name={item.route}
          options={{
            title: item.label.split(' ')[0],
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={item.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

function CustomDrawer(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawer}
    >
      <Text style={styles.logo}>
        Guayaquil{'\n'}Vuelve a Ver
      </Text>

      {MENU_ITEMS.map((item) => (
        <DrawerItem
          key={item.route}
          label={item.label}
          labelStyle={styles.label}
          icon={({ size, focused }) => (
            <Ionicons
              name={item.icon}
              size={size}
              color={focused ? '#FFFFFF' : 'rgba(255,255,255,0.9)'}
            />
          )}
          onPress={() => props.navigation.navigate(item.route)}
        />
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: PRIMARY,
    width: 260,
    borderRightWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
  },
  drawer: {
    flex: 1,
    padding: 24,
  },
  logo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 40,
    lineHeight: 26,
    textAlign: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  tabBar: {
    height: TAB_BAR_HEIGHT,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});
