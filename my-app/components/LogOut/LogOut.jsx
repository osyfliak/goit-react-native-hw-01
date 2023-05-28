import React from 'react';
import { Text } from 'react-native';
import LogOut from '../../img/log-out.svg';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchLogOutUser } from '../../redux/auth/authOperations';

export const Logout = () => {
   const navigation = useNavigation();
   dispatch = useDispatch();
   const logOut = () => {
      dispatch(fetchLogOutUser());
      navigation.navigate('Login');
   };
   return (
      <Text
         // style={styles.logout}
         dataDetectorType="link"
         onPress={logOut}
      >
         <LogOut />
      </Text>
   );
};
