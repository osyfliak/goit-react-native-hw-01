import React from 'react';
import { Text } from 'react-native';
import LogOut from '../../img/log-out.svg';
import { useNavigation } from '@react-navigation/native';

export const Logout = () => {
  const navigation = useNavigation();
  return (
    <Text
      // style={styles.logout}
      dataDetectorType="link"
      onPress={() => navigation.navigate('Login')}
    >
      <LogOut />
    </Text>
  );
};
