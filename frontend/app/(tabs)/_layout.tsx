import React, { useEffect, useState } from 'react';
import { Platform, useWindowDimensions, Text, StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import * as NavigationBar from 'expo-navigation-bar';

const PRIMARY = '#2DA9DF';
const TAB_BAR_HEIGHT = 64;

type IoniconName = keyof typeof Ionicons.glyphMap;

const MENU_ITEMS: {
  route: string;
  label: string;
  icon: IoniconName;
}[] = [
  { route: 'index', label: 'Dashboard', icon: 'grid-outline' },
  { route: 'nuevo-paciente', label: 'Nuevo paciente', icon: 'person-add-outline' },
  { route: 'historial-clinico', label: 'Historial clínico', icon: 'document-text-outline' },
  { route: 'convocatoria', label: 'Convocatoria', icon: 'megaphone-outline' },
];

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isDesktopWeb = isWeb && width >= 1024;
  const [ready, setReady] = useState(!isWeb);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('overlay-swipe');
    }
  }, []);

  useEffect(() => {
    if (isWeb && width > 0) setReady(true);
  }, [width, isWeb]);

  if (!ready) return null;

  if (isWeb) {
    return (
      <Drawer
        screenOptions={{
          headerShown: !isDesktopWeb,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: PRIMARY },
          headerTintColor: '#FFFFFF',
          drawerType: isDesktopWeb ? 'permanent' : 'front',
          drawerStyle: styles.drawerStyle,
          drawerItemStyle: { borderRadius: 0 },
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
    <View style={styles.mobileRoot}>
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
    </View>
  );
}

function CustomDrawer(props: any) {
  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawer}>
      <Text style={styles.logo}>
        Guayaquil{'\n'}Vuelve a Ver
      </Text>

      {MENU_ITEMS.map((item) => {
        const focused = currentRoute === item.route;

        return (
          <DrawerItem
            key={item.route}
            label={item.label}
            labelStyle={[styles.label, focused && styles.labelActive]}
            style={[styles.drawerItem, focused && styles.drawerItemActive]}
            icon={({ size }) => (
              <Ionicons
                name={item.icon}
                size={size}
                color={focused ? '#FFFFFF' : 'rgba(255,255,255,0.85)'}
              />
            )}
            onPress={() => props.navigation.navigate(item.route)}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  mobileRoot: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerStyle: {
    backgroundColor: PRIMARY,
    width: 260,
    borderRightWidth: 0,
    elevation: 0,
  },
  drawer: {
    padding: 24,
  },
  logo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  drawerItem: {
    borderRadius: 0,
    marginVertical: 4,
  },
  drawerItemActive: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  labelActive: {
    fontWeight: '700',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
  },
});
