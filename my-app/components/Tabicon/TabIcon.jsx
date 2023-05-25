import React from 'react';
import { StyleSheet, View } from 'react-native';

export const TabIcon = ({ focused, icon }) => {
  const iconStyle = focused ? styles.activeIcon : styles.inactiveIcon;
  const containerStyle = focused ? styles.tabIconContainerActive : styles.tabIconContainer;
  return <View style={containerStyle}>{icon({ width: 34, height: 34, style: iconStyle })}</View>;
};

const styles = StyleSheet.create({
  tabStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainer: {
    marginVertical: 16,
    width: 70,
    height: 40,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainerActive: {
    marginVertical:16,
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    backgroundColor: '#FF6C00',
  },
  inactiveIcon: {},
});
