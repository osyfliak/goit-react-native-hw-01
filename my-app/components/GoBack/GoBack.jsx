import React from 'react';
import { Text } from 'react-native';
import GoBack from '../../img/goBack.svg';
import { useNavigation } from '@react-navigation/native';

export const Goback = () => {
   const navigation = useNavigation();
   return (
      <Text dataDetectorType="link" onPress={() => navigation.goBack()}>
         <GoBack />
      </Text>
   );
};
